import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchChaptersBySubject } from "../../redux/slices/chapterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

/* ── per-card colour theme ───────────────────────────────── */
const colors = {
  cyan: {
    stripe:"#0da6f2",cardBg:"linear-gradient(135deg,#e8f7ff 0%,#f0faff 100%)",
    trackBg:"#bee8fb",bar:"#0da6f2",barGlow:"0 0 8px rgba(13,166,242,0.45)",
    badgeBg:"rgba(13,166,242,0.12)",badgeText:"#0284c7",text:"#0da6f2",
    btnBg:"rgba(13,166,242,0.12)",btnText:"#0284c7",btnHover:"#0da6f2",
    border:"#bae6fd",hover:"#7dd3fc",
  },
  purple: {
    stripe:"#7B61FF",cardBg:"linear-gradient(135deg,#f0eeff 0%,#f5f3ff 100%)",
    trackBg:"#ddd6fe",bar:"#7B61FF",barGlow:"0 0 8px rgba(123,97,255,0.45)",
    badgeBg:"rgba(123,97,255,0.12)",badgeText:"#6d28d9",text:"#7B61FF",
    btnBg:"rgba(123,97,255,0.12)",btnText:"#6d28d9",btnHover:"#7B61FF",
    border:"#c4b5fd",hover:"#a78bfa",
  },
  green: {
    stripe:"#00b98a",cardBg:"linear-gradient(135deg,#e6faf4 0%,#f0fdf9 100%)",
    trackBg:"#a7f3d0",bar:"#00b98a",barGlow:"0 0 8px rgba(0,185,138,0.45)",
    badgeBg:"rgba(0,185,138,0.12)",badgeText:"#059669",text:"#00b98a",
    btnBg:"rgba(0,185,138,0.12)",btnText:"#059669",btnHover:"#00b98a",
    border:"#6ee7b7",hover:"#34d399",
  },
  teal: {
    stripe:"#0dd4bf",cardBg:"linear-gradient(135deg,#e6fffe 0%,#f0fdfc 100%)",
    trackBg:"#99f6e4",bar:"#0dd4bf",barGlow:"0 0 8px rgba(13,212,191,0.55)",
    badgeBg:"rgba(13,212,191,0.12)",badgeText:"#0f766e",text:"#0dd4bf",
    btnBg:"rgba(13,212,191,0.15)",btnText:"#0f766e",btnHover:"#0dd4bf",
    border:"#5eead4",hover:"#2dd4bf",
  },
};

/* ── static demo courses ─────────────────────────────────── */
const staticCourses = [
  {
    id:"quantum-biology",title:"Quantum Biology",level:"Lv. 04",
    desc:"Exploration of mitochondrial energy production through real-time AR simulation.",
    progress:78,time:"12h 45m",badge:"AR ENABLED",color:colors.cyan,
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuAbyVSzdp_gpgShtyaIzoNP0Nc8MnWcaw_3Ut4NfH7-YH0lkGxpC0oagwZGNNTmo5hiJDLsURhPueKiyjfUfRlJWGs64wTLAB_2_67gFmbhdjx8ndeQs8E09Ufr42eQK56vA6rUjKDNcExWXcISy1tLaRJuFsXNK04zxgYIbPul7sG9BaeTFav5LHLyIl-fVG9Fg4Q7UfQjN3asqZIUfyFK_cAj7cNtTiP5pcjx1-07ZLpznsUL-0kzHVO0oe6S8NsgqfiRzgtb9UA",
    action:"Resume",route:null,
  },
  {
    id:"astrophysics-2",title:"Astrophysics II",level:"Lv. 07",
    desc:"Spatial warping and gravitational field manipulation in non-Euclidean environments.",
    progress:34,time:"4h 20m",badge:"HOLOGRAPHIC",color:colors.purple,
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuB_KqIgN4QvTK5ORE9E5sM7M84GZtSfoSSrQKVs3WRNcSqHBQ4qk4qw1AXxdZZ8XJparoEHxpHYLW4hlvP_arU1SDYgqjkGfSMFZ3diZo1rUQ916ySo60jvJTyWbKJtC6LeCbj76oGd0c9cHUAy07V4GhZRJMjOvkKT99-X26lR2sttmHbZdqOlQ7qT3T49BXDtobP25k8rBc4pCLU5zgvwwgVAycefA34YjZndOc4P1ThWvH-3hyDO-zwSY4K-g42SXvIFngbr1gY",
    action:"Resume",route:null,
  },
  {
    id:"molecular-bonds",title:"Molecular Bonds",level:"Lv. 02",
    desc:"Interactive chemistry lab for creating complex organic compounds via haptic AR.",
    progress:92,time:"24h 10m",badge:"REAL-TOUCH",color:colors.green,
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBRS0-4ZU3HdoFi_sq64faAPsPNC2XBXBx2jX_n5OwdK-4Zl3u8p4qjHaRj4jETdQH3vBbSt_EbXXyzXlEf2IFedpDRBLjC1hle2v9MekS0PgZ0xC_N1-1OetfIUXp3cCB5iw4hoAYc5CplgHqTqjc6APRkNpDAgY0Gip-qxf6VfamTurxKy1-vQTCQNId0bze2JorrO0Y36yevbuLW5p3ZL5u6BCtnQFqIxLZg5adEoyWgyj6dOo_iJ_uiUwyue5nwraNKvjSUbTc",
    action:"Resume",route:null,
  },
  {
    id:"virtual-chem-lab",title:"Virtual Chemistry Lab",level:"Lv. 05",
    desc:"Interactive AR chemistry experiments with guided reactions and real-time molecular simulations.",
    progress:0,time:"8h 30m",badge:"VIRTUAL LAB",color:colors.teal,
    image:"/chem-lab-hero.png",
    action:"Enter",route:"/dashboard/chemistry/lab",
  },
];

const tabs = ["Active","Completed","Waitlist"];

/* ── Component ───────────────────────────────────────────── */
const Chemistry = () => {
  const dispatch = useAppDispatch();
  const { chapters, loading } = useAppSelector((s: RootState) => s.chapter);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { dispatch(fetchChaptersBySubject("Chemistry")); }, [dispatch]);

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ fontFamily:"Inter, sans-serif" }}
      data-context-page="My Courses – Chemistry"
      data-context-section="Chemistry Course Overview"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase"
            style={{ letterSpacing:"-0.025em" }} data-context-heading>
            My <span className="font-normal text-slate-400">COURSES</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl text-base" data-context-text>
            Resume your hyper-immersive learning journey.
          </p>
        </div>
        <div className="flex border-b border-slate-200 dark:border-slate-800 shrink-0">
          {tabs.map((tab,i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 bg-transparent ${
                activeTab===i ? "text-[#0da6f2] border-[#0da6f2]" : "text-[#94a3b8] border-transparent hover:text-slate-500"
              }`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staticCourses.map(course => (
          <CourseCard key={course.id} course={course} onNavigate={navigate}/>
        ))}
        <EnrollCard/>
      </div>

      {/* API Chapters */}
      {!loading && chapters.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-4">Available Chapters</h2>
          <div className="space-y-3">
            {chapters.map((item,i) => (
              <button key={item.id} onClick={() => navigate(`/dashboard/chemistry/${item.id}`)}
                className="w-full p-4 rounded-2xl bg-white dark:bg-[#1E1E2F] border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center cursor-pointer active:scale-95 transition-all hover:border-sky-200 dark:hover:border-slate-600 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-sm">{i+1}</div>
                  <h4 className="font-medium text-slate-700 dark:text-white text-sm">{item.name}</h4>
                </div>
                <span className="material-symbols-outlined text-slate-400 hover:text-sky-500 transition-colors">chevron_right</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── CourseCard ──────────────────────────────────────────── */
type Course = (typeof staticCourses)[0];

const CourseCard = ({ course, onNavigate }: { course: Course; onNavigate: (path: string) => void }) => {
  const c = course.color;
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const isVirtualLab = course.id === "virtual-chem-lab";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer dark:!bg-none dark:!bg-[#1E1E2F] dark:!border-slate-800"
      style={{
        background:  c.cardBg,
        border:      `1.5px solid ${hovered ? c.hover : c.border}`,
        boxShadow:   hovered
          ? `0 8px 28px rgba(0,0,0,0.10), 0 0 0 2px ${c.stripe}22`
          : isVirtualLab ? `0 4px 16px ${c.stripe}22` : "0 2px 8px rgba(0,0,0,0.05)",
        transition:  "all 0.25s ease",
        borderTop:   `4px solid ${c.stripe}`,
      }}>

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:`url("${course.image}")`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition:"transform 0.6s ease",
          }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>

        {/* Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider dark:!bg-slate-800 dark:!text-white/90"
          style={{
            background: isVirtualLab
              ? `linear-gradient(135deg,${c.stripe}dd,#7B61FFcc)`
              : "rgba(255,255,255,0.85)",
            color: isVirtualLab ? "#fff" : c.badgeText,
            border:`1px solid ${c.stripe}55`,
            backdropFilter:"blur(6px)",
            boxShadow: isVirtualLab ? `0 0 12px ${c.stripe}88` : "none",
          }}>
          {course.badge}
        </div>

        {/* Virtual Lab floating particles overlay */}
        {isVirtualLab && (
          <div className="absolute inset-0 pointer-events-none">
            {["⚗️","🔬","⚡","🧬"].map((icon,i) => (
              <span key={i} className="absolute text-sm opacity-70"
                style={{
                  left:`${15+i*22}%`, top:`${20+i*12}%`,
                  animation:`float-icon ${2+i*0.4}s ease-in-out infinite alternate`,
                  filter:"drop-shadow(0 0 4px cyan)",
                }}>
                {icon}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1.5">
          <h3 style={{ color: hovered ? c.stripe : undefined }}
            className={`text-base font-semibold transition-colors ${!hovered ? "text-slate-800 dark:!text-white" : ""}`}>
            {course.title}
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 shrink-0">
            {course.level}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-[#B0B3C0] mb-6 line-clamp-2 leading-relaxed">
          {course.desc}
        </p>

        <div className="mt-auto space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase mb-1.5 tracking-widest">
              <span className="text-slate-400 dark:text-slate-300">Progress</span>
              <span style={{ color:c.stripe }}>
                {course.progress > 0 ? `${course.progress}%` : "New"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden dark:!bg-[#2a2a3a]" style={{ background:c.trackBg }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width:`${course.progress}%`,
                  background: isVirtualLab && course.progress === 0
                    ? `linear-gradient(90deg,${c.stripe}44,${c.stripe}11)`
                    : c.bar,
                  boxShadow: course.progress > 0 ? c.barGlow : "none",
                }}/>
            </div>
            {isVirtualLab && course.progress === 0 && (
              <p className="text-[9px] text-teal-500 mt-0.5 font-medium">Ready to start!</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t pt-4"
            style={{ borderColor:c.border }}>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm" style={{ color:c.stripe }}>schedule</span>
              <span>{course.time}</span>
            </div>

            {/* Action Button */}
            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={() => course.route && onNavigate(course.route)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all dark:!text-white"
              style={{
                background: isVirtualLab
                  ? btnHovered
                    ? `linear-gradient(135deg,${c.stripe},#7B61FF)`
                    : `linear-gradient(135deg,${c.stripe}33,#7B61FF33)`
                  : btnHovered ? c.btnHover : c.btnBg,
                color: isVirtualLab ? (btnHovered ? "#fff" : c.btnText) : (btnHovered ? "#ffffff" : c.btnText),
                boxShadow: btnHovered
                  ? isVirtualLab
                    ? `0 0 20px ${c.stripe}88, 0 0 40px #7B61FF44`
                    : c.barGlow
                  : "none",
                border: isVirtualLab ? `1px solid ${c.stripe}66` : "none",
              }}>
              {course.action}
              <span className="material-symbols-outlined text-base">
                {isVirtualLab ? "science" : "play_arrow"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── EnrollCard ──────────────────────────────────────────── */
const EnrollCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center p-8 text-center rounded-2xl cursor-pointer min-h-[380px] transition-all duration-300 dark:!bg-none dark:!bg-[#1E1E2F] dark:hover:!bg-[#252538] dark:!border-slate-600"
      style={{
        background: hovered ? "linear-gradient(135deg,#f0f9ff 0%,#e8f7ff 100%)" : "#fafafa",
        border:`2px dashed ${hovered ? "#7dd3fc" : "#e2e8f0"}`,
        boxShadow: hovered ? "0 4px 16px rgba(13,166,242,0.10)" : "none",
      }}>
      <div className="size-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 dark:!bg-slate-800 dark:!border-slate-600"
        style={{
          border:`1.5px solid ${hovered ? "#7dd3fc" : "#e2e8f0"}`,
          background: hovered ? "rgba(13,166,242,0.06)" : "#f1f5f9",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>
        <span className="material-symbols-outlined text-4xl transition-colors" style={{ color: hovered ? "#0da6f2" : "#94a3b8" }}>add</span>
      </div>
      <h3 className="text-sm font-bold uppercase tracking-wide transition-colors" style={{ color: hovered ? "#0da6f2" : "#64748b" }}>
        Enroll New Module
      </h3>
      <p className="text-xs text-slate-400 dark:text-[#B0B3C0] mt-3 max-w-[200px] leading-relaxed">
        Browse the AR library for new holographic experiences.
      </p>
    </div>
  );
};

export default Chemistry;
