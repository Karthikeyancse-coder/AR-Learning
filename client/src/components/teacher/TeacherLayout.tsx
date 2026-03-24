import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Overview", to: "/teacher/home" },
  { icon: "school", label: "Courses", to: "/teacher/courses" },
  { icon: "quiz", label: "Quizzes", to: "/teacher/quizzes" },
  { icon: "assignment", label: "Assignments", to: "/teacher/assignments" },
  { icon: "how_to_reg", label: "Submissions", to: "/teacher/submissions" },
  { icon: "bar_chart", label: "Analytics", to: "/teacher/analytics" },
  { icon: "groups", label: "Students", to: "/teacher/students" },
  { icon: "lightbulb", label: "Insights", to: "/teacher/insights" },
  { icon: "notifications", label: "Notifications", to: "/teacher/notifications" },
];

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacher_token");
    navigate("/teacher/login");
  };

  return (
    <div className="flex h-screen bg-[#f0f4fa] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} shrink-0 bg-white h-full flex flex-col border-r border-slate-100 transition-all duration-300 shadow-[2px_0_20px_rgba(0,0,0,0.03)]`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 py-6 border-b border-slate-50 shrink-0 ${!sidebarOpen ? "justify-center" : ""}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-[#006493] to-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
            <span className="material-symbols-outlined text-white text-[18px]">school</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-[13px] font-black text-[#181c22] leading-tight">Learn.AR</p>
              <p className="text-[10px] font-bold text-[#006493] uppercase tracking-widest">Teacher Portal</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#006493] text-white shadow-md shadow-[#006493]/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#181c22]"
                } ${!sidebarOpen ? "justify-center" : ""}`
              }
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: teacher profile */}
        <div className={`p-4 border-t border-slate-50 shrink-0 ${!sidebarOpen ? "flex justify-center" : ""}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                T
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#181c22] truncate">Dr. Kumar</p>
                <p className="text-[10px] text-slate-400 truncate">Biology • Gr 10-12</p>
              </div>
              <button onClick={handleLogout} title="Sign out" className="text-slate-400 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} title="Sign out" className="text-slate-400 hover:text-red-500 transition-colors p-2">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <div>
              <p className="text-xs text-slate-400 font-medium">Welcome back,</p>
              <p className="text-[15px] font-bold text-[#181c22] leading-tight">Dr. Kumar</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <button
              onClick={() => navigate("/teacher/quiz-builder")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#006493] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Quiz
            </button>
            <button
              onClick={() => navigate("/teacher/assignment-builder")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 text-[#181c22] text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Assignment
            </button>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
