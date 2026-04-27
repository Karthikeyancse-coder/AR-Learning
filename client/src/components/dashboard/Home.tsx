import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // Modal State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState<'subject' | 'quiz' | 'prediction'>('subject');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const subjects = ['Biology', 'Chemistry', 'Mathematics', 'Programming', 'Physics', 'English', 'Other'];

  const handlePrediction = async () => {
    setIsPredicting(true);
    setQuizStep('prediction');
    // Prediction uses studytime, failures, absences, G1, G2. (G3 is explicitly excluded)
    setTimeout(() => {
      setPredictionResult({
        score: 85,
        status: 'Pass Probability Assessment',
        message: 'Prediction configured. Model integration ready to process studytime, failures, absences, G1, and G2 parameters.'
      });
      setIsPredicting(false);
    }, 2000);
  };

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
              className="px-6 py-3.5 bg-white text-[#006493] rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm w-full sm:w-auto text-center cursor-pointer"
            >
              Resume Chemistry
            </button>
            <button 
              onClick={() => navigate("/dashboard/self-study")}
              className="px-6 py-3.5 bg-black/20 text-white border border-white/20 backdrop-blur-md rounded-xl font-bold hover:bg-black/30 transition-all text-sm w-full sm:w-auto text-center hidden sm:block cursor-pointer"
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
        <div id="tour-analytics" className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 absolute top-6 left-6 transition-colors">Program Progress</h3>
          <button className="absolute top-6 right-6 text-slate-400 hover:text-[#006493] dark:hover:text-blue-400 transition-colors cursor-pointer">
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
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-md relative overflow-hidden transition-colors flex-1">
                  <div 
                    className={`absolute bottom-0 w-full rounded-md transition-all duration-500 ${
                      i === 3 
                        ? 'bg-[#006493] dark:bg-blue-500 shadow-[0_0_10px_rgba(0,100,147,0.3)] dark:shadow-none' 
                        : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-[#006493]/50 dark:group-hover:bg-blue-500/50'
                    }`} 
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
            <button className="text-xs font-bold text-[#006493] dark:text-blue-400 hover:underline transition-colors cursor-pointer">View All</button>
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

      {/* Recommended for You */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Recommended for You</h2>
          <div className="flex gap-2">
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors bg-white dark:bg-slate-800 cursor-pointer">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800 cursor-pointer">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Card 4 - New Readiness Quiz */}
          <div className="group block bg-gradient-to-br from-[#0B1121] to-[#1e293b] dark:from-indigo-950 dark:to-slate-900 rounded-3xl border border-indigo-500/20 overflow-hidden shadow-sm hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-1 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="p-5 h-full flex flex-col relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-indigo-500/30 text-indigo-400 border border-indigo-500/50 rounded-md shadow-sm">Opens Friday</span>
                <span className="material-symbols-outlined text-indigo-400">psychology</span>
              </div>
              <h3 className="text-lg font-black text-white mb-2">Friday Readiness Quiz</h3>
              <p className="text-sm text-indigo-200/70 font-medium mb-6 line-clamp-2">Subject-wise smart quiz with prediction based on study time, failures, absences, G1, and G2.</p>
              
              <div className="mt-auto pt-4 border-t border-indigo-500/20">
                <button 
                  onClick={() => setShowQuizModal(true)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2 cursor-pointer"
                >
                  Start Quiz <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quiz Modal Overlay */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-500">psychology</span>
                Smart Prediction Quiz
              </h3>
              <button 
                onClick={() => { setShowQuizModal(false); setQuizStep('subject'); setSelectedSubject(''); }} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 lg:p-8 min-h-[300px] flex flex-col justify-center">
              
              {quizStep === 'subject' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Select a Subject</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Choose your target area for today's readiness assessment.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {subjects.map(sub => (
                      <button 
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          selectedSubject === sub 
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={!selectedSubject}
                    onClick={() => setQuizStep('quiz')}
                    className="w-full mt-4 py-3.5 bg-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              )}

              {quizStep === 'quiz' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded">{selectedSubject} Readiness</span>
                    <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mt-4">Which of the following aligns with the core principles of {selectedSubject}?</h4>
                  </div>
                  <div className="space-y-3">
                    {['A foundational theory', 'An experimental anomaly', 'A generic hypothesis', 'None of the above'].map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handlePrediction()}
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors shadow-sm cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 'prediction' && (
                <div className="flex flex-col items-center justify-center text-center animate-fade-in py-8">
                  {isPredicting ? (
                    <div className="space-y-6 w-full flex flex-col items-center animate-fade-in">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-indigo-100 dark:border-slate-700 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-500 animate-pulse text-3xl">memory</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg mb-2">Running Prediction Model</h4>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium inline-flex flex-col gap-1 items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                          <span>Processing Student Data...</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono tracking-tighter">Features: [studytime, failures, absences, G1, G2]</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 w-full animate-fade-in">
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-200 dark:border-emerald-500/30">
                        <span className="material-symbols-outlined text-4xl">verified</span>
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">Analysis Complete</h4>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-left border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 block">Model Output</span>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-3xl font-black text-emerald-500 dark:text-emerald-400">{predictionResult?.score}%</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{predictionResult?.status}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {predictionResult?.message}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => { setShowQuizModal(false); setQuizStep('subject'); setSelectedSubject(''); }}
                        className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                      >
                        Close & Continue Forward
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
