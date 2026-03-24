import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";
import { useTypingEffect } from "./useTypingEffect";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
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
    setFormError("");

    // Frontend validation
    if (!name.trim() || name.trim().length < 2) {
      setFormError("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!email.trim()) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please check and try again.");
      return;
    }

    dispatch(registerUser({ name: name.trim(), email: email.toLowerCase().trim(), password }));
  };

  const handleSso = (provider: string) => {
    setSsoMessage(`${provider} sign-in is coming soon! Please use email signup for now.`);
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
    <div className={`flex flex-col min-h-screen w-full overflow-x-hidden ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background-light dark:bg-slate-900 text-slate-900 dark:text-white mesh-gradient flex flex-col min-h-screen w-full font-display transition-colors duration-300">
        <header className="flex items-center justify-between px-4 lg:px-12 h-16 lg:h-20 shrink-0">
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
          <div className="w-full max-w-[1080px] grid grid-cols-1 md:grid-cols-2 rounded-2xl md:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] glass-card">
            <div className="flex flex-col p-6 lg:p-10 relative bg-white/50 dark:bg-slate-900/50 md:order-2">
              <div className="flex mb-6">
                <div className="flex h-10 w-full max-w-[240px] items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50">
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:shadow-lg has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-xs font-semibold transition-all">
                    <span className="truncate">Login</span>
                    <input
                      className="invisible w-0"
                      name="auth-toggle"
                      type="radio"
                      value="Login"
                      onChange={() => navigate("/")}
                    />
                  </label>
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:shadow-lg has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-xs font-semibold transition-all">
                    <span className="truncate">Sign Up</span>
                    <input
                      defaultChecked
                      className="invisible w-0"
                      name="auth-toggle"
                      type="radio"
                      value="Sign Up"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Create Identity
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Join the next dimension of academic excellence.
                </p>
              </div>

              <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 dark:text-slate-300 text-xs font-medium ml-1">
                    Academic Name
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg group-focus-within:text-primary dark:group-focus-within:text-primary transition-colors">
                      person
                    </span>
                    <input
                      className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl h-12 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 input-glow transition-all"
                      placeholder="Full Name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 dark:text-slate-300 text-xs font-medium ml-1">
                    Educational Email
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg group-focus-within:text-primary dark:group-focus-within:text-primary transition-colors">
                      school
                    </span>
                    <input
                      className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl h-12 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 input-glow transition-all"
                      placeholder="student@university.edu"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-medium ml-1">
                      Create Neural Key
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg group-focus-within:text-primary dark:group-focus-within:text-primary transition-colors">
                        key
                      </span>
                      <input
                        className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl h-12 pl-12 pr-10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 input-glow transition-all text-xs"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 dark:text-slate-300 text-xs font-medium ml-1">
                      Confirm Neural Key
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg group-focus-within:text-primary dark:group-focus-within:text-primary transition-colors">
                        verified_user
                      </span>
                      <input
                        className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl h-12 pl-12 pr-10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 input-glow transition-all text-xs"
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 mt-1">
                  <input
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0 dark:focus:ring-offset-slate-900"
                    id="terms"
                    type="checkbox"
                    required
                  />
                  <label
                    className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer"
                    htmlFor="terms"
                  >
                    I accept the Quantum Security Protocols
                  </label>
                </div>

                {/* Consolidated error: backend errors take priority, then form errors */}
                {(error || formError) && (
                  <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl mt-1">
                    <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0 mt-0.5">error</span>
                    <p className="text-red-600 dark:text-red-400 text-xs font-medium leading-snug">{error || formError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full h-12 bg-primary hover:bg-primary/95 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span><span>Creating Account...</span></>
                  ) : (
                    <><span>Create Account</span><span className="material-symbols-outlined text-lg group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">rocket_launch</span></>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-center text-slate-400 dark:text-slate-500 text-[9px] mb-4 uppercase tracking-widest font-bold">
                  Or register with
                </p>
                {ssoMessage && (
                  <p className="text-center text-amber-600 dark:text-amber-400 text-xs font-medium mb-3 px-2">{ssoMessage}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSso("Google")}
                    className="flex items-center justify-center gap-2.5 h-11 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 shadow-sm">
                    <svg className="size-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="text-xs font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSso("GitHub")}
                    className="flex items-center justify-center gap-2.5 h-11 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 shadow-sm">
                    <svg className="size-4" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill={isDarkMode ? "#ffffff" : "#24292e"}></path>
                    </svg>
                    <span className="text-xs font-medium">GitHub</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center p-6 lg:p-10 bg-gradient-to-br from-primary/[0.03] to-accent-blue/[0.03] dark:from-primary/[0.08] dark:to-accent-blue/[0.08] relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-r border-white/50 dark:border-slate-800 md:order-1">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-green/10 dark:bg-accent-green/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-8 transition-colors">
                  <div className="bg-[#0da6f2] text-white p-1 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">view_in_ar</span>
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight">
                    Learn.AR
                  </h2>
                </div>

                <span className="inline-block px-2.5 py-1 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 text-[9px] font-bold tracking-widest uppercase mb-4 mt-2 lg:mt-0">
                  Quantum Learning
                </span>

                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-5">
                  {line1} {parts.length > 1 && <br />}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue dark:from-blue-400 dark:to-cyan-300">
                    {line2}
                  </span>
                  <span className="inline-block w-[3px] h-[1em] bg-slate-900 dark:bg-white ml-1 align-middle animate-pulse"></span>
                </h1>

                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6 max-w-[400px]">
                  Experience a high-end academic dashboard designed for the next generation of tech leaders. Access your interactive learning environment now.
                </p>

                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-slate-700/80 hover:border-primary/20 dark:hover:border-primary/40 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-primary dark:text-blue-400 text-xl">
                      deployed_code
                    </span>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-xs">
                        AR Interactivity
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Visualize complex algorithms in 3D
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-slate-700/80 hover:border-accent-green/20 dark:hover:border-accent-green/40 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-accent-green text-xl">
                      psychology
                    </span>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-xs">
                        AI Tutor
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Personalized learning paths for every student
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-4 lg:px-12 py-6 lg:py-0 min-h-16 shrink-0 flex flex-col lg:flex-row justify-between items-center text-slate-400 dark:text-slate-500 text-[10px] gap-4 lg:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <a className="hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">
              Security Protocol
            </a>
            <a className="hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">
              Support Lab
            </a>
          </div>
          <p className="text-center">© 2024 Smart AR Learn. Next-Gen Academic Interface.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
