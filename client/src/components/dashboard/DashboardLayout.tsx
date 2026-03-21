import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendMessage, clearChat } from "../../redux/slices/geminiSlice";
import { logout } from "../../redux/slices/authSlice";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { messages, loading } = useAppSelector((state) => state.gemini);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isSidebarHiddenForThisRoute =
    (location.pathname.startsWith("/dashboard/biology/") && location.pathname !== "/dashboard/biology") ||
    (location.pathname.startsWith("/dashboard/chemistry/") && location.pathname !== "/dashboard/chemistry");
  const isActive = (path: string) => location.pathname.startsWith(path) && path !== "/dashboard" || (path === "/dashboard" && (location.pathname === "/dashboard" || location.pathname === "/dashboard/home"));

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await dispatch(sendMessage({ message: inputText }));
    setInputText("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [isChatOpen, messages]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={`font-display ${isDarkMode ? "dark" : ""}`}>
      {/* Ensure dark mode background fills the screen and resets text color */}
      <div className="bg-[#f9f9ff] dark:bg-[#0f172a] text-[#181c22] dark:text-slate-200 min-h-screen antialiased select-none lg:select-auto transition-colors duration-300">

        {/* Desktop Sidebar (Hidden on mobile/tablet) */}
        <aside className={`${isSidebarHiddenForThisRoute ? 'hidden' : 'hidden lg:flex'} h-screen w-64 fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] shadow-sm flex-col p-4 z-50 transition-colors duration-300`}>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 mb-10 mt-2">
            <div className="w-10 h-10 bg-[#006493] dark:bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md transition-colors">
              <span className="material-symbols-outlined font-bold">school</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#006493] dark:text-blue-400 tracking-tight transition-colors">AR-Learn</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-widest font-bold uppercase transition-colors">Student Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-2">
            <button onClick={() => navigate("/dashboard")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive("/dashboard") ? "bg-blue-50 dark:bg-blue-500/10 text-[#006493] dark:text-blue-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-[#006493] dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </button>
            <button onClick={() => navigate("/dashboard/chemistry")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive("/dashboard/chemistry") ? "bg-blue-50 dark:bg-blue-500/10 text-[#006493] dark:text-blue-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-[#006493] dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">school</span>
              <span className="text-sm">My Courses</span>
            </button>
            <button onClick={() => navigate("/dashboard/biology")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive("/dashboard/biology") ? "bg-blue-50 dark:bg-blue-500/10 text-[#006493] dark:text-blue-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-[#006493] dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">layers</span>
              <span className="text-sm">AR Library</span>
            </button>
            <button onClick={() => navigate("/dashboard/self-study")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive("/dashboard/self-study") ? "bg-blue-50 dark:bg-blue-500/10 text-[#006493] dark:text-blue-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-[#006493] dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">assignment</span>
              <span className="text-sm">Assignments</span>
            </button>
            <button onClick={() => navigate("/dashboard/profile")} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${isActive("/dashboard/profile") ? "bg-blue-50 dark:bg-blue-500/10 text-[#006493] dark:text-blue-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-[#006493] dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm">Settings</span>
            </button>
          </nav>

          {/* Upgrade Card */}
          <div className="mt-auto mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
            <p className="text-sm font-bold mb-1 text-slate-900 dark:text-white">Upgrade to Premium</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">Unlock advanced AR modules and AI tutoring capabilities.</p>
            <button onClick={() => navigate("/dashboard/billing")} className="w-full py-2.5 bg-[#006493] dark:bg-blue-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity shadow-md">
              Go Pro
            </button>
          </div>

          {/* Footer Profile */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3 truncate pr-2">
              {user?.name ? (
                <img alt="Student profile avatar" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVv1P6vCCzh6X0oZTjYzxBmailQ2lO4S6lhbfgPMftb1DHPVYW41Caj2fU-uABGM9OMy-pFctkVQMAnVzvEXe6gu0CxUPoCCzBTdQyMQpuDUZEc40ftMkLZ5WBlz-WpXNUg_O2HKgDnoGhtDgWWE7lHzhZDuhtNmn7ADbeMTacQ2LiknsgtwtcKXRWP22rFUl-XCf3wIfz8obGvM6EWIxdmb8QDnUcftNvEZ_A2LCuSJRcdhxXyu_bhjZHfKfiD9xn5tOuru_KA" />
              ) : (
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-[#006493] dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 transition-colors">
                  {user?.name?.charAt(0) || "S"}
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate transition-colors">{user?.name || "Guest Account"}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate transition-colors">{user?.email || "Free Tier"}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile/Tablet Bottom Navigation */}
        {!isSidebarHiddenForThisRoute && (
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 px-6 py-3 pb-safe flex items-center justify-between z-50 transition-colors duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
            <button onClick={() => navigate("/dashboard")} className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-[#006493] dark:text-blue-400" : "text-slate-400 hover:text-[#006493] dark:hover:text-blue-300"}`}>
              <span className={`material-symbols-outlined ${isActive("/dashboard") ? "fill-icon" : ""}`}>dashboard</span>
              <span className="text-[10px] font-bold">Dashboard</span>
            </button>
            <button onClick={() => navigate("/dashboard/chemistry")} className={`flex flex-col items-center gap-1 ${isActive("/dashboard/chemistry") ? "text-[#006493] dark:text-blue-400" : "text-slate-400 hover:text-[#006493] dark:hover:text-blue-300"}`}>
              <span className={`material-symbols-outlined ${isActive("/dashboard/chemistry") ? "fill-icon" : ""}`}>school</span>
              <span className="text-[10px] font-bold">Courses</span>
            </button>
            <button onClick={() => navigate("/dashboard/biology")} className={`flex flex-col items-center gap-1 ${isActive("/dashboard/biology") ? "text-[#006493] dark:text-blue-400" : "text-slate-400 hover:text-[#006493] dark:hover:text-blue-300"}`}>
              <span className={`material-symbols-outlined ${isActive("/dashboard/biology") ? "fill-icon" : ""}`}>layers</span>
              <span className="text-[10px] font-bold">Library</span>
            </button>
            <button onClick={() => navigate("/dashboard/self-study")} className={`flex flex-col items-center gap-1 ${isActive("/dashboard/self-study") ? "text-[#006493] dark:text-blue-400" : "text-slate-400 hover:text-[#006493] dark:hover:text-blue-300"}`}>
              <span className={`material-symbols-outlined ${isActive("/dashboard/self-study") ? "fill-icon" : ""}`}>assignment</span>
              <span className="text-[10px] font-bold">Tasks</span>
            </button>
            <button onClick={() => navigate("/dashboard/profile")} className={`flex flex-col items-center gap-1 ${isActive("/dashboard/profile") ? "text-[#006493] dark:text-blue-400" : "text-slate-400 hover:text-[#006493] dark:hover:text-blue-300"}`}>
              <span className={`material-symbols-outlined ${isActive("/dashboard/profile") ? "fill-icon" : ""}`}>settings</span>
              <span className="text-[10px] font-bold">Settings</span>
            </button>
          </nav>
        )}

        {/* Main Canvas */}
        <main className={`${isSidebarHiddenForThisRoute ? '' : 'lg:ml-64'} min-h-screen relative flex flex-col pt-16 lg:pt-0`}>
          {/* TopNavBar Shell */}
          <header className={`fixed top-0 right-0 left-0 ${isSidebarHiddenForThisRoute ? '' : 'lg:left-64'} h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40 transition-colors duration-300`}>
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <div className="w-8 h-8 bg-[#006493] dark:bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm transition-colors">
                <span className="material-symbols-outlined text-sm font-bold">school</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-[#006493] dark:text-blue-400 tracking-tight transition-colors">AR-Learn</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 ml-auto">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <span className="material-symbols-outlined">{isDarkMode ? "light_mode" : "dark_mode"}</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-[4px] right-[4px] w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1e293b] transition-colors"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f172a]/50">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                      <span className="text-[10px] font-bold bg-[#006493] text-white px-2 py-0.5 rounded-md">1 New</span>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          navigate("/dashboard/self-study");
                        }}
                        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-orange-500">quiz</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Friday Challenge Available!</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Your weekly Readiness Quiz is unlocked. Test your knowledge now.</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-medium">Just now</p>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                      </button>
                    </div>
                    <div className="p-3 text-center border-t border-slate-100 dark:border-slate-800">
                      <button className="text-xs font-bold text-[#006493] dark:text-blue-400 hover:text-[#004e75] dark:hover:text-blue-300">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 lg:hidden ml-1 sm:ml-2 transition-colors">
                {user?.name ? (
                  <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVv1P6vCCzh6X0oZTjYzxBmailQ2lO4S6lhbfgPMftb1DHPVYW41Caj2fU-uABGM9OMy-pFctkVQMAnVzvEXe6gu0CxUPoCCzBTdQyMQpuDUZEc40ftMkLZ5WBlz-WpXNUg_O2HKgDnoGhtDgWWE7lHzhZDuhtNmn7ADbeMTacQ2LiknsgtwtcKXRWP22rFUl-XCf3wIfz8obGvM6EWIxdmb8QDnUcftNvEZ_A2LCuSJRcdhxXyu_bhjZHfKfiD9xn5tOuru_KA" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-[#006493] dark:text-blue-400 font-bold text-xs transition-colors">{user?.name?.charAt(0) || "S"}</div>
                )}
              </div>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <div className="flex-1 w-full lg:pt-16 pb-20 lg:pb-0">
            <div className={`${isSidebarHiddenForThisRoute ? 'w-full h-full p-0' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-full'}`}>
              <Outlet />
            </div>
          </div>

          {/* Floating Chat Window */}
          {isChatOpen && (
            <div className="ai-tutor-container fixed bottom-24 lg:bottom-10 right-4 lg:right-28 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden shrink-0 transition-colors duration-300">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006493] dark:text-blue-400 font-bold transition-colors">smart_toy</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white transition-colors">Ai tutor</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => dispatch(clearChat())} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">Clear</button>
                  <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#0f172a]/50 custom-scrollbar transition-colors">
                {messages.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 transition-colors">
                    Hello! I'm LearnLLM, your personal AI tutor. Let's explore your AR syllabus today. How can I help?
                  </div>
                ) : (
                  messages.map((msg: any, idx: number) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-black tracking-tighter transition-colors ${msg.role === "user" ? "bg-[#006493] dark:bg-blue-600 shadow-md" : "bg-slate-800 dark:bg-slate-700 shadow-sm"}`}>
                        {msg.role === "user" ? "ME" : "AI"}
                      </div>
                      <div className={`p-3.5 rounded-2xl text-sm max-w-[80%] font-medium transition-colors ${msg.role === "user" ? "bg-[#006493] dark:bg-blue-600 text-white rounded-tr-none shadow-md" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"}`}>
                        <div className="markdown-content">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex gap-3">
                     <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-black tracking-tighter shadow-sm transition-colors">AI</div>
                     <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-1.5 transition-colors">
                       <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce transition-colors"></div>
                       <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce transition-colors" style={{ animationDelay: "0.15s" }}></div>
                       <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce transition-colors" style={{ animationDelay: "0.3s" }}></div>
                     </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 transition-colors">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                    disabled={loading}
                    placeholder="Ask Ai tutor..."
                    className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-[#006493] dark:focus:ring-blue-500 text-slate-800 dark:text-white placeholder:text-slate-400 transition-all shadow-inner dark:shadow-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !inputText.trim()}
                    className="absolute right-2 p-2 bg-[#006493] dark:bg-blue-600 text-white rounded-lg hover:bg-[#004e75] dark:hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action AI Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="ai-tutor-container fixed bottom-20 lg:bottom-10 right-6 lg:right-10 size-14 sm:size-16 bg-[#006493] dark:bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform z-50 group shadow-xl border-2 border-white/20 dark:border-white/10"
          >
            <span className="material-symbols-outlined text-[28px] sm:text-[32px] group-hover:animate-pulse">
              {isChatOpen ? "close" : "smart_toy"}
            </span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
