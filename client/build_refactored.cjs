const fs = require('fs');
const {code, ui} = JSON.parse(fs.readFileSync('scratch.js', 'utf8'));

// Replace VirtualChemLabUI imports
let newCode = code.replace(/import \{.*?\} from "\.\/VirtualChemLabUI";/, '');

// Inject UI components. Modify for mobile.
let uiComponents = ui.replace(/import React.*?;\n/, '').replace(/import \{ motion, AnimatePresence \}.*?;\n/, '').replace(/import type .*?;\n/, '');

// BeakerView modifications
uiComponents = uiComponents.replace(
  /className="relative flex flex-col items-center shrink-0"([^>]*?)style={{width:"200px",height:"280px"}}/g,
  'className="relative flex flex-col items-center shrink-0 w-full md:w-[200px] h-[180px] md:h-[280px]"$1'
);
uiComponents = uiComponents.replace(
  /text-xs/g,
  'text-[9px] md:text-xs'
);
uiComponents = uiComponents.replace(
  /text-sm/g,
  'text-[10px] md:text-sm'
);

// ReactionCard modifications
uiComponents = uiComponents.replace(
  /className="fixed inset-0 z-50 flex items-center justify-center p-4"/,
  'className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4"'
);
uiComponents = uiComponents.replace(
  /className="w-full max-w-\[480px\] rounded-2xl p-6 pt-14 border-\[3px\] relative bg-white dark:bg-\[#1e293b\] shadow-2xl dark:shadow-\[0_0_60px_rgba\(0,0,0,0\.5\)\] transition-colors duration-500"/,
  'className="w-full md:max-w-[480px] rounded-t-3xl md:rounded-2xl p-6 pt-14 border-[3px] md:border-[3px] border-b-0 md:border-b-[3px] relative bg-white dark:bg-[#1e293b] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-colors duration-500 h-[50vh] md:h-auto overflow-y-auto"'
);

// TourTooltip modifications
uiComponents = uiComponents.replace(
  /className="fixed bottom-8 left-1\/2 z-50 w-80"/,
  'className="fixed top-0 md:bottom-8 md:top-auto left-0 md:left-1/2 z-50 w-full md:w-80"'
);
uiComponents = uiComponents.replace(
  /rounded-2xl/,
  'rounded-b-2xl md:rounded-2xl'
);
uiComponents = uiComponents.replace(
  /initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}}/,
  'initial={{y:-40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-40,opacity:0}}'
);

// Inject UI components before the main component
newCode = newCode.replace('const VirtualChemistryLab = () => {', uiComponents + '\nconst VirtualChemistryLab = () => {');

// State additions
newCode = newCode.replace(
  /const \[edgeGlow, setEdgeGlow\] = useState\(false\);/,
  'const [edgeGlow, setEdgeGlow] = useState(false);\n  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);\n  const [historyOpen, setHistoryOpen] = useState(false);'
);

// Root container change
newCode = newCode.replace(
  /className=\{`relative flex flex-col overflow-hidden h-\[calc\(100vh-56px\)\] transition-colors duration-500 \$\{isDarkMode \? 'dark bg-\[#0f172a\]' : 'bg-slate-50'\}\`\}/,
  'className={`relative min-h-screen w-full flex flex-col overflow-hidden transition-colors duration-500 ${isDarkMode ? \\"dark bg-[#0a0a1a]\\" : \\"bg-slate-50\\"}`}'
);

// Modify top bar
newCode = newCode.replace(
  /className="relative z-10 flex items-center justify-between px-6 h-14 border-b shrink-0 border-slate-200 dark:border-slate-800 bg-white\/80 dark:bg-\[#1e293b\]\/80 backdrop-blur-xl transition-colors duration-500"/,
  'className="relative z-10 flex items-center justify-between px-4 md:px-6 h-12 md:h-14 border-b shrink-0 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl transition-colors duration-500"'
);
newCode = newCode.replace(
  /text-base leading-none/,
  'text-xs md:text-base leading-none'
);
newCode = newCode.replace(
  /className="text-slate-500 dark:text-teal-400\/70 text-xs font-medium flex items-center bg-slate-100 dark:bg-teal-400\/10 px-3 py-1\.5 rounded-lg border border-slate-200 dark:border-teal-400\/20 transition-colors duration-500">([\s\S]*?)Reactions: <span className="text-teal-500 dark:text-teal-400 font-bold ml-1\.5 text-\[13px\]">\{history\.length\}<\/span>/,
  'className="text-slate-500 dark:text-teal-400/70 text-[10px] md:text-xs font-medium flex items-center bg-slate-100 dark:bg-teal-400/10 px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-slate-200 dark:border-teal-400/20 transition-colors duration-500">\\n            <span className="hidden md:inline">Reactions:</span><span className="md:hidden">Rxns:</span> <span className="text-teal-500 dark:text-teal-400 font-bold ml-1 md:ml-1.5 text-xs md:text-[13px]">{history.length}</span>'
);

// Modify Main layout and Beaker zone
newCode = newCode.replace(
  /className="relative z-10 flex flex-1 overflow-hidden h-\[calc\(100vh-56px\)\]"/,
  'className="relative z-10 flex flex-1 overflow-hidden flex-col md:flex-row pb-[40px] md:pb-0"'
);
newCode = newCode.replace(
  /id="shelf-zone" className="border-r flex flex-col overflow-x-hidden shrink-0/,
  'id="shelf-zone" className="hidden md:flex border-r flex-col overflow-x-hidden shrink-0'
);
newCode = newCode.replace(
  /id="beaker-zone" className="flex-1 flex flex-col items-center justify-center gap-6 px-8 relative"/,
  'id="beaker-zone" className="flex-1 flex flex-col items-center justify-center gap-6 p-4 md:px-8 relative w-full overflow-y-auto overflow-x-hidden"'
);
newCode = newCode.replace(
  /className="flex gap-16 items-end"/,
  'className="flex flex-row justify-center items-end gap-2 md:gap-16 w-full max-w-2xl"'
);
newCode = newCode.replace(
  /<BeakerView index=\{0\}/,
  '<div className="w-[45%] md:w-auto"><BeakerView index={0}'
);
newCode = newCode.replace(
  /onClear=\{\(\) => clearBeaker\(0\)\} \/>/,
  'onClear={() => clearBeaker(0)} /></div>'
);
newCode = newCode.replace(
  /id="react-zone" className="flex flex-col items-center gap-3 mb-10 z-10"/,
  'id="react-zone" className="hidden md:flex flex-col items-center gap-3 mb-10 z-10"'
);
newCode = newCode.replace(
  /<motion\.div animate=\{shakeBeaker \? \{ x: \[-4, 4, -4, 4, 0\] \} : \{\}\} transition=\{\{ duration: 0\.3 \}\}>/,
  '<div className="w-[45%] md:w-auto"><motion.div animate={shakeBeaker ? { x: [-4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.3 }}>'
);
newCode = newCode.replace(
  /onClear=\{\(\) => clearBeaker\(1\)\} \/>\n            <\/motion\.div>/,
  'onClear={() => clearBeaker(1)} />\n            </motion.div></div>'
);

// Mobile Mix Button
newCode = newCode.replace(
  /\{\/\* Instructions \*\/\}/,
  `<div className="md:hidden w-full max-w-sm mt-4 z-10">
      <button onClick={handleMix} className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold tracking-widest shadow-[0_0_15px_rgba(13,148,136,0.4)] transition-all flex items-center justify-center gap-2">
         <span className="material-symbols-outlined text-[18px]">bolt</span> MIX & REACT
      </button>
   </div>\\n   {/* Instructions */}`
);

// Bottom Command Dock
newCode = newCode.replace(
  /className="absolute bottom-0 left-0 w-full border-t border-slate-200 dark:border-slate-800 bg-white\/70 dark:bg-\[#0f172a\]\/80 backdrop-blur-xl transition-colors duration-500 flex items-center justify-between px-6 py-3 z-20"/,
  'className="fixed md:absolute bottom-0 left-0 w-full h-[40px] md:h-auto border-t border-slate-200 dark:border-slate-800 bg-[#0a0a1a] transition-colors duration-500 flex items-center justify-between px-3 md:px-6 py-1 md:py-3 z-40"'
);
newCode = newCode.replace(
  /text-\[9px\] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase mb-1/g,
  'text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase md:mb-1'
);
newCode = newCode.replace(
  /text-\[10px\] text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider/,
  'text-[8px] md:text-[10px] text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider'
);
newCode = newCode.replace(
  /px-2\.5 py-1/,
  'px-1.5 py-0.5 md:px-2.5 md:py-1'
);
newCode = newCode.replace(
  /px-2 py-1/g,
  'px-1.5 py-0.5 md:px-2 md:py-1'
);
newCode = newCode.replace(
  /text-\[10px\] text-slate-700 dark:text-slate-300 font-mono font-bold/g,
  'text-[8px] md:text-[10px] text-slate-700 dark:text-slate-300 font-mono font-bold'
);
newCode = newCode.replace(
  /<div className="h-6 w-px bg-slate-200 dark:bg-slate-700\/50"><\/div>/,
  '<div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-700/50"></div>'
);
newCode = newCode.replace(
  /className="flex items-center gap-2 px-5 py-2\.5 rounded-xl bg-teal-600/,
  'className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600'
);
newCode = newCode.replace(
  /<\/div>\n\n        \{\/\* RIGHT — Reaction History \*\/\}/,
  `<button className="md:hidden flex items-center justify-center p-1.5 rounded-lg bg-teal-600 text-white"><span className="material-symbols-outlined text-[14px]">view_in_ar</span></button>
   </div>
</div>

{/* RIGHT — Reaction History */}`
);
newCode = newCode.replace(
  /className="w-64 border-l flex flex-col overflow-y-auto border-slate-200 dark:border-slate-800 bg-white\/60 dark:bg-\[#1e293b\]\/60 backdrop-blur-xl transition-colors duration-500 z-10"/,
  'className="hidden md:flex w-64 border-l flex-col overflow-y-auto border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl transition-colors duration-500 z-10"'
);

const mobileInjections = `
      {/* ── Mobile UI Additions ────────────────────────────────────────────── */}
      <div className="md:hidden absolute top-[48px] w-full bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-20">
        <button onClick={() => setHistoryOpen(!historyOpen)} className="flex items-center justify-between w-full px-4 py-2">
          <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase">📋 Reaction History</span>
          <span className="material-symbols-outlined text-[16px] text-slate-500">{historyOpen ? 'expand_less' : 'expand_more'}</span>
        </button>
        <AnimatePresence>
          {historyOpen && (
            <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="overflow-hidden">
              <div className="px-4 pb-3 space-y-2">
                {history.length===0 ? (
                   <p className="text-slate-400 text-[10px] text-center py-2">No reactions yet</p>
                ) : history.slice(0,3).map(h => (
                   <div key={h.id} className="p-2 rounded-lg border border-purple-200 dark:border-purple-400/20 bg-purple-50 dark:bg-purple-400/5">
                     <p className="text-purple-700 dark:text-purple-300 text-[9px] font-bold truncate">{h.eq}</p>
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

      <button onClick={() => setMobileDrawerOpen(true)} className="md:hidden fixed bottom-14 left-4 z-40 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-[11px] tracking-wider flex items-center gap-1.5 border border-teal-400/30">
        <span>🧴</span> CHEMICALS
      </button>

      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileDrawerOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
            <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring", damping:25, stiffness:200}} 
              className="md:hidden fixed inset-x-0 bottom-0 h-[60vh] z-50 bg-white dark:bg-[#1e293b] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col">
              <div className="w-full py-3 flex justify-center cursor-pointer" onClick={() => setMobileDrawerOpen(false)}>
                 <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="px-4 pb-2">
                 <input value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 py-3 px-4 rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 outline-none" placeholder="Search chemicals..." />
              </div>
              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-3">
                 {filtered.map(c => (
                   <div key={c.id} onClick={() => { setSelected(c.id); setMobileDrawerOpen(false); }} className="cursor-pointer">
                      <Bottle c={c} selected={selected===c.id} />
                      <div className="text-[9px] text-center font-bold text-slate-600 dark:text-slate-300 mt-1">{c.id}</div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
`;

newCode = newCode.replace(/\{\/\* ── Overlays ──/, mobileInjections + '\\n      {/* ── Overlays ──');

fs.writeFileSync('src/components/dashboard/VirtualChemistryLab.tsx', newCode);
// fs.unlinkSync('src/components/dashboard/VirtualChemLabUI.tsx'); // Will delete later manually
