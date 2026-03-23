/**
 * gemini.controller.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Context-aware AI Tutor controller.
 *
 * Upgrade over the original:
 *  - Accepts `screenContext`  (JSON string) – what the learner currently sees
 *  - Accepts `chatHistory`    (JSON string) – recent turns for follow-up Q&A
 *  - Builds a rich system prompt that instructs Gemini to behave like a tutor
 *    scoped to the visible page content, not as a generic assistant.
 *
 * Flow:
 *  1. Parse screenContext + chatHistory from the request body
 *  2. Build a context-aware system instruction
 *  3. Optionally upload an image to the Gemini File API
 *  4. Send the full prompt history to Gemini generateContent
 *  5. Return the AI reply
 */

import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_FILE_API_URL =
  "https://generativelanguage.googleapis.com/upload/v1beta/files";
const GEMINI_GENERATE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not set in environment variables.");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Builds the context-aware system instruction string sent to Gemini.
 *
 * @param {Object|null} ctx  Parsed screenContext from the frontend
 * @returns {string}         The full system prompt
 */
function buildSystemPrompt(ctx) {
  // If no context was provided, fall back to a polite generic tutor persona
  if (!ctx || Object.keys(ctx).length === 0) {
    return (
      "You are LearnLLM, a friendly and knowledgeable AI tutor for an AR " +
      "learning platform. Answer student questions clearly and concisely. " +
      "If you don't know something, say so honestly."
    );
  }

  // Compose a structured context block from the rich screen data
  const contextLines = [];

  if (ctx.pageName)      contextLines.push(`• Current Page: ${ctx.pageName}`);
  if (ctx.courseName)    contextLines.push(`• Subject/Course: ${ctx.courseName}`);
  if (ctx.sectionTitle)  contextLines.push(`• Section/Module: ${ctx.sectionTitle}`);
  if (ctx.selectedTopic) contextLines.push(`• Selected Topic: ${ctx.selectedTopic}`);
  if (ctx.studentLevel)  contextLines.push(`• Student Level: ${ctx.studentLevel}`);
  if (ctx.routePath)     contextLines.push(`• Route: ${ctx.routePath}`);

  if (ctx.visibleHeadings?.length) {
    contextLines.push(`• Visible Headings: ${ctx.visibleHeadings.join(" | ")}`);
  }
  if (ctx.visibleBullets?.length) {
    contextLines.push(
      `• Visible Bullet Points:\n  - ${ctx.visibleBullets.join("\n  - ")}`
    );
  }
  if (ctx.visibleText) {
    contextLines.push(`• Visible Content:\n${ctx.visibleText}`);
  }

  const contextBlock = contextLines.join("\n");

  return `You are LearnLLM, a dedicated AI tutor embedded inside an AR learning platform.

## SCREEN CONTEXT
The student is currently viewing the following content on their screen:

${contextBlock}

## RULES — follow these strictly:

1. **Context-first**: Always base your answers on the SCREEN CONTEXT above.  
   When the student uses vague references like "this", "that", "here", "this topic",  
   or "this page", map them directly to the visible content shown above.

2. **Out-of-context questions**: If the student asks something NOT covered by the  
   screen context, clearly tell them (one short sentence) and then provide a helpful  
   general answer.

3. **Student-friendly language**: Keep explanations clear, concise, and encouraging.  
   Use analogies, examples, and step-by-step breakdowns where helpful.

4. **Follow-up awareness**: The chat history provides previous turns. Use it to  
   understand what the student already knows and avoid repeating yourself.

5. **Formatting**: Use markdown for structure (headings, bold, bullet lists, code  
   blocks) where it improves readability. Keep answers focused — do not pad.

6. **Honest uncertainty**: If you are unsure about something, say so rather than  
   guessing. Encourage the student to verify with their course material.

Begin every session by acknowledging what the student is viewing, then answer their question.`;
}

/**
 * Converts the stored chat history (from sessionStorage) into Gemini's
 * `contents` format for multi-turn conversation support.
 *
 * @param {Array} history  Array of { role, content } messages
 * @returns {Array}        Gemini-formatted contents array
 */
function buildChatHistory(history) {
  if (!Array.isArray(history) || history.length === 0) return [];

  return history.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content || "" }],
  }));
}

// ─── Controller ───────────────────────────────────────────────────────────────

const geminiController = async (req, res) => {
  const { message } = req.body;
  const imageFile = req.file;

  // Parse screen context (sent as JSON string from the frontend)
  let screenContext = null;
  try {
    if (req.body.screenContext) {
      screenContext = JSON.parse(req.body.screenContext);
    }
  } catch {
    console.warn("⚠️  Could not parse screenContext — proceeding without it.");
  }

  // Parse chat history for multi-turn support
  let chatHistory = [];
  try {
    if (req.body.chatHistory) {
      chatHistory = JSON.parse(req.body.chatHistory);
    }
  } catch {
    console.warn("⚠️  Could not parse chatHistory — starting fresh.");
  }

  try {
    // ── STEP 1: Upload image to Gemini File API (if provided) ────────────────
    let fileDataPart = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append(
        "metadata",
        JSON.stringify({ file: { displayName: imageFile.originalname } }),
        { contentType: "application/json" }
      );
      formData.append("file", imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype,
      });

      const uploadResponse = await axios.post(
        `${GEMINI_FILE_API_URL}?key=${GEMINI_API_KEY}`,
        formData,
        { headers: { ...formData.getHeaders() } }
      );

      fileDataPart = {
        fileData: {
          mimeType: uploadResponse.data.file.mimeType,
          fileUri: uploadResponse.data.file.uri,
        },
      };
      console.log("✅ File uploaded:", uploadResponse.data.file.uri);
    }

    // ── STEP 2: Build current user turn parts ────────────────────────────────
    const currentParts = [];
    if (fileDataPart) currentParts.push(fileDataPart);
    if (message) currentParts.push({ text: message });

    // ── STEP 3: Assemble full conversation for Gemini ────────────────────────
    //  Gemini expects alternating user / model turns.
    //  We prepend history and append the current user turn.
    const historyContents = buildChatHistory(chatHistory);
    const contents = [
      ...historyContents,
      { role: "user", parts: currentParts },
    ];

    // ── STEP 4: Build context-aware system instruction ───────────────────────
    const systemInstruction = {
      parts: [{ text: buildSystemPrompt(screenContext) }],
    };

    // ── STEP 5: Call Gemini generateContent ──────────────────────────────────
    const response = await axios.post(
      `${GEMINI_GENERATE_URL}?key=${GEMINI_API_KEY}`,
      { contents, systemInstruction },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    // Log context summary for debugging (remove in production if noisy)
    if (screenContext?.pageName) {
      console.log(`📖 Context → page: "${screenContext.pageName}", topic: "${screenContext.selectedTopic}"`);
    }

    res.json({
      reply,
      fileUri: fileDataPart ? fileDataPart.fileData.fileUri : null,
    });
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error("🚨 Gemini API Error:", JSON.stringify(errorData, null, 2));

    res.status(500).json({
      error: "Failed to communicate with Gemini API.",
      details: errorData,
    });
  }
};

export default geminiController;
