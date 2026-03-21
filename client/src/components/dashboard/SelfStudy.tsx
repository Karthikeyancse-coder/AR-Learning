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
      `}</style>

      {/* Header Section */}
      <header className="mb-10">
        <h2 className="text-3xl font-black tracking-tight mb-1 text-slate-900 dark:text-white">Assignments</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Track tasks, deadlines, and submissions.</p>
      </header>

      {/* Summary Cards Layout */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
          <span className="text-[#006493] dark:text-blue-400 text-xs font-bold uppercase tracking-widest">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">12</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">Tasks</span>
          </div>
        </div>
        <div className="bg-[#0daffd]/10 border border-[#006493]/20 dark:border-blue-400/20 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-[#006493] dark:text-blue-400 text-xs font-bold uppercase tracking-widest">Pending</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#006493] dark:text-blue-400">4</span>
            <span className="text-[#006493]/60 dark:text-blue-400/60 text-sm">Active</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">Submitted</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">7</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">Done</span>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest">Overdue</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-red-600 dark:text-red-400">1</span>
            <span className="text-red-600/60 dark:text-red-400/60 text-sm">Alert</span>
          </div>
        </div>
      </section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 lg:pb-8">
        {/* Assignments List (Left/Center Column) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-[#006493] dark:text-blue-400">list_alt</span>
              Active Tasks
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#006493] dark:bg-blue-500 text-white shadow-sm">All</button>
              <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 shadow-sm">Drafts</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="glass-card group hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/40 dark:border-slate-700/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-[#006493]/10 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-[#006493] dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">biotech</span>
                  </div>
                  <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">Urgent</span>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">Organic Chemistry Quiz</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">Complete the virtual lab experiment and submit your molecular structure findings.</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006493] dark:bg-blue-500 w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Today, 11:59 PM
                </div>
                <button className="text-[#006493] dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Open <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card group hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/40 dark:border-slate-700/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">history_edu</span>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">Normal</span>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">Ancient Civilizations Essay</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">Draft a 1500-word analysis on the economic structures of Mesopotamia.</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    <span>Progress</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0daffd] dark:bg-sky-400 w-1/5 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Oct 24, 2023
                </div>
                <button className="text-[#006493] dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Open <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card group hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/40 dark:border-slate-700/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">code</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">Review</span>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">Python Data Structures</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">Implement a balanced binary search tree in Python with O(log n) complexity.</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    <span>Progress</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[95%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Oct 26, 2023
                </div>
                <button className="text-[#006493] dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Open <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="glass-card group hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border border-white/40 dark:border-slate-700/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">palette</span>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">Creative</span>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">Modernism Portfolio</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">Assemble a digital portfolio of five artworks inspired by early 20th century modernism.</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006493] dark:bg-blue-500 w-[45%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Nov 01, 2023
                </div>
                <button className="text-[#006493] dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Open <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Sidebar (Right Column) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Productivity Section / Countdowns */}
          <div className="glass-card rounded-3xl p-6 shadow-sm">
            <h4 className="font-black text-sm mb-6 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="material-symbols-outlined text-[#006493] dark:text-blue-400">timer</span>
              Upcoming Deadlines
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex flex-col items-center justify-center text-red-600 dark:text-red-400 leading-none shadow-sm">
                    <span className="text-lg font-black tracking-tighter">04</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Hours</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold truncate w-32 text-slate-900 dark:text-white">Chem Quiz #4</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Submission portal</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0daffd]/10 flex flex-col items-center justify-center text-[#006493] dark:text-blue-400 leading-none shadow-sm">
                    <span className="text-lg font-black tracking-tighter">02</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Days</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold truncate w-32 text-slate-900 dark:text-white">History Essay</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Review required</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              
              <div className="flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 leading-none shadow-sm">
                    <span className="text-lg font-black tracking-tighter">05</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider">Days</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold truncate w-32 text-slate-900 dark:text-white">Math Module 2</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Not started</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>
            
            <button className="w-full mt-8 py-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-[#006493] dark:hover:border-blue-400 hover:text-[#006493] dark:hover:text-blue-400 transition-all bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer shadow-sm">
              View Study Schedule
            </button>
          </div>

          {/* Recent Submissions Mini List */}
          <div className="px-2 pt-2">
            <h4 className="font-bold text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-tight">
              <span className="material-symbols-outlined text-[16px]">history</span>
              Recently Completed
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-emerald-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Physics Lab Report</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Graded: 98/100</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-emerald-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">English Literature Quiz</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Pending Grading</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelfStudy;
