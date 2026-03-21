import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SelfStudy = () => {
  // Friday Quiz State
  const isFriday = true; // Hardcoded true for testing (was new Date().getDay() === 5)
  const [showFridayQuiz, setShowFridayQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState<'category' | 'quiz' | 'result' | 'recommendation'>('category');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);

  // Anti-Cheat: Hide global AI Tutor during quiz
  useEffect(() => {
    if (showFridayQuiz && quizStep === 'quiz') {
      document.body.classList.add('hide-ai-tutor');
    } else {
      document.body.classList.remove('hide-ai-tutor');
    }
    return () => document.body.classList.remove('hide-ai-tutor');
  }, [showFridayQuiz, quizStep]);

  // Mock Quiz Questions Bank mapped to categories
  const mockQuizBank: Record<string, any[]> = {
    'Biology': [
      { q: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], answer: 1 },
      { q: "What is the process by which plants make their food?", options: ["Respiration", "Digestion", "Photosynthesis", "Fermentation"], answer: 2 },
      { q: "Which of the following carries genetic information?", options: ["Enzymes", "RNA", "DNA", "Proteins"], answer: 2 },
      { q: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], answer: 2 },
      { q: "What blood cells are responsible for fighting infection?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], answer: 1 },
    ],
    'Chemistry': [
      { q: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
      { q: "What is the pH value of pure water?", options: ["5", "7", "9", "12"], answer: 1 },
      { q: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], answer: 3 },
      { q: "What kind of bond involves the sharing of electron pairs?", options: ["Ionic", "Hydrogen", "Covalent", "Metallic"], answer: 2 },
      { q: "What is the common name for NaCl?", options: ["Baking Soda", "Bleach", "Table Salt", "Chalk"], answer: 2 },
    ],
    'Mathematics': [
      { q: "What is the derivative of x^2?", options: ["2", "x", "2x", "x^3/3"], answer: 2 },
      { q: "What is the value of Pi up to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
      { q: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: 1 },
      { q: "Solve for x: 3x - 9 = 0", options: ["1", "2", "3", "4"], answer: 2 },
      { q: "What is the sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], answer: 1 },
    ],
    'Programming': [
      { q: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1 },
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Model Language", "None of these"], answer: 0 },
      { q: "Which keyword is used to define a constant in JavaScript?", options: ["var", "let", "const", "static"], answer: 2 },
      { q: "What is the time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2 },
      { q: "Which tool is commonly used for version control?", options: ["Docker", "Git", "Jenkins", "Kubernetes"], answer: 1 },
    ],
    'Physics': [
      { q: "What is the formula for Force?", options: ["F = m/a", "F = ma", "F = m*v", "F = a/m"], answer: 1 },
      { q: "What determines the speed of light in a vacuum?", options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^10 m/s", "3 x 10^5 m/s"], answer: 0 },
      { q: "Which law states 'For every action, there is an equal and opposite reaction'?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Inertia"], answer: 2 },
      { q: "What is the standard unit of Power?", options: ["Joule", "Newton", "Pascal", "Watt"], answer: 3 },
      { q: "Which subatomic particle has a negative charge?", options: ["Proton", "Neutron", "Electron", "Photon"], answer: 2 },
    ],
    'English': [
      { q: "Which of the following is a synonym for 'Joyful'?", options: ["Sad", "Happy", "Angry", "Tired"], answer: 1 },
      { q: "Identify the verb in this sentence: 'The cat sleeps on the mat.'", options: ["The", "cat", "sleeps", "mat"], answer: 2 },
      { q: "Which word is an antonym for 'Ancient'?", options: ["Old", "Historic", "Modern", "Antique"], answer: 2 },
      { q: "What punctuation is used to indicate possession?", options: ["Comma", "Apostrophe", "Semicolon", "Colon"], answer: 1 },
      { q: "Choose the correct spelling:", options: ["Definately", "Definetly", "Definitely", "Defenitely"], answer: 2 },
    ]
  };

  const mockQuiz = mockQuizBank[selectedSubject] || mockQuizBank['Biology'];

  const subjects = [
    { name: 'Biology', icon: 'biotech', diff: 'Medium', strength: 'Strong' },
    { name: 'Chemistry', icon: 'science', diff: 'Hard', strength: 'Weak' },
    { name: 'Mathematics', icon: 'calculate', diff: 'Hard', strength: 'Weak' },
    { name: 'Programming', icon: 'code', diff: 'Medium', strength: 'Strong' },
    { name: 'Physics', icon: 'architecture', diff: 'Hard', strength: 'Mid' },
    { name: 'English', icon: 'history_edu', diff: 'Easy', strength: 'Strong' }
  ];

  const handleSelectSubject = (name: string) => {
    setSelectedSubject(name);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizStep('quiz');
  };

  const submitQuiz = () => {
    const correctCount = answers.filter((ans, idx) => ans === mockQuiz[idx].answer).length;
    const scorePct = Math.round((correctCount / mockQuiz.length) * 100);
    
    let level = "Needs Support";
    if (scorePct >= 90) level = "Exam Ready";
    else if (scorePct >= 70) level = "Fast Learner";
    else if (scorePct >= 50) level = "Mid Learner";

    setPredictionData({ score: scorePct, correct: correctCount, level: level });
    setQuizStep('result');
  };

  const goToRecommendation = async () => {
    setQuizStep('recommendation');
    setIsPredicting(true);
    
    // Simulate real student data based on quiz performance for the ML endpoint
    const mockStudentData = {
      studytime: predictionData.score > 60 ? 3 : 1,
      failures: predictionData.score > 40 ? 0 : 2,
      absences: 2,
      G1: predictionData.score > 80 ? 15 : predictionData.score > 50 ? 11 : 8,
      G2: predictionData.score > 80 ? 16 : predictionData.score > 50 ? 12 : 9
    };

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockStudentData)
      });
      const data = await response.json();
      setPredictionData((prev: any) => ({ ...prev, ml: data }));
    } catch (err) {
      console.error("ML Prediction Error:", err);
      // Hard fallback if the node backend isn't up
      setPredictionData((prev: any) => ({ ...prev, ml: { mock: true, prediction: [1], error: "Backend unreachable, using local AI fallback." } }));
    } finally {
      setIsPredicting(false);
    }
  };

  const closeQuizModal = () => {
    setShowFridayQuiz(false);
    setTimeout(() => {
      setQuizStep('category');
      setSelectedSubject('');
      setAnswers([]);
      setPredictionData(null);
    }, 300);
  };

  // For testing UX easily you can uncomment this to force it to True
  // useEffect(() => { setIsFriday(true); }, []);

  return (
    <div className="w-full h-full p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[#f9f9ff] dark:bg-[#0B1121] text-[#181c22] dark:text-white min-h-screen relative">
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
              <Link to="/dashboard/challenge" className="bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-900 font-black px-8 py-3.5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.3)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer inline-flex">
                Start Today's Challenge <span className="material-symbols-outlined">play_circle</span>
              </Link>
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

          {/* FRIDAY QUIZ CARD - MOVED HERE UNDER HERO */}
          <div className={`glass-card group transition-all duration-300 rounded-3xl overflow-hidden flex flex-col border relative ${isFriday ? 'hover:shadow-[0_4px_30px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] border-indigo-400/50 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/30 dark:to-purple-900/20' : 'opacity-80 border-slate-300 dark:border-slate-700 grayscale-[0.5] bg-slate-50 dark:bg-slate-900/50'}`}>
            {isFriday && <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>}
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 border-2 border-indigo-200 dark:border-indigo-500/50 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                <span className="material-symbols-outlined text-[32px]">{isFriday ? 'psychology' : 'lock'}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Friday Readiness Quiz</h4>
                  {!isFriday ? (
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Opens Friday</span>
                  ) : (
                    <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Live Now</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed pr-4">
                  Available every Friday to check your subject strength and weak areas. Powered by ML predictive analytics.
                </p>
              </div>

              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button 
                  disabled={!isFriday}
                  onClick={() => setShowFridayQuiz(true)}
                  className={`w-full md:w-auto px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-md flex justify-center items-center gap-2 ${
                    isFriday 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.6)] cursor-pointer hover:scale-105 active:scale-95' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700 shadow-none'
                  }`}
                >
                  {isFriday ? 'Start Quiz' : 'Opens in ' + ((5 - new Date().getDay() + 7) % 7 || 7) + ' days'} 
                  {isFriday && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-4">
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
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friday Quiz Overlay Flow */}
      {showFridayQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in pb-16">
          <div className="bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-indigo-500/30 rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_0_80px_rgba(99,102,241,0.2)] flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-950/20 backdrop-blur">
              <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-500 bg-white dark:bg-indigo-900 p-1.5 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-500/30">psychology</span>
                Friday Readiness
              </h3>
              <button 
                onClick={closeQuizModal} 
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Body Scroll Area */}
            <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar">
              
              {/* STEP 1: CATEGORY SELECTION */}
              {quizStep === 'category' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center max-w-md mx-auto">
                    <span className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-3 block">Step 1 of 4</span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Choose Category</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Select the subject you want to analyze today. We'll use your past data to generate an intelligent recommendation.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.map(sub => (
                      <button 
                        key={sub.name}
                        onClick={() => handleSelectSubject(sub.name)}
                        className="group flex flex-col items-center justify-center p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                          <span className="material-symbols-outlined text-3xl">{sub.icon}</span>
                        </div>
                        <span className="font-black text-slate-800 dark:text-white mb-2">{sub.name}</span>
                        
                        <div className="flex gap-2">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{sub.diff}</span>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${sub.strength === 'Weak' ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
                            {sub.strength}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: QUIZ EXPERIENCE */}
              {quizStep === 'quiz' && (
                <div className="max-w-2xl mx-auto animate-fade-in w-full">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                      {selectedSubject} Analysis
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      Question {currentQuestion + 1} of {mockQuiz.length}
                    </span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                      style={{ width: `${((currentQuestion) / mockQuiz.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug mb-8">
                    {mockQuiz[currentQuestion].q}
                  </h3>
                  
                  <div className="space-y-3">
                    {mockQuiz[currentQuestion].options.map((opt: string, i: number) => {
                      const isSelected = answers[currentQuestion] === i;
                      return (
                        <button 
                          key={i}
                          onClick={() => {
                            const newAnswers = [...answers];
                            newAnswers[currentQuestion] = i;
                            setAnswers(newAnswers);
                          }}
                          className={`w-full p-5 rounded-2xl border-2 text-left transition-all font-bold flex items-center justify-between group cursor-pointer ${
                            isSelected 
                              ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/20 text-indigo-900 dark:text-white shadow-sm' 
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600'}`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </span>
                          {isSelected && <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">check_circle</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-10">
                    <button 
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(prev => prev - 1)}
                      className="px-6 py-3 font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-0 transition-colors"
                    >
                      Previous
                    </button>

                    {currentQuestion < mockQuiz.length - 1 ? (
                      <button 
                        disabled={answers[currentQuestion] === undefined}
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    ) : (
                      <button 
                        disabled={answers[currentQuestion] === undefined}
                        onClick={submitQuiz}
                        className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_4px_15px_rgba(99,102,241,0.4)] flex items-center gap-2 cursor-pointer"
                      >
                        Submit Quiz <span className="material-symbols-outlined text-sm">task_alt</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: RESULT SCREEN */}
              {quizStep === 'result' && predictionData && (
                <div className="max-w-2xl mx-auto text-center animate-fade-in w-full">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] mb-8 relative">
                    <span className="material-symbols-outlined text-[40px]">workspace_premium</span>
                    <div className="absolute -inset-2 rounded-full border border-indigo-500/30 animate-[spin_4s_linear_infinite] border-t-transparent border-l-transparent"></div>
                  </div>
                  
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Quiz Complete</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-10">Initial assessment parsed. Preparing ML architecture for detailed profiling.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Score</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{predictionData.score}%</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Correct</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{predictionData.correct}/{mockQuiz.length}</span>
                    </div>
                    <div className="sm:col-span-2 bg-indigo-50 dark:bg-indigo-500/10 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 text-left flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-0.5">Performance Level</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{predictionData.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-left mb-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 dark:bg-slate-800/50 rounded-bl-full flex items-center justify-center pointer-events-none">
                      <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-700/50 transform rotate-12 group-hover:rotate-0 transition-transform">auto_awesome</span>
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white mb-4 relative z-10 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Preliminary Analysis
                    </h4>
                    <ul className="space-y-3 relative z-10">
                      <li className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                        <strong>Strong Topic:</strong> Core foundations firmly grasped. Excellent retention.
                      </li>
                      <li className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined text-orange-500 text-[20px]">warning</span>
                        <strong>Weak Topic:</strong> Applied mechanics and theoretical edge cases.
                      </li>
                    </ul>
                  </div>

                  <button 
                    onClick={goToRecommendation}
                    className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer mx-auto"
                  >
                    <span className="material-symbols-outlined animate-pulse">model_training</span>
                    Launch AI Prediction Engine
                  </button>
                </div>
              )}

              {/* STEP 4: RECOMMENDATION SCREEN (ML Integration) */}
              {quizStep === 'recommendation' && (
                <div className="max-w-2xl mx-auto w-full animate-fade-in relative">
                  
                  {isPredicting ? (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                      <div className="relative w-32 h-32 mb-8">
                         <div className="absolute inset-0 border-[6px] border-indigo-100 dark:border-slate-800 rounded-full"></div>
                         <div className="absolute inset-0 border-[6px] border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="material-symbols-outlined text-3xl text-indigo-500 animate-pulse">memory</span>
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Connecting to ML Backend...</h3>
                      <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center font-mono text-xs">
                         <span className="text-slate-500 dark:text-slate-400 mb-1">Sending array parameters:</span>
                         <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">
                           [studytime, failures, absences, G1, G2]
                         </span>
                         <div className="mt-2 text-red-400 font-black text-[9px] tracking-widest uppercase items-center flex gap-1"><span className="material-symbols-outlined text-[12px]">block</span> Ignoring G3</div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-fade-in w-full">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg transform -rotate-6">
                           <span className="material-symbols-outlined text-3xl">robot_2</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Machine Learning Insights</h2>
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Predictive model successfully executed</p>
                        </div>
                      </div>

                      {/* API Result Block */}
                      <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-indigo-500/30 overflow-hidden relative shadow-xl">
                         <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-white pointer-events-none select-none">AI</div>
                         
                         <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest absolute top-6 right-6 flex items-center gap-1 bg-indigo-500/20 px-2 py-1 rounded">
                           <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span> Active Model
                         </span>

                         <div className="mb-6 relative z-10">
                           <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Prediction Outcome</span>
                           <div className="flex items-baseline gap-3">
                             <span className="text-4xl font-black text-white">
                                {predictionData?.ml?.prediction ? predictionData.ml.prediction[0] : 'Pass'}
                             </span>
                             {predictionData?.ml?.mock && <span className="text-xs bg-red-500/20 text-red-300 font-black px-2 py-0.5 rounded border border-red-500/30">MOCK FALLBACK</span>}
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4 relative z-10">
                           <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <span className="text-indigo-300 text-[10px] uppercase font-bold block mb-1 tracking-wider">P. Absences</span>
                             <span className="text-white font-black text-sm">{predictionData?.ml?.features?.[2] || 2} detected</span>
                           </div>
                           <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <span className="text-indigo-300 text-[10px] uppercase font-bold block mb-1 tracking-wider">Computed G1/G2</span>
                             <span className="text-white font-black text-sm">{predictionData?.ml?.features?.[3] || 12} / {predictionData?.ml?.features?.[4] || 13}</span>
                           </div>
                         </div>
                      </div>

                      {/* Actionable Recommendations */}
                      <h4 className="font-black text-lg text-slate-900 dark:text-white mb-4">Recommended Actions</h4>
                      <div className="space-y-4 mb-10">
                         <div className="p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 hover:border-emerald-500 dark:hover:border-emerald-500/50 transition-colors shadow-sm group cursor-pointer">
                           <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform">
                             <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                           </div>
                           <div className="flex-1">
                             <h5 className="font-black text-sm text-slate-900 dark:text-white mb-1">Start 3D Revision Module</h5>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Targeting weak areas directly with interactive physics.</p>
                           </div>
                           <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-500 transition-colors">arrow_forward</span>
                         </div>
                         
                         <div className="p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 hover:border-orange-500 dark:hover:border-orange-500/50 transition-colors shadow-sm group cursor-pointer">
                           <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
                             <span className="material-symbols-outlined text-[20px]">description</span>
                           </div>
                           <div className="flex-1">
                             <h5 className="font-black text-sm text-slate-900 dark:text-white mb-1">Attempt Full Mock Test</h5>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Your model parameters indicate high readiness. Prove it.</p>
                           </div>
                           <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-500 transition-colors">arrow_forward</span>
                         </div>
                      </div>

                      <button 
                        onClick={closeQuizModal}
                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:-translate-y-1 transition-transform shadow-lg cursor-pointer"
                      >
                        Return to Self-Study Dashboard
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

export default SelfStudy;
