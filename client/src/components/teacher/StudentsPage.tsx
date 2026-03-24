import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const STUDENTS = [
  { id: "S001", name: "Kavya Reddy", course: "Gr 11 Bio", assigned: 10, opened: 10, attempted: 10, submitted: 10, missed: 0, avgScore: 91, classification: "Top Performer" },
  { id: "S002", name: "Aanya Sharma", course: "Gr 11 Bio", assigned: 10, opened: 10, attempted: 9, submitted: 9, missed: 1, avgScore: 78, classification: "Consistent Learner" },
  { id: "S003", name: "Priya Nair", course: "Gr 11 Bio", assigned: 10, opened: 9, attempted: 8, submitted: 8, missed: 2, avgScore: 72, classification: "Average" },
  { id: "S004", name: "Meera Iyer", course: "Gr 11 Bio", assigned: 10, opened: 8, attempted: 7, submitted: 6, missed: 4, avgScore: 48, classification: "At Risk" },
  { id: "S005", name: "Dev Patel", course: "Gr 11 Bio", assigned: 10, opened: 7, attempted: 5, submitted: 4, missed: 6, avgScore: 39, classification: "At Risk" },
  { id: "S006", name: "Rahul Menon", course: "Gr 11 Bio", assigned: 10, opened: 5, attempted: 4, submitted: 3, missed: 7, avgScore: 32, classification: "Low Engagement" },
  { id: "S007", name: "Arjun Singh", course: "Gr 11 Bio", assigned: 10, opened: 2, attempted: 2, submitted: 1, missed: 9, avgScore: 18, classification: "Needs Intervention" },
];

const getClassColor = (c: string, dark: boolean) => {
  if (dark) {
    return {
      "Top Performer": "bg-blue-500/10 text-blue-400",
      "Consistent Learner": "bg-emerald-500/10 text-emerald-400",
      "Improving": "bg-cyan-500/10 text-cyan-400",
      "Average": "bg-indigo-500/10 text-indigo-400",
      "At Risk": "bg-amber-500/10 text-amber-400",
      "Low Engagement": "bg-orange-500/10 text-orange-400",
      "Needs Intervention": "bg-red-500/10 text-red-400",
    }[c] || "bg-slate-500/10 text-slate-400";
  }
  return {
    "Top Performer": "bg-blue-100 text-blue-700",
    "Consistent Learner": "bg-emerald-100 text-emerald-700",
    "Improving": "bg-cyan-100 text-cyan-700",
    "Average": "bg-indigo-100 text-indigo-600",
    "At Risk": "bg-amber-100 text-amber-700",
    "Low Engagement": "bg-orange-100 text-orange-700",
    "Needs Intervention": "bg-red-100 text-red-600",
  }[c] || "bg-slate-100 text-slate-700";
};

const StudentsPage = () => {
  const { dark } = useOutletContext<{ dark: boolean }>();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const allClasses = Array.from(new Set(STUDENTS.map(s => s.classification)));
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (classFilter === "all" || s.classification === classFilter)
  );

  if (selectedStudent) {
    return (
      <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedStudent(null)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              dark ? "bg-slate-800 text-white hover:bg-slate-700 hover:text-blue-400" : "bg-white text-slate-500 hover:bg-slate-100 border hover:text-[#006493]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>{selectedStudent.name}</h1>
            <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{selectedStudent.id} · {selectedStudent.course}</p>
          </div>
          <span className={`ml-auto px-3 py-1.5 rounded-full text-[11px] font-bold ${getClassColor(selectedStudent.classification, dark)}`}>
            {selectedStudent.classification}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Assigned Tasks", val: selectedStudent.assigned, icon: "assignment" },
            { label: "Tasks Opened", val: selectedStudent.opened, icon: "visibility" },
            { label: "Tasks Attempted", val: selectedStudent.attempted, icon: "edit_document" },
            { label: "Total Submitted", val: selectedStudent.submitted, icon: "check_circle" },
            { label: "Missed Deadlines", val: selectedStudent.missed, icon: "error" },
            { label: "Average Score", val: `${selectedStudent.avgScore}%`, icon: "analytics" },
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-5 border shadow-sm transition-all ${
              dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-100"
            }`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`material-symbols-outlined text-[20px] ${dark ? "text-slate-400" : "text-slate-400"}`}>{stat.icon}</span>
                <span className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>{stat.val}</span>
              </div>
              <p className={`text-[11px] font-bold ${dark ? "text-slate-500" : "text-slate-400"} uppercase tracking-wider`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- STUDENT PERSONAL DETAILS --- */}
        <div className={`rounded-2xl border p-6 ${dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-100"}`}>
          <div className={`flex items-center gap-4 mb-6 pb-6 border-b ${dark ? "border-slate-700/50" : "border-slate-100"}`}>
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[24px] font-black shrink-0 shadow-lg">
               {selectedStudent.name.charAt(0)}
             </div>
             <div>
               <h3 className={`text-[18px] font-black ${dark ? "text-white" : "text-[#181c22]"}`}>{selectedStudent.name}</h3>
               <p className={`text-[13px] font-medium mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{selectedStudent.id} • Grade 11 Biology</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Academic */}
            <div className="space-y-4">
               <h4 className={`text-[11px] font-black ${dark ? "text-blue-400" : "text-[#006493]"} uppercase tracking-widest flex items-center gap-1.5`}>
                 <span className="material-symbols-outlined text-[16px]">school</span> Academic Details
               </h4>
               <div className="space-y-3">
                 {[
                   { label: "Register Number", value: `REG2024${selectedStudent.id.substring(1)}` },
                   { label: "Department", value: "Biological Sciences" },
                   { label: "Year / Semester", value: "Year 1 / Semester 2" },
                   { label: "Section", value: "Bio-A" },
                   { label: "Admission Year", value: "2024" },
                 ].map(d => (
                    <div key={d.label}>
                       <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>{d.label}</p>
                       <p className={`text-[13px] font-semibold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{d.value}</p>
                    </div>
                 ))}
               </div>
            </div>

            {/* Personal */}
            <div className="space-y-4">
               <h4 className={`text-[11px] font-black ${dark ? "text-blue-400" : "text-[#006493]"} uppercase tracking-widest flex items-center gap-1.5`}>
                 <span className="material-symbols-outlined text-[16px]">person</span> Personal Info
               </h4>
               <div className="space-y-3">
                 {[
                   { label: "Date of Birth", value: "14 Aug 2006" },
                   { label: "Gender", value: ["Kavya", "Aanya", "Priya", "Meera"].includes(selectedStudent.name.split(' ')[0]) ? "Female" : "Male" },
                   { label: "Blood Group", value: "O+" },
                 ].map(d => (
                    <div key={d.label}>
                       <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>{d.label}</p>
                       <p className={`text-[13px] font-semibold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{d.value}</p>
                    </div>
                 ))}
               </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
               <h4 className={`text-[11px] font-black ${dark ? "text-blue-400" : "text-[#006493]"} uppercase tracking-widest flex items-center gap-1.5`}>
                 <span className="material-symbols-outlined text-[16px]">contact_mail</span> Contact Information
               </h4>
               <div className="space-y-3">
                 {[
                   { label: "Email ID", value: `${selectedStudent.name.split(' ')[0].toLowerCase()}@learn.ar` },
                   { label: "Phone Number", value: "+91 98765 43210" },
                   { label: "Address", value: "42, Academic Block, Education City, 400123" },
                 ].map(d => (
                    <div key={d.label}>
                       <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>{d.label}</p>
                       <p className={`text-[13px] font-semibold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{d.value}</p>
                    </div>
                 ))}
               </div>
            </div>

            {/* Guardian */}
            <div className="space-y-4">
               <h4 className={`text-[11px] font-black ${dark ? "text-blue-400" : "text-[#006493]"} uppercase tracking-widest flex items-center gap-1.5`}>
                 <span className="material-symbols-outlined text-[16px]">family_restroom</span> Guardian Details
               </h4>
               <div className="space-y-3">
                 {[
                   { label: "Parent / Guardian Name", value: `Mr. ${selectedStudent.name.split(' ')[1] || "Guardian"}` },
                   { label: "Parent Contact", value: "+91 91234 56789" },
                 ].map(d => (
                    <div key={d.label}>
                       <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>{d.label}</p>
                       <p className={`text-[13px] font-semibold ${dark ? "text-slate-200" : "text-[#181c22]"}`}>{d.value}</p>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* --- PERFORMANCE --- */}
        <div className={`rounded-2xl border p-6 ${dark ? "bg-[#1e293b] border-slate-700" : "bg-white border-slate-100"}`}>
          <h3 className={`text-[13px] font-black uppercase tracking-widest mb-4 ${dark ? "text-white" : "text-[#181c22]"}`}>Recent Participation</h3>
          <div className={`h-2 rounded-full overflow-hidden w-full ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
             <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${selectedStudent.avgScore}%`, background: selectedStudent.avgScore >= 75 ? (dark ? "#0284c7" : "#006493") : selectedStudent.avgScore >= 50 ? "#f59e0b" : "#ef4444" }}></div>
          </div>
          <p className={`text-[12px] font-medium mt-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {selectedStudent.name} is currently engaging at a {selectedStudent.avgScore}% performance rate. 
            {selectedStudent.missed > 0 ? ` They have missed ${selectedStudent.missed} task(s) recently.` : " They are fully caught up with their assigned coursework."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-400" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Student Roster</h1>
          <p className={`text-[12px] mt-0.5 ${dark ? "text-slate-400" : "text-slate-400"}`}>{STUDENTS.length} students · Grade 11 Biology</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input type="text" placeholder="Search students..." 
            className={`pl-9 pr-4 py-2.5 border rounded-xl text-[12px] font-medium focus:outline-none focus:border-[#006493] w-52 transition-colors ${
                dark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-[#181c22] placeholder-slate-400"
            }`}
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select 
          className={`px-4 py-2.5 border rounded-xl text-[12px] font-bold focus:outline-none focus:border-[#006493] appearance-none transition-colors ${
              dark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-600"
          }`}
          value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="all">All Classifications</option>
          {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className={`rounded-2xl border transition-colors overflow-auto ${
          dark ? "bg-[#1e293b] border-slate-700 shadow-none" : "bg-white border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      }`}>
        <table className="w-full text-[12px]">
          <thead>
            <tr className={`border-b ${dark ? "border-slate-700" : "border-slate-100"}`}>
              {["Student", "Course", "Assigned", "Opened", "Attempted", "Submitted", "Missed", "Avg Score", "Classification", "Action"].map(h => (
                <th key={h} className={`px-4 py-4 text-left font-black uppercase tracking-widest whitespace-nowrap ${dark ? "text-slate-500" : "text-slate-400"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className={`border-b transition-colors ${
                  dark ? "border-slate-800 hover:bg-slate-800/50 text-slate-300" : "border-slate-50 hover:bg-slate-50/60"
              }`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{s.name.charAt(0)}</div>
                    <span className={`font-bold whitespace-nowrap ${dark ? "text-white" : "text-[#181c22]"}`}>{s.name}</span>
                  </div>
                </td>
                <td className={`px-4 py-4 font-medium whitespace-nowrap ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.course}</td>
                <td className={`px-4 py-4 font-bold text-center ${dark ? "text-white" : "text-[#181c22]"}`}>{s.assigned}</td>
                <td className={`px-4 py-4 font-bold text-center ${dark ? "text-slate-400" : "text-slate-600"}`}>{s.opened}</td>
                <td className={`px-4 py-4 font-bold text-center ${dark ? "text-indigo-400" : "text-indigo-600"}`}>{s.attempted}</td>
                <td className={`px-4 py-4 font-bold text-center ${dark ? "text-emerald-400" : "text-emerald-600"}`}>{s.submitted}</td>
                <td className={`px-4 py-4 font-bold text-center ${dark ? "text-red-400" : "text-red-500"}`}>{s.missed}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-14 h-1.5 rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
                      <div className="h-full rounded-full" style={{ width: `${s.avgScore}%`, background: s.avgScore >= 75 ? (dark ? "#0284c7" : "#006493") : s.avgScore >= 50 ? "#f59e0b" : "#ef4444" }}></div>
                    </div>
                    <span className={`font-bold ${s.avgScore >= 75 ? (dark ? "text-blue-400" : "text-[#006493]") : s.avgScore >= 50 ? "text-amber-500" : "text-red-500"}`}>{s.avgScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${getClassColor(s.classification, dark)}`}>{s.classification}</span>
                </td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => setSelectedStudent(s)}
                    className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      dark ? "text-blue-400 hover:bg-blue-500/10 hover:text-blue-300" : "text-[#006493] hover:bg-blue-50 hover:underline"
                  }`}>
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
