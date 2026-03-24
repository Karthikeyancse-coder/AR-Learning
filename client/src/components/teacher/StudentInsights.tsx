import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const CLASSIFICATIONS = [
  { band: "Top Performer", icon: "emoji_events", 
    color: { light: "bg-blue-50 border-blue-100", dark: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40" }, 
    iconBg: { light: "bg-blue-100", dark: "bg-blue-500/10" },
    iconColor: { light: "text-[#006493]", dark: "text-blue-400" }, 
    badge: { light: "bg-blue-100 text-blue-700", dark: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
    criteria: "Avg score > 85%, participation > 90%",
    students: [{ name: "Kavya Reddy", score: 91, pct: 100 }]
  },
  { band: "Consistent Learner", icon: "verified", 
    color: { light: "bg-emerald-50 border-emerald-100", dark: "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40" }, 
    iconBg: { light: "bg-emerald-100", dark: "bg-emerald-500/10" },
    iconColor: { light: "text-emerald-600", dark: "text-emerald-400" }, 
    badge: { light: "bg-emerald-100 text-emerald-700", dark: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    criteria: "Participation > 80%, completion > 75%",
    students: [{ name: "Aanya Sharma", score: 83, pct: 90 }]
  },
  { band: "Average", icon: "trending_flat", 
    color: { light: "bg-indigo-50 border-indigo-100", dark: "bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40" }, 
    iconBg: { light: "bg-indigo-100", dark: "bg-indigo-500/10" },
    iconColor: { light: "text-indigo-600", dark: "text-indigo-400" }, 
    badge: { light: "bg-indigo-100 text-indigo-700", dark: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" },
    criteria: "50–75% avg score, regular participation",
    students: [{ name: "Priya Nair", score: 72, pct: 80 }]
  },
  { band: "At Risk", icon: "priority_high", 
    color: { light: "bg-amber-50 border-amber-100", dark: "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40" }, 
    iconBg: { light: "bg-amber-100", dark: "bg-amber-500/10" },
    iconColor: { light: "text-amber-600", dark: "text-amber-400" }, 
    badge: { light: "bg-amber-100 text-amber-700", dark: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
    criteria: "Avg score < 50% OR missed 2+ tasks",
    students: [
      { name: "Meera Iyer", score: 48, pct: 60 },
      { name: "Dev Patel", score: 39, pct: 40 },
    ]
  },
  { band: "Low Engagement", icon: "signal_disconnected", 
    color: { light: "bg-orange-50 border-orange-100", dark: "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40" }, 
    iconBg: { light: "bg-orange-100", dark: "bg-orange-500/10" },
    iconColor: { light: "text-orange-600", dark: "text-orange-400" }, 
    badge: { light: "bg-orange-100 text-orange-700", dark: "bg-orange-500/10 text-orange-400 border border-orange-500/20" },
    criteria: "Attempted < 40% of assigned tasks",
    students: [{ name: "Rahul Menon", score: 32, pct: 30 }]
  },
  { band: "Needs Intervention", icon: "warning", 
    color: { light: "bg-red-50 border-red-100", dark: "bg-red-500/5 border-red-500/20 hover:border-red-500/40" }, 
    iconBg: { light: "bg-red-100", dark: "bg-red-500/10" },
    iconColor: { light: "text-red-500", dark: "text-red-400" }, 
    badge: { light: "bg-red-100 text-red-600", dark: "bg-red-500/10 text-red-400 border border-red-500/20" },
    criteria: "Missing 3+ tasks or score < 30%",
    students: [{ name: "Arjun Singh", score: 18, pct: 10 }]
  },
];

const StudentInsights = () => {
  const { dark } = useOutletContext<{ dark: boolean }>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  // Modal State for Recommendations
  const [modalType, setModalType] = useState<"reminder" | "advanced" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleActionClick = (actionLabel: string, route?: string) => {
    if (actionLabel === "Send Reminder to At-Risk") {
      setModalType("reminder");
    } else if (actionLabel === "Share Advanced Content with Top Performers") {
      setModalType("advanced");
    } else if (route) {
      navigate(route);
    }
  };

  const executeAction = (message: string) => {
    setModalType(null);
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400 relative" style={{ fontFamily: "Inter, sans-serif" }}>
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom border ${
          dark ? "bg-slate-800 border-slate-700 text-white" : "bg-[#181c22] border-slate-800 text-white"
        }`}>
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <p className="text-[13px] font-bold">{toastMessage}</p>
        </div>
      )}

      {/* Reminder Modal */}
      {modalType === "reminder" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-200"}`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${dark ? "border-slate-700 bg-slate-800/50" : "border-slate-100 bg-slate-50"}`}>
              <h3 className={`text-[14px] font-black flex items-center gap-2 ${dark ? "text-white" : "text-[#181c22]"}`}>
                <span className="material-symbols-outlined text-amber-500">notifications_active</span>
                Send Reminder to At-Risk
              </h3>
              <button onClick={() => setModalType(null)} className={`text-slate-400 hover:text-slate-200 transition-colors`}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`text-[12px] font-bold mb-2 block ${dark ? "text-slate-400" : "text-slate-500"}`}>Recipients (At Risk Students)</label>
                <div className={`p-3 rounded-xl flex flex-wrap gap-2 ${dark ? "bg-slate-800/50 border border-slate-700" : "bg-slate-50 border border-slate-200"}`}>
                  {CLASSIFICATIONS.find(c => c.band === "At Risk")?.students.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded-md text-[11px] font-bold ${dark ? "bg-slate-700 text-slate-200" : "bg-white border text-slate-600 shadow-sm"}`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-[12px] font-bold mb-2 block ${dark ? "text-slate-400" : "text-slate-500"}`}>Message</label>
                <textarea 
                  defaultValue="Hi there, I noticed you have some missed tasks and your recent quiz performance has been dropping. Let me know if you need help with the material before the upcoming deadline!"
                  className={`w-full h-32 p-4 rounded-xl text-[13px] font-medium resize-none focus:outline-none focus:ring-2 ${
                    dark ? "bg-slate-800 border-slate-700 text-slate-200 focus:ring-amber-500/50" : "bg-white border-slate-200 text-slate-700 focus:ring-amber-500/30 border"
                  }`}
                />
              </div>
            </div>
            <div className={`px-6 py-4 border-t flex justify-end gap-3 ${dark ? "border-slate-700 bg-slate-800/30" : "border-slate-100 bg-slate-50"}`}>
              <button onClick={() => setModalType(null)} className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-colors ${dark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:bg-slate-200"}`}>Cancel</button>
              <button 
                onClick={() => executeAction("Reminders successfully sent to 2 At-Risk students.")}
                className="px-5 py-2 text-[12px] font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-colors"
              >
                Send Reminders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Modal */}
      {modalType === "advanced" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-200"}`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${dark ? "border-slate-700 bg-slate-800/50" : "border-slate-100 bg-slate-50"}`}>
              <h3 className={`text-[14px] font-black flex items-center gap-2 ${dark ? "text-white" : "text-[#181c22]"}`}>
                <span className="material-symbols-outlined text-blue-500">star</span>
                Share Advanced Content
              </h3>
              <button onClick={() => setModalType(null)} className={`text-slate-400 hover:text-slate-200 transition-colors`}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`text-[12px] font-bold mb-2 block ${dark ? "text-slate-400" : "text-slate-500"}`}>Recipients (Top Performers)</label>
                <div className={`p-3 rounded-xl flex flex-wrap gap-2 ${dark ? "bg-slate-800/50 border border-slate-700" : "bg-slate-50 border border-slate-200"}`}>
                  {CLASSIFICATIONS.find(c => c.band === "Top Performer")?.students.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded-md text-[11px] font-bold ${dark ? "bg-slate-700 text-slate-200" : "bg-white border text-slate-600 shadow-sm"}`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-[12px] font-bold mb-2 block ${dark ? "text-slate-400" : "text-slate-500"}`}>Enrichment Material</label>
                <select className={`w-full p-3.5 rounded-xl text-[13px] font-medium appearance-none focus:outline-none focus:ring-2 ${
                    dark ? "bg-slate-800 border-slate-700 text-slate-200 focus:ring-blue-500/50 border" : "bg-white border-slate-200 text-slate-700 focus:ring-blue-500/30 border"
                  }`}>
                  <option>Neuroscience Basics (Advanced Biology Module)</option>
                  <option>Genetics Case Study Extension</option>
                  <option>Molecular Biology - Honors Lab Prep</option>
                </select>
              </div>
            </div>
            <div className={`px-6 py-4 border-t flex justify-end gap-3 ${dark ? "border-slate-700 bg-slate-800/30" : "border-slate-100 bg-slate-50"}`}>
              <button onClick={() => setModalType(null)} className={`px-4 py-2 text-[12px] font-bold rounded-xl transition-colors ${dark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:bg-slate-200"}`}>Cancel</button>
              <button 
                onClick={() => executeAction("Advanced material 'Neuroscience Basics' explicitly shared with 1 Top Performer.")}
                className="px-5 py-2 text-[12px] font-bold rounded-xl bg-[#006493] hover:bg-blue-700 text-white transition-colors"
              >
                Share Content
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Student Classification & Insights</h1>
        <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>Intelligent grouping based on performance, participation, and engagement</p>
      </div>

      {/* Legend */}
      <div className={`rounded-2xl border p-5 transition-colors ${
          dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      }`}>
        <h3 className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-slate-500" : "text-slate-400"}`}>Classification System</h3>
        <div className="flex flex-wrap gap-2">
          {CLASSIFICATIONS.map((c) => (
            <button key={c.band} onClick={() => setSelected(selected === c.band ? null : c.band)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                  selected === c.band 
                    ? (dark ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0f172a] opacity-100" : "ring-2 ring-offset-1 ring-[#006493] opacity-100")
                    : "hover:opacity-80 border-transparent opacity-90"
              } ${dark ? c.badge.dark : c.badge.light}`}>
              {c.students.length} · {c.band}
            </button>
          ))}
        </div>
      </div>

      {/* Classification cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CLASSIFICATIONS.filter(c => selected === null || c.band === selected).map((group) => (
          <div key={group.band} 
            onClick={() => setSelected(selected === group.band ? null : group.band)}
            className={`rounded-2xl border p-5 transition-all cursor-pointer ${dark ? group.color.dark : group.color.light} ${
                selected === group.band 
                    ? (dark ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/10" : "ring-2 ring-[#006493] shadow-[0_2px_12px_rgba(0,0,0,0.04)]")
                    : (dark ? "hover:bg-slate-800/60" : "shadow-[0_2px_12px_rgba(0,0,0,0.04)]")
            }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${dark ? group.iconBg.dark : group.iconBg.light}`}>
                  <span className={`material-symbols-outlined text-[20px] ${dark ? group.iconColor.dark : group.iconColor.light}`}>{group.icon}</span>
                </div>
                <div>
                  <p className={`text-[13px] font-black ${dark ? "text-white" : "text-[#181c22]"}`}>{group.band}</p>
                  <p className={`text-[9px] font-medium mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>{group.students.length} student{group.students.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${dark ? group.badge.dark : group.badge.light}`}>{group.band}</span>
            </div>

            <p className={`text-[10px] font-medium mb-4 leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{group.criteria}</p>

            <div className="space-y-3">
              {group.students.map((s) => (
                <div key={s.name} 
                  onClick={(e) => { e.stopPropagation(); navigate("/teacher/students"); }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                    dark ? "bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/80" : "bg-white/70 hover:bg-white border hover:border-blue-100"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <p className={`text-[12px] font-bold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{s.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-12 h-1.5 rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-200"}`}>
                      <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.score >= 70 ? (dark ? "#0284c7" : "#006493") : s.score >= 50 ? "#f59e0b" : "#ef4444" }}></div>
                    </div>
                    <span className={`text-[11px] font-black ${s.score >= 70 ? (dark ? "text-blue-400" : "text-[#006493]") : s.score >= 50 ? "text-amber-500" : "text-red-500"}`}>{s.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate("/teacher/students");
              }}
              className={`w-full mt-4 py-2.5 text-[11px] font-bold text-center rounded-xl transition-colors ${
                  dark ? "bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-blue-300 border border-slate-700" : "bg-white/60 hover:bg-white text-slate-500 hover:text-[#006493]"
              }`}>
              View All → 
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className={`rounded-2xl border p-5 transition-colors ${
          dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      }`}>
        <h3 className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-slate-500" : "text-slate-400"}`}>Recommended Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Send Reminder to At-Risk", icon: "notifications_active", route: "/teacher/students",
              color: { light: "bg-amber-50 text-amber-700 border-amber-200", dark: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20" } },
            { label: "Create Remedial Quiz for Low Engagement", icon: "quiz", route: "/teacher/quiz-builder?intent=remedial",
              color: { light: "bg-red-50 text-red-600 border-red-200", dark: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20" } },
            { label: "Share Advanced Content with Top Performers", icon: "star", route: "/teacher/assignment-builder?intent=advanced",
              color: { light: "bg-blue-50 text-blue-700 border-blue-200", dark: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20" } },
          ].map((a) => (
            <button key={a.label} 
              onClick={() => handleActionClick(a.label, a.route)}
              className={`flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border text-[12px] font-bold transition-all hover:-translate-y-0.5 shadow-sm active:translate-y-0 ${
                  dark ? a.color.dark : a.color.light
              }`}>
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
