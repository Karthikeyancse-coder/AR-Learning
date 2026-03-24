import { useState } from "react";

const CLASSIFICATIONS = [
  { band: "Top Performer", icon: "emoji_events", color: "bg-blue-50 border-blue-100", iconColor: "text-[#006493]", badge: "bg-blue-100 text-blue-700",
    criteria: "Avg score > 85%, participation > 90%",
    students: [{ name: "Kavya Reddy", score: 91, pct: 100 }]
  },
  { band: "Consistent Learner", icon: "verified", color: "bg-emerald-50 border-emerald-100", iconColor: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700",
    criteria: "Participation > 80%, completion > 75%",
    students: [{ name: "Aanya Sharma", score: 83, pct: 90 }]
  },
  { band: "Average", icon: "trending_flat", color: "bg-indigo-50 border-indigo-100", iconColor: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700",
    criteria: "50–75% avg score, regular participation",
    students: [{ name: "Priya Nair", score: 72, pct: 80 }]
  },
  { band: "At Risk", icon: "priority_high", color: "bg-amber-50 border-amber-100", iconColor: "text-amber-600", badge: "bg-amber-100 text-amber-700",
    criteria: "Avg score < 50% OR missed 2+ tasks",
    students: [
      { name: "Meera Iyer", score: 48, pct: 60 },
      { name: "Dev Patel", score: 39, pct: 40 },
    ]
  },
  { band: "Low Engagement", icon: "signal_disconnected", color: "bg-orange-50 border-orange-100", iconColor: "text-orange-600", badge: "bg-orange-100 text-orange-700",
    criteria: "Attempted < 40% of assigned tasks",
    students: [{ name: "Rahul Menon", score: 32, pct: 30 }]
  },
  { band: "Needs Intervention", icon: "warning", color: "bg-red-50 border-red-100", iconColor: "text-red-500", badge: "bg-red-100 text-red-600",
    criteria: "Missing 3+ tasks or score < 30%",
    students: [{ name: "Arjun Singh", score: 18, pct: 10 }]
  },
];

const StudentInsights = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div>
        <h1 className="text-xl font-black text-[#181c22]">Student Classification & Insights</h1>
        <p className="text-[12px] text-slate-400 mt-0.5">Intelligent grouping based on performance, participation, and engagement</p>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Classification System</h3>
        <div className="flex flex-wrap gap-2">
          {CLASSIFICATIONS.map((c) => (
            <button key={c.band} onClick={() => setSelected(selected === c.band ? null : c.band)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${selected === c.band ? "ring-2 ring-offset-1 ring-[#006493]" : "hover:opacity-80"} ${c.badge}`}>
              {c.students.length} · {c.band}
            </button>
          ))}
        </div>
      </div>

      {/* Classification cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CLASSIFICATIONS.filter(c => selected === null || c.band === selected).map((group) => (
          <div key={group.band} className={`bg-white rounded-2xl border p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all ${group.color} ${selected === group.band ? "ring-2 ring-[#006493]" : ""}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 ${group.color.replace("bg-", "bg-")} rounded-xl flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-[20px] ${group.iconColor}`}>{group.icon}</span>
                </div>
                <div>
                  <p className="text-[13px] font-black text-[#181c22]">{group.band}</p>
                  <p className="text-[9px] text-slate-400 font-medium mt-0.5">{group.students.length} student{group.students.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${group.badge}`}>{group.band}</span>
            </div>

            <p className="text-[10px] text-slate-500 font-medium mb-4 leading-relaxed">{group.criteria}</p>

            <div className="space-y-3">
              {group.students.map((s) => (
                <div key={s.name} className="flex items-center justify-between bg-white/70 p-3 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <p className="text-[12px] font-bold text-[#181c22]">{s.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.score >= 70 ? "#006493" : s.score >= 50 ? "#f59e0b" : "#ef4444" }}></div>
                    </div>
                    <span className={`text-[11px] font-black ${s.score >= 70 ? "text-[#006493]" : s.score >= 50 ? "text-amber-600" : "text-red-500"}`}>{s.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 text-[11px] font-bold text-center rounded-xl bg-white/60 hover:bg-white transition-colors text-slate-500 hover:text-[#181c22]">
              View All → 
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Send Reminder to At-Risk", icon: "notifications_active", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Create Remedial Quiz for Low Engagement", icon: "quiz", color: "bg-red-50 text-red-600 border-red-200" },
            { label: "Share Advanced Content with Top Performers", icon: "star", color: "bg-blue-50 text-blue-700 border-blue-200" },
          ].map((a) => (
            <button key={a.label} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-[12px] font-bold text-left transition-all hover:shadow-sm ${a.color}`}>
              <span className="material-symbols-outlined text-[20px] shrink-0">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInsights;
