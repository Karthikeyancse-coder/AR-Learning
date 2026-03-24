import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const ALL_TASKS = [
  { id: "1", title: "Cell Theory MCQ Quiz", type: "quiz", subject: "Biology", assignedTo: "Grade 11 Biology", due: "Mar 25, 2026", submitted: 38, total: 52, status: "live" },
  { id: "2", title: "Photosynthesis Research Essay", type: "assignment", subject: "Biology", assignedTo: "Grade 10 Biology", due: "Mar 28, 2026", submitted: 21, total: 48, status: "live" },
  { id: "3", title: "DNA Structure Quiz", type: "quiz", subject: "Biology", assignedTo: "Grade 12 Biology", due: "Mar 20, 2026", submitted: 45, total: 45, status: "closed" },
  { id: "4", title: "Evolution Concepts Assignment", type: "assignment", subject: "Biology", assignedTo: "Grade 11 Biology", due: "Mar 15, 2026", submitted: 30, total: 52, status: "closed" },
  { id: "5", title: "Ecology Ecosystem Quiz", type: "quiz", subject: "Biology", assignedTo: "All Students", due: "Apr 2, 2026", submitted: 0, total: 145, status: "draft" },
];

const getStatusColor = (status: string, dark: boolean) => {
  if (dark) {
    return {
      live: "bg-emerald-500/10 text-emerald-400",
      closed: "bg-slate-500/10 text-slate-400",
      draft: "bg-amber-500/10 text-amber-400",
    }[status] || "";
  }
  return {
    live: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-100 text-slate-500",
    draft: "bg-amber-100 text-amber-700",
  }[status] || "";
};

const getTypeColor = (type: string, dark: boolean) => {
  if (dark) {
    return {
      quiz: "bg-indigo-500/10 text-indigo-400",
      assignment: "bg-blue-500/10 text-blue-400",
    }[type] || "";
  }
  return {
    quiz: "bg-indigo-100 text-indigo-700",
    assignment: "bg-blue-100 text-blue-700",
  }[type] || "";
};

const PublishedTasks = () => {
  const navigate = useNavigate();
  const { dark } = useOutletContext<{ dark: boolean }>();
  const [filter, setFilter] = useState<"all" | "quiz" | "assignment">("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_TASKS.filter(t =>
    (filter === "all" || t.type === filter) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Published Tasks</h1>
          <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>All quizzes and assignments across your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/teacher/quiz-builder")} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#006493] text-white text-[12px] font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex-1 sm:flex-none">
            <span className="material-symbols-outlined text-[16px]">add</span> New Quiz
          </button>
          <button onClick={() => navigate("/teacher/assignment-builder")} className={`flex items-center justify-center gap-2 px-4 py-2.5 text-[12px] font-bold rounded-xl transition-colors flex-1 sm:flex-none ${
            dark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-slate-100 text-[#181c22] hover:bg-slate-200"
          }`}>
            <span className="material-symbols-outlined text-[16px]">add</span> New Assignment
          </button>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative">
          <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] ${dark ? "text-slate-400" : "text-slate-400"}`}>search</span>
          <input type="text" placeholder="Search tasks..." 
            className={`pl-9 pr-4 py-2.5 rounded-xl text-[12px] font-medium focus:outline-none w-full sm:w-56 transition-colors ${
              dark 
                ? "bg-[#1e293b] border border-slate-700 text-white placeholder-slate-500 focus:border-[#006493]" 
                : "bg-white border border-slate-200 focus:border-[#006493]"
            }`}
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          {(["all", "quiz", "assignment"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold capitalize transition-colors shrink-0 ${
                filter === f 
                  ? "bg-[#006493] text-white" 
                  : dark 
                    ? "bg-[#1e293b] border border-slate-700 text-slate-400 hover:bg-slate-700" 
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}>
              {f === "all" ? "All" : f === "quiz" ? "Quizzes" : "Assignments"}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className={`rounded-2xl border overflow-hidden ${
        dark 
          ? "bg-[#1e293b] border-slate-700 shadow-none" 
          : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className={`border-b ${dark ? "border-slate-700" : "border-slate-100"}`}>
                {["Title", "Type", "Subject", "Assigned To", "Due Date", "Submissions", "Completion", "Status", "Actions"].map(h => (
                  <th key={h} className={`px-5 py-4 text-left font-black uppercase tracking-widest whitespace-nowrap ${dark ? "text-slate-500" : "text-slate-400"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const pct = t.total > 0 ? Math.round((t.submitted / t.total) * 100) : 0;
                return (
                  <tr key={t.id} className={`border-b last:border-0 transition-colors ${
                    dark ? "border-slate-700/50 hover:bg-slate-700/30" : "border-slate-50 hover:bg-slate-50/60"
                  }`}>
                    <td className="px-5 py-4 min-w-[140px] max-w-[200px]">
                      <p className={`font-bold truncate ${dark ? "text-slate-100" : "text-[#181c22]"}`}>{t.title}</p>
                    </td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold w-max block ${getTypeColor(t.type, dark)}`}>{t.type}</span></td>
                    <td className={`px-5 py-4 font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{t.subject}</td>
                    <td className={`px-5 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-500"}`}>{t.assignedTo}</td>
                    <td className={`px-5 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-500"}`}>{t.due}</td>
                    <td className={`px-5 py-4 font-bold whitespace-nowrap ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{t.submitted} / {t.total}</td>
                    <td className="px-5 py-4 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-1.5 rounded-full overflow-hidden shrink-0 ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
                          <div className="h-full bg-[#006493] rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className={`font-bold text-[11px] ${dark ? "text-slate-300" : "text-slate-600"}`}>{pct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold capitalize w-max block ${getStatusColor(t.status, dark)}`}>{t.status}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigate(t.type === "quiz" ? "/teacher/quiz-results" : "/teacher/submissions")}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors ${
                            dark ? "text-[#38bdf8] hover:bg-[#38bdf8]/10" : "text-[#006493] hover:bg-blue-50"
                          }`}>
                          {t.type === "quiz" ? "Results" : "Submissions"}
                        </button>
                        <button 
                          onClick={() => navigate(t.type === "quiz" ? "/teacher/quiz-builder" : "/teacher/assignment-builder")}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors ${
                          dark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-500 hover:text-[#181c22] hover:bg-slate-100"
                        }`}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={`p-12 text-center font-medium text-sm border-t ${dark ? "text-slate-500 border-slate-700" : "text-slate-400 border-slate-100"}`}>
              No tasks found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishedTasks;
