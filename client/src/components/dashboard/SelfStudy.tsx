import React from 'react';

const SelfStudy = () => {
  return (
    <div className="w-full h-full p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[#f9f9ff] dark:bg-[#0B1121] text-[#181c22] dark:text-white min-h-screen">
      <style>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        :is(.dark .glass-card) {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hero-glow {
            box-shadow: 0 0 60px -15px rgba(6, 182, 212, 0.3);
        }
      `}</style>

      {/* 1. Daily Challenge Hero */}
      <section className="mb-10 relative overflow-hidden rounded-3xl glass-card border border-cyan-500/30 hero-glow bg-gradient-to-br from-slate-100 via-white to-cyan-50 dark:from-slate-900 dark:via-[#0B1121] dark:to-cyan-950/40">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 pointer-events-none text-cyan-600 dark:text-cyan-400">
          <span className="material-symbols-outlined text-[150px]">local_fire_department</span>
        </div>
        <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-cyan-500/30 shadow-sm">
                Daily Goal
              </span>
              <span className="text-orange-500 dark:text-orange-400 font-bold text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">local_fire_department</span> 12 Day Streak
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Advanced Biochemistry</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl leading-relaxed">
              Your AI tutor noticed you struggled with enzyme kinetics yesterday. Conquer today's challenge to solidify your understanding and earn a 2x XP boost!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-900 font-black px-8 py-3.5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.3)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer">
                Start Today's Challenge <span className="material-symbols-outlined">play_circle</span>
              </button>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-300">
                  <span className="text-cyan-600 dark:text-cyan-400">+150 XP</span> Reward
                </div>
                <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[60%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 lg:pb-8">
        
        {/* 2. Auto-Updated Challenge Grid (Left Column) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400">target</span>
              Recommended for You
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">filter_list</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Mock Test */}
            <div className="glass-card group hover:shadow-[0_4px_20px_rgba(139,92,246,0.1)] dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/60 dark:border-slate-700/50 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-400 to-violet-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined text-violet-600 dark:text-violet-500">school</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mock Test</span>
                  </div>
                  <span className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-red-200 dark:border-red-500/20 shadow-sm">Hard</span>
                </div>
                <h4 className="text-xl font-black mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-500 transition-colors text-slate-900 dark:text-white">Quantum Physics Full</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Recommended because your exam is in 14 days. Time to test your endurance!</p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> 120m</span>
                  <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400"><span className="material-symbols-outlined text-[14px]">stars</span> +300 XP</span>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center backdrop-blur">
                <div className="flex -space-x-2 drop-shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-700">A</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-emerald-700">B</div>
                  <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-cyan-700">+4</div>
                </div>
                <button className="text-violet-600 dark:text-violet-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Attempt <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: Weak Area Rescue */}
            <div className="glass-card group hover:shadow-[0_4px_20px_rgba(249,115,22,0.1)] dark:hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-orange-900/5 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined text-orange-600 dark:text-orange-500">troubleshooting</span>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wider">Rescue Drill</span>
                  </div>
                  <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-orange-200 dark:border-orange-500/20 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span> Priority
                  </span>
                </div>
                <h4 className="text-xl font-black mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors text-slate-900 dark:text-white">Redox Reactions</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Detected as your weakest topic in the last global assessment.</p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-t border-orange-100 dark:border-slate-800 pt-4">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> 15m</span>
                  <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400"><span className="material-symbols-outlined text-[14px]">stars</span> +75 XP</span>
                </div>
              </div>
              <div className="mt-auto p-4 bg-orange-100/50 dark:bg-orange-900/20 border-t border-orange-200/50 dark:border-orange-500/20 flex justify-end items-center">
                <button className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-400 text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-md dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                  Fix Weakness <span className="material-symbols-outlined text-sm">build</span>
                </button>
              </div>
            </div>

            {/* Card 3: Speed Test */}
            <div className="glass-card group hover:shadow-[0_4px_20px_rgba(6,182,212,0.1)] dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/60 dark:border-slate-700/50 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-500">bolt</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Speed Test</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-emerald-200 dark:border-emerald-500/20 shadow-sm">Medium</span>
                </div>
                <h4 className="text-xl font-black mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors text-slate-900 dark:text-white">Mental Math Sprint</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Boost your reaction time. 10s per question. Adaptive difficulty scaling.</p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> Infinite</span>
                  <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400"><span className="material-symbols-outlined text-[14px]">stars</span> Up to 500 XP</span>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center backdrop-blur">
                <div className="text-[10px] font-bold text-slate-500 uppercase">High Score: 4250</div>
                <button className="text-cyan-600 dark:text-cyan-500 font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-transparent">
                  Sprint <span className="material-symbols-outlined text-[16px]">run_circle</span>
                </button>
              </div>
            </div>

            {/* Card 4: New 3D Revision */}
            <div className="glass-card group hover:shadow-[0_4px_20px_rgba(236,72,153,0.1)] dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/60 dark:border-slate-700/50 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-400 to-rose-500"></div>
              <div className="p-6 overflow-hidden">
                <div className="absolute -right-4 -top-4 w-28 h-28 bg-pink-500/10 dark:bg-pink-500/15 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all pointer-events-none"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined text-pink-600 dark:text-pink-500">view_in_ar</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">3D Revision</span>
                  </div>
                  <span className="bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">New</span>
                </div>
                <h4 className="text-xl font-black mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors text-slate-900 dark:text-white relative z-10">Human Heart Anatomy</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 relative z-10">Spatial recall challenge! Identify 12 key chambers and valves in AR.</p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-t border-slate-100 dark:border-slate-800 pt-4 relative z-10">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> 10m</span>
                  <span className="flex items-center gap-1 text-pink-600 dark:text-pink-400"><span className="material-symbols-outlined text-[14px]">stars</span> +100 XP</span>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/50 flex justify-end items-center relative z-10 backdrop-blur">
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-md">
                  Launch AR <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Smart Dashboards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 3. Streak and Rewards Panel */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border-t-[5px] border-t-orange-500">
            <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="material-symbols-outlined text-orange-500">emoji_events</span>
              Rewards & Stats
            </h4>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/50 dark:bg-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/60 dark:border-transparent drop-shadow-sm dark:drop-shadow-none">
                <span className="material-symbols-outlined text-orange-500 mb-1 text-3xl">local_fire_department</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">12</span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Day Streak</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/60 dark:border-transparent drop-shadow-sm dark:drop-shadow-none">
                <span className="material-symbols-outlined text-cyan-500 mb-1 text-3xl">workspace_premium</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">14.2k</span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Total XP</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Next Unlock</span>
                    <span className="text-xs font-black text-slate-700 dark:text-white">Scholar Badge</span>
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-400 text-xs font-black">800 XP left</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-cyan-500 w-[75%] rounded-full dark:shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-5">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-3">Recent Achievements</span>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-500/20 border-2 border-yellow-400 dark:border-yellow-500/50 flex flex-col items-center justify-center shrink-0 cursor-help transform hover:-translate-y-1 transition-transform shadow-sm" title="Streak Master: 10 Days">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 border-2 border-violet-400 dark:border-violet-500/50 flex flex-col items-center justify-center shrink-0 cursor-help transform hover:-translate-y-1 transition-transform shadow-sm" title="Quiz Novice: Completed 5 quizzes">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-400 dark:border-emerald-500/50 flex flex-col items-center justify-center shrink-0 cursor-help transform hover:-translate-y-1 transition-transform shadow-sm" title="Perfect Score: 100% on Mock Test">
                    <span className="text-lg">💯</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 border-dashed flex flex-col items-center justify-center shrink-0 opacity-60">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">lock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Smart Recommendation Panel */}
          <div className="glass-card rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight relative z-10">
              <span className="material-symbols-outlined text-blue-500">psychology</span>
              AI Insights
            </h4>
            
            <div className="flex items-center gap-3 mb-5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-3 rounded-xl relative z-10">
              <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-transparent shadow-sm">
                <span className="material-symbols-outlined text-[20px]">speed</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">Learner Profile</span>
                <p className="text-slate-800 dark:text-white text-sm font-black tracking-wide">Fast Learner</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
               <div className="p-3.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-red-500 dark:text-red-400 mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] bg-red-100 dark:bg-red-500/20 rounded text-red-600 dark:text-red-400 p-0.5">warning</span> Focus Area Detected
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed leading-[18px]">
                  Cellular Respiration stages often confused. Recommended a 5-min interactive model review to clarify the Krebs cycle.
                </p>
               </div>
               
               <button className="w-full py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-white transition-all cursor-pointer shadow-sm dark:shadow-none">
                 Generate Custom Practice
               </button>
            </div>
          </div>

          {/* 5. Weekly Progress Section */}
          <div className="glass-card rounded-3xl p-6 shadow-sm">
            <h4 className="font-black text-sm mb-5 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="material-symbols-outlined text-emerald-500">monitoring</span>
              Weekly Activity
            </h4>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Challenges Completed</span>
                </div>
                <span className="text-lg font-black text-slate-800 dark:text-white">18</span>
              </div>
              
              <div className="flex items-center justify-between p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-500 shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-[16px]">quiz</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Quizzes Finished</span>
                </div>
                <span className="text-lg font-black text-slate-800 dark:text-white">7</span>
              </div>
              
              <div className="flex items-center justify-between p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-500 shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">3D Revisions Done</span>
                </div>
                <span className="text-lg font-black text-slate-800 dark:text-white">4</span>
              </div>

              <div className="flex items-center justify-between p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm dark:shadow-none">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Mock Tests Attempted</span>
                </div>
                <span className="text-lg font-black text-slate-800 dark:text-white">1</span>
              </div>
            </div>
            
            <button className="w-full mt-4 py-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400 transition-all bg-white/50 dark:bg-slate-800/20 cursor-pointer shadow-sm">
              View Detailed Analytics
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelfStudy;
