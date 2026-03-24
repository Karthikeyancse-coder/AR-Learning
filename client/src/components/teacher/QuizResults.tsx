import { useNavigate } from "react-router-dom";

const STUDENT_SCORES = [
  { name: "Kavya Reddy", score: 20, time: "18 min", status: "graded" },
  { name: "Aanya Sharma", score: 18, time: "22 min", status: "graded" },
  { name: "Priya Nair", score: 14, time: "25 min", status: "graded" },
  { name: "Dev Patel", score: 11, time: "30 min", status: "late" },
  { name: "Rahul Menon", score: 9, time: "28 min", status: "graded" },
  { name: "Meera Iyer", score: 17, time: "20 min", status: "graded" },
  { name: "Arjun Singh", score: 0, time: "—", status: "missed" },
];

const Q_CORRECTNESS = [
  { q: "Q1 - Cell wall function", pct: 92 },
  { q: "Q2 - Mitosis phases", pct: 75 },
  { q: "Q3 - DNA replication", pct: 58 },
  { q: "Q4 - Protein synthesis", pct: 43 },
  { q: "Q5 - Enzyme activity", pct: 67 },
];

const DIST = [
  { range: "0–25%", count: 1, color: "#ef4444" },
  { range: "26–50%", count: 2, color: "#f59e0b" },
  { range: "51–75%", count: 2, color: "#6366f1" },
  { range: "76–100%", count: 3, color: "#006493" },
];

const statusColor: Record<string, string> = {
  graded: "bg-emerald-100 text-emerald-700",
  late: "bg-orange-100 text-orange-700",
  missed: "bg-red-100 text-red-600",
};

const QuizResults = () => {
  const navigate = useNavigate();
  const attempted = STUDENT_SCORES.filter(s => s.status !== "missed").length;
  const avg = Math.round(STUDENT_SCORES.filter(s => s.status !== "missed").reduce((a, b) => a + b.score, 0) / attempted);
  const maxScore = Math.max(...STUDENT_SCORES.filter(s => s.status !== "missed").map(s => s.score));

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/teacher/quizzes")} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181c22]">Cell Theory MCQ — Results</h1>
          <p className="text-[11px] text-slate-400">Grade 11 Biology · Due Mar 25, 2026 · 20 marks total</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Average Score", value: `${avg}/20`, sub: `${Math.round((avg / 20) * 100)}%`, color: "text-[#006493]" },
          { label: "Highest Score", value: `${maxScore}/20`, sub: "Top performer", color: "text-emerald-600" },
          { label: "Attempted", value: `${attempted}/${STUDENT_SCORES.length}`, sub: "students", color: "text-indigo-600" },
          { label: "Completion Rate", value: `${Math.round((attempted / STUDENT_SCORES.length) * 100)}%`, sub: "of class", color: "text-amber-600" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <p className={`text-2xl font-black ${c.color}`}>{c.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{c.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question-wise correctness */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">Question-wise Correctness</h3>
          <div className="space-y-4">
            {Q_CORRECTNESS.map((q) => (
              <div key={q.q}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[12px] font-semibold text-[#181c22] truncate pr-4">{q.q}</p>
                  <span className={`text-[11px] font-black shrink-0 ${q.pct >= 70 ? "text-emerald-600" : q.pct >= 50 ? "text-amber-600" : "text-red-500"}`}>{q.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${q.pct}%`, background: q.pct >= 70 ? "#006493" : q.pct >= 50 ? "#f59e0b" : "#ef4444" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score distribution */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">Score Distribution</h3>
          <div className="flex items-end justify-around gap-2 h-32 px-2 mb-4">
            {DIST.map((d) => (
              <div key={d.range} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[11px] font-black" style={{ color: d.color }}>{d.count}</span>
                <div className="w-full rounded-t-xl" style={{ height: `${(d.count / 3) * 80}%`, background: d.color, opacity: 0.85 }}></div>
                <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">{d.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-student table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-auto">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Scores</h3>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-slate-50">
              {["Student", "Score", "Time Taken", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-left font-black text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENT_SCORES.map((s) => (
              <tr key={s.name} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">{s.name.charAt(0)}</div>
                    <span className="font-bold text-[#181c22]">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-black text-[#181c22]">
                  {s.status === "missed" ? <span className="text-slate-400">—</span> : `${s.score}/20`}
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-medium">{s.time}</td>
                <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full font-bold capitalize ${statusColor[s.status]}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizResults;
