import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Overview", to: "/teacher/home" },
  { icon: "school", label: "Courses", to: "/teacher/courses" },
  { icon: "how_to_reg", label: "Submissions", to: "/teacher/submissions" },
  { icon: "bar_chart", label: "Analytics", to: "/teacher/analytics" },
  { icon: "groups", label: "Students", to: "/teacher/students" },
  { icon: "lightbulb", label: "Insights", to: "/teacher/insights" },
];

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacher_token");
    navigate("/teacher/login");
  };

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{
        fontFamily: "Inter, sans-serif",
        background: dark ? "#0f172a" : "#f0f4fa",
      }}
    >
      {/* ── Sidebar (desktop only) ── */}
      <aside
        className={`hidden md:flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } shrink-0 h-full border-r transition-all duration-300 ${
          dark
            ? "bg-[#1e293b] border-slate-700 shadow-none"
            : "bg-white border-slate-100 shadow-[2px_0_20px_rgba(0,0,0,0.03)]"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 py-6 border-b shrink-0 ${
          dark ? "border-slate-700" : "border-slate-50"
        } ${!sidebarOpen ? "justify-center" : ""}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-[#006493] to-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
            <span className="material-symbols-outlined text-white text-[18px]">school</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className={`text-[13px] font-black leading-tight ${
                dark ? "text-white" : "text-[#181c22]"
              }`}>Learn.AR</p>
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
                    : dark
                    ? "text-slate-400 hover:bg-slate-700 hover:text-white"
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
        <div className={`p-4 border-t shrink-0 ${
          dark ? "border-slate-700" : "border-slate-50"
        } ${!sidebarOpen ? "flex justify-center" : ""}`}>
          {sidebarOpen ? (
            <div className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
              dark ? "hover:bg-slate-700" : "hover:bg-slate-50"
            }`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                T
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[12px] font-bold truncate ${
                  dark ? "text-white" : "text-[#181c22]"
                }`}>Dr. Kumar</p>
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
        <header className={`border-b px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shrink-0 transition-colors duration-300 ${
          dark
            ? "bg-[#1e293b] border-slate-700 shadow-none"
            : "bg-white border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        }`}>
          <div className="flex items-center gap-3">
            {/* Sidebar toggle — desktop only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hidden md:flex w-9 h-9 items-center justify-center rounded-xl transition-colors ${
                dark ? "text-slate-400 hover:bg-slate-700" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>

            {/* Brand mark — mobile only */}
            <div className="flex md:hidden items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-[#006493] to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[14px]">school</span>
              </div>
              <p className={`text-[13px] font-black ${dark ? "text-white" : "text-[#181c22]"}`}>Learn.AR</p>
            </div>

            <div className="hidden md:block">
              <p className="text-[10px] md:text-xs font-medium text-slate-400">Welcome back,</p>
              <p className={`text-[13px] md:text-[15px] font-bold leading-tight ${
                dark ? "text-white" : "text-[#181c22]"
              }`}>Dr. Kumar</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile Profile Avatar */}
            <div className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-[#006493] to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm">
              T
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
                dark
                  ? "bg-slate-700 text-amber-400 hover:bg-slate-600"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {dark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Notifications */}
            <button className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
              dark ? "text-slate-400 hover:bg-slate-700" : "text-slate-500 hover:bg-slate-100"
            }`}>
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page content — pb-16 on mobile so content clears the bottom nav */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet context={{ dark }} />
        </main>
      </div>

      {/* ── Mobile Bottom Navigation (small screens only) ── */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t transition-colors duration-300 ${
          dark
            ? "bg-[#1e293b] border-slate-700"
            : "bg-white/95 border-slate-200 backdrop-blur-md"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch justify-around h-16">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
            >
              {({ isActive }) => (
                <div className={`relative flex flex-col items-center justify-center gap-0.5 h-16 flex-1 px-1 transition-all active:scale-90 ${
                  isActive
                    ? "text-[#006493]"
                    : dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}>
                  {/* Active pill indicator */}
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#006493]" />
                  )}
                  <span
                    className="material-symbols-outlined text-[22px] transition-all"
                    style={{
                      fontVariationSettings: isActive
                        ? "'FILL' 1, 'wght' 600"
                        : "'FILL' 0, 'wght' 400",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wide leading-none">
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TeacherLayout;
