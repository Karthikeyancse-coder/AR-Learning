import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STUDENTS = [
  { id: "S001", name: "Kavya Reddy", course: "Gr 11 Bio", response: "Photosynthesis is the biochemical process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. The process primarily occurs in the chloroplasts, specifically within the thylakoid membranes and the stroma. In the light-dependent reactions...", submittedAt: "Mar 22, 7:00 PM", status: "submitted" },
  { id: "S002", name: "Aanya Sharma", course: "Gr 11 Bio", response: "The process of photosynthesis involves two main stages: the light reactions and the Calvin cycle. During light reactions, chlorophyll absorbs solar energy and uses it to produce ATP and NADPH while splitting water molecules and releasing oxygen. In the Calvin cycle...", submittedAt: "Mar 24, 10:12 AM", status: "submitted" },
];

const AssignmentReview = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);

  const student = STUDENTS[idx];

  const handleGrade = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/teacher/submissions")} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-[#181c22]">Assignment Review</h1>
            <p className="text-[11px] text-slate-400">Photosynthesis Research Essay · {student.name}</p>
          </div>
        </div>
        {/* Prev / Next nav */}
        <div className="flex items-center gap-2">
          <button onClick={() => { setIdx(Math.max(0, idx - 1)); setMarks(""); setFeedback(""); }}
            disabled={idx === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40 transition-colors">
            <span className="material-symbols-outlined text-[16px]">navigate_before</span> Prev
          </button>
          <span className="text-[11px] font-bold text-slate-400">{idx + 1} / {STUDENTS.length}</span>
          <button onClick={() => { setIdx(Math.min(STUDENTS.length - 1, idx + 1)); setMarks(""); setFeedback(""); }}
            disabled={idx === STUDENTS.length - 1}
            className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40 transition-colors">
            Next <span className="material-symbols-outlined text-[16px]">navigate_next</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student response */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#181c22] text-[14px]">{student.name}</p>
                  <p className="text-[10px] text-slate-400">{student.course} · Submitted {student.submittedAt}</p>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">Submitted</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 text-[13px] leading-7 text-[#374151] font-medium whitespace-pre-wrap border border-slate-100">
              {student.response}
            </div>
          </div>

          {/* File upload placeholder */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">insert_drive_file</span>
              <p className="text-[12px] font-bold text-slate-500">No file attachment uploaded</p>
            </div>
          </div>
        </div>

        {/* Grading panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-5">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Grade & Feedback</h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Marks Awarded</label>
              <div className="relative">
                <input type="number" placeholder="0" max="100"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-2xl font-black text-[#181c22] focus:outline-none focus:border-[#006493] text-center"
                  value={marks} onChange={(e) => setMarks(e.target.value)} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">/ 100</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Feedback / Comments</label>
              <textarea rows={5} placeholder="Great work on explaining the light reactions. Consider elaborating more on the Calvin cycle..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:border-[#006493] resize-none"
                value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <div className="space-y-2">
              <button onClick={handleGrade} className={`w-full py-3.5 font-bold rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 shadow-sm ${saved ? "bg-emerald-500 text-white" : "bg-[#006493] text-white hover:bg-blue-700"}`}>
                <span className="material-symbols-outlined text-[18px]">{saved ? "check_circle" : "grade"}</span>
                {saved ? "Graded!" : "Submit Grade"}
              </button>
              <button className="w-full py-3 font-bold rounded-xl text-[13px] bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">replay</span>
                Return for Resubmission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentReview;
