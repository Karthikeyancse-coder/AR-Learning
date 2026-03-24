const BARS = [55, 68, 72, 60, 81, 78, 65];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SUBJ_DATA = [
  { subject: "Biology", avg: 72, pct: 72 },
  { subject: "Chemistry", avg: 65, pct: 65 },
  { subject: "Mathematics", avg: 58, pct: 58 },
  { subject: "Physics", avg: 70, pct: 70 },
];
const TOP_STUDENTS = [
  { name: "Kavya Reddy", score: 91, trend: "+4%" },
  { name: "Aanya Sharma", score: 83, trend: "+1%" },
  { name: "Priya Nair", score: 79, trend: "±0%" },
];
const AT_RISK = [
  { name: "Arjun Singh", score: 18, issue: "Missed 9 tasks" },
  { name: "Rahul Menon", score: 32, issue: "Low engagement" },
  { name: "Meera Iyer", score: 48, issue: "Struggling with quizzes" },
];

const Analytics = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div>
        <h1 className="text-xl font-black text-[#181c22]">Class Analytics</h1>
        <p className="text-[12px] text-slate-400 mt-0.5">Grade 11 Biology · Academic overview</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Class Avg Score", value: "72%", icon: "query_stats", color: "text-[#006493]", bg: "bg-blue-50" },
          { label: "Participation Rate", value: "81%", icon: "groups", color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Completion Rate", value: "78%", icon: "task_alt", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg Submission Time", value: "On-time", icon: "schedule", color: "text-amber-600", bg: "bg-amber-50" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className={`w-9 h-9 ${c.bg} rounded-xl flex items-center justify-center mb-3`}>
              <span className={`material-symbols-outlined text-[18px] ${c.color}`}>{c.icon}</span>
            </div>
            <p className={`text-2xl font-black ${c.color}`}>{c.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Trend */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Weekly Participation Trend</h3>
          <div className="flex items-end justify-between gap-2 h-32 px-1 mb-3">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold" style={{ color: i === 4 ? "#006493" : "#94a3b8" }}>{h}%</span>
                <div className="w-full rounded-t-[6px]" style={{ height: `${h}%`, background: i === 4 ? "#006493" : "#e2e8f0" }}></div>
                <span className="text-[9px] font-bold text-slate-400">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">Subject-wise Avg Performance</h3>
          <div className="space-y-4">
            {SUBJ_DATA.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[12px] font-bold text-[#181c22]">{s.subject}</p>
                  <span className={`text-[11px] font-black ${s.avg >= 70 ? "text-[#006493]" : s.avg >= 55 ? "text-amber-600" : "text-red-500"}`}>{s.avg}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.avg >= 70 ? "#006493" : s.avg >= 55 ? "#f59e0b" : "#ef4444" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top performers */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-emerald-500 text-[18px]">emoji_events</span>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {TOP_STUDENTS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3 p-3.5 bg-emerald-50/60 rounded-2xl">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0 ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : "bg-amber-700"}`}>{i + 1}</div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[#181c22]">{s.name}</p>
                  <p className="text-[10px] text-slate-400">Avg: {s.score}%</p>
                </div>
                <span className="text-[11px] font-black text-emerald-600">{s.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk */}
        <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">At-Risk Students</h3>
          </div>
          <div className="space-y-3">
            {AT_RISK.map((s) => (
              <div key={s.name} className="p-3.5 bg-red-50/60 rounded-2xl">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[13px] font-bold text-[#181c22]">{s.name}</p>
                  <span className="text-[11px] font-black text-red-500">{s.score}%</span>
                </div>
                <p className="text-[11px] text-slate-500">{s.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
