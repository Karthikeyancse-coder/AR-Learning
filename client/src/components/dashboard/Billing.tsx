import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FREE_FEATURES = [
  { text: "Basic 3D models", included: true },
  { text: "Limited AR access", included: true },
  { text: "Standard quizzes", included: true },
  { text: "Basic dashboard insights", included: true },
  { text: "Community-level support", included: true },
  { text: "AI-powered recommendations", included: false },
  { text: "Full AR learning access", included: false },
  { text: "Priority support", included: false },
];

const PREMIUM_FEATURES = [
  { text: "Advanced 3D models", included: true },
  { text: "Full AR learning access", included: true },
  { text: "Smart adaptive quizzes", included: true },
  { text: "Detailed performance analytics", included: true },
  { text: "AI-powered recommendations", included: true },
  { text: "Priority access to premium modules", included: true },
  { text: "More future content access", included: true },
  { text: "Faster priority support", included: true },
];

const COMPARISON = [
  { feature: "3D Models", free: "Basic", premium: "Advanced" },
  { feature: "AR Access", free: "Limited", premium: "Full" },
  { feature: "Quiz System", free: "Standard", premium: "Smart Adaptive" },
  { feature: "Dashboard Insights", free: "Basic", premium: "Detailed" },
  { feature: "AI Features", free: "No", premium: "Yes" },
  { feature: "Support", free: "Standard", premium: "Priority" },
];

const WHY_UPGRADE = [
  { icon: "view_in_ar", title: "Advanced AR Models", desc: "Access next-gen 3D visualizations for biology, chemistry & more." },
  { icon: "psychology", title: "AI Study Help", desc: "Get personalized AI recommendations based on your weak areas." },
  { icon: "bar_chart", title: "Deep Analytics", desc: "Track every metric — accuracy, streaks, time, and performance trends." },
  { icon: "bolt", title: "Priority Access", desc: "Get new modules and content before anyone else." },
];

const Billing = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleUpgrade = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#0f172a] -m-6 sm:-m-8 pb-20 transition-colors duration-300">

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 bg-[#006493] dark:bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/30 animate-bounce">
          <span className="material-symbols-outlined">rocket_launch</span>
          <span className="text-sm font-bold">Payment gateway coming soon! Stay tuned 🚀</span>
        </div>
      )}

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#006493] via-[#0284c7] to-[#0ea5e9] dark:from-[#0f172a] dark:via-[#1e3a5f] dark:to-[#0f172a] px-6 sm:px-12 py-16 sm:py-20 text-white text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-300 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">AR-Learn Premium</span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">Choose Your<br /><span className="text-cyan-300">Learning Plan</span></h1>
          <p className="text-blue-100 text-base leading-relaxed">Unlock more AR learning power, advanced models, and premium academic tools.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-14 mt-10">

        {/* ── Pricing Cards ── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Free Plan */}
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col shadow-sm transition-colors duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Free Plan</span>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest">Current Plan</span>
              </div>
              <div className="mt-4 mb-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white">₹0</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">For getting started</p>
              <ul className="space-y-3 flex-1 mb-8">
                {FREE_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className={`material-symbols-outlined text-[18px] shrink-0 ${f.included ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`}>
                      {f.included ? "check_circle" : "cancel"}
                    </span>
                    <span className={f.included ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500 line-through"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-bold text-sm cursor-not-allowed">
                Current Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-gradient-to-br from-[#006493] to-[#0ea5e9] dark:from-[#1e3a5f] dark:to-[#0c4a6e] border-2 border-[#0284c7] dark:border-blue-500 rounded-2xl p-8 flex flex-col shadow-2xl shadow-blue-500/25 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-[40px] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">Premium Plan</span>
                  <span className="text-[10px] font-bold bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full uppercase tracking-widest">⭐ Best Value</span>
                </div>
                <div className="mt-4 mb-1">
                  <span className="text-5xl font-black text-white">₹199</span>
                  <span className="text-blue-200 text-sm ml-2">/ month</span>
                </div>
                <p className="text-xs text-blue-200 mb-6">For serious learners</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {PREMIUM_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-[18px] shrink-0 text-cyan-300">check_circle</span>
                      <span className="text-white">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleUpgrade}
                  className="w-full py-3.5 rounded-xl bg-white dark:bg-white text-[#006493] font-black text-sm hover:bg-blue-50 transition-all active:scale-[0.98] shadow-lg shadow-white/20 relative z-10"
                >
                  Upgrade to Premium ✦
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 text-center">Plan Comparison</h2>
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
            <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800/60 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <span>Feature</span>
              <span className="text-center">Free</span>
              <span className="text-center text-[#006493] dark:text-blue-400">Premium</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 items-center ${i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-800/30"} border-b border-slate-100 dark:border-slate-800 last:border-0`}>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{row.feature}</span>
                <span className="text-center text-sm text-slate-400 dark:text-slate-500">{row.free}</span>
                <span className="text-center text-sm font-bold text-[#006493] dark:text-blue-400">{row.premium}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Upgrade ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 text-center">Why Go Premium?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_UPGRADE.map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:border-[#006493]/30 dark:hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#006493] dark:text-blue-400">{item.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Billing Info Card ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Subscription Details</h2>
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
            {[
              { label: "Current Plan", value: "Free", icon: "workspace_premium" },
              { label: "Renewal Date", value: "—", icon: "calendar_today" },
              { label: "Payment Method", value: "Not added", icon: "credit_card" },
              { label: "Upgrade Status", value: "Available", icon: "upgrade", highlight: true },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-800/30"} border-b border-slate-100 dark:border-slate-800 last:border-0`}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">{item.icon}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${item.highlight ? "text-emerald-500" : "text-slate-800 dark:text-slate-200"}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#006493] to-[#0ea5e9] dark:from-[#1e3a5f] dark:to-[#0c4a6e] rounded-3xl p-10 text-center text-white shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-[60px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-3">Ready to unlock <span className="text-cyan-300">Premium</span> learning?</h2>
            <p className="text-blue-100 mb-8 text-sm">Join thousands of students accelerating their academic journey with AR-Learn Premium.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleUpgrade}
                className="px-8 py-4 bg-white text-[#006493] font-black rounded-2xl hover:bg-blue-50 transition-all active:scale-[0.98] shadow-lg shadow-white/20 text-sm"
              >
                Go Premium for ₹199 ✦
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-2xl hover:border-white/70 transition-all text-sm"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Billing;
