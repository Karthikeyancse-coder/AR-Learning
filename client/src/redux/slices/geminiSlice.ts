/**
 * geminiSlice.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Redux slice for the AI Tutor chat.
 *
 * Key upgrade: `sendMessage` now accepts an optional `screenContext` object.
 * When provided, it is serialised and sent to the backend so Gemini can answer
 * based on what the learner is currently viewing, not as a generic assistant.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ScreenContext } from "../../hooks/usePageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  timestamp: number;
}

interface GeminiState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: GeminiState = {
  messages: [],
  loading: false,
  error: null,
};

// ─── Thunk ───────────────────────────────────────────────────────────────────

/**
 * Sends a chat message to /api/gemini along with:
 *  - `screenContext`  – current page / topic / visible-text snapshot
 *  - `chatHistory`    – last N turns kept in sessionStorage for follow-up Q&A
 */
export const sendMessage = createAsyncThunk(
  "gemini/sendMessage",
  async ({
    message,
    imageFile,
    screenContext,
  }: {
    message: string;
    imageFile?: File;
    /** Pass the result of usePageContext() here */
    screenContext?: ScreenContext;
  }) => {
    // ── Build multipart payload ───────────────────────────────────────────────
    const formData = new FormData();
    formData.append("message", message);

    // Include past messages so Gemini can handle follow-up questions
    const chatHistory: Message[] = JSON.parse(
      sessionStorage.getItem("geminiMessages") || "[]"
    );
    // Keep the last 10 turns to avoid huge prompts
    const recentHistory = chatHistory.slice(-10);
    formData.append("chatHistory", JSON.stringify(recentHistory));

    // Attach screen context so the backend can build a context-aware prompt
    if (screenContext) {
      formData.append("screenContext", JSON.stringify(screenContext));
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/gemini`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      userMessage: message,
      assistantReply: response.data.reply,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const geminiSlice = createSlice({
  name: "gemini",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
      sessionStorage.removeItem("geminiMessages");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendMessage.fulfilled,
        (
          state,
          action: PayloadAction<{
            userMessage: string;
            assistantReply: string;
            imageUrl?: string;
          }>
        ) => {
          state.loading = false;

          const timestamp = Date.now();

          // Add user message bubble
          state.messages.push({
            role: "user",
            content: action.payload.userMessage,
            imageUrl: action.payload.imageUrl,
            timestamp,
          });

          // Add AI reply bubble
          state.messages.push({
            role: "assistant",
            content: action.payload.assistantReply,
            timestamp: timestamp + 1,
          });

          // Persist to sessionStorage for multi-turn context
          sessionStorage.setItem(
            "geminiMessages",
            JSON.stringify(state.messages)
          );
        }
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send message";
      });
  },
});

export const { clearChat } = geminiSlice.actions;
export default geminiSlice.reducer;
