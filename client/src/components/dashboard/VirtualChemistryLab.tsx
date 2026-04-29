import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CHEMICALS, REACTIONS, TOUR } from "./VirtualChemLab";
import type { Chemical, Reaction, HistoryItem } from "./VirtualChemLab";

/* ── Floating Particles ─────────────────────────────────────────── */
const Particles = () => {
  const dots = Array.from({length:25},(_,i)=>({
    id:i, x:Math.random()*100, dur:4+Math.random()*6,
    size:1+Math.random()*3, delay:Math.random()*8,
    color: i%3===0?"#2dd4bf":i%3===1?"#a78bfa":"#38bdf8"
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map(d=>(
        <motion.div key={d.id} className="absolute rounded-full"
          style={{left:`${d.x}%`,bottom:-10,width:d.size,height:d.size,background:d.color,opacity:0.4}}
          animate={{y:[-10,-900],opacity:[0,0.5,0]}}
          transition={{duration:d.dur,repeat:Infinity,delay:d.delay,ease:"linear"}}/>
      ))}
    </div>
  );
};

/* ── Chemical Bottle ────────────────────────────────────────────── */
const Bottle = ({chem,selected,idx,onSelect,onDragStart}:{
  chem:Chemical; selected:boolean; idx:number;
  onSelect:()=>void; onDragStart:(id:string)=>void;
}) => (
  <div
    className="flex flex-col items-center gap-1 cursor-pointer select-none"
    draggable
    onClick={onSelect}
    onDragStart={(e:React.DragEvent<HTMLDivElement>)=>{e.dataTransfer.setData("chemId",chem.id);onDragStart(chem.id);}}>
    <motion.div
      animate={{y:[0,-8,0]}}
      transition={{duration:2+idx*0.15,repeat:Infinity,ease:"easeInOut",delay:idx*0.1}}
      className="flex flex-col items-center gap-1">
      <div className="relative">
        {selected&&(
          <motion.div className="absolute -inset-2 rounded-full"
            animate={{opacity:[0.3,0.8,0.3],scale:[0.9,1.1,0.9]}}
            transition={{duration:1.2,repeat:Infinity}}
            style={{background:chem.glow,filter:"blur(4px)"}}/>
        )}
        <div className="w-4 h-3 rounded-t mx-auto border-t-[3px] border-x-[3px] brightness-75 dark:brightness-100 transition-all"
          style={{borderColor:chem.color,background:chem.color+"44"}}/>
        <div className="w-9 h-14 rounded-b-2xl rounded-t-sm border-[3px] flex flex-col justify-end items-center pb-1 overflow-hidden relative bg-slate-50/90 dark:bg-[#1e293b]/60 transition-all duration-500 shadow-[0_4px_10px_rgba(0,0,0,0.15)] dark:shadow-none"
          style={{
            borderColor:chem.color,
            boxShadow:selected?`0 0 20px ${chem.glow},0 0 40px ${chem.glow}33`:undefined
          }}>
          <motion.div className="w-full rounded-b-xl absolute bottom-0 saturate-150 brightness-110 dark:saturate-100 dark:brightness-100 transition-all"
            style={{height:"55%",background:chem.color+"aa"}}
            animate={{height:selected?["55%","65%","55%"]:"55%"}}
            transition={{duration:1.5,repeat:Infinity}}/>
          <div className="absolute top-1 left-1 w-1.5 h-4 rounded-full opacity-60 dark:opacity-40"
            style={{background:"white"}}/>
        </div>
      </div>
      <span className="text-center font-bold leading-tight brightness-50 contrast-150 dark:brightness-100 dark:contrast-100 transition-all"
        style={{fontSize:"10px",color:chem.color,textShadow:`0 0 6px ${chem.glow}`}}>
        {chem.label}
      </span>
    </motion.div>
  </div>
);

/* ── Beaker ─────────────────────────────────────────────────────── */
const BeakerView = ({index,chemicals,isOver,reacting,productColor,onDrop,onDragOver,onDragLeave,onClick,onClear}:{
  index:number; chemicals:Chemical[]; isOver:boolean; reacting:boolean;
  productColor:string; onDrop:(e:React.DragEvent)=>void;
  onDragOver:(e:React.DragEvent)=>void; onDragLeave:()=>void;
  onClick:()=>void; onClear:()=>void;
}) => {
  const layerColors = chemicals.map(c=>c.color);
  return (
    <motion.div animate={{y:[0,-10,0]}} transition={{duration:3+index*0.5,repeat:Infinity,ease:"easeInOut"}}
      className="flex flex-col items-center w-full md:w-52">
      <div className="text-teal-400 text-xs font-bold mb-2 tracking-widest uppercase">
        Beaker {index+1}
      </div>
      {/* Beaker SVG-style */}
      <motion.div
        className="relative cursor-pointer w-full"
        animate={isOver?{scale:1.05}:{scale:1}}
        onClick={onClick}
        onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
        {/* Outer glow when dragging over */}
        {isOver&&(
          <div className="absolute -inset-3 rounded-2xl animate-pulse"
            style={{background:"rgba(45,212,191,0.2)",border:"2px solid #2dd4bf"}}/>
        )}
        {/* Beaker body */}
        <div className={`relative w-full h-48 md:h-72 border-[3px] rounded-b-[2.5rem] overflow-hidden backdrop-blur-md transition-all duration-500 ${chemicals.length===0 ? 'border-slate-400 dark:border-teal-400/50 bg-gradient-to-b from-slate-50/40 via-slate-100/40 to-slate-200/80 dark:from-[#1e293b]/70 dark:to-[#0f172a]/90 shadow-[0_15px_35px_rgba(0,0,0,0.1),inset_0_0_30px_rgba(15,23,42,0.1),inset_0_-15px_20px_rgba(255,255,255,0.9)] dark:shadow-[0_0_10px_rgba(45,212,191,0.2),inset_0_0_10px_rgba(45,212,191,0.05)]' : 'border-slate-300/80 dark:border-teal-400/50 bg-white/30 dark:bg-[#1e293b]/70 shadow-[0_10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_10px_rgba(45,212,191,0.2)]'}`}
          style={{
            boxShadow: reacting
              ? "0 0 40px rgba(45,212,191,0.8), inset 0 0 20px rgba(45,212,191,0.1)"
              : isOver
              ? "0 0 20px rgba(45,212,191,0.5)"
              : undefined,
            clipPath:"polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}>
          {/* Liquid layers */}
          <AnimatePresence>
            {reacting?(
              <motion.div className="absolute inset-0"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                style={{background:productColor,opacity:0.85}}/>
            ):(
              layerColors.map((col,i)=>(
                <motion.div key={i} className="absolute w-full"
                  initial={{height:0,opacity:0}}
                  animate={{height:`${100/chemicals.length}%`,opacity:0.85}}
                  transition={{type:"spring",stiffness:200}}
                  style={{bottom:`${(i/chemicals.length)*100}%`,background:col+"cc"}}/>
              ))
            )}
          </AnimatePresence>
          {/* Bubbles during reaction */}
          {reacting&&[...Array(6)].map((_,i)=>(
            <motion.div key={i} className="absolute w-2 h-2 rounded-full border border-teal-300"
              style={{left:`${15+i*12}%`,bottom:0,background:"rgba(45,212,191,0.3)"}}
              animate={{y:[-10,-140],opacity:[0.8,0]}}
              transition={{duration:0.8+i*0.2,repeat:Infinity,delay:i*0.15}}/>
          ))}
          {/* Glass shine */}
          <div className="absolute top-0 left-4 w-3 h-full rounded-full opacity-40 dark:opacity-20 transition-opacity duration-500"
            style={{background:"linear-gradient(to bottom,white,transparent)"}}/>
          <div className="absolute top-0 right-2 w-1 h-full rounded-full opacity-20 dark:opacity-10 transition-opacity duration-500"
            style={{background:"linear-gradient(to bottom,white,transparent)"}}/>
          {/* Chemical name tags */}
          {!reacting&&chemicals.map((c,i)=>(
            <div key={i} className="absolute right-1 text-[8px] font-bold px-1 rounded"
              style={{bottom:`${(i/chemicals.length)*100+5}%`,color:c.color,background:"rgba(0,0,0,0.6)"}}>
              {c.label}
            </div>
          ))}
        </div>
        {/* Beaker rim */}
        <div className={`w-[110%] h-4 -mt-1 rounded-t-md border-[3px] mx-auto transition-colors duration-500 ${chemicals.length===0 ? 'border-slate-400 dark:border-teal-400/40 bg-white/70 dark:bg-teal-400/10' : 'border-slate-300/80 dark:border-teal-400/40 bg-white/40 dark:bg-teal-400/10'}`}
          style={{boxShadow:"inset 0 1px 4px rgba(255,255,255,0.9)"}}/>
      </motion.div>
      {/* Clear button */}
      <button onClick={e=>{e.stopPropagation();onClear();}}
        className="mt-2 text-[10px] text-red-400/70 hover:text-red-400 transition-colors">
        🗑 Clear
      </button>
      {/* Chemical count */}
      <div className="mt-1 text-[10px] text-teal-400/60">
        {chemicals.length}/3 chemicals
      </div>
    </motion.div>
  );
};

/* ── Tour Tooltip ───────────────────────────────────────────────── */
const TourTooltip = ({step,total,title,body,onNext,onSkip}:{
  step:number; total:number; title:string; body:string;
  onNext:()=>void; onSkip:()=>void;
}) => (
  <AnimatePresence>
    <motion.div
      className="fixed top-0 md:bottom-8 md:top-auto left-0 md:left-1/2 z-50 w-full md:w-80"
      style={{transform:"translateX(-50%)"}}
      initial={{y:-40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-40,opacity:0}}>
      <motion.div animate={{y:[0,-4,0]}} transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}
        className="rounded-b-2xl md:rounded-2xl p-5 border bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl transition-colors duration-500"
        style={{
          borderColor:"rgba(45,212,191,0.5)",
          boxShadow:"0 0 40px rgba(45,212,191,0.3)"
        }}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold tracking-widest uppercase transition-colors duration-500">
            {step+1} / {total}
          </span>
          <button onClick={onSkip} className="text-[10px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-500">Skip tour</button>
        </div>
        <h3 className="text-slate-800 dark:text-white font-bold text-sm mb-2 transition-colors duration-500">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4 transition-colors duration-500">{body}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {Array.from({length:total}).map((_,i)=>(
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{background:i===step?"#2dd4bf":"rgba(45,212,191,0.2)"}}/>
            ))}
          </div>
          <button onClick={onNext}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-black transition-all hover:brightness-110"
            style={{background:"linear-gradient(135deg,#2dd4bf,#a78bfa)"}}>
            {step===total-1?"Finish!":"Next →"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ── Safety Modal ───────────────────────────────────────────────── */
const SafetyModal = ({warning,onProceed,onCancel}:{
  warning:string; onProceed:()=>void; onCancel:()=>void;
}) => (
  <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
    style={{background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"}}
    initial={{opacity:0}} animate={{opacity:1}}>
    <motion.div className="w-96 rounded-2xl p-6 border bg-white/95 dark:bg-[#1e293b]/95 transition-colors duration-500"
      style={{borderColor:"rgba(251,113,133,0.6)",boxShadow:"0 0 60px rgba(251,113,133,0.3)"}}
      initial={{scale:0.8,y:20}} animate={{scale:1,y:0}}>
      <div className="text-4xl mb-3">⚠️</div>
      <h3 className="text-red-500 dark:text-red-400 font-bold text-lg mb-2 transition-colors duration-500">Safety Warning</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed transition-colors duration-500">{warning}</p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 transition-colors duration-500">This is a virtual simulation. In a real lab, always follow proper safety protocols.</p>
      <div className="flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-2 rounded-lg text-sm font-bold border border-slate-600 text-slate-300 hover:border-slate-400 transition-colors">
          Cancel
        </button>
        <button onClick={onProceed}
          className="flex-1 py-2 rounded-lg text-sm font-bold bg-red-500/20 border border-red-500/60 text-red-400 hover:bg-red-500/30 transition-colors">
          Proceed Anyway
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Reaction Result Card ────────────────────────────────────────── */
const ReactionCard = ({reaction,onClose}:{reaction:Reaction;onClose:()=>void}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
  <motion.div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(6px)"}}
    onClick={onClose}
    initial={{opacity:0}} animate={{opacity:1}}>
    <motion.div
      className="relative w-full max-w-[440px] rounded-2xl border-[3px] bg-white dark:bg-[#1e293b] overflow-hidden transition-colors duration-500"
      onClick={(e) => e.stopPropagation()}
      style={{
        borderColor: reaction.productColor+"88",
        boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 40px ${reaction.productColor}33`
      }}
      initial={{scale:0.88,y:24,opacity:0}} animate={{scale:1,y:0,opacity:1}} transition={{type:"spring",stiffness:220,damping:22}}>

      {/* ── Close button – anchored to modal corner ── */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white text-base transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm"
        aria-label="Close modal">✕</button>

      {/* ── Content – consistent left-aligned vertical grid ── */}
      <div className="px-5 pt-5 pb-5 flex flex-col gap-4">

        {/* Equation box – centered */}
        <div
          className="rounded-xl px-4 py-3 text-center font-mono font-bold text-sm border-2 brightness-50 contrast-150 dark:brightness-100 dark:contrast-100 transition-all duration-500"
          style={{background:reaction.productColor+"22",color:reaction.productColor,borderColor:reaction.productColor+"66"}}>
          {reaction.eq}
        </div>

        {/* Type badge */}
        <span
          className="self-start text-[10px] font-extrabold px-2.5 py-1 rounded-full border-2 brightness-75 contrast-150 dark:brightness-100 dark:contrast-100 transition-all duration-500"
          style={{color:"#0d9488",borderColor:"rgba(13,148,136,0.5)",background:"rgba(13,148,136,0.1)"}}
        >{reaction.type}</span>

        {/* Explanation */}
        <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium transition-colors duration-500">{reaction.explain}</p>

        {/* Observation panel */}
        <div className="rounded-xl p-4 border-2 border-amber-500/40 dark:border-yellow-400/30 bg-amber-50 dark:bg-yellow-400/10 transition-colors duration-500">
          <div className="text-amber-700 dark:text-yellow-400 text-xs font-black mb-1.5 tracking-wider transition-colors duration-500">WHAT DID YOU OBSERVE?</div>
          <p className="text-amber-900 dark:text-yellow-100 text-xs font-medium transition-colors duration-500">{reaction.observe}</p>
        </div>

      </div>
    </motion.div>
  </motion.div>
  );
};


const VirtualChemistryLab = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [beaker1, setBeaker1] = useState<Chemical[]>([]);
  const [beaker2, setBeaker2] = useState<Chemical[]>([]);
  const [over1, setOver1] = useState(false);
  const [over2, setOver2] = useState(false);
  const [reacting, setReacting] = useState(false);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [safety, setSafety] = useState<{ r: Reaction } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [isShelfOpen, setIsShelfOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useOutletContext<{ isDarkMode: boolean; toggleTheme: () => void }>() || { isDarkMode: true, toggleTheme: () => {} };
  const [showNotifications, setShowNotifications] = useState(false);

  const [shakeBeaker, setShakeBeaker] = useState(false);
  const [edgeGlow, setEdgeGlow] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Init tour
  useEffect(() => {
    if (!localStorage.getItem("lab_tour_done")) setTourStep(0);
  }, []);

  const finishTour = () => { setTourStep(null); localStorage.setItem("lab_tour_done", "1"); };
  const nextTour = () => { if (tourStep !== null) { if (tourStep >= TOUR.length - 1) finishTour(); else setTourStep(t => (t ?? 0) + 1); } };

  const filtered = CHEMICALS.filter(c => c.label.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));

  const addToBeaker = useCallback((beakerIdx: number, chemId: string) => {
    const chem = CHEMICALS.find(c => c.id === chemId);
    if (!chem) return;
    if (beakerIdx === 0) { if (beaker1.length >= 3 || beaker1.find(c => c.id === chemId)) return; setBeaker1(p => [...p, chem]); }
    else { if (beaker2.length >= 3 || beaker2.find(c => c.id === chemId)) return; setBeaker2(p => [...p, chem]); }
    setSelected(null);
  }, [beaker1, beaker2]);

  const doReact = (r: Reaction) => {
    setReacting(true);
    setEdgeGlow(true);
    if (r.effect === "bubble" || r.effect === "smoke") setShakeBeaker(true);
    const entry: HistoryItem = { id: Date.now(), eq: r.eq, type: r.type, time: new Date().toLocaleTimeString() };
    setHistory(h => [entry, ...h].slice(0, 5));
    setTimeout(() => { setShakeBeaker(false); setEdgeGlow(false); setReaction(r); setReacting(false); }, 2000);
  };

  const handleMix = () => {
    if (beaker1.length === 0 || beaker2.length === 0) return;
    const c1 = beaker1[0].id, c2 = beaker2[0].id;
    const key1 = `${c1}+${c2}`, key2 = `${c2}+${c1}`;
    const r = REACTIONS[key1] || REACTIONS[key2] || {
      eq: `${c1} + ${c2} → No significant reaction`,
      type: "No Reaction", explain: "These chemicals do not react with each other under normal conditions.",
      observe: "No visible change observed.", productColor: "#334155", effect: "none" as const, dangerous: false,
    };
    if (r.dangerous) { setSafety({ r }); return; }
    doReact(r);
  };

  const clearBeaker = (idx: number) => { if (idx === 0) setBeaker1([]); else setBeaker2([]); };

  // Drag handlers
  const handleDrop = (e: React.DragEvent, beakerIdx: number) => {
    e.preventDefault();
    const id = (e as React.DragEvent).dataTransfer.getData("chemId");
    if (id) addToBeaker(beakerIdx, id);
    if (beakerIdx === 0) setOver1(false); else setOver2(false);

  };

  const canMix = beaker1.length > 0 && beaker2.length > 0 && !reacting;

  return (
    <div className={`relative flex flex-col overflow-hidden min-h-screen w-full transition-colors duration-500 ${isDarkMode ? 'dark bg-[#0a0a1a]' : 'bg-slate-50'}`}
      style={{fontFamily:"'Inter',sans-serif"}}>

      {/* Edge glow on dramatic reactions */}
      <AnimatePresence>
        {edgeGlow && (
          <motion.div className="fixed inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ boxShadow: "inset 0 0 120px rgba(45,212,191,0.4)" }} />
        )}
      </AnimatePresence>

      <Particles />

      {/* ── Top Bar ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-6 h-12 md:h-14 border-b shrink-0 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate('/dashboard/chemistry')}
            className="flex items-center justify-center w-8 h-8 rounded border border-slate-300 dark:border-teal-400/30 text-slate-500 dark:text-teal-400 hover:bg-slate-100 dark:hover:bg-teal-400/10 hover:shadow-md dark:hover:shadow-[0_0_10px_rgba(45,212,191,0.3)] transition-all group"
            title="Back to Courses"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-1.5 md:gap-2 border-l pl-3 md:pl-4 border-slate-300 dark:border-teal-400/20 h-6 transition-colors duration-500">
            <span className="text-base md:text-xl">🧪</span>
            <h1 className="text-slate-800 dark:text-white font-extrabold text-sm md:text-base leading-none tracking-wide pt-0.5 transition-colors duration-500">Virtual Chemistry Lab</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-slate-500 dark:text-teal-400/70 text-[10px] md:text-xs font-medium flex items-center bg-slate-100 dark:bg-teal-400/10 px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-slate-200 dark:border-teal-400/20 transition-colors duration-500">
            <span className="hidden md:inline">Reactions:</span><span className="md:hidden">Rxns:</span> <span className="text-teal-500 dark:text-teal-400 font-bold ml-1 md:ml-1.5 text-xs md:text-[13px]">{history.length}</span>
          </div>
          
          <button onClick={toggleTheme} className="md:hidden p-1.5 text-slate-500 dark:text-teal-400/70 hover:text-teal-500 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-teal-400/10 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">{isDarkMode ? "dark_mode" : "light_mode"}</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 border-l border-slate-300 dark:border-teal-400/20 pl-4 h-6 transition-colors duration-500">
            <button onClick={toggleTheme} className="p-1.5 text-slate-500 dark:text-teal-400/70 hover:text-teal-500 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-teal-400/10 rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{isDarkMode ? "dark_mode" : "light_mode"}</span>
            </button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-1.5 text-slate-500 dark:text-teal-400/70 hover:text-teal-500 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-teal-400/10 rounded-full transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className={`absolute top-[4px] right-[4px] w-2 h-2 rounded-full border-2 transition-colors duration-500 ${isDarkMode ? 'bg-[#0ea5e9] border-[#1e293b] shadow-[0_0_8px_rgba(14,165,233,0.8)]' : 'bg-red-500 border-white shadow-sm'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ── Mobile History (Collapsible) ──────────────────────── */}
      <div className="md:hidden w-full bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-20 transition-colors duration-500 shrink-0">
        <button onClick={() => setHistoryOpen(!historyOpen)} className="flex items-center justify-between w-full px-4 py-2">
          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">📋 Reaction History</span>
          <span className="material-symbols-outlined text-[16px] text-slate-500">{historyOpen ? 'expand_less' : 'expand_more'}</span>
        </button>
        <AnimatePresence>
          {historyOpen && (
            <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="overflow-hidden">
              <div className="px-4 pb-3 space-y-2 max-h-[30vh] overflow-y-auto">
                {history.length===0 ? (
                   <p className="text-slate-400 text-[10px] text-center py-2">No reactions yet…</p>
                ) : history.slice(0,3).map(h => (
                   <div key={h.id} className="p-2 rounded-lg border border-teal-200 dark:border-teal-400/20 bg-teal-50 dark:bg-teal-400/5">
                     <p className="text-teal-700 dark:text-teal-300 text-[9px] font-bold truncate">{h.eq}</p>
                     <div className="flex justify-between mt-1">
                       <span className="text-slate-500 text-[8px]">{h.type}</span>
                       <span className="text-slate-400 text-[8px]">{h.time}</span>
                     </div>
                   </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Layout ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden flex-col md:flex-row pb-[40px] md:pb-0">

        {/* LEFT — Chemical Shelf */}
        <motion.div id="shelf-zone" className="hidden md:flex border-r flex-col overflow-x-hidden shrink-0 border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl transition-colors duration-500"
          initial={false} animate={{ width: isShelfOpen ? 256 : 60 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
          
          <div className="px-4 pt-4 pb-2 whitespace-nowrap min-w-[256px]">
            <motion.div animate={{ opacity: isShelfOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <h2 className="text-teal-600 dark:text-teal-400 text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500">Chemical Shelf</h2>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] mb-3 transition-colors duration-500">Click to select · Drag to beaker</p>
            </motion.div>

            {/* Search Bar & Collapse Toggle */}
            <div className={`relative flex items-center rounded-xl transition-all duration-500 ${isShelfOpen ? 'bg-slate-100 dark:bg-slate-800/50' : 'bg-transparent'} ${isShelfOpen && search ? 'shadow-sm dark:shadow-[0_0_20px_rgba(30,41,59,0.5)]' : 'shadow-none'}`}
                 style={{
                   width: isShelfOpen ? "224px" : "30px",
                   marginLeft: isShelfOpen ? "0" : "-3px",
                   border: isShelfOpen ? (isDarkMode ? "1px solid rgba(51,65,85,0.8)" : "1px solid #cbd5e1") : "1px solid transparent"
                 }}>
              {isShelfOpen && <span className="absolute left-3 text-slate-400 dark:text-slate-500 text-xs transition-colors duration-500">🔍</span>}
              {isShelfOpen && (
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search chemicals..."
                  className="bg-transparent pl-8 pr-8 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none w-full transition-colors duration-500"
                />
              )}
              <button 
                onClick={() => setIsShelfOpen(!isShelfOpen)}
                title={isShelfOpen ? "Collapse Shelf" : "Expand Shelf"}
                className="absolute right-1 p-1 rounded text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/20 transition-colors flex items-center justify-center z-10"
                style={{ right: isShelfOpen ? "4px" : "0" }}
              >
                <span className="material-symbols-outlined text-sm">
                  {isShelfOpen ? 'chevron_left' : 'chevron_right'}
                </span>
              </button>
            </div>
          </div>

          {/* Family legend */}
          <div className="px-4 pb-3 flex flex-wrap gap-1.5 min-w-[256px]">
            <motion.div animate={{ opacity: isShelfOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="flex flex-wrap gap-1.5">
              {[["Acid", "#ef4444"], ["Base", "#3b82f6"], ["Metal", "#f59e0b"], ["Neutral", "#7dd3fc"], ["Salt", "#cbd5e1"]].map(([f, c]) => (
                <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full border font-bold"
                  style={{ color: c, borderColor: c + "44", background: c + "11" }}>{f}</span>
              ))}
            </motion.div>
          </div>

          {/* Bottles grid */}
          <div className="flex-1 px-3 pb-4 overflow-y-auto overflow-x-hidden min-w-[256px] custom-scrollbar">
            <motion.div animate={{ opacity: isShelfOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
              {filtered.length === 0 ? (
                <motion.p className="text-center text-slate-500 text-xs mt-8"
                  animate={{ x: [-4, 4, -4, 4, 0] }} transition={{ duration: 0.4 }}>
                  No chemical found 🔬
                </motion.p>
              ) : (
                <div className="grid grid-cols-3 gap-4 pt-2 w-56">
                  {filtered.map((c, i) => (
                    <Bottle key={c.id} chem={c} idx={i}
                      selected={selected === c.id}
                      onSelect={() => setSelected(p => p === c.id ? null : c.id)}
                      onDragStart={() => { }} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <AnimatePresence>
            {selected && isShelfOpen && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
                className="mx-3 mb-3 p-3 rounded-xl border text-xs min-w-[232px]"
                style={{ borderColor: "rgba(45,212,191,0.4)", background: "rgba(45,212,191,0.08)" }}>
                <p className="text-teal-300 font-bold">{CHEMICALS.find(c => c.id === selected)?.label} selected</p>
                <p className="text-slate-400 mt-0.5">Click a beaker to add it</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CENTER — Beaker Zone */}
        <div id="beaker-zone" className="flex-1 flex flex-col items-center justify-center p-4 md:px-8 relative w-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row justify-center items-end gap-8 md:gap-16 w-full max-w-2xl">
            <div className="w-[45%] md:w-auto">
              <BeakerView index={0} chemicals={beaker1} isOver={over1}
                reacting={reacting} productColor={reaction?.productColor || "#2dd4bf"}
                onDrop={e => handleDrop(e, 0)}
                onDragOver={e => { e.preventDefault(); setOver1(true); }}
                onDragLeave={() => setOver1(false)}
                onClick={() => { if (selected) addToBeaker(0, selected); }}
                onClear={() => clearBeaker(0)} />
            </div>

            {/* Mix button */}
            <div id="react-zone" className="hidden md:flex flex-col items-center gap-3 mb-10 z-10">
              <motion.div className="text-3xl" animate={{rotate:[0,15,-15,0]}} transition={{duration:2,repeat:Infinity}}>⚗️</motion.div>
              <motion.button
                id="mix-react-btn"
                onClick={handleMix}
                disabled={!canMix}
                whileHover={canMix?{scale:1.05}:{}}
                whileTap={canMix?{scale:0.95}:{}}
                animate={canMix?{boxShadow:isDarkMode?["0 0 20px rgba(45,212,191,0.4)","0 0 40px rgba(45,212,191,0.8)","0 0 20px rgba(45,212,191,0.4)"]:["0 4px 12px rgba(45,212,191,0.3)","0 8px 24px rgba(45,212,191,0.5)","0 4px 12px rgba(45,212,191,0.3)"]}:{}}
                transition={{duration:1.5,repeat:Infinity}}
                className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wider border transition-all duration-500 ${canMix ? 'cursor-pointer text-teal-600 dark:text-teal-400 border-teal-400 dark:border-teal-400' : 'cursor-not-allowed text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'}`}
                style={{
                  background: canMix ? (isDarkMode ? "linear-gradient(135deg,rgba(45,212,191,0.2),rgba(167,139,250,0.2))" : "linear-gradient(135deg,rgba(45,212,191,0.1),rgba(167,139,250,0.1))") : (isDarkMode ? "rgba(30,41,59,0.5)" : "#f1f5f9"),
                }}>
                {reacting?"Reacting…":"⚡ Mix & React"}
              </motion.button>
              {!canMix&&<p className="text-slate-500 dark:text-slate-600 text-[10px] text-center transition-colors duration-500">Add chemicals<br/>to both beakers</p>}
            </div>

            <motion.div className="w-[45%] md:w-auto" animate={shakeBeaker ? { x: [-4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.3 }}>
              <BeakerView index={1} chemicals={beaker2} isOver={over2}
                reacting={reacting} productColor={reaction?.productColor || "#a78bfa"}
                onDrop={e => handleDrop(e, 1)}
                onDragOver={e => { e.preventDefault(); setOver2(true); }}
                onDragLeave={() => setOver2(false)}
                onClick={() => { if (selected) addToBeaker(1, selected); }}
                onClear={() => clearBeaker(1)} />
            </motion.div>
          </div>

          <div className="md:hidden w-full max-w-sm mt-8 z-10">
             <button onClick={handleMix} disabled={!canMix} className={`w-full py-3 rounded-xl font-bold tracking-widest shadow-[0_0_15px_rgba(13,148,136,0.4)] transition-all flex items-center justify-center gap-2 ${canMix ? 'bg-teal-500 hover:bg-teal-400 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                <span className="material-symbols-outlined text-[18px]">bolt</span> MIX & REACT
             </button>
             {!canMix&&<p className="text-slate-500 text-[10px] text-center mt-2">Add chemicals to both beakers</p>}
          </div>

          {/* Instructions */}
          {beaker1.length===0&&beaker2.length===0&&(
            <motion.p className="text-slate-500 dark:text-slate-600 text-sm text-center max-w-xs transition-colors duration-500 z-10"
              animate={{opacity:[0.4,0.8,0.4]}} transition={{duration:2.5,repeat:Infinity}}>
              ← Select a chemical from the shelf and click a beaker, or drag & drop
            </motion.p>
          )}

          {/* ── Simulator Command Dock ───────────────────────────── */}
          <div className="fixed md:absolute bottom-0 left-0 w-full border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a0a1a] backdrop-blur-md transition-colors duration-500 z-40">

            {/* ── Mobile footer: [TEMP] [PH METER] [AR VIEW] ─────── */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 gap-3 h-[48px]">
              {/* Temp chip */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/60 min-w-0">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider shrink-0">TEMP</span>
                <span className="text-[11px] text-slate-200 font-mono font-bold">25.0°C</span>
              </div>
              {/* pH Meter chip */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/60 min-w-0">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider shrink-0">pH</span>
                <span className="text-[11px] text-slate-200 font-mono font-bold">7.0</span>
              </div>
              {/* Spacer */}
              <div className="flex-1" />
              {/* AR View button — primary action */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-[10px] tracking-wider shadow-[0_0_12px_rgba(13,148,136,0.5)] border border-teal-400/50 transition-all active:scale-95 whitespace-nowrap">
                <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
                AR View
              </button>
            </div>

            {/* ── Desktop footer: full row ──────────────────────── */}
            <div className="hidden md:flex items-center gap-4 px-6 py-3">
              {/* Reaction State */}
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase mb-1">Reaction State</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 dark:bg-teal-400/10 rounded-md border border-teal-200 dark:border-teal-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_6px_#14b8a6] animate-pulse"></span>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider">{reacting ? 'Reacting' : 'Stable'}</span>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700/50"></div>
              {/* Temp */}
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase mb-1">Temp</span>
                <div className="px-2 py-1 bg-slate-100 dark:bg-[#1e293b] rounded-md border border-slate-200 dark:border-slate-700/50 shadow-inner">
                  <span className="text-[10px] text-slate-700 dark:text-slate-300 font-mono font-bold">25.0 °C</span>
                </div>
              </div>
              {/* pH Meter */}
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase mb-1">pH Meter</span>
                <div className="px-2 py-1 bg-slate-100 dark:bg-[#1e293b] rounded-md border border-slate-200 dark:border-slate-700/50 shadow-inner">
                  <span className="text-[10px] text-slate-700 dark:text-slate-300 font-mono font-bold">7.0</span>
                </div>
              </div>
              {/* AR View */}
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-widest shadow-[0_0_15px_rgba(13,148,136,0.4)] hover:shadow-[0_0_25px_rgba(13,148,136,0.6)] border border-teal-400/50 transition-all transform hover:-translate-y-0.5 group ml-auto">
                <span className="material-symbols-outlined text-[18px] group-hover:animate-pulse">view_in_ar</span>
                <span className="text-[11px]">VIEW IN AR</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Reaction History */}
        <div className="hidden md:flex w-64 border-l flex-col overflow-y-auto border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl transition-colors duration-500 z-10">
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500">Reaction History</h2>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] transition-colors duration-500">Last 5 reactions</p>
          </div>
          <div className="flex-1 px-3 pb-4 space-y-2">
            {history.length===0?(
              <p className="text-slate-400 dark:text-slate-600 text-xs text-center mt-8 transition-colors duration-500">No reactions yet…</p>
            ):(
              history.map((h,i)=>(
                <motion.div key={h.id}
                  initial={{x:30,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:i*0.05}}
                  className="p-3 rounded-xl border border-purple-200 dark:border-purple-400/20 bg-purple-50/50 dark:bg-purple-400/5 transition-colors duration-500">
                  <p className="text-purple-700 dark:text-purple-300 text-[10px] font-bold truncate transition-colors duration-500">{h.eq}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-500 text-[9px] transition-colors duration-500">{h.type}</span>
                    <span className="text-slate-400 dark:text-slate-600 text-[9px] transition-colors duration-500">{h.time}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          {/* Quick stats */}
          <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 transition-colors duration-500">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider transition-colors duration-500">Quick Stats</p>
            <div className="flex justify-between text-[10px] transition-colors duration-500">
              <span className="text-slate-500">Reactions run</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{history.length}</span>
            </div>
            <div className="flex justify-between text-[10px] transition-colors duration-500">
              <span className="text-slate-500">Beaker 1 chems</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{beaker1.length}</span>
            </div>
            <div className="flex justify-between text-[10px] transition-colors duration-500">
              <span className="text-slate-500">Beaker 2 chems</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{beaker2.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Shelf Additions ─────────────────────────────── */}
      <button onClick={() => setMobileDrawerOpen(true)} className="md:hidden fixed bottom-[60px] left-4 z-40 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-full shadow-lg font-bold text-[11px] tracking-wider flex items-center gap-1.5 border border-teal-400/30 active:scale-95 transition-transform">
        <span>🧴</span> CHEMICALS
      </button>

      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div className="md:hidden fixed inset-0 bg-black/60 z-50" onClick={() => setMobileDrawerOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
            <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring", damping:25, stiffness:200}} 
              className="md:hidden fixed inset-x-0 bottom-0 h-[65vh] z-50 bg-white dark:bg-[#1e293b] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col">
              <div className="w-full py-3 flex justify-center cursor-pointer" onClick={() => setMobileDrawerOpen(false)}>
                 <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="px-4 pb-2">
                 <div className="relative">
                   <span className="absolute left-3 top-3 text-slate-400 dark:text-slate-500 text-sm">🔍</span>
                   <input value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 py-2.5 pl-9 pr-4 rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 outline-none" placeholder="Search chemicals..." />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-3 content-start">
                 {filtered.map(c => (
                   <div key={c.id} onClick={() => { setSelected(c.id); setMobileDrawerOpen(false); }} className="cursor-pointer flex flex-col items-center">
                      <Bottle chem={c} selected={selected===c.id} idx={0} onSelect={()=>{}} onDragStart={()=>{}} />
                      <div className="text-[9px] text-center font-bold text-slate-600 dark:text-slate-300 mt-1">{c.id}</div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Overlays ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {safety && (
          <SafetyModal warning={safety.r.warning || "Dangerous reaction!"} key="safety"
            onProceed={() => { doReact(safety.r); setSafety(null); }}
            onCancel={() => setSafety(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {reaction && (
          <ReactionCard key="result" reaction={reaction} onClose={() => setReaction(null)} />
        )}
      </AnimatePresence>
      {tourStep !== null && (
        <TourTooltip step={tourStep} total={TOUR.length}
          title={TOUR[tourStep].title} body={TOUR[tourStep].body}
          onNext={nextTour} onSkip={finishTour} />
      )}
    </div>
  );
};

export default VirtualChemistryLab;
