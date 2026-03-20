import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BIOLOGY_CHAPTERS } from "../mockData";
import "@google/model-viewer";

const HumanAnatomy: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"learn" | "assess">("learn");

  // Assessment State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const modelRef = React.useRef<any>(null);

  const handleZoom = (direction: "in" | "out") => {
    if (modelRef.current) {
      const orbit = modelRef.current.getCameraOrbit();
      const newRadius = direction === "in" ? orbit.radius * 0.9 : orbit.radius * 1.1;
      modelRef.current.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${newRadius}m`;
    }
  };

  const handleReset = () => {
    if (modelRef.current) {
      // Restore appropriate visual dimensions depending upon the active modeled organism
      modelRef.current.cameraOrbit = chapterId === "human-anatomy" ? "0deg 75deg 1.2m" : "0deg 75deg 4m";
      modelRef.current.fieldOfView = "30deg";
      modelRef.current.cameraTarget = "auto auto auto";
    }
  };

  const handleViewAR = () => {
    if (modelRef.current && typeof modelRef.current.activateAR === "function") {
      try {
        modelRef.current.activateAR();
      } catch (err) {
        console.error("AR Activation failed", err);
      }
    } else {
      console.log("View in AR clicked or not supported");
    }
  };

  useEffect(() => {
    setLoading(true);
    if (chapterId && MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS]) {
      setData(MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS]);
    } else {
      setData(null);
    }
    setLoading(false);
  }, [chapterId]);

  useEffect(() => {
    const viewer = modelRef.current;
    if (!viewer || chapterId !== "human-anatomy") return;

    // Apply custom, finely-tuned zoom for Human Anatomy to mitigate the native aggressiveness
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      wheelEvent.preventDefault();

      const orbit = viewer.getCameraOrbit();

      // Use deltaY magnitude to dynamically scale the zoom progressive factor linearly mapping standard spins.
      // Small continuous trackpad swipes fall to practically 1:1, whereas harsh ticks are clamped to prevent jarring drops.
      const zoomMultiplier = Math.max(0.85, Math.min(1.15, 1 + (wheelEvent.deltaY * 0.001)));

      const newRadius = orbit.radius * zoomMultiplier;
      viewer.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${newRadius}m`;
    };

    // Must map cleanly with passive: false to natively interrupt jumping
    viewer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewer.removeEventListener("wheel", handleWheel);
    };
  }, [chapterId, data]);

  useEffect(() => {
    if (activeTab === "assess") {
      setCurrentQuestion(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setScore(0);
      setShowResults(false);
    }
  }, [activeTab, chapterId]);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  if (loading) return null;
  if (!data) return <div className="p-8 text-center text-red-500">Chapter Not Found</div>;

  return (
    <div className="bg-white dark:bg-[#0B1121] font-['Inter'] text-slate-900 dark:text-white h-screen flex flex-col fixed inset-0 z-40">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
        .clinical-shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
        .dark .clinical-shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.4); }
        model-viewer::part(default-progress-bar) { display: none; }
        model-viewer > * {
          color: #ffffff !important;
          text-shadow: 0 0 8px rgba(255,255,255,0.8) !important;
        }
        .premium-bg {
          background: radial-gradient(
            circle at 50% 40%,
            rgba(59,130,246,0.25) 0%,
            rgba(15,23,42,0.9) 40%,
            #020617 100%
          ),
          linear-gradient(
            135deg,
            #020617 0%,
            #0f172a 50%,
            #020617 100%
          );
        }
        .premium-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }
        .vignette {
          background: radial-gradient(circle, transparent 60%, rgba(0,0,0,0.6) 100%);
        }
        .glass-controls {
          background: rgba(255,255,255,0.05) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/90 dark:bg-[#0B1121]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 absolute top-0 w-full z-50 h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard/biology")} className="transition-all duration-200 active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">{data.name}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 font-bold">Clinical Precision • Anatomy</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1 z-50 relative pointer-events-auto">
          <button
            onClick={() => setActiveTab("learn")}
            className={`px-6 py-2 transition-all cursor-pointer ${activeTab === "learn" ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400" : "text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600 dark:hover:text-slate-300"}`}
          >
            Learn
          </button>
          <button
            onClick={() => setActiveTab("assess")}
            className={`px-6 py-2 transition-all cursor-pointer ${activeTab === "assess" ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400" : "text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600 dark:hover:text-slate-300"}`}
          >
            Assess
          </button>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggleDarkMode} className="transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg p-2">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">dark_mode</span>
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 mt-16 flex flex-col md:flex-row overflow-y-auto custom-scrollbar md:overflow-hidden relative">
        {/* Right side / 3D Viewer */}
        <section className="order-1 md:order-2 flex-none w-full h-[calc(100vh-64px)] md:flex-1 md:h-full bg-white dark:bg-[#0B1121] relative flex flex-col overflow-hidden">
          <div className="flex-1 relative flex items-center justify-center overflow-hidden premium-bg">
            <div className="absolute inset-0 vignette z-0 pointer-events-none transition-colors duration-500"></div>

            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none z-0" style={{ boxShadow: "0 0 120px rgba(59,130,246,0.2)" }}></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* @ts-ignore - model-viewer isn't typed properly globally sometimes */}
              <model-viewer
                ref={modelRef}
                src={data.threeDModels[0]}
                ar
                camera-controls
                disable-tap
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second={chapterId === "human-heart" ? "8deg" : undefined}
                autoplay={true}
                animation-name={chapterId === "human-heart" ? "heartbeat" : "*"}
                interaction-prompt="none"
                shadow-intensity="1"
                camera-orbit={chapterId === "human-anatomy" ? "0deg 75deg 1.2m" : "0deg 75deg 4m"}
                min-camera-orbit={chapterId === "human-anatomy" ? "auto auto 0.1m" : "auto auto 1m"}
                max-camera-orbit={chapterId === "human-anatomy" ? "auto auto 20m" : "auto auto 12m"}
                field-of-view="30deg"
                min-field-of-view="10deg"
                max-field-of-view="60deg"
                scale={chapterId === "human-anatomy" ? "12 12 12" : "8 8 8"}
                style={{ width: "100%", height: "100%", background: "transparent", outline: "none" }}
              ></model-viewer>
            </div>

            {/* Side Controls */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-2 z-50 pointer-events-auto">
              <button
                onClick={() => handleZoom("in")}
                className="w-10 h-10 glass-controls text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                aria-label="Zoom In"
              >
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
              <button
                onClick={() => handleZoom("out")}
                className="w-10 h-10 glass-controls text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                aria-label="Zoom Out"
              >
                <span className="material-symbols-outlined text-xl">remove</span>
              </button>
              <button
                onClick={handleReset}
                className="w-10 h-10 glass-controls text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-white/10 transition-colors mt-2 cursor-pointer pointer-events-auto"
                aria-label="Reset View"
              >
                <span className="material-symbols-outlined text-xl">refresh</span>
              </button>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center animate-bounce text-slate-400 dark:text-slate-500 z-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Details</span>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>

          {/* Desktop Status Bar */}
          <div className="hidden md:flex h-14 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-[#0B1121]/50 backdrop-blur-sm z-50 items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400"></span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Clinical Model v2.4 • HD-A</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group cursor-default">
                <span className="material-symbols-outlined text-lg opacity-60">pinch</span>
                <span className="text-[11px] font-semibold uppercase tracking-tight">Pinch to Zoom</span>
              </div>
              <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group cursor-default">
                <span className="material-symbols-outlined text-lg opacity-60">rotate_right</span>
                <span className="text-[11px] font-semibold uppercase tracking-tight">Drag to Rotate</span>
              </div>
              <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
              <button onClick={handleViewAR} className="flex items-center gap-2 bg-[#0ea5e9] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-[#0284c7] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] hover:scale-105 group cursor-pointer pointer-events-auto z-50">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
                <span className="text-[11px] font-bold uppercase tracking-tight">View in AR</span>
              </button>
            </div>
            <div className="w-32 flex justify-end">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-600">Navigation</span>
            </div>
          </div>
        </section>

        {/* Left Side / Sidebar */}
        <aside className="order-2 md:order-1 w-full md:w-[30%] bg-[#fcfdfe] dark:bg-[#0F172A] border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col md:overflow-y-auto custom-scrollbar p-6 pb-32 md:pb-6 relative z-20">
          {activeTab === "learn" ? (
            <>
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-md bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">Overview</h2>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 clinical-shadow">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {data.description.description}
                  </p>
                </div>
              </section>

              <section className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-md bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">Key Structures</h2>
                </div>
                <div className="grid gap-3">
                  {data.description.fullContent?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-[#1E293B] rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer group clinical-shadow pointer-events-auto">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{item.title}</h3>
                        <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 uppercase tracking-tighter shadow-sm">
                          Structure
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-snug">{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="flex-1 flex flex-col pt-2 pb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-md bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">Knowledge Check</h2>
              </div>

              {data.description?.assessment && data.description.assessment.length > 0 ? (
                showResults ? (
                  <div className="bg-white dark:bg-[#1E293B] rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center text-center clinical-shadow pointer-events-auto">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                      <span className="material-symbols-outlined text-3xl text-emerald-600 dark:text-emerald-400">workspace_premium</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Assessment Complete!</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">You scored {score} out of {data.description.assessment.length}.</p>
                    <button onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedOption(null);
                      setIsSubmitted(false);
                      setScore(0);
                      setShowResults(false);
                    }} className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98] shadow-sm">
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 clinical-shadow pointer-events-auto flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider bg-sky-50 dark:bg-sky-500/10 px-2.5 py-1 rounded-md">Question {currentQuestion + 1} of {data.description.assessment.length}</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md">Score: {score}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 leading-relaxed">
                      {data.description.assessment[currentQuestion].question}
                    </h3>

                    <div className="flex flex-col gap-3 mb-6">
                      {data.description.assessment[currentQuestion].options.map((option: string, idx: number) => {
                        const isCorrect = option === data.description.assessment[currentQuestion].answer;
                        const isSelected = selectedOption === option;

                        let optionClass = "border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 bg-transparent text-slate-600 dark:text-slate-300";

                        if (isSubmitted) {
                          if (isCorrect) optionClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 relative overflow-hidden";
                          else if (isSelected) optionClass = "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400";
                          else optionClass = "border-slate-200 dark:border-slate-700 bg-transparent opacity-50";
                        } else if (isSelected) {
                          optionClass = "border-sky-500 dark:border-sky-400 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500 dark:ring-sky-400";
                        }

                        return (
                          <button
                            key={idx}
                            disabled={isSubmitted}
                            onClick={() => setSelectedOption(option)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-200 cursor-pointer disabled:cursor-default ${optionClass}`}
                          >
                            <div className="flex items-center gap-3 relative z-10">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSubmitted && isCorrect ? 'border-emerald-500 bg-emerald-500' :
                                  isSubmitted && isSelected ? 'border-rose-500 bg-rose-500' :
                                    isSelected ? 'border-sky-500 dark:border-sky-400 bg-sky-500 dark:bg-sky-400' : 'border-slate-300 dark:border-slate-600'
                                }`}>
                                {isSubmitted && isCorrect && <span className="material-symbols-outlined text-[12px] text-white">check</span>}
                                {isSubmitted && isSelected && !isCorrect && <span className="material-symbols-outlined text-[12px] text-white">close</span>}
                                {!isSubmitted && isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="font-medium leading-tight">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-auto pt-2">
                      {!isSubmitted ? (
                        <button
                          disabled={!selectedOption}
                          onClick={() => {
                            setIsSubmitted(true);
                            if (selectedOption === data.description.assessment[currentQuestion].answer) {
                              setScore(prev => prev + 1);
                            }
                          }}
                          className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">fact_check</span>
                          <span>Check Answer</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (currentQuestion < data.description.assessment.length - 1) {
                              setCurrentQuestion(prev => prev + 1);
                              setSelectedOption(null);
                              setIsSubmitted(false);
                            } else {
                              setShowResults(true);
                            }
                          }}
                          className="w-full bg-slate-800 dark:bg-slate-100 hover:bg-slate-900 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.98] shadow-sm"
                        >
                          <span>{currentQuestion < data.description.assessment.length - 1 ? "Next Question" : "Finish Assessment"}</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-70">
                  <span className="material-symbols-outlined text-4xl mb-3 text-slate-300 dark:text-slate-600">quiz</span>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-center px-4">No questions compiled yet.</p>
                </div>
              )}
            </section>
          )}
        </aside>

        {/* Mobile View in AR Button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-[60] pointer-events-none">
          <button onClick={handleViewAR} className="w-full flex items-center justify-center gap-3 bg-[#0ea5e9] text-white px-6 py-4 rounded-xl font-bold transition-all duration-200 shadow-[0_8px_20px_rgba(14,165,233,0.4)] active:scale-[0.98] cursor-pointer pointer-events-auto">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
            <span className="text-sm font-bold uppercase tracking-wider">View in AR</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HumanAnatomy;
