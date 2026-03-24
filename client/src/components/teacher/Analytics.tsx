import { useOutletContext } from "react-router-dom";

const BARS = [55, 68, 60, 78, 72, 81, 65];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
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
  const { dark } = useOutletContext<{ dark: boolean }>();

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div>
        <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Class Analytics</h1>
        <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Grade 11 Biology · Academic overview</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Class Avg Score", value: "72%", icon: "query_stats", 
            lightColor: "text-[#006493]", darkColor: "text-blue-400", 
            lightBg: "bg-blue-50", darkBg: "bg-blue-500/10" 
          },
          { 
            label: "Participation Rate", value: "81%", icon: "groups", 
            lightColor: "text-indigo-600", darkColor: "text-indigo-400", 
            lightBg: "bg-indigo-50", darkBg: "bg-indigo-500/10" 
          },
          { 
            label: "Completion Rate", value: "78%", icon: "task_alt", 
            lightColor: "text-emerald-600", darkColor: "text-emerald-400", 
            lightBg: "bg-emerald-50", darkBg: "bg-emerald-500/10" 
          },
          { 
            label: "Avg Submission Time", value: "On-time", icon: "schedule", 
            lightColor: "text-amber-600", darkColor: "text-amber-400", 
            lightBg: "bg-amber-50", darkBg: "bg-amber-500/10" 
          },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl border p-5 transition-colors ${
              dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${dark ? c.darkBg : c.lightBg}`}>
              <span className={`material-symbols-outlined text-[18px] ${dark ? c.darkColor : c.lightColor}`}>{c.icon}</span>
            </div>
            <p className={`text-2xl font-black ${dark ? c.darkColor : c.lightColor}`}>{c.value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Trend */}
        <div className={`rounded-3xl border p-8 flex flex-col transition-colors ${
            dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        }`}>
          <h3 className={`text-[13px] font-black uppercase tracking-widest mb-10 ${dark ? "text-white" : "text-[#181c22]"}`}>
            Participation Trend
          </h3>
          
          <div className="flex justify-center items-end gap-2 md:gap-3 h-36 px-1">
            {BARS.map((h, i) => {
              // Saturday = 5 (Learn.AR Blue), Sunday = 6 (Lavender/Indigo)
              const isSat = i === 5;
              const isSun = i === 6;
              
              let barColor = "";
              if (isSat) {
                barColor = dark ? "#006493" : "#006493"; // brand blue
              } else if (isSun) {
                barColor = dark ? "#c7d2fe" : "#c7d2fe"; // lavender/light indigo
              } else {
                barColor = dark ? "#334155" : "#e2e8f0"; // generic muted slate
              }

              return (
                <div key={i} className="flex-1 max-w-[48px] flex flex-col items-center h-full group relative cursor-pointer">
                  <div className="w-full flex-1 relative mt-[10%]">
                    <div 
                      className="w-full absolute bottom-0 rounded-t-lg transition-all duration-300 ease-out group-hover:brightness-110 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:-translate-y-1" 
                      style={{ height: `${h}%`, background: barColor }}
                    >
                      {/* Tooltip */}
                      <div className={`absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap pointer-events-none ${
                          dark ? "bg-slate-800 text-white shadow-lg border border-slate-700" : "bg-slate-800 text-white shadow-md"
                      }`}>
                        {DAYS[i]}: {h}%
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold mt-4 transition-colors ${dark ? "text-slate-500 group-hover:text-white" : "text-slate-400 group-hover:text-[#181c22]"}`}>
                    {DAYS[i]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`mt-6 pt-5 border-t flex items-center justify-between transition-colors ${dark ? "border-slate-700" : "border-slate-100"}`}>
            <p className={`text-[13px] font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Weekly avg: <span className={`font-black ml-1 ${dark ? "text-[#c7d2fe]" : "text-indigo-600"}`}>66%</span>
            </p>
            <p className={`text-[12px] font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
              ↑ 4% from last week
            </p>
          </div>
        </div>

        {/* Subject Performance */}
        <div className={`rounded-2xl border p-6 transition-colors flex flex-col justify-center ${
            dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        }`}>
          <h3 className={`text-[11px] font-black uppercase tracking-widest mb-5 ${dark ? "text-slate-500" : "text-slate-400"}`}>Subject-wise Avg Performance</h3>
          <div className="space-y-4">
            {SUBJ_DATA.map((s) => (
              <div key={s.subject} className={`group cursor-pointer p-2 -mx-2 rounded-xl transition-colors ${
                  dark ? "hover:bg-slate-800" : "hover:bg-slate-50"
              }`}>
                <div className="flex items-center justify-between mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  <p className={`text-[12px] font-bold transition-colors ${dark ? "text-slate-300 group-hover:text-white" : "text-[#181c22]"}`}>{s.subject}</p>
                  <span className={`text-[11px] font-black transition-colors ${s.avg >= 70 ? (dark ? "text-blue-400 group-hover:text-blue-300" : "text-[#006493]") : s.avg >= 55 ? "text-amber-500 group-hover:text-amber-400" : "text-red-500 group-hover:text-red-400"}`}>{s.avg}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
                  <div className="h-full rounded-full transition-all duration-300 group-hover:brightness-110" style={{ width: `${s.pct}%`, background: s.avg >= 70 ? (dark ? "#0284c7" : "#006493") : s.avg >= 55 ? "#f59e0b" : "#ef4444" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top performers */}
        <div className={`rounded-2xl border p-6 transition-colors ${
            dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-emerald-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        }`}>
          <div className="flex items-center gap-2 mb-5">
            <span className={`material-symbols-outlined text-[18px] ${dark ? "text-emerald-400" : "text-emerald-500"}`}>emoji_events</span>
            <h3 className={`text-[11px] font-black uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>Top Performers</h3>
          </div>
          <div className="space-y-3">
            {TOP_STUDENTS.map((s, i) => (
              <div key={s.name} className={`flex items-center gap-3 p-3.5 rounded-2xl ${dark ? "bg-emerald-500/10" : "bg-emerald-50/60"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0 ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : "bg-amber-700"}`}>{i + 1}</div>
                <div className="flex-1">
                  <p className={`text-[13px] font-bold ${dark ? "text-white" : "text-[#181c22]"}`}>{s.name}</p>
                  <p className={`text-[10px] ${dark ? "text-slate-400" : "text-slate-400"}`}>Avg: {s.score}%</p>
                </div>
                <span className={`text-[11px] font-black ${dark ? "text-emerald-400" : "text-emerald-600"}`}>{s.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk */}
        <div className={`rounded-2xl border p-6 transition-colors ${
            dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-red-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        }`}>
          <div className="flex items-center gap-2 mb-5">
            <span className={`material-symbols-outlined text-[18px] ${dark ? "text-red-400" : "text-red-500"}`}>warning</span>
            <h3 className={`text-[11px] font-black uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>At-Risk Students</h3>
          </div>
          <div className="space-y-3">
            {AT_RISK.map((s) => (
              <div key={s.name} className={`p-3.5 rounded-2xl ${dark ? "bg-red-500/10" : "bg-red-50/60"}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-[13px] font-bold ${dark ? "text-white" : "text-[#181c22]"}`}>{s.name}</p>
                  <span className={`text-[11px] font-black ${dark ? "text-red-400" : "text-red-500"}`}>{s.score}%</span>
                </div>
                <p className={`text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
