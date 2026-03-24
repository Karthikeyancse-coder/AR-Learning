import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    setTimeout(() => { navigate("/teacher/quizzes"); }, 1500);
  };

  const q = questions[activeQ];

  return (
    <div className="flex h-full overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Question sidebar */}
      <div className="w-52 shrink-0 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Questions</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {questions.map((question, i) => (
            <button
              key={question.id}
              onClick={() => setActiveQ(i)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all text-left ${
                activeQ === i ? "bg-[#006493] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black ${activeQ === i ? "bg-white/20" : "bg-slate-100"}`}>{i + 1}</span>
              <span className="truncate">{question.text || "Untitled"}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100">
          <button onClick={addQuestion} className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[12px] font-bold transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Question
          </button>
        </div>
      </div>

      {/* Main editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/teacher/quizzes")} className="text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="text-[15px] font-black text-[#181c22]">Quiz Builder</h1>
              <p className="text-[10px] text-slate-400">{questions.length} question{questions.length !== 1 ? "s" : ""} · {meta.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-[12px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 text-[12px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Preview
            </button>
            <button onClick={handlePublish} className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-all ${saved ? "bg-emerald-500 text-white" : "bg-[#006493] text-white hover:bg-blue-700"} flex items-center gap-1.5`}>
              <span className="material-symbols-outlined text-[16px]">{saved ? "check_circle" : "publish"}</span>
              {saved ? "Published!" : "Publish"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Meta form */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">Quiz Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Quiz Title *</label>
                <input type="text" placeholder="e.g. Cell Theory MCQ Assessment"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] transition-all"
                  value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Subject</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] appearance-none"
                  value={meta.subject} onChange={(e) => setMeta({ ...meta, subject: e.target.value })}>
                  {["Biology", "Chemistry", "Mathematics", "Physics", "General"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Assign To</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] appearance-none"
                  value={meta.assignTo} onChange={(e) => setMeta({ ...meta, assignTo: e.target.value })}>
                  {["All Students", "Grade 10 Biology", "Grade 11 Biology", "Grade 12 Biology"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Due Date</label>
                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
                  value={meta.dueDate} onChange={(e) => setMeta({ ...meta, dueDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Duration (mins)</label>
                <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
                  value={meta.duration} onChange={(e) => setMeta({ ...meta, duration: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Instructions (optional)</label>
                <textarea rows={2} placeholder="Instructions shown to students before they start..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] resize-none"
                  value={meta.instructions} onChange={(e) => setMeta({ ...meta, instructions: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Question editor */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Question {activeQ + 1}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { const dupe = { ...q, id: questions.length + 1 }; setQuestions([...questions, dupe]); }}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#006493] transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span> Duplicate
                </button>
                <button onClick={() => deleteQuestion(activeQ)}
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <textarea rows={3} placeholder="Type your question here..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] resize-none"
                value={q.text} onChange={(e) => updateQuestion(activeQ, "text", e.target.value)} />

              <div className="space-y-2.5">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Options — click correct answer</p>
                {q.options.map((opt, oi) => (
                  <div key={oi}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${q.correctIndex === oi ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}
                    onClick={() => updateQuestion(activeQ, "correctIndex", oi)}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-black shrink-0 ${q.correctIndex === oi ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-slate-400"}`}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <input type="text" placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                      className="flex-1 bg-transparent text-sm font-medium focus:outline-none text-[#181c22]"
                      value={opt.text}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateOption(activeQ, oi, e.target.value)} />
                    {q.correctIndex === oi && <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Marks for this question</label>
                  <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
                    value={q.marks} onChange={(e) => updateQuestion(activeQ, "marks", Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Explanation (optional)</label>
                  <input type="text" placeholder="Why is this the correct answer?"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
                    value={q.explanation} onChange={(e) => updateQuestion(activeQ, "explanation", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Nav between questions */}
          <div className="flex items-center justify-between">
            <button onClick={() => setActiveQ(Math.max(0, activeQ - 1))} disabled={activeQ === 0}
              className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-all">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Previous
            </button>
            <span className="text-[11px] font-bold text-slate-400">{activeQ + 1} / {questions.length}</span>
            <button onClick={() => activeQ < questions.length - 1 ? setActiveQ(activeQ + 1) : addQuestion()}
              className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-[#006493] bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-all">
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
