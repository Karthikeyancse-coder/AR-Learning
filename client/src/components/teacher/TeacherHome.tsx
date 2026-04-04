import { useNavigate, useOutletContext } from "react-router-dom";

const completionRateStr = "81%";
const onTimeRateStr = "68%";

const STAT_CARDS = [
  { label: "Students", value: "248", icon: "groups", lightColor: "bg-blue-50 text-[#006493]", darkColor: "bg-blue-500/10 text-blue-400" },
  { label: "Quizzes", value: "07", icon: "quiz", lightColor: "bg-indigo-50 text-indigo-600", darkColor: "bg-indigo-500/10 text-indigo-400" },
  { label: "Reviews", value: "34", icon: "rate_review", lightColor: "bg-amber-50 text-amber-600", darkColor: "bg-amber-500/10 text-amber-400" },
  { label: "On-Time", value: onTimeRateStr, icon: "timer", lightColor: "bg-emerald-50 text-emerald-600", darkColor: "bg-emerald-500/10 text-emerald-400" },
  { label: "Completion", value: completionRateStr, icon: "task_alt", lightColor: "bg-green-50 text-green-600", darkColor: "bg-green-500/10 text-green-400" },
  { label: "Flagged", value: "12", icon: "flag", lightColor: "bg-red-50 text-red-500", darkColor: "bg-red-500/10 text-red-400" },
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

const getStatusColor = (status: string, dark: boolean) => {
  if (dark) {
    return (
      {
        submitted: "bg-blue-500/10 text-blue-400",
        pending: "bg-amber-500/10 text-amber-400",
        graded: "bg-emerald-500/10 text-emerald-400",
        late: "bg-red-500/10 text-red-400",
      }[status] || ""
    );
  }
  return (
    {
      submitted: "bg-blue-100 text-blue-700",
      pending: "bg-amber-100 text-amber-700",
      graded: "bg-emerald-100 text-emerald-700",
      late: "bg-red-100 text-red-600",
    }[status] || ""
  );
};

const TeacherHome = () => {
  const navigate = useNavigate();
  const { dark } = useOutletContext<{ dark: boolean }>();

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7 xl:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((c) => (
          <div key={c.label} className={`relative rounded-2xl border p-3.5 sm:p-5 min-h-[110px] transition-all duration-200 group hover:scale-[1.02] ${
            dark 
                ? `bg-[#1e293b] border-slate-700 hover:border-slate-600` 
                : `bg-white border-slate-100 hover:border-[#006493]/20`
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${dark ? c.darkColor : c.lightColor}`}>
              <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
            </div>
            <p className={`text-xl sm:text-2xl font-semibold leading-tight ${dark ? "text-white" : "text-[#181c22]"}`}>{c.value}</p>
            <p className={`text-[10px] font-medium uppercase tracking-widest mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis ${dark ? "text-slate-500" : "text-slate-400"}`}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* ── Middle Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Tasks */}
        <div className={`rounded-2xl border p-6 transition-all duration-300 hover:border-[#006493]/20 ${
            dark 
                ? "bg-[#1e293b] border-slate-700" 
                : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center justify-between mb-5">
            <h3 className={`text-[13px] font-black uppercase tracking-widest ${dark ? "text-white" : "text-[#181c22]"}`}>Today's Live Tasks</h3>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-4">
            {LIVE_TASKS.map((t) => (
              <div key={t.title} className={`p-4 rounded-2xl ${dark ? "bg-slate-800/50" : "bg-slate-50"}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className={`text-[13px] font-bold ${dark ? "text-white" : "text-[#181c22]"}`}>{t.title}</p>
                    <p className={`text-[11px] mt-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>Due: {t.due}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold shrink-0 ${
                    t.type === "quiz" 
                        ? (dark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-100 text-indigo-700") 
                        : (dark ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-700")
                  }`}>
                    {t.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-200"}`}>
                    <div className="h-full bg-[#006493] rounded-full transition-all" style={{ width: `${(t.attempted / t.total) * 100}%` }}></div>
                  </div>
                  <span className={`text-[11px] font-bold shrink-0 ${dark ? "text-slate-400" : "text-slate-500"}`}>{t.attempted}/{t.total}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/teacher/courses")} className="w-full mt-4 py-2.5 text-xs font-bold text-[#006493] hover:bg-[#006493]/10 rounded-xl transition-colors">
            View All Tasks →
          </button>
        </div>

        {/* Participation Trend */}
        <div className={`rounded-2xl border p-6 transition-all duration-300 hover:border-[#006493]/20 ${
            dark 
                ? "bg-[#1e293b] border-slate-700" 
                : "bg-white border-slate-100"
        }`}>
          <h3 className={`text-[13px] font-black uppercase tracking-widest mb-6 ${dark ? "text-white" : "text-[#181c22]"}`}>Participation Trend</h3>
          <div className="flex justify-center items-end gap-6 h-32 px-1 mb-4">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 max-w-[42px] flex flex-col items-center gap-2 h-full group relative cursor-pointer">
                <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full relative rounded-t-lg transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:-translate-y-1"
                      style={{ height: `${h}%`, background: i === 5 ? "#006493" : i === 6 ? "#c4c0ff" : dark ? "#334155" : "#e2e8f0" }}
                    >
                      {/* Hover text removed to prevent unwanted popups */}
                    </div>
                </div>
                <span className={`text-[9px] font-bold transition-colors ${dark ? "text-slate-500 group-hover:text-white" : "text-slate-400 group-hover:text-[#181c22]"}`}>{BAR_DAYS[i]}</span>
              </div>
            ))}
          </div>
          <div className={`flex items-center justify-between text-[11px] font-medium border-t pt-4 ${dark ? "text-slate-400 border-slate-700" : "text-slate-400 border-slate-50"}`}>
            <span>Weekly avg: <strong className={dark ? "text-[#c4c0ff]" : "text-[#006493]"}>66%</strong></span>
            <span>↑ 4% from last week</span>
          </div>
        </div>

        {/* Score Distribution */}
        <div className={`rounded-2xl border p-6 transition-all duration-300 hover:border-[#006493]/20 ${
            dark 
                ? "bg-[#1e293b] border-slate-700" 
                : "bg-white border-slate-100"
        }`}>
          <h3 className={`text-[13px] font-black uppercase tracking-widest mb-6 ${dark ? "text-white" : "text-[#181c22]"}`}>Score Distribution</h3>
          <div className="flex items-center justify-center mb-5">
            <svg viewBox="0 0 120 120" className="w-28 h-28">
              <circle cx="60" cy="60" r="50" fill="none" stroke={dark ? "#334155" : "#f1f5f9"} strokeWidth="14" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#006493" strokeWidth="14"
                className="transition-all duration-300 hover:stroke-[16px]"
                strokeDasharray={`${2 * Math.PI * 50 * 0.22} ${2 * Math.PI * 50 * 0.78}`}
                strokeDashoffset={2 * Math.PI * 50 * 0.25} strokeLinecap="round">
              </circle>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="14"
                className="transition-all duration-300 hover:stroke-[16px]"
                strokeDasharray={`${2 * Math.PI * 50 * 0.45} ${2 * Math.PI * 50 * 0.55}`}
                strokeDashoffset={-2 * Math.PI * 50 * (1 - 0.25 - 0.22)} strokeLinecap="round">
              </circle>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14"
                className="transition-all duration-300 hover:stroke-[16px]"
                strokeDasharray={`${2 * Math.PI * 50 * 0.33} ${2 * Math.PI * 50 * 0.67}`}
                strokeDashoffset={-2 * Math.PI * 50 * (1 - 0.25 - 0.22 - 0.45)} strokeLinecap="round">
              </circle>
              <text x="60" y="63" textAnchor="middle" fill={dark ? "white" : "#181c22"} fontSize="16" fontWeight="800">24/7</text>
              <text x="60" y="75" textAnchor="middle" fill={dark ? "#94a3b8" : "#94a3b8"} fontSize="8">engagement</text>
            </svg>
          </div>
          <div className="space-y-2">
            {DONUT_BANDS.map((b) => (
              <div key={b.label} className={`flex items-center justify-between group cursor-pointer p-1.5 -mx-1.5 rounded-lg transition-colors ${
                  dark ? "hover:bg-slate-800" : "hover:bg-slate-50"
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ background: b.color }}></div>
                  <span className={`text-[11px] font-medium transition-colors ${dark ? "text-slate-400 group-hover:text-white" : "text-slate-600 group-hover:text-[#181c22]"}`}>{b.label}</span>
                </div>
                <span className={`text-[11px] font-bold ${dark ? "text-slate-200" : "text-slate-800"}`}>{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className={`lg:col-span-2 rounded-2xl border p-6 transition-all duration-300 hover:border-[#006493]/20 ${
            dark 
                ? "bg-[#1e293b] border-slate-700" 
                : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center justify-between mb-5">
            <h3 className={`text-[13px] font-black uppercase tracking-widest ${dark ? "text-white" : "text-[#181c22]"}`}>Recent Submissions</h3>
            <button onClick={() => navigate("/teacher/submissions")} className="text-[11px] font-bold text-[#006493] hover:underline">View All</button>
          </div>
          <div className="space-y-1">
            {RECENT_SUBMISSIONS.map((s, i) => (
              <div key={i} className={`flex items-center justify-between py-3 border-b last:border-0 ${dark ? "border-slate-800" : "border-slate-50"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-[13px] font-bold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{s.name}</p>
                    <p className={`text-[10px] ${dark ? "text-slate-500" : "text-slate-400"}`}>{s.task} · {s.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold ${dark ? "text-slate-300" : "text-slate-600"}`}>{s.score}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold w-20 text-center ${getStatusColor(s.status, dark)}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Students */}
        <div className={`rounded-2xl border p-6 ${
            dark 
                ? "bg-[#1e293b] border-red-900/40 shadow-[0_2px_20px_rgba(239,68,68,0.02)]" 
                : "bg-white border-red-100 shadow-[0_2px_12px_rgba(239,68,68,0.04)]"
        }`}>
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-red-500 text-[20px]">warning</span>
            <h3 className={`text-[13px] font-black uppercase tracking-widest ${dark ? "text-white" : "text-[#181c22]"}`}>Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {FLAGGED.map((f, i) => (
              <div key={i} className={`p-3.5 rounded-2xl ${dark ? "bg-red-500/5 text-red-200" : "bg-red-50"}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-[13px] font-bold ${dark ? "text-white" : "text-[#181c22]"}`}>{f.name}</p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${dark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"}`}>{f.band}</span>
                </div>
                <p className={`text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}>{f.reason}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/teacher/insights")} className={`w-full mt-4 py-2.5 text-xs font-bold rounded-xl transition-colors ${
              dark ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-50"
          }`}>
            View All Insights →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
