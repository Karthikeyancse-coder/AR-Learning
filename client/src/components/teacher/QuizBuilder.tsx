import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

interface Option { text: string }
interface Question {
  id: number;
  text: string;
  options: Option[];
  correctIndex: number;
  marks: number;
  explanation: string;
}

const blankQuestion = (id: number): Question => ({
  id,
  text: "",
  options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
  correctIndex: 0,
  marks: 1,
  explanation: "",
});

const QuizBuilder = () => {
  const navigate = useNavigate();
  const { dark } = useOutletContext<{ dark: boolean }>();
  const [meta, setMeta] = useState({
    title: "",
    subject: "Biology",
    instructions: "",
    assignTo: "All Students",
    dueDate: "",
    duration: "30",
    totalMarks: "",
  });
  const [questions, setQuestions] = useState<Question[]>([blankQuestion(1)]);
  const [activeQ, setActiveQ] = useState(0);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSidebarOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const addQuestion = () => {
    const newQ = blankQuestion(questions.length + 1);
    setQuestions([...questions, newQ]);
    setActiveQ(questions.length);
  };

  const updateQuestion = (idx: number, field: keyof Question, value: any) => {
    setQuestions(questions.map((q, i) => (i === idx ? { ...q, [field]: value } : q)));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions(questions.map((q, i) => {
      if (i !== qIdx) return q;
      const opts = [...q.options];
      opts[oIdx] = { text: value };
      return { ...q, options: opts };
    }));
  };

  const deleteQuestion = (idx: number) => {
    const updated = questions.filter((_, i) => i !== idx).map((q, i) => ({ ...q, id: i + 1 }));
    setQuestions(updated.length ? updated : [blankQuestion(1)]);
    setActiveQ(Math.max(0, idx - 1));
  };

  const handlePublish = () => {
    setSaved(true);
    // Route back to the shared PublishedTasks page instead of the old quizzes page
    setTimeout(() => { navigate("/teacher/courses"); }, 1500);
  };

  const handleBack = () => {
    navigate("/teacher/courses");
  };

  const q = questions[activeQ];

  return (
    <div className="flex h-full overflow-hidden relative" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Question sidebar */}
      <div className={`
        md:relative md:translate-x-0 md:w-52 md:flex md:flex-col md:shrink-0
        fixed top-0 left-0 h-full z-30 w-[75vw] max-w-[320px]
        flex flex-col shrink-0 border-r transition-all duration-300
        ${ sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full" }
        ${ dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-100" }
      `}>
        <div className={`p-4 border-b flex items-center justify-between ${dark ? "border-slate-700" : "border-slate-100"}`}>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Questions</p>
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className={`md:hidden w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              dark ? "text-slate-400 hover:bg-slate-700 hover:text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {questions.map((question, i) => (
            <button
              key={question.id}
              onClick={() => setActiveQ(i)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all text-left ${
                activeQ === i 
                    ? "bg-[#006493] text-white" 
                    : (dark ? "text-slate-400 hover:bg-slate-700/50" : "text-slate-500 hover:bg-slate-50")
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black shrink-0 ${
                  activeQ === i 
                      ? "bg-white/20" 
                      : (dark ? "bg-slate-800 text-slate-400" : "bg-slate-100")
              }`}>
                {i + 1}
              </span>
              <span className="truncate">{question.text || "Untitled"}</span>
            </button>
          ))}
        </div>
        <div className={`p-3 border-t ${dark ? "border-slate-700" : "border-slate-100"}`}>
          <button onClick={addQuestion} className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold transition-colors ${
              dark ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-50 hover:bg-slate-100 text-slate-600"
          }`}>
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Question
          </button>
        </div>
      </div>

      {/* Main editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className={`border-b px-6 py-3.5 flex items-center justify-between shrink-0 transition-colors ${
            dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                dark ? "text-slate-400 hover:bg-slate-700 hover:text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <button onClick={handleBack} className={`transition-colors w-9 h-9 flex items-center justify-center rounded-xl ${
                dark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}>
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className={`text-[15px] font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Quiz Builder</h1>
              <p className={`text-[10px] ${dark ? "text-slate-400" : "text-slate-400"}`}>{questions.length} question{questions.length !== 1 ? "s" : ""} · {meta.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-colors ${
                dark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}>
              Save Draft
            </button>
            <button className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-colors ${
                dark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}>
              Preview
            </button>
            <button onClick={handlePublish} className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                saved 
                  ? (dark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white") 
                  : (dark ? "bg-[#006493] text-white hover:bg-blue-600" : "bg-[#006493] text-white hover:bg-blue-700")
            }`}>
              <span className="material-symbols-outlined text-[16px]">{saved ? "check_circle" : "publish"}</span>
              {saved ? "Published!" : "Publish"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Meta form */}
          <div className={`rounded-2xl border p-6 ${
              dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}>
            <h3 className={`text-[11px] font-black uppercase tracking-widest mb-5 ${dark ? "text-slate-500" : "text-slate-400"}`}>Quiz Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Quiz Title *</label>
                <input type="text" placeholder="e.g. Cell Theory MCQ Assessment"
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                      dark 
                        ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                        : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                  }`}
                  value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
              </div>
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Subject</label>
                <select className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none appearance-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white focus:border-[#006493]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] focus:border-[#006493]"
                }`}
                  value={meta.subject} onChange={(e) => setMeta({ ...meta, subject: e.target.value })}>
                  {["Biology", "Chemistry", "Mathematics", "Physics", "General"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Assign To</label>
                <select className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none appearance-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white focus:border-[#006493]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] focus:border-[#006493]"
                }`}
                  value={meta.assignTo} onChange={(e) => setMeta({ ...meta, assignTo: e.target.value })}>
                  {["All Students", "Grade 10 Biology", "Grade 11 Biology", "Grade 12 Biology"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Due Date</label>
                <input type="date" className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white focus:border-[#006493] [color-scheme:dark]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] focus:border-[#006493] [color-scheme:light]"
                }`}
                  value={meta.dueDate} onChange={(e) => setMeta({ ...meta, dueDate: e.target.value })} />
              </div>
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Duration (mins)</label>
                <input type="number" className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                }`}
                  value={meta.duration} onChange={(e) => setMeta({ ...meta, duration: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Instructions (optional)</label>
                <textarea rows={2} placeholder="Instructions shown to students before they start..."
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none resize-none transition-all ${
                      dark 
                        ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                        : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                  }`}
                  value={meta.instructions} onChange={(e) => setMeta({ ...meta, instructions: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Question editor */}
          <div className={`rounded-2xl border p-6 ${
              dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-[11px] font-black uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>Question {activeQ + 1}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { const dupe = { ...q, id: questions.length + 1 }; setQuestions([...questions, dupe]); }}
                  className={`text-[11px] font-bold transition-colors flex items-center gap-1 px-2 py-1 rounded-lg ${
                      dark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-[#006493] hover:bg-blue-50"
                  }`}>
                  <span className="material-symbols-outlined text-[16px]">content_copy</span> Duplicate
                </button>
                <button onClick={() => deleteQuestion(activeQ)}
                  className={`text-[11px] font-bold transition-colors flex items-center gap-1 px-2 py-1 rounded-lg ${
                      dark ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" : "text-red-500 hover:text-red-700 hover:bg-red-50"
                  }`}>
                  <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <textarea rows={3} placeholder="Type your question here..."
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none resize-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                }`}
                value={q.text} onChange={(e) => updateQuestion(activeQ, "text", e.target.value)} />

              <div className="space-y-2.5">
                <p className={`text-[11px] font-black uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>Options — click correct answer</p>
                {q.options.map((opt, oi) => {
                  const isCorrect = q.correctIndex === oi;
                  let rowClass = "";
                  let bubbleClass = "";
                  
                  if (dark) {
                    rowClass = isCorrect 
                        ? "border-emerald-500/50 bg-emerald-500/10" 
                        : "border-slate-700 bg-slate-800 hover:border-slate-600";
                    bubbleClass = isCorrect 
                        ? "border-emerald-500 bg-emerald-500 text-white" 
                        : "border-slate-600 text-slate-400";
                  } else {
                    rowClass = isCorrect 
                        ? "border-emerald-400 bg-emerald-50" 
                        : "border-slate-200 bg-slate-50 hover:border-slate-300";
                    bubbleClass = isCorrect 
                        ? "border-emerald-500 bg-emerald-500 text-white" 
                        : "border-slate-300 text-slate-400";
                  }

                  return (
                    <div key={oi}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${rowClass}`}
                      onClick={() => updateQuestion(activeQ, "correctIndex", oi)}
                    >
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-black shrink-0 ${bubbleClass}`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <input type="text" placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                        className={`flex-1 bg-transparent text-sm font-medium focus:outline-none ${dark ? "text-white placeholder-slate-500" : "text-[#181c22]"}`}
                        value={opt.text}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateOption(activeQ, oi, e.target.value)} />
                      {isCorrect && <span className={`material-symbols-outlined text-[18px] ${dark ? "text-emerald-400" : "text-emerald-500"}`}>check_circle</span>}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Marks for this question</label>
                  <input type="number" className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                    dark 
                      ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                      : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                  }`}
                    value={q.marks} onChange={(e) => updateQuestion(activeQ, "marks", Number(e.target.value))} />
                </div>
                <div>
                  <label className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Explanation (optional)</label>
                  <input type="text" placeholder="Why is this the correct answer?"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                      dark 
                        ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                        : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder-slate-400 focus:border-[#006493]"
                    }`}
                    value={q.explanation} onChange={(e) => updateQuestion(activeQ, "explanation", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Nav between questions */}
          <div className="flex items-center justify-between pb-8">
            <button onClick={() => setActiveQ(Math.max(0, activeQ - 1))} disabled={activeQ === 0}
              className={`flex items-center gap-2 px-4 py-2 text-[12px] font-bold rounded-xl disabled:opacity-40 transition-all ${
                  dark 
                    ? "bg-[#1e293b] text-slate-300 border border-slate-700 hover:bg-slate-800" 
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}>
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Previous
            </button>
            <span className={`text-[11px] font-bold ${dark ? "text-slate-400" : "text-slate-400"}`}>{activeQ + 1} / {questions.length}</span>
            <button onClick={() => activeQ < questions.length - 1 ? setActiveQ(activeQ + 1) : addQuestion()}
              className={`flex items-center gap-2 px-4 py-2 text-[12px] font-bold rounded-xl transition-all ${
                  dark 
                    ? "bg-[#006493]/20 border border-[#006493]/50 text-[#38bdf8] hover:bg-[#006493]/30" 
                    : "bg-blue-50 border border-blue-100 text-[#006493] hover:bg-blue-100"
              }`}>
              {activeQ < questions.length - 1 ? "Next" : "Add Question"}
              <span className="material-symbols-outlined text-[16px]">{activeQ < questions.length - 1 ? "arrow_forward" : "add"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;
