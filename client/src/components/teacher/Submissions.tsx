import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUBMISSIONS = [
  { name: "Aanya Sharma", id: "S001", course: "Gr 11 Biology", status: "submitted", submittedAt: "Mar 24, 10:12 AM", score: "—", task: "Photosynthesis Essay" },
  { name: "Rahul Menon", id: "S002", course: "Gr 11 Biology", status: "pending", submittedAt: "—", score: "—", task: "Photosynthesis Essay" },
  { name: "Priya Nair", id: "S003", course: "Gr 11 Biology", status: "graded", submittedAt: "Mar 23, 4:55 PM", score: "82/100", task: "Photosynthesis Essay" },
  { name: "Dev Patel", id: "S004", course: "Gr 11 Biology", status: "late", submittedAt: "Mar 24, 02:31 AM", score: "—", task: "Photosynthesis Essay" },
  { name: "Kavya Reddy", id: "S005", course: "Gr 11 Biology", status: "graded", submittedAt: "Mar 22, 7:00 PM", score: "91/100", task: "Photosynthesis Essay" },
  { name: "Arjun Singh", id: "S006", course: "Gr 11 Biology", status: "missed", submittedAt: "—", score: "—", task: "Photosynthesis Essay" },
  { name: "Meera Iyer", id: "S007", course: "Gr 11 Biology", status: "submitted", submittedAt: "Mar 24, 9:44 AM", score: "—", task: "Photosynthesis Essay" },
];

const statusColor: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  graded: "bg-emerald-100 text-emerald-700",
  late: "bg-orange-100 text-orange-700",
  missed: "bg-red-100 text-red-600",
};

const Submissions = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const summary = [
    { label: "Total Assigned", value: SUBMISSIONS.length, color: "text-[#181c22]" },
    { label: "Submitted", value: SUBMISSIONS.filter(s => ["submitted", "late"].includes(s.status)).length, color: "text-blue-600" },
    { label: "Graded", value: SUBMISSIONS.filter(s => s.status === "graded").length, color: "text-emerald-600" },
    { label: "Pending", value: SUBMISSIONS.filter(s => s.status === "pending").length, color: "text-amber-600" },
    { label: "Missed", value: SUBMISSIONS.filter(s => s.status === "missed").length, color: "text-red-600" },
  ];

  const filtered = SUBMISSIONS.filter(s => filter === "all" || s.status === filter);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-black text-[#181c22]">Student Submissions</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">Photosynthesis Research Essay · Grade 11 Biology</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {["all", "submitted", "graded", "pending", "late", "missed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold capitalize transition-colors ${filter === f ? "bg-[#006493] text-white" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-slate-100">
              {["Student", "ID", "Course", "Status", "Submitted At", "Score", "Actions"].map(h => (
                <th key={h} className="px-5 py-4 text-left font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <span className="font-bold text-[#181c22]">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-400 font-medium">{s.id}</td>
                <td className="px-5 py-4 text-slate-500 font-medium">{s.course}</td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold capitalize ${statusColor[s.status]}`}>{s.status}</span></td>
                <td className="px-5 py-4 text-slate-500 font-medium">{s.submittedAt}</td>
                <td className="px-5 py-4 font-bold text-[#181c22]">{s.score}</td>
                <td className="px-5 py-4">
                  <button onClick={() => navigate("/teacher/review")}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors ${["submitted", "late"].includes(s.status) ? "text-[#006493] hover:bg-blue-50" : s.status === "graded" ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 cursor-default"}`}>
                    {["submitted", "late"].includes(s.status) ? "Review →" : s.status === "graded" ? "Edit Grade" : "—"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
