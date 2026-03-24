import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssignmentBuilder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subject: "Biology",
    instructions: "",
    rubric: "",
    assignTo: "All Students",
    dueDate: "",
    dueTime: "",
    totalMarks: "100",
    submissionType: "both" as "text" | "file" | "both",
  });
  const [saved, setSaved] = useState(false);

  const handlePublish = () => {
    setSaved(true);
    setTimeout(() => navigate("/teacher/assignments"), 1500);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/teacher/assignments")} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-[#181c22]">Assignment Builder</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Create a written or file-based assignment</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-[12px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
            Save Draft
          </button>
          <button onClick={handlePublish} className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-all flex items-center gap-1.5 ${saved ? "bg-emerald-500 text-white" : "bg-[#006493] text-white hover:bg-blue-700"}`}>
            <span className="material-symbols-outlined text-[16px]">{saved ? "check_circle" : "publish"}</span>
            {saved ? "Published!" : "Publish"}
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-5">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Assignment Details</h3>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Title *</label>
          <input type="text" placeholder="e.g. Photosynthesis Research Essay"
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] transition-all"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Subject</label>
            <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] appearance-none"
              value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {["Biology", "Chemistry", "Mathematics", "Physics", "General"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Assign To</label>
            <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] appearance-none"
              value={form.assignTo} onChange={(e) => setForm({ ...form, assignTo: e.target.value })}>
              {["All Students", "Grade 10 Biology", "Grade 11 Biology", "Grade 12 Biology"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Due Date</label>
            <input type="date" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
              value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Marks</label>
            <input type="number" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493]"
              value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Instructions / Prompt</h3>
        <textarea rows={6} placeholder="Write the full assignment prompt, question, or instructions here. Students will see exactly this text when they open the assignment..."
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] resize-y transition-all"
          value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
        
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rubric / Grading Guide (optional)</label>
          <textarea rows={3} placeholder="Describe how you will grade this assignment e.g. 20 marks for structure, 40 marks for content accuracy..."
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#006493] resize-y transition-all"
            value={form.rubric} onChange={(e) => setForm({ ...form, rubric: e.target.value })} />
        </div>
      </div>

      {/* Submission type */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Submission Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {(["text", "file", "both"] as const).map((type) => (
            <button key={type} onClick={() => setForm({ ...form, submissionType: type })}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${form.submissionType === type ? "border-[#006493] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
              <span className={`material-symbols-outlined text-[24px] ${form.submissionType === type ? "text-[#006493]" : "text-slate-400"}`}>
                {type === "text" ? "text_fields" : type === "file" ? "upload_file" : "layers"}
              </span>
              <p className={`text-[11px] font-bold capitalize ${form.submissionType === type ? "text-[#006493]" : "text-slate-500"}`}>
                {type === "both" ? "Text + File" : type}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-4 p-3.5 bg-slate-50 rounded-xl">
          <p className="text-[11px] text-slate-500 font-medium">
            {form.submissionType === "text" && "Students will write their response directly in the text editor provided."}
            {form.submissionType === "file" && "Students will upload a PDF, Word document, or other file as their submission."}
            {form.submissionType === "both" && "Students can either write directly in the text editor or upload a file — their choice."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentBuilder;
