import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengeFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Mock quiz data for Advanced Biochemistry
  const questions = [
    {
      question: "Which of the following best describes the Michaelis constant (Km)?",
      options: [
        "The maximum velocity of an enzymatic reaction",
        "The substrate concentration at which reaction speed is half of Vmax",
        "The rate at which the product is formed",
        "The inhibition constant for competitive inhibitors"
      ],
      correct: 1
    },
    {
      question: "In competitive inhibition, how are Vmax and Km affected?",
      options: [
        "Vmax decreases, Km is unchanged",
        "Vmax decreases, Km increases",
        "Vmax is unchanged, Km increases",
        "Both Vmax and Km decrease"
      ],
      correct: 2
    },
    {
      question: "Phosphofructokinase-1 (PFK-1) is allosterically activated by which molecule?",
      options: [
        "ATP",
        "Fructose 2,6-bisphosphate",
        "Citrate",
        "NADH"
      ],
      correct: 1
    }
  ];

  // Timer logic
  useEffect(() => {
    let timer: any;
    if (step === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && step === 'playing') {
      setStep('completed');
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleAnswerClick = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);
    
    // Check correctness
    if (index === questions[currentQIndex].correct) {
      setScore(prev => prev + 1);
    }

    // Move to next after delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        setStep('completed');
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = Math.round((score / Math.max(1, currentQIndex + (isAnswerRevealed ? 1 : 0))) * 100) || 0;

  return (
    <div className="w-full h-full min-h-screen bg-[#0B1121] text-white overflow-hidden relative font-sans flex flex-col">
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {step === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 animate-fade-in">
          <button 
            onClick={() => navigate('/dashboard/self-study')}
            className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold uppercase tracking-wider">Back to Hub</span>
          </button>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 max-w-2xl w-full flex flex-col items-center text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="material-symbols-outlined text-cyan-400 text-4xl">science</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-orange-500/30 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">local_fire_department</span> Streak Saver
              </span>
              <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-cyan-500/30">
                AI Recommended
              </span>
            </div>

            <h1 className="text-4xl font-black mb-3 text-white tracking-tight">Advanced Biochemistry</h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-md">
              Focus: Enzyme Kinetics & Allosteric Regulation. This challenge was recommended to reinforce concepts you evaluated weakly on in yesterday's mock test.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
              <div className="bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center border border-slate-700/50">
                <span className="material-symbols-outlined text-emerald-400 mb-1">signal_cellular_alt</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Difficulty</span>
                <span className="text-sm font-bold text-emerald-400">Medium</span>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center border border-slate-700/50">
                <span className="material-symbols-outlined text-violet-400 mb-1">timer</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Est. Time</span>
                <span className="text-sm font-bold text-white">5 Mins</span>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center border border-slate-700/50">
                <span className="material-symbols-outlined text-cyan-400 mb-1">stars</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">XP Reward</span>
                <span className="text-sm font-bold text-cyan-400">+150 XP</span>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center border border-slate-700/50">
                <span className="material-symbols-outlined text-orange-400 mb-1">change_history</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Streak</span>
                <span className="text-sm font-bold text-orange-400">+1 Day</span>
              </div>
            </div>

            <button 
              onClick={() => setStep('playing')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-lg px-12 py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
            >
              Begin Challenge <span className="material-symbols-outlined">rocket_launch</span>
            </button>
          </div>
        </div>
      )}

      {step === 'playing' && (
        <div className="flex-1 flex flex-col items-center p-6 relative z-10 w-full max-w-4xl mx-auto animate-fade-in gap-6">
          
          {/* Top In-Progress UI */}
          <div className="w-full flex justify-between items-center bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/dashboard/self-study')} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
                <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accuracy</span>
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-400 text-[14px]">track_changes</span> {accuracy}%
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time Left</span>
                <span className={`text-xl font-black ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} flex items-center gap-1`}>
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Question Core Area */}
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-3xl space-y-8">
              <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm relative py-12">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-cyan-500 text-slate-900 font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Biochemistry
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {questions[currentQIndex].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQIndex].options.map((opt, i) => {
                  let btnColor = "bg-slate-900/50 border-slate-700 hover:border-cyan-500/50";
                  let textColor = "text-slate-300";
                  
                  if (isAnswerRevealed) {
                    if (i === questions[currentQIndex].correct) {
                      btnColor = "bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                      textColor = "text-emerald-400 font-bold";
                    } else if (i === selectedAnswer) {
                      btnColor = "bg-red-500/20 border-red-500";
                      textColor = "text-red-400";
                    } else {
                      btnColor = "bg-slate-900/20 border-slate-800 opacity-50";
                    }
                  } else if (selectedAnswer === i) {
                    btnColor = "bg-cyan-500/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswerClick(i)}
                      disabled={isAnswerRevealed}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${btnColor} group flex items-start gap-4 cursor-pointer`}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-bold transition-colors ${isAnswerRevealed ? 'border-transparent' : 'border-slate-600 group-hover:border-cyan-500/50 text-slate-400 group-hover:text-cyan-400'}`}>
                        {isAnswerRevealed && i === questions[currentQIndex].correct ? (
                          <span className="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
                        ) : isAnswerRevealed && i === selectedAnswer ? (
                          <span className="material-symbols-outlined text-red-400 text-xl">cancel</span>
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </div>
                      <span className={`text-base leading-relaxed ${textColor}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'completed' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 animate-fade-in w-full max-w-4xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 w-full flex flex-col items-center text-center shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden">
            
            {/* Confetti or glow back */}
            <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[80%] h-[80%] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Challenge Completed!</h2>
            <p className="text-slate-400 mb-10 text-sm">Great effort! Here is your performance breakdown.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
              <div className="bg-slate-800/80 rounded-3xl p-6 flex flex-col items-center shadow-inner border border-slate-700/50 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/30">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">XP Earned</span>
                <span className="text-3xl font-black text-cyan-400">+{score * 50}</span>
                <span className="text-[10px] text-cyan-500 mt-1">Rank progression</span>
              </div>

              <div className="bg-slate-800/80 rounded-3xl p-6 flex flex-col items-center shadow-inner border border-slate-700/50 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
                  <span className="material-symbols-outlined text-3xl">track_changes</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Final Score</span>
                <span className="text-3xl font-black text-emerald-400">{score}/{questions.length}</span>
                <span className="text-[10px] text-emerald-500/70 mt-1">{accuracy}% Accuracy</span>
              </div>

              <div className="bg-slate-800/80 rounded-3xl p-6 flex flex-col items-center shadow-inner border border-slate-700/50 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/30">
                  <span className="material-symbols-outlined text-3xl">local_fire_department</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Streak</span>
                <span className="text-3xl font-black text-orange-400">13</span>
                <span className="text-[10px] text-orange-500/70 mt-1">Days Active</span>
              </div>
            </div>

            {/* Smart Diagnostics */}
            <div className="w-full bg-slate-950/50 rounded-2xl p-6 border border-slate-800 text-left mb-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center shrink-0 border border-indigo-500/30">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                  AI Diagnostic Result
                </span>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  You successfully mastered <span className="text-white font-bold px-1 py-0.5 bg-slate-800 rounded">Enzyme Kinetics</span>, but missed queries on <span className="text-white font-bold px-1 py-0.5 bg-slate-800 rounded">Allosteric Activation</span>.
                </p>
                <p className="text-xs text-slate-500 mt-1">Recommended Path: Review the Interactive 3D Model related to Allosteric Sites.</p>
              </div>
            </div>

            {/* Next Actions */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                className="col-span-1 md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span> Start 3D Revision
              </button>
              
              <button 
                onClick={() => {
                  setStep('playing');
                  setCurrentQIndex(0);
                  setScore(0);
                  setTimeLeft(300);
                  setSelectedAnswer(null);
                  setIsAnswerRevealed(false);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Try Similar
              </button>
              
              <button 
                onClick={() => navigate('/dashboard/self-study')}
                className="bg-slate-900 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 text-slate-400 border border-slate-700 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              >
                End Session
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFlow;
