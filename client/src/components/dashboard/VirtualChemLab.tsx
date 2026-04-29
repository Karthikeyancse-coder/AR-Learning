
type Chemical = { id:string; label:string; family:string; color:string; glow:string };
type Reaction  = { eq:string; type:string; explain:string; observe:string; productColor:string; effect:"bubble"|"smoke"|"spark"|"none"; dangerous:boolean; warning?:string };
type HistoryItem = { id:number; eq:string; type:string; time:string };

const CHEMICALS:Chemical[] = [
  {id:"HCl",    label:"HCl",    family:"acid",    color:"#ef4444",glow:"rgba(239,68,68,0.7)"},
  {id:"NaOH",   label:"NaOH",   family:"base",    color:"#3b82f6",glow:"rgba(59,130,246,0.7)"},
  {id:"H2O",    label:"H₂O",    family:"neutral", color:"#7dd3fc",glow:"rgba(125,211,252,0.7)"},
  {id:"H2SO4",  label:"H₂SO₄", family:"acid",    color:"#f97316",glow:"rgba(249,115,22,0.7)"},
  {id:"NaCl",   label:"NaCl",   family:"salt",    color:"#cbd5e1",glow:"rgba(203,213,225,0.7)"},
  {id:"NH3",    label:"NH₃",    family:"base",    color:"#a78bfa",glow:"rgba(167,139,250,0.7)"},
  {id:"HNO3",   label:"HNO₃",  family:"acid",    color:"#fb7185",glow:"rgba(251,113,133,0.7)"},
  {id:"CaCO3",  label:"CaCO₃", family:"neutral", color:"#d1d5db",glow:"rgba(209,213,219,0.7)"},
  {id:"Na2CO3", label:"Na₂CO₃",family:"base",    color:"#67e8f9",glow:"rgba(103,232,249,0.7)"},
  {id:"KMnO4",  label:"KMnO₄", family:"neutral", color:"#a855f7",glow:"rgba(168,85,247,0.8)"},
  {id:"Cu",     label:"Cu",     family:"metal",   color:"#f59e0b",glow:"rgba(245,158,11,0.7)"},
  {id:"Fe",     label:"Fe",     family:"metal",   color:"#78716c",glow:"rgba(120,113,108,0.7)"},
  {id:"Mg",     label:"Mg",     family:"metal",   color:"#e2e8f0",glow:"rgba(226,232,240,0.7)"},
  {id:"Zn",     label:"Zn",     family:"metal",   color:"#94a3b8",glow:"rgba(148,163,184,0.7)"},
  {id:"AgNO3",  label:"AgNO₃", family:"salt",    color:"#c0c0c0",glow:"rgba(192,192,192,0.7)"},
];

const mkR = (eq:string,type:string,explain:string,observe:string,productColor:string,effect:"bubble"|"smoke"|"spark"|"none",dangerous:boolean,warning?:string):Reaction =>
  ({eq,type,explain,observe,productColor,effect,dangerous,warning});

const REACTIONS:Record<string,Reaction> = {
  "HCl+NaOH":   mkR("HCl + NaOH → NaCl + H₂O","Neutralization","Acid and base neutralise, forming salt and water. pH reaches 7.","Solution clears; slight warmth.","#bae6fd","none",false),
  "NaOH+HCl":   mkR("HCl + NaOH → NaCl + H₂O","Neutralization","Acid and base neutralise, forming salt and water. pH reaches 7.","Solution clears; slight warmth.","#bae6fd","none",false),
  "HCl+CaCO3":  mkR("2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂↑","Gas Evolution","HCl dissolves calcium carbonate, releasing CO₂ gas.","Vigorous fizzing; white solid vanishes.","#fef9c3","bubble",false),
  "CaCO3+HCl":  mkR("2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂↑","Gas Evolution","HCl dissolves calcium carbonate, releasing CO₂ gas.","Vigorous fizzing; white solid vanishes.","#fef9c3","bubble",false),
  "Mg+HCl":     mkR("Mg + 2HCl → MgCl₂ + H₂↑","Single Displacement","Mg displaces H₂ from HCl, producing flammable hydrogen gas.","Rapid bubbling; Mg dissolves rapidly; heat felt.","#d1fae5","bubble",true,"Highly exothermic — produces flammable H₂ gas!"),
  "HCl+Mg":     mkR("Mg + 2HCl → MgCl₂ + H₂↑","Single Displacement","Mg displaces H₂ from HCl, producing flammable hydrogen gas.","Rapid bubbling; Mg dissolves rapidly; heat felt.","#d1fae5","bubble",true,"Highly exothermic — produces flammable H₂ gas!"),
  "H2SO4+NaOH": mkR("H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O","Exothermic Neutralization","Strong acid + strong base releases enormous heat energy.","Rapid temperature rise; solution clears.","#fef3c7","spark",true,"Highly exothermic! Severe burn risk."),
  "NaOH+H2SO4": mkR("H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O","Exothermic Neutralization","Strong acid + strong base releases enormous heat energy.","Rapid temperature rise; solution clears.","#fef3c7","spark",true,"Highly exothermic! Severe burn risk."),
  "KMnO4+H2O":  mkR("KMnO₄(aq) → deep purple solution","Dissolution","Potassium permanganate dissolves forming a vivid oxidising solution.","Intense purple colour spreads instantly.","#4c1d95","none",false),
  "H2O+KMnO4":  mkR("KMnO₄(aq) → deep purple solution","Dissolution","Potassium permanganate dissolves forming a vivid oxidising solution.","Intense purple colour spreads instantly.","#4c1d95","none",false),
  "Cu+AgNO3":   mkR("Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓","Single Displacement","Copper displaces silver; silver crystals deposit on copper.","Blue solution; silver crystals form.","#1d4ed8","none",false),
  "AgNO3+Cu":   mkR("Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓","Single Displacement","Copper displaces silver; silver crystals deposit on copper.","Blue solution; silver crystals form.","#1d4ed8","none",false),
  "Na2CO3+HCl": mkR("Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑","Gas Evolution","Sodium carbonate and HCl react producing CO₂ gas.","Fizzing CO₂; solution becomes clear.","#d9f99d","bubble",false),
  "HCl+Na2CO3": mkR("Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑","Gas Evolution","Sodium carbonate and HCl react producing CO₂ gas.","Fizzing CO₂; solution becomes clear.","#d9f99d","bubble",false),
  "Fe+HCl":     mkR("Fe + 2HCl → FeCl₂ + H₂↑","Single Displacement","Iron slowly reacts with HCl, dissolving and producing hydrogen.","Slow bubbling; solution turns pale green.","#bbf7d0","bubble",false),
  "HCl+Fe":     mkR("Fe + 2HCl → FeCl₂ + H₂↑","Single Displacement","Iron slowly reacts with HCl, dissolving and producing hydrogen.","Slow bubbling; solution turns pale green.","#bbf7d0","bubble",false),
  "NH3+HCl":    mkR("NH₃ + HCl → NH₄Cl (white smoke)","Combination","Ammonia and HCl gases combine instantly forming ammonium chloride.","Dense white smoke billows immediately.","#f1f5f9","smoke",true,"Toxic fumes — NH₃ and HCl are both hazardous!"),
  "HCl+NH3":    mkR("NH₃ + HCl → NH₄Cl (white smoke)","Combination","Ammonia and HCl gases combine instantly forming ammonium chloride.","Dense white smoke billows immediately.","#f1f5f9","smoke",true,"Toxic fumes — NH₃ and HCl are both hazardous!"),
  "NaCl+H2O":   mkR("NaCl + H₂O → no reaction","Dissolution","NaCl simply dissolves in water. No chemical change occurs.","Clear solution — no visible change.","#e0f2fe","none",false),
  "H2O+NaCl":   mkR("NaCl + H₂O → no reaction","Dissolution","NaCl simply dissolves in water. No chemical change occurs.","Clear solution — no visible change.","#e0f2fe","none",false),
};

const TOUR = [
  {title:"Welcome to the Lab! 🧪",body:"You're in a zero-gravity chemistry lab. Mix chemicals and trigger real reactions. Let's take a quick tour!",zone:""},
  {title:"Chemical Shelf 🧴",body:"15 glowing chemicals float here. Click a bottle to select it, then click a beaker — or drag & drop directly!",zone:"shelf"},
  {title:"Beaker Zone ⚗️",body:"Two anti-gravity beakers await your chemicals. Add up to 3 chemicals per beaker, then react!",zone:"beaker"},
  {title:"Search Bar 🔍",body:"Type any chemical name or formula to filter the shelf in real-time.",zone:"search"},
  {title:"Mix & React ⚡",body:"Hit this button to trigger the reaction. Watch particles burst, colours morph and results appear!",zone:"react"},
];

export { CHEMICALS, REACTIONS, TOUR };
export type { Chemical, Reaction, HistoryItem };
