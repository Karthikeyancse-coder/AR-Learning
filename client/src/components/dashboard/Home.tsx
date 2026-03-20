import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#006493] to-blue-700 dark:from-blue-900 dark:to-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-[#006493]/20 dark:shadow-none min-h-[300px] flex items-center justify-between transition-colors duration-300">
        <div className="relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-wider uppercase">Live AR Session Available</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Accelerate <br className="hidden sm:block" /> Your Learning.
          </h1>
          
          <p className="text-blue-100 text-sm sm:text-base max-w-lg mb-8 font-medium leading-relaxed">
            Welcome back, {user?.name?.split(' ')[0] || "Student"}. You're on a 5-day streak! Dive into your next augmented reality module and master complex concepts faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate("/dashboard/chemistry")} 
              className="px-6 py-3.5 bg-white text-[#006493] rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm w-full sm:w-auto text-center"
            >
              Resume Chemistry
            </button>
            <button 
              onClick={() => navigate("/dashboard/self-study")}
              className="px-6 py-3.5 bg-black/20 text-white border border-white/20 backdrop-blur-md rounded-xl font-bold hover:bg-black/30 transition-all text-sm w-full sm:w-auto text-center hidden sm:block"
            >
              View Assignments
            </button>
          </div>
        </div>
        
        {/* Abstract Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl mix-blend-screen"></div>
          
          {/* 3D-ish Shapes */}
          <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 drop-shadow-2xl animate-float">
            <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-3xl rotate-12 border border-white/20 relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-white/50 text-8xl">science</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20"></div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-[30%] top-[20%] drop-shadow-2xl animate-float-delayed">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full -rotate-12 border border-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/50 text-5xl">biotech</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 absolute top-6 left-6 transition-colors">Program Progress</h3>
          <button className="absolute top-6 right-6 text-slate-400 hover:text-[#006493] dark:hover:text-blue-400 transition-colors">
            <span className="material-symbols-outlined text-sm">more_horiz</span>
          </button>
          
          <div className="relative size-32 hidden md:flex items-center justify-center mt-8 mb-4">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-100 dark:text-slate-800 stroke-current transition-colors" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
              <circle className="text-[#006493] dark:text-blue-500 stroke-current drop-shadow-[0_4px_8px_rgba(0,100,147,0.3)] dark:drop-shadow-none transition-colors" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8"></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">75</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-colors">%</span>
            </div>
          </div>
          
          <div className="flex md:hidden items-center justify-between w-full mt-6 mb-2">
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">75%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Completed</span>
            </div>
            <div className="w-16 h-16 rounded-full border-[6px] border-[#006493] dark:border-blue-500 border-r-slate-100 dark:border-r-slate-800 flex items-center justify-center rotate-45 transition-colors"></div>
          </div>
          
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">You are <span className="text-[#006493] dark:text-blue-400 font-bold transition-colors">12%</span> ahead of your weekly schedule.</p>
        </div>
        
        {/* Study Hours */}
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 transition-colors">Study Hours</h3>
            <select className="bg-slate-50 dark:bg-slate-800/50 border-none rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 py-1.5 px-2 focus:ring-0 transition-colors cursor-pointer outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          <div className="flex items-end gap-2 h-32 w-full mt-auto">
            {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-blue-50 dark:bg-slate-800 rounded-md relative overflow-hidden transition-colors" style={{ height: '100%' }}>
                  <div 
                    className={`absolute bottom-0 w-full rounded-md transition-all duration-500 ${i === 3 ? 'bg-[#006493] dark:bg-blue-500 shadow-[0_0_10px_rgba(0,100,147,0.3)] dark:shadow-none' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-[#006493]/30 dark:group-hover:bg-blue-500/30'}`} 
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className={`text-[10px] font-bold transition-colors ${i === 3 ? 'text-[#006493] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming */}
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 transition-colors">Upcoming Tasks</h3>
            <button className="text-xs font-bold text-[#006493] dark:text-blue-400 hover:underline transition-colors">View All</button>
          </div>
          
          <div className="flex flex-col gap-3 mt-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-slate-800 transition-colors cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 group">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-sm">quiz</span>
              </div>
              <div className="flex flex-col flex-1 truncate">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Stereochemistry Quiz</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate transition-colors">Due Today, 11:59 PM</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-slate-800 transition-colors cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 group">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-sm">assignment</span>
              </div>
              <div className="flex flex-col flex-1 truncate">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Human Anatomy Lab Report</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate transition-colors">Due Tomorrow, 5:00 PM</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-slate-800 transition-colors cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 group">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-[#006493] dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-sm">menu_book</span>
              </div>
              <div className="flex flex-col flex-1 truncate">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Read Ch 4: Cell Division</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate transition-colors">Due Friday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Active Modules</h2>
          <div className="flex gap-2">
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors bg-white dark:bg-slate-800">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => navigate("/dashboard/chemistry")}
            className="group block bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80" 
                alt="Chemistry module" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-500 text-white rounded-md shadow-sm">Intermediate</span>
                <span className="flex items-center gap-1 text-white text-xs font-bold bg-black/30 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px]">view_in_ar</span> 3 Models
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Organic Chemistry</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4 line-clamp-2 transition-colors">Master molecular structures and stereochemistry in our interactive 3D laboratory.</p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="text-[#006493] dark:text-blue-400">65%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-[#006493] dark:bg-blue-500 rounded-full w-[65%] transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div 
            onClick={() => navigate("/dashboard/biology")}
            className="group block bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80" 
                alt="Biology module" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white rounded-md shadow-sm">Beginner</span>
                <span className="flex items-center gap-1 text-white text-xs font-bold bg-black/30 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px]">view_in_ar</span> 8 Models
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Human Anatomy</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4 line-clamp-2 transition-colors">Explore the human body system by system. Including heart, brain, and skeletal structure.</p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="text-[#006493] dark:text-blue-400">32%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full w-[32%] relative overflow-hidden transition-colors">
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group block bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer transform hover:-translate-y-1">
            <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80" 
                alt="Physics module" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className="material-symbols-outlined text-white/50 hover:text-white transition-colors">bookmark_add</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-amber-500 text-white rounded-md shadow-sm">Advanced</span>
                <span className="flex items-center gap-1 text-white text-xs font-bold bg-black/30 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px]">view_in_ar</span> 5 Models
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#006493] dark:group-hover:text-blue-400 transition-colors">Quantum Physics</h3>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded uppercase tracking-wider mt-1 transition-colors">New</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4 line-clamp-2 transition-colors">Visualize wave-particle duality and electron orbitals in interactive 3D space.</p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="text-slate-400 dark:text-slate-500">0%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full w-[0%] transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
