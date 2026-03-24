import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Mock auth — replace with real API call in Phase 2
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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4fd] via-[#f0f4ff] to-[#e8fdf5] p-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#006493]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,100,147,0.12)] p-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#006493] to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[#006493]/30 mb-4">
            <span className="material-symbols-outlined text-3xl text-white">school</span>
          </div>
          <h1 className="text-2xl font-black text-[#181c22] tracking-tight">Teacher Portal</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your Learn.AR educator account</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
              <input
                type="email"
                placeholder="teacher@school.edu"
                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#006493] focus:ring-1 focus:ring-[#006493] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#006493] focus:ring-1 focus:ring-[#006493] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#006493] hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-[#006493]/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">login</span>
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8">
          Are you a student?{" "}
          <a href="/" className="text-[#006493] font-bold hover:underline">
            Student Login →
          </a>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
