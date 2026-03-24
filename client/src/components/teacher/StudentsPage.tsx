import { useState } from "react";

const STUDENTS = [
  { id: "S001", name: "Kavya Reddy", course: "Gr 11 Bio", assigned: 10, opened: 10, attempted: 10, submitted: 10, missed: 0, avgScore: 91, classification: "Top Performer" },
  { id: "S002", name: "Aanya Sharma", course: "Gr 11 Bio", assigned: 10, opened: 10, attempted: 9, submitted: 9, missed: 1, avgScore: 78, classification: "Consistent Learner" },
  { id: "S003", name: "Priya Nair", course: "Gr 11 Bio", assigned: 10, opened: 9, attempted: 8, submitted: 8, missed: 2, avgScore: 72, classification: "Average" },
  { id: "S004", name: "Meera Iyer", course: "Gr 11 Bio", assigned: 10, opened: 8, attempted: 7, submitted: 6, missed: 4, avgScore: 48, classification: "At Risk" },
  { id: "S005", name: "Dev Patel", course: "Gr 11 Bio", assigned: 10, opened: 7, attempted: 5, submitted: 4, missed: 6, avgScore: 39, classification: "At Risk" },
  { id: "S006", name: "Rahul Menon", course: "Gr 11 Bio", assigned: 10, opened: 5, attempted: 4, submitted: 3, missed: 7, avgScore: 32, classification: "Low Engagement" },
  { id: "S007", name: "Arjun Singh", course: "Gr 11 Bio", assigned: 10, opened: 2, attempted: 2, submitted: 1, missed: 9, avgScore: 18, classification: "Needs Intervention" },
];

const classColor: Record<string, string> = {
  "Top Performer": "bg-blue-100 text-blue-700",
  "Consistent Learner": "bg-emerald-100 text-emerald-700",
  "Improving": "bg-cyan-100 text-cyan-700",
  "Average": "bg-indigo-100 text-indigo-600",
  "At Risk": "bg-amber-100 text-amber-700",
  "Low Engagement": "bg-orange-100 text-orange-700",
  "Needs Intervention": "bg-red-100 text-red-600",
};

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const allClasses = Array.from(new Set(STUDENTS.map(s => s.classification)));
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (classFilter === "all" || s.classification === classFilter)
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#181c22]">Student Roster</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">{STUDENTS.length} students · Grade 11 Biology</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input type="text" placeholder="Search students..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-medium focus:outline-none focus:border-[#006493] w-52"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 focus:outline-none focus:border-[#006493] appearance-none"
          value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="all">All Classifications</option>
          {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-slate-100">
              {["Student", "Course", "Assigned", "Opened", "Attempted", "Submitted", "Missed", "Avg Score", "Classification", "Action"].map(h => (
                <th key={h} className="px-4 py-4 text-left font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{s.name.charAt(0)}</div>
                    <span className="font-bold text-[#181c22] whitespace-nowrap">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-500 font-medium whitespace-nowrap">{s.course}</td>
                <td className="px-4 py-4 font-bold text-center text-[#181c22]">{s.assigned}</td>
                <td className="px-4 py-4 font-bold text-center text-slate-600">{s.opened}</td>
                <td className="px-4 py-4 font-bold text-center text-indigo-600">{s.attempted}</td>
                <td className="px-4 py-4 font-bold text-center text-emerald-600">{s.submitted}</td>
                <td className="px-4 py-4 font-bold text-center text-red-500">{s.missed}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.avgScore}%`, background: s.avgScore >= 75 ? "#006493" : s.avgScore >= 50 ? "#f59e0b" : "#ef4444" }}></div>
                    </div>
                    <span className={`font-bold ${s.avgScore >= 75 ? "text-[#006493]" : s.avgScore >= 50 ? "text-amber-600" : "text-red-500"}`}>{s.avgScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${classColor[s.classification]}`}>{s.classification}</span>
                </td>
                <td className="px-4 py-4">
                  <button className="text-[11px] font-bold text-[#006493] hover:underline px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                    Profile →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
