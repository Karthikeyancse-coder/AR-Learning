const fs = require('fs');

let ui = fs.readFileSync('src/components/dashboard/VirtualChemLabUI.tsx', 'utf8');
ui = ui.replace(/import React.*?;\n/, '')
       .replace(/import \{ motion, AnimatePresence \}.*?;\n/, '')
       .replace(/import type .*?;\n/, '')
       .replace(/export /g, '');

// Make BeakerView responsive
ui = ui.replace(/className={`relative w-52 h-72 border-\[3px\]/g, 'className={`relative w-full md:w-52 h-48 md:h-72 border-[3px]');
// Make TourTooltip a top banner on mobile
ui = ui.replace(/className="fixed bottom-8 left-1\/2 z-50 w-80"/g, 'className="fixed top-0 md:bottom-8 md:top-auto left-0 md:left-1/2 z-50 w-full md:w-80"');
ui = ui.replace(/initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}}/g, 'initial={{y:-40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-40,opacity:0}}');
ui = ui.replace(/rounded-2xl p-5 border/g, 'rounded-b-2xl md:rounded-2xl p-5 border');
// Make ReactionCard a bottom sheet on mobile
ui = ui.replace(/className="fixed inset-0 z-50 flex items-center justify-center p-4"/g, 'className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4"');
ui = ui.replace(/className="w-full max-w-\[480px\] rounded-2xl p-6 pt-14 border-\[3px\] relative bg-white dark:bg-\[#1e293b\] shadow-2xl dark:shadow-\[0_0_60px_rgba\(0,0,0,0\.5\)\] transition-colors duration-500"/g, 'className="w-full md:max-w-[480px] rounded-t-3xl md:rounded-2xl p-6 pt-14 border-[3px] border-b-0 md:border-b-[3px] relative bg-white dark:bg-[#1e293b] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-2xl transition-colors duration-500 h-[50vh] md:h-auto overflow-y-auto"');

let code = fs.readFileSync('src/components/dashboard/VirtualChemistryLab.tsx', 'utf8');
code = code.replace(/import \{.*?\} from "\.\/VirtualChemLabUI";\n/, ui + '\n');

fs.writeFileSync('src/components/dashboard/VirtualChemistryLab.tsx', code);
