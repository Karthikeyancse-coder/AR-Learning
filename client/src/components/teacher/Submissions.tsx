import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const SUBMISSIONS = [
  { name: "Aanya Sharma", id: "S001", course: "Gr 11 Biology", status: "submitted", submittedAt: "Mar 24, 10:12 AM", score: "—", task: "Photosynthesis Essay" },
  { name: "Rahul Menon", id: "S002", course: "Gr 11 Biology", status: "pending", submittedAt: "—", score: "—", task: "Photosynthesis Essay" },
  { name: "Priya Nair", id: "S003", course: "Gr 11 Biology", status: "graded", submittedAt: "Mar 23, 4:55 PM", score: "82/100", task: "Photosynthesis Essay" },
  { name: "Dev Patel", id: "S004", course: "Gr 11 Biology", status: "late", submittedAt: "Mar 24, 02:31 AM", score: "—", task: "Photosynthesis Essay" },
  { name: "Kavya Reddy", id: "S005", course: "Gr 11 Biology", status: "graded", submittedAt: "Mar 22, 7:00 PM", score: "91/100", task: "Photosynthesis Essay" },
  { name: "Arjun Singh", id: "S006", course: "Gr 11 Biology", status: "missed", submittedAt: "—", score: "—", task: "Photosynthesis Essay" },
  { name: "Meera Iyer", id: "S007", course: "Gr 11 Biology", status: "submitted", submittedAt: "Mar 24, 9:44 AM", score: "—", task: "Photosynthesis Essay" },
];

const getStatusColor = (status: string, dark: boolean) => {
  if (dark) {
    return {
      submitted: "bg-blue-500/10 text-blue-400",
      pending: "bg-amber-500/10 text-amber-400",
      graded: "bg-emerald-500/10 text-emerald-400",
      late: "bg-orange-500/10 text-orange-400",
      missed: "bg-red-500/10 text-red-400",
    }[status] || "";
  }
  return {
    submitted: "bg-blue-100 text-blue-700",
    pending: "bg-amber-100 text-amber-700",
    graded: "bg-emerald-100 text-emerald-700",
    late: "bg-orange-100 text-orange-700",
    missed: "bg-red-100 text-red-600",
  }[status] || "";
};

const Submissions = () => {
  const navigate = useNavigate();
  const { dark } = useOutletContext<{ dark: boolean }>();
  const [filter, setFilter] = useState("all");
  
  const summary = [
    { label: "Total Assigned", value: SUBMISSIONS.length, lightColor: "text-[#181c22]", darkColor: "text-white" },
    { label: "Submitted", value: SUBMISSIONS.filter(s => ["submitted", "late"].includes(s.status)).length, lightColor: "text-blue-600", darkColor: "text-blue-400" },
    { label: "Graded", value: SUBMISSIONS.filter(s => s.status === "graded").length, lightColor: "text-emerald-600", darkColor: "text-emerald-400" },
    { label: "Pending", value: SUBMISSIONS.filter(s => s.status === "pending").length, lightColor: "text-amber-600", darkColor: "text-amber-400" },
    { label: "Missed", value: SUBMISSIONS.filter(s => s.status === "missed").length, lightColor: "text-red-600", darkColor: "text-red-400" },
  ];

  const filtered = SUBMISSIONS.filter(s => filter === "all" || s.status === filter);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center gap-3">
        <div>
          <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Student Submissions</h1>
          <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Photosynthesis Research Essay · Grade 11 Biology</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summary.map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center transition-colors ${
              dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}>
            <p className={`text-2xl font-black ${dark ? s.darkColor : s.lightColor}`}>{s.value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {["all", "submitted", "graded", "pending", "late", "missed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold capitalize transition-colors ${
              filter === f 
                ? "bg-[#006493] text-white" 
                : (dark ? "bg-[#1e293b] border border-slate-700 text-slate-400 hover:bg-slate-700" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50")
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-auto ${
          dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      }`}>
        <table className="w-full text-[12px]">
          <thead>
            <tr className={`border-b ${dark ? "border-slate-700" : "border-slate-100"}`}>
              {["Student", "ID", "Course", "Status", "Submitted At", "Score", "Actions"].map(h => (
                <th key={h} className={`px-5 py-4 text-left font-black uppercase tracking-widest whitespace-nowrap ${dark ? "text-slate-500" : "text-slate-400"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className={`border-b last:border-0 transition-colors ${
                  dark ? "border-slate-700/50 hover:bg-slate-700/30" : "border-slate-50 hover:bg-slate-50/60"
              }`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <span className={`font-bold whitespace-nowrap ${dark ? "text-slate-100" : "text-[#181c22]"}`}>{s.name}</span>
                  </div>
                </td>
                <td className={`px-5 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-400"}`}>{s.id}</td>
                <td className={`px-5 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.course}</td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold capitalize w-max block ${getStatusColor(s.status, dark)}`}>{s.status}</span></td>
                <td className={`px-5 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.submittedAt}</td>
                <td className={`px-5 py-4 font-bold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{s.score}</td>
                <td className="px-5 py-4 min-w-[120px]">
                  <button onClick={() => navigate("/teacher/review")}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                      ["submitted", "late"].includes(s.status) 
                        ? (dark ? "text-[#38bdf8] hover:bg-[#38bdf8]/10" : "text-[#006493] hover:bg-blue-50") 
                        : s.status === "graded" 
                          ? (dark ? "text-emerald-400 hover:bg-emerald-500/10" : "text-emerald-600 hover:bg-emerald-50") 
                          : "text-slate-500 cursor-default"
                    }`}>
                    {["submitted", "late"].includes(s.status) ? "Review →" : s.status === "graded" ? "Edit Grade" : "—"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className={`p-12 text-center font-medium text-sm border-t ${dark ? "text-slate-500 border-slate-700" : "text-slate-400 border-slate-100"}`}>
            No students found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
