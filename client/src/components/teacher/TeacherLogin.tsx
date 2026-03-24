import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("teacher_token", "mock_teacher_jwt");
        navigate("/teacher/home");
      } else {
        setError("Please enter both email and password.");
      }
      setIsLoading(false);
    }, 900);
  };

  // ── Theme tokens ──────────────────────────────────────────────────────
  const page = dark
    ? { bg: "#0d1117", text: "#e2e8f0", sub: "#94a3b8", border: "#1e293b" }
    : { bg: "#f9f9ff", text: "#181c22", sub: "#64748b", border: "#e2e8f0" };

  const card = dark
    ? { bg: "#161b22", border: "#1e293b" }
    : { bg: "#ffffff", border: "rgba(255,255,255,0.3)" };

  const input = dark
    ? "bg-[#1e293b] text-slate-100 placeholder-slate-500 border border-[#334155] focus:border-[#006493] focus:bg-[#1e293b] focus:ring-2 focus:ring-[#006493]/30"
    : "bg-[#f1f3fc] text-[#181c22] placeholder-slate-400 border-none focus:ring-2 focus:ring-[#006493]/20 focus:bg-white";

  const utilBtn = dark
    ? "hover:bg-slate-800 text-slate-400"
    : "hover:bg-slate-100 text-slate-500";

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        fontFamily: "Inter, sans-serif",
        background: dark
          ? "#0d1117"
          : "#f9f9ff",
        backgroundImage: dark
          ? "none"
          : "radial-gradient(at 0% 0%,hsla(220,100%,95%,1) 0,transparent 50%),radial-gradient(at 50% 0%,hsla(270,100%,97%,1) 0,transparent 50%),radial-gradient(at 100% 0%,hsla(330,100%,95%,1) 0,transparent 50%)",
      }}
    >
      {/* Top utility bar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-end px-8 h-16 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button className={`p-2 rounded-full transition-all ${utilBtn}`}>
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-full transition-all ${utilBtn}`}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined">{dark ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
      </header>

      {/* Centered card */}
      <main className="flex-grow flex items-center justify-center px-4 py-24 md:px-8">
        <div
          className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-[2rem] overflow-hidden transition-colors duration-300"
          style={{
            background: card.bg,
            border: `1px solid ${card.border}`,
            boxShadow: dark
              ? "0 40px 100px -20px rgba(0,0,0,0.5)"
              : "0 40px 100px -20px rgba(0,75,112,0.15)",
          }}
        >
          {/* ── Left: Blue Brand Panel (same in both modes) ── */}
          <div
            className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #004b70 0%, #006493 100%)" }}
          >
            {/* SVG mesh */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
              <svg viewBox="0 0 500 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <polygon points="250,0 500,150 500,450 250,600 0,450 0,150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6"/>
                <polygon points="250,60 440,175 440,425 250,540 60,425 60,175" fill="none" stroke="white" strokeWidth="0.6"/>
                <circle cx="250" cy="300" r="140" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4"/>
                <circle cx="250" cy="300" r="80" fill="none" stroke="white" strokeWidth="0.4" opacity="0.3"/>
                <line x1="0" y1="0" x2="500" y2="600" stroke="white" strokeWidth="0.3" opacity="0.3"/>
                <line x1="500" y1="0" x2="0" y2="600" stroke="white" strokeWidth="0.3" opacity="0.3"/>
                <circle cx="250" cy="300" r="10" fill="white" opacity="0.2"/>
                <circle cx="60" cy="175" r="6" fill="white" opacity="0.15"/>
                <circle cx="440" cy="175" r="6" fill="white" opacity="0.15"/>
                <circle cx="440" cy="425" r="6" fill="white" opacity="0.15"/>
                <circle cx="60" cy="425" r="6" fill="white" opacity="0.15"/>
              </svg>
            </div>

            {/* Top */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase">
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  Learn.AR
                </div>
                <span className="inline-block px-3 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase rounded-full">
                  Teacher Portal
                </span>
              </div>
              <h1 className="font-black text-4xl leading-tight tracking-tight mb-5" style={{ fontFamily: "Manrope, Inter, sans-serif" }}>
                Empower the{" "}
                <span style={{ color: "#cae6ff" }}>Next Dimension</span>{" "}
                of Teaching.
              </h1>
              <p className="text-white/75 text-base leading-relaxed max-w-sm">
                Access advanced AR curriculum tools and real-time student tracking in one unified educator workspace.
              </p>
            </div>

            {/* Feature tiles */}
            <div className="relative z-10 space-y-4">
              {[
                { icon: "groups", title: "Class Management", desc: "Seamlessly organize student groups and lesson schedules." },
                { icon: "monitoring", title: "Student Progress", desc: "Real-time visualization of academic growth and engagement." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-xl bg-white/10 shrink-0">
                    <span className="material-symbols-outlined text-[22px]" style={{ color: "#cae6ff" }}>{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] mb-0.5" style={{ fontFamily: "Manrope, Inter, sans-serif" }}>{f.title}</h3>
                    <p className="text-[12px] text-white/65 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Login Form ── */}
          <div
            className="p-8 md:p-14 flex flex-col justify-center transition-colors duration-300"
            style={{ background: card.bg }}
          >
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #004b70, #006493)" }}>
                <span className="material-symbols-outlined text-white text-[18px]">view_in_ar</span>
              </div>
              <span className="font-black text-[#006493] text-lg tracking-tight">Learn.AR</span>
            </div>

            <div className="mb-10">
              <h2 className="font-black text-3xl tracking-tight mb-2" style={{ fontFamily: "Manrope, Inter, sans-serif", color: page.text }}>
                Welcome Back
              </h2>
              <p className="font-medium text-sm" style={{ color: page.sub }}>Please enter your institutional credentials.</p>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-2xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: page.sub }} htmlFor="email">
                  Institutional Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">alternate_email</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@academy.edu"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl text-sm font-medium focus:outline-none transition-all ${input}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold uppercase tracking-widest" style={{ color: page.sub }} htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-bold text-[#006493] hover:underline underline-offset-4 uppercase tracking-widest">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    className={`w-full pl-12 pr-5 py-4 rounded-2xl text-sm font-medium focus:outline-none transition-all ${input}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3 ml-1">
                <input id="remember" type="checkbox" className="w-5 h-5 rounded-md border-slate-500 accent-[#006493]" />
                <label htmlFor="remember" className="text-sm font-medium" style={{ color: page.sub }}>
                  Remember this workstation
                </label>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 text-white font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #004b70 0%, #006493 100%)",
                  boxShadow: "0 8px 24px -8px rgba(0,75,112,0.4)",
                  fontFamily: "Manrope, Inter, sans-serif",
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Student login link */}
            <div
              className="mt-10 pt-6 border-t text-center transition-colors duration-300"
              style={{ borderColor: dark ? "#1e293b" : "#f1f5f9" }}
            >
              <p className="text-sm mb-4 font-medium" style={{ color: page.sub }}>
                Are you a student? Access your learning portal here.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 group hover:scale-[1.02]"
                style={{
                  border: `1px solid ${dark ? "rgba(0,100,147,0.4)" : "rgba(0,100,147,0.2)"}`,
                  background: dark ? "rgba(0,100,147,0.12)" : "rgba(0,100,147,0.04)",
                  color: "#006493",
                  fontFamily: "Manrope, Inter, sans-serif",
                }}
              >
                <span className="material-symbols-outlined text-[20px]">school</span>
                Go to Student Login
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: page.sub }}>
                New institution?{" "}
                <a href="#" className="font-bold text-indigo-500 hover:underline underline-offset-4">
                  Contact Academic Sales
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-6 border-t transition-colors duration-300"
        style={{
          background: dark ? "rgba(13,17,23,0.9)" : "rgba(249,249,255,0.7)",
          backdropFilter: "blur(8px)",
          borderColor: dark ? "#1e293b" : "rgba(226,232,240,0.4)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <p className="text-xs tracking-widest uppercase" style={{ color: page.sub }}>
            © 2024 Learn.AR Digital Atheneum. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms of Service", "Institutional Access", "Support"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs tracking-widest uppercase hover:text-[#006493] hover:underline underline-offset-4 transition-colors"
                style={{ color: page.sub }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeacherLogin;
