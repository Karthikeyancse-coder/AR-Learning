import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";
import { useTypingEffect } from "./useTypingEffect";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ssoMessage, setSsoMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    dispatch(loginUser({ email: email.toLowerCase().trim(), password }));
  };

  const handleSso = (provider: string) => {
    setSsoMessage(`${provider} sign-in is coming soon! Please use email login for now.`);
    setTimeout(() => setSsoMessage(""), 4000);
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const typingText = useTypingEffect("Master the \nNew Dimension", 60, 2000);
  const parts = typingText.split("\n");
  const line1 = parts[0] || "";
  const line2 = parts.length > 1 ? parts[1] : "";

  return (
    <div className={`flex flex-col min-h-screen w-full overflow-x-hidden font-display ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-[#f8fafc] dark:bg-[#131022] text-slate-900 dark:text-white mesh-gradient flex flex-col min-h-screen w-full transition-colors duration-300">
        <header className="flex items-center justify-between px-4 lg:px-12 h-16 lg:h-20 shrink-0 sticky top-0 z-50 whitespace-nowrap">
          <div className="flex items-center gap-3 px-2 text-slate-900 dark:text-white transition-colors">
            {/* <div className="bg-[#0da6f2] text-white p-1 rounded-lg flex items-center justify-center"> */}
            {/* <span className="material-symbols-outlined text-2xl">view_in_ar</span> */}
            {/* </div> */}
            {/* <h2 className="text-xl font-extrabold tracking-tight">AR-Learn</h2> */}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="relative z-[100] pointer-events-auto flex items-center justify-center size-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
            >
              <span className="material-symbols-outlined !text-xl animate-spin-slow">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8 md:px-12 md:py-0 w-full overflow-y-auto md:overflow-visible">
          <div className="w-full max-w-[1080px] grid grid-cols-1 md:grid-cols-2 rounded-2xl md:rounded-3xl shadow-2xl glass-card border-none dark:border-solid dark:border-white/5 dark:bg-[#1a1631]/60 overflow-hidden">
            <div className="hidden md:flex flex-col justify-center p-6 lg:p-10 bg-gradient-to-br from-primary/5 to-accent-blue/5 dark:from-primary/10 dark:to-accent-blue/5 border-r border-slate-100 dark:border-white/5 relative group md:order-1">
              <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 dark:bg-accent-blue rounded-full blur-[100px] dark:blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-green/20 dark:bg-accent-green rounded-full blur-[100px] dark:blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-10 transition-colors">
                  <div className="bg-[#0da6f2] text-white p-1 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">view_in_ar</span>
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight">AR-Learn</h2>
                </div>

                <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 dark:bg-accent-green/20 text-primary dark:text-accent-green text-[10px] font-bold tracking-widest uppercase mb-6">
                  Quantum Learning
                </span>

                <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1] mb-6 text-slate-900 dark:text-white">
                  {line1} {parts.length > 1 && <br />}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue dark:from-accent-blue dark:to-accent-green">
                    {line2}
                  </span>
                  <span className="inline-block w-[3px] h-[1em] bg-slate-900 dark:bg-white ml-1 align-middle animate-pulse"></span>
                </h1>

                <p className="text-slate-500 dark:text-white/60 text-lg leading-relaxed mb-8">
                  Experience a high-end academic dashboard designed for the next generation of tech leaders. Access your interactive learning environment now.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-accent-blue/40 transition-all shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-primary dark:text-accent-blue">deployed_code</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">AR Interactivity</h4>
                      <p className="text-xs text-slate-500 dark:text-white/40">Visualize complex algorithms in 3D</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-accent-green/40 dark:hover:border-accent-green/40 transition-all shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-accent-green">psychology</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Tutor</h4>
                      <p className="text-xs text-slate-500 dark:text-white/40">Personalized learning paths for every student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6 lg:p-10 relative bg-white/40 dark:bg-[#131022]/40 md:order-2">
              <div className="flex mb-6">
                <div className="flex h-10 w-full max-w-[240px] items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50">
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:shadow-lg has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-xs font-semibold transition-all">
                    <span className="truncate">Login</span>
                    <input defaultChecked className="invisible w-0" name="auth-toggle" type="radio" value="Login" />
                  </label>
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:shadow-lg has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-xs font-semibold transition-all">
                    <span className="truncate">Sign Up</span>
                    <input className="invisible w-0" name="auth-toggle" type="radio" value="Sign Up" onChange={() => navigate("/signup")} />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome Back</h2>
                <p className="text-xs text-slate-500 dark:text-white/40">Initialize your session to continue your curriculum.</p>
              </div>

              <form className="flex flex-col gap-5 md:gap-3.5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 md:gap-1.5">
                  <label className="text-sm md:text-xs font-medium text-slate-700 dark:text-white/70 md:ml-1">Academic Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors text-slate-400 dark:text-white/30 group-focus-within:text-primary dark:group-focus-within:text-primary">
                      mail
                    </span>
                    <input
                      className="w-full rounded-xl h-14 md:h-12 md:text-sm pl-12 pr-4 focus:outline-none input-glow transition-all bg-[#f1f5f9] dark:bg-[#1a1631]/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                      placeholder="yourname@academy.edu"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-sm md:text-xs font-medium text-slate-700 dark:text-white/70 md:ml-1">Neural Key (Password)</label>
                    <a className="text-xs font-bold transition-colors text-primary hover:text-accent-blue dark:hover:text-accent-blue" href="#">
                      Forgot Key?
                    </a>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors text-slate-400 dark:text-white/30 group-focus-within:text-primary dark:group-focus-within:text-primary">
                      lock
                    </span>
                    <input
                      className="w-full rounded-xl h-14 md:h-12 md:text-sm pl-12 pr-10 focus:outline-none input-glow transition-all bg-[#f1f5f9] dark:bg-[#1a1631]/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                      placeholder="••••••••••••"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-primary dark:hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-2.5 mt-2 md:mt-1">
                  <input
                    className="w-5 h-5 md:w-4 md:h-4 rounded focus:ring-primary focus:ring-offset-0 border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-primary"
                    id="remember"
                    type="checkbox"
                  />
                  <label className="text-sm md:text-xs cursor-pointer text-slate-500 dark:text-white/50" htmlFor="remember">
                    Stay synchronized for 30 days
                  </label>
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl mt-1">
                    <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0 mt-0.5">error</span>
                    <p className="text-red-600 dark:text-red-400 text-xs font-medium leading-snug">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 md:mt-2 w-full h-14 md:h-12 bg-primary hover:bg-primary/90 text-white font-bold md:text-sm rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span><span>Connecting...</span></>
                  ) : (
                    <><span>Execute Connection</span><span className="material-symbols-outlined text-xl md:text-lg group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">bolt</span></>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="mt-2 w-full h-12 bg-transparent hover:bg-primary/10 text-primary dark:text-accent-blue font-bold md:text-sm rounded-xl border border-primary dark:border-accent-blue transition-all flex items-center justify-center gap-2"
                >
                  <span>Skip Login & Go to Dashboard</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </form>

              <div className="mt-10 md:mt-6 pt-8 md:pt-6 border-t border-slate-100 dark:border-white/5">
                <p className="text-center text-[10px] md:text-[9px] mb-6 md:mb-4 uppercase tracking-widest font-bold text-slate-400 dark:text-white/30">
                  Or sync with
                </p>
                {ssoMessage && (
                  <p className="text-center text-amber-600 dark:text-amber-400 text-xs font-medium mb-3 px-2">{ssoMessage}</p>
                )}
                <div className="grid grid-cols-2 gap-4 md:gap-3">
                  <button
                    type="button"
                    onClick={() => handleSso('Google')}
                    className="flex items-center justify-center gap-3 md:gap-2.5 h-12 md:h-11 rounded-xl transition-colors shadow-sm dark:shadow-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white">
                    <svg className="size-5" viewBox="0 0 24 24">
                      {isDarkMode ? (
                        <>
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="currentColor"></path>
                        </>
                      ) : (
                        <>
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                        </>
                      )}
                    </svg>
                    <span className="text-sm md:text-xs font-medium">Google Core</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSso('GitHub')}
                    className="flex items-center justify-center gap-3 md:gap-2.5 h-12 md:h-11 rounded-xl transition-colors shadow-sm dark:shadow-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white">
                    <svg className="size-5 md:size-4" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill={isDarkMode ? "currentColor" : "#24292e"}></path>
                    </svg>
                    <span className="text-sm md:text-xs font-medium">GitHub ID</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-4 lg:px-12 py-6 lg:py-0 min-h-16 shrink-0 flex flex-col lg:flex-row justify-between items-center text-slate-400 dark:text-white/30 text-[10px] gap-4 lg:gap-0">
          <div className="flex items-center gap-6">
            <a className="transition-colors hover:text-primary dark:hover:text-white" href="#">Security Protocol</a>
            <a className="transition-colors hover:text-primary dark:hover:text-white" href="#">Terms of Service</a>
            <a className="transition-colors hover:text-primary dark:hover:text-white" href="#">Support Lab</a>
          </div>
          <p>© 2024 AR-Learn. Next-Gen Academic Interface.</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
