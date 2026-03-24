import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_TASKS = [
  { id: "1", title: "Cell Theory MCQ Quiz", type: "quiz", subject: "Biology", assignedTo: "Grade 11 Biology", due: "Mar 25, 2026", submitted: 38, total: 52, status: "live" },
  { id: "2", title: "Photosynthesis Research Essay", type: "assignment", subject: "Biology", assignedTo: "Grade 10 Biology", due: "Mar 28, 2026", submitted: 21, total: 48, status: "live" },
  { id: "3", title: "DNA Structure Quiz", type: "quiz", subject: "Biology", assignedTo: "Grade 12 Biology", due: "Mar 20, 2026", submitted: 45, total: 45, status: "closed" },
  { id: "4", title: "Evolution Concepts Assignment", type: "assignment", subject: "Biology", assignedTo: "Grade 11 Biology", due: "Mar 15, 2026", submitted: 30, total: 52, status: "closed" },
  { id: "5", title: "Ecology Ecosystem Quiz", type: "quiz", subject: "Biology", assignedTo: "All Students", due: "Apr 2, 2026", submitted: 0, total: 145, status: "draft" },
];

const statusColor: Record<string, string> = {
  live: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-500",
  draft: "bg-amber-100 text-amber-700",
};

const typeColor: Record<string, string> = {
  quiz: "bg-indigo-100 text-indigo-700",
  assignment: "bg-blue-100 text-blue-700",
};

const PublishedTasks = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "quiz" | "assignment">("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_TASKS.filter(t =>
    (filter === "all" || t.type === filter) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#181c22]">Published Tasks</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">All quizzes and assignments across your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/teacher/quiz-builder")} className="flex items-center gap-2 px-4 py-2.5 bg-[#006493] text-white text-[12px] font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[16px]">add</span> New Quiz
          </button>
          <button onClick={() => navigate("/teacher/assignment-builder")} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-[#181c22] text-[12px] font-bold rounded-xl hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span> New Assignment
          </button>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input type="text" placeholder="Search tasks..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-medium focus:outline-none focus:border-[#006493] w-56"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {(["all", "quiz", "assignment"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold capitalize transition-colors ${filter === f ? "bg-[#006493] text-white" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
            {f === "all" ? "All" : f === "quiz" ? "Quizzes" : "Assignments"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-slate-100">
              {["Title", "Type", "Subject", "Assigned To", "Due Date", "Submissions", "Completion", "Status", "Actions"].map(h => (
                <th key={h} className="px-5 py-4 text-left font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const pct = t.total > 0 ? Math.round((t.submitted / t.total) * 100) : 0;
              return (
                <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#181c22] max-w-[200px]">
                    <p className="truncate">{t.title}</p>
                  </td>
                  <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold ${typeColor[t.type]}`}>{t.type}</span></td>
                  <td className="px-5 py-4 text-slate-500 font-medium">{t.subject}</td>
                  <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap">{t.assignedTo}</td>
                  <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap">{t.due}</td>
                  <td className="px-5 py-4 font-bold text-[#181c22]">{t.submitted} / {t.total}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#006493] rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="font-bold text-slate-600">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full font-bold capitalize ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(t.type === "quiz" ? "/teacher/quiz-results" : "/teacher/submissions")}
                        className="text-[11px] font-bold text-[#006493] hover:underline px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                        {t.type === "quiz" ? "Results" : "Submissions"}
                      </button>
                      <button className="text-[11px] font-bold text-slate-500 hover:text-[#181c22] px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors">
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
          <div className="p-12 text-center text-slate-400 font-medium text-sm">No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default PublishedTasks;
