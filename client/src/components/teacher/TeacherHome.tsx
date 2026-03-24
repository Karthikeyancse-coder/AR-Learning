import { useNavigate } from "react-router-dom";

const STAT_CARDS = [
  { label: "Total Students", value: "248", icon: "groups", color: "bg-blue-50 text-[#006493]", border: "border-blue-100" },
  { label: "Active Quizzes", value: "07", icon: "quiz", color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" },
  { label: "Pending Reviews", value: "34", icon: "rate_review", color: "bg-amber-50 text-amber-600", border: "border-amber-100" },
  { label: "Avg Score", value: "72%", icon: "trending_up", color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
  { label: "Completion Rate", value: "81%", icon: "task_alt", color: "bg-green-50 text-green-600", border: "border-green-100" },
  { label: "Flagged Students", value: "12", icon: "flag", color: "bg-red-50 text-red-500", border: "border-red-100" },
];

const RECENT_SUBMISSIONS = [
  { name: "Aanya Sharma", task: "Cell Theory Quiz", time: "2 mins ago", score: "18/20", status: "submitted" },
  { name: "Rahul Menon", task: "Photosynthesis Assignment", time: "14 mins ago", score: "—", status: "pending" },
  { name: "Priya Nair", task: "DNA Structure Quiz", time: "38 mins ago", score: "14/20", status: "graded" },
  { name: "Dev Patel", task: "Photosynthesis Assignment", time: "1 hr ago", score: "—", status: "late" },
  { name: "Kavya Reddy", task: "Cell Theory Quiz", time: "2 hrs ago", score: "20/20", status: "graded" },
];

const FLAGGED = [
  { name: "Arjun Singh", reason: "Missed 3 tasks", band: "Low Engagement" },
  { name: "Meera Iyer", reason: "Score < 35% on 2 quizzes", band: "At Risk" },
  { name: "Nikhil Das", reason: "No submissions this week", band: "Needs Intervention" },
];

const LIVE_TASKS = [
  { title: "Cell Theory MCQ Quiz", due: "Today 6:00 PM", attempted: 38, total: 52, type: "quiz" },
  { title: "Genetics Assignment", due: "Tomorrow 11:59 PM", attempted: 21, total: 52, type: "assignment" },
];

const BARS = [40, 65, 55, 80, 70, 90, 60];
const BAR_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DONUT_BANDS = [
  { label: "Top (>85%)", pct: 22, color: "#006493" },
  { label: "Average", pct: 45, color: "#6366f1" },
  { label: "At Risk (<50%)", pct: 33, color: "#ef4444" },
];

const statusColor: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  graded: "bg-emerald-100 text-emerald-700",
  late: "bg-red-100 text-red-600",
};

const TeacherHome = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAT_CARDS.map((c) => (
          <div key={c.label} className={`bg-white rounded-2xl border ${c.border} p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow`}>
            <div className={`w-9 h-9 ${c.color} rounded-xl flex items-center justify-center mb-3`}>
              <span className="material-symbols-outlined text-[18px]">{c.icon}</span>
            </div>
            <p className="text-2xl font-black text-[#181c22]">{c.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* ── Middle Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Tasks */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-black text-[#181c22] uppercase tracking-widest">Today's Live Tasks</h3>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-4">
            {LIVE_TASKS.map((t) => (
              <div key={t.title} className="p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#181c22]">{t.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Due: {t.due}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold shrink-0 ${t.type === "quiz" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>
                    {t.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006493] rounded-full transition-all" style={{ width: `${(t.attempted / t.total) * 100}%` }}></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 shrink-0">{t.attempted}/{t.total}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/teacher/quizzes")} className="w-full mt-4 py-2.5 text-xs font-bold text-[#006493] hover:bg-blue-50 rounded-xl transition-colors">
            View All Tasks →
          </button>
        </div>

        {/* Participation Trend */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[13px] font-black text-[#181c22] uppercase tracking-widest mb-6">Participation Trend</h3>
          <div className="flex items-end justify-between gap-2 h-28 px-1 mb-4">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[6px] transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${h}%`, background: i === 5 ? "#006493" : i === 6 ? "#c4c0ff" : "#e2e8f0" }}
                ></div>
                <span className="text-[9px] font-bold text-slate-400">{BAR_DAYS[i]}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Weekly avg: <strong className="text-[#006493]">66%</strong></span>
            <span>↑ 4% from last week</span>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[13px] font-black text-[#181c22] uppercase tracking-widest mb-6">Score Distribution</h3>
          <div className="flex items-center justify-center mb-5">
            <svg viewBox="0 0 120 120" className="w-28 h-28">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#006493" strokeWidth="14"
                strokeDasharray={`${2 * Math.PI * 50 * 0.22} ${2 * Math.PI * 50 * 0.78}`}
                strokeDashoffset={2 * Math.PI * 50 * 0.25} strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="14"
                strokeDasharray={`${2 * Math.PI * 50 * 0.45} ${2 * Math.PI * 50 * 0.55}`}
                strokeDashoffset={-2 * Math.PI * 50 * (1 - 0.25 - 0.22)} strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14"
                strokeDasharray={`${2 * Math.PI * 50 * 0.33} ${2 * Math.PI * 50 * 0.67}`}
                strokeDashoffset={-2 * Math.PI * 50 * (1 - 0.25 - 0.22 - 0.45)} strokeLinecap="round" />
              <text x="60" y="63" textAnchor="middle" className="text-xs" fill="#181c22" fontSize="14" fontWeight="800">72%</text>
              <text x="60" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">avg score</text>
            </svg>
          </div>
          <div className="space-y-2">
            {DONUT_BANDS.map((b) => (
              <div key={b.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: b.color }}></div>
                  <span className="text-[11px] font-medium text-slate-600">{b.label}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-800">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-black text-[#181c22] uppercase tracking-widest">Recent Submissions</h3>
            <button onClick={() => navigate("/teacher/submissions")} className="text-[11px] font-bold text-[#006493] hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {RECENT_SUBMISSIONS.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#181c22]">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.task} · {s.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600">{s.score}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${statusColor[s.status]}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Students */}
        <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-[0_2px_12px_rgba(239,68,68,0.04)]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-red-500 text-[20px]">warning</span>
            <h3 className="text-[13px] font-black text-[#181c22] uppercase tracking-widest">Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {FLAGGED.map((f, i) => (
              <div key={i} className="p-3.5 bg-red-50 rounded-2xl">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[13px] font-bold text-[#181c22]">{f.name}</p>
                  <span className="text-[9px] px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">{f.band}</span>
                </div>
                <p className="text-[11px] text-slate-500">{f.reason}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/teacher/insights")} className="w-full mt-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            View All Insights →
          </button>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Create Quiz", icon: "quiz", color: "bg-[#006493] text-white shadow-[#006493]/20", to: "/teacher/quiz-builder" },
          { label: "Create Assignment", icon: "assignment", color: "bg-indigo-600 text-white shadow-indigo-600/20", to: "/teacher/assignment-builder" },
          { label: "Review Submissions", icon: "rate_review", color: "bg-white text-[#181c22] border border-slate-200 shadow-slate-100", to: "/teacher/submissions" },
          { label: "Student Insights", icon: "lightbulb", color: "bg-white text-[#181c22] border border-slate-200 shadow-slate-100", to: "/teacher/insights" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.to)}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-[13px] shadow-sm transition-all hover:scale-[1.02] active:scale-95 ${a.color}`}
          >
            <span className="material-symbols-outlined text-[20px]">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherHome;
