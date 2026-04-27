import React, { useState, useEffect, useLayoutEffect } from 'react';

interface TourStep {
  targetId: string;
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-dashboard',
    title: 'Dashboard',
    description: 'Track your overall learning progress and stay on top of your daily goals here.',
  },
  {
    targetId: 'tour-courses',
    title: 'My Courses',
    description: 'Access all your enrolled AR modules and academic courses from this section.',
  },
  {
    targetId: 'tour-assignments',
    title: 'Assignments',
    description: 'Check your upcoming tasks, lab reports, and readiness quizzes to stay ahead.',
  },
  {
    targetId: 'tour-analytics',
    title: 'Analytics',
    description: 'See your performance breakdown, study hours, and AI-driven success predictions.',
  },
  {
    targetId: 'tour-profile',
    title: 'Profile',
    description: 'Manage your account settings, preferences, and view your academic achievements.',
  },
];

const StudentTour: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Expose a global function for manual debugging/triggering
    (window as any).startTour = () => {
      localStorage.removeItem('seenTour');
      setCurrentStep(0);
      setRetryCount(0);
      setIsVisible(true);
    };

    const seenTour = localStorage.getItem('seenTour');
    if (!seenTour) {
      // Small delay to ensure DOM is ready and animations finish
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateTargetRect = () => {
    if (!isVisible) return;
    
    const targetId = TOUR_STEPS[currentStep].targetId;
    const elements = document.querySelectorAll(`#${targetId}`);
    let element: HTMLElement | null = null;
    
    // Find the visible instance of the ID (mobile vs desktop)
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        const style = window.getComputedStyle(el);
        const isVisibleInDOM = el.offsetParent !== null || style.position === 'fixed';
        if (isVisibleInDOM && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
            element = el;
            break;
        }
    }

    if (element) {
      const rect = element.getBoundingClientRect();
      // Only update state if position changed to avoid infinite cycles
      if (!targetRect || Math.abs(rect.top - targetRect.top) > 1 || Math.abs(rect.left - targetRect.left) > 1) {
          setTargetRect(rect);
          
          const spaceAbove = rect.top;
          const spaceBelow = window.innerHeight - rect.bottom;
          const isMobile = window.innerWidth < 768;
          
          let top = 0;
          let left = rect.left + rect.width / 2;

          // Prefer showing tooltip below unless there is no space
          if (spaceBelow > 240 || spaceBelow > spaceAbove) {
            top = rect.bottom + 15;
          } else {
            top = rect.top - 200;
          }

          const tooltipWidth = isMobile ? 300 : 360;
          const horizontalPadding = 15;
          
          let finalLeft = left - tooltipWidth / 2;
          // Bounds checking
          if (finalLeft < horizontalPadding) finalLeft = horizontalPadding;
          if (finalLeft + tooltipWidth > window.innerWidth - horizontalPadding) {
            finalLeft = window.innerWidth - tooltipWidth - horizontalPadding;
          }

          setTooltipPos({ top, left: finalLeft });
      }
      setRetryCount(0);
    } else if (retryCount < 8) {
      // Retry for up to 4 seconds (8 * 500ms) to account for slow page loads/animations
      const timer = setTimeout(() => setRetryCount(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    } else {
      console.warn(`[Tour] Step ${currentStep + 1} (${targetId}) not found. Skipping...`);
      if (currentStep < TOUR_STEPS.length - 1) {
          setCurrentStep(prev => prev + 1);
          setRetryCount(0);
      } else {
          handleComplete();
      }
    }
  };

  useLayoutEffect(() => {
    updateTargetRect();
    const handleResize = () => updateTargetRect();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [currentStep, isVisible, retryCount]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setRetryCount(0);
      setTargetRect(null); // Reset spotlight to force re-calculation
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('seenTour', 'true');
    setIsVisible(false);
  };

  if (!isVisible || !targetRect) return null;

  const step = TOUR_STEPS[currentStep];

  // Clip-path safety: ensure coordinates are non-negative
  const L = Math.max(0, targetRect.left - 10);
  const T = Math.max(0, targetRect.top - 10);
  const R = Math.min(window.innerWidth, targetRect.right + 10);
  const B = Math.min(window.innerHeight, targetRect.bottom + 10);

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden font-display transition-opacity duration-500">
      {/* Spotlight Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[1px] transition-all duration-500 pointer-events-auto"
        style={{
          clipPath: `polygon(
            0% 0%, 
            0% 100%, 
            ${L}px 100%, 
            ${L}px ${T}px, 
            ${R}px ${T}px, 
            ${R}px ${B}px, 
            ${L}px ${B}px, 
            ${L}px 100%, 
            100% 100%, 
            100% 0%
          )`
        }}
        onClick={handleSkip}
      />

      {/* Tooltip Card */}
      <div 
        className="absolute transition-all duration-500 ease-out pointer-events-auto w-[280px] sm:w-[320px] animate-in fade-in slide-in-from-bottom-4"
        style={{ top: tooltipPos.top, left: tooltipPos.left }}
      >
        <div className="bg-white dark:bg-[#1e293b] rounded-24 p-5 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          {/* Subtle Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }} />
          
          <div className="flex items-center justify-between mb-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-[#006493] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                Step {currentStep + 1} of {TOUR_STEPS.length}
             </span>
             <button onClick={handleSkip} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
             </button>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {step.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 leading-relaxed">
            {step.description}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button 
              onClick={handleSkip}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 px-2 py-1 transition-colors"
            >
              Skip Tour
            </button>
            <button 
              onClick={handleNext}
              className="bg-[#006493] dark:bg-blue-600 text-white text-sm font-black px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
              <span className="material-symbols-outlined text-[16px]">
                {currentStep === TOUR_STEPS.length - 1 ? 'check_circle' : 'arrow_forward'}
              </span>
            </button>
          </div>

          {/* Tooltip Arrow */}
          <div 
            className={`absolute w-3 h-3 bg-white dark:bg-[#1e293b] rotate-45 border-slate-100 dark:border-slate-800 ${
              tooltipPos.top > (targetRect.bottom) ? '-top-1.5 border-t border-l' : '-bottom-1.5 border-b border-r'
            }`}
            style={{ left: 'calc(50% - 6px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentTour;
