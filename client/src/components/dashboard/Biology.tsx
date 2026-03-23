import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColorClass: string;
  iconBgClass: string;
  imgSrc: string;
  fallbackSrc: string;
  onClick?: () => void;
}

const ImageCard = ({
  title,
  subtitle,
  icon,
  iconColorClass,
  iconBgClass,
  imgSrc,
  fallbackSrc,
  onClick,
}: CardProps) => {
  const [img, setImg] = useState(imgSrc);

  return (
    <div
      onClick={onClick}
      className={`bg-[#FFFFFF] dark:bg-[#1E1E2F] rounded-2xl flex flex-col overflow-hidden shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-250 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_24px_-10px_rgba(0,212,255,0.15)] dark:hover:shadow-[0_12px_24px_-10px_rgba(0,212,255,0.15)] ${
        onClick ? "cursor-pointer" : "cursor-default"
      } border border-[#E5E7EB] dark:border-slate-700/50 group`}
    >
      <div className="h-40 md:h-44 w-full relative overflow-hidden">
        <img
          alt={title}
          src={img}
          onError={() => {
            if (img !== fallbackSrc) setImg(fallbackSrc);
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/60 to-transparent"></div>
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${iconBgClass}`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${iconColorClass}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-[#64748B] dark:text-[#B0B3C0] font-semibold uppercase tracking-wider">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`material-symbols-outlined transition-transform group-hover:translate-x-1 ${iconColorClass}`}
          >
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};

const CARDS = [
  {
    id: "human-heart",
    title: "Human Heart",
    subtitle: "1 Lesson",
    icon: "favorite",
    iconColorClass: "text-[#E11D48] dark:text-rose-400",
    iconBgClass: "bg-rose-50 dark:bg-rose-500/10",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8JipkklfvuKOg1eh_v6N3Fw_pqmViSXZQu80rmACJzrDbHLKCLfN9av3zNj72V9a3P_xUspUNfqEcEwXKfN5T6DHW87LE4z68ad6gfsmMxC7lvgk9SYtQc4C4X1fYNYZk5rb7b734CplzkEy5Exkj8khXy87hnIiAziUxKzW5ghG5xIxXeb_4O85mxyRRvcWwmNrC_G5aULKepU2hviULJbaFCGt_KOZ67YEIj4VFh5J3i85beBSSYfcLXqIMJmNbO7EOsO8rVSo",
    fallbackSrc:
      "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "human-anatomy",
    title: "Human Anatomy",
    subtitle: "1 Lesson",
    icon: "accessibility_new",
    iconColorClass: "text-[#0284C7] dark:text-sky-400",
    iconBgClass: "bg-sky-50 dark:bg-sky-500/10",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFTqe0U-L5S-HUmGyR4LxGyDhReriFJ_e57X2BDhA6LkM_6_M0XKRDr1KFHMZOk901URmbB2l8EGe4QcYvs8p15wV3Kf4_NIKFUuy-CnqXL26xxrGXshdg9r-C4-yo70G7NcM_iT1y44BsuWKmU7zZhMW5-asj-u0PF0k-pfVyWJhb1SRPhIkEWbf5QA3snYCFka1UyfkZf53MTS-IVxbJuVmp9m2-AzeP_HzNj84ieWYhhOXwhGExjrraFf2WXEFLS-21Gp9xmqo",
    fallbackSrc:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "molecular-genetics",
    title: "Molecular Genetics",
    subtitle: "4 Lessons",
    icon: "genetics",
    iconColorClass: "text-[#7C3AED] dark:text-purple-400",
    iconBgClass: "bg-purple-50 dark:bg-purple-500/10",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjoi-6D9x2lD48YA4aib9UhVTbFCkAUsH8xvIxjeLexCRsXXmwGv9YuhBu8RKXwXpTU8bJorzGHQaJD-abBT5eU_lOt4HLLbzLmwPtLvqJe5ETIDsYONDc91RQqs4WpPnfejHdrWVkoY6w3sKjiBanaaMpwTIC97C7SSPF4WSa5G2rBjeoZvMTX5EBPdZWqtnrwzDqEyDGxHJ10aTT0kEcojPmcU0YS5_89nWK-PglLAGc3Cgfm3wXWo3v1hpxD8s3vfahOq5yZto",
    fallbackSrc:
      "https://images.unsplash.com/photo-1530213786676-41590bc39e31?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "cellular-biology",
    title: "Cellular Biology",
    subtitle: "12 Lessons",
    icon: "magnification_small",
    iconColorClass: "text-[#059669] dark:text-emerald-400",
    iconBgClass: "bg-emerald-50 dark:bg-emerald-500/10",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD11RjnF6UpS2Dt28XkfafYCP8qkL_wM1LAJz20jCpk4KXJ6_5mqRaU82ppGsxqHqjVxXyTj9u3SWXOVw2qDqVKga222eFs3irDmOp0GfS72oVOURCRS1qGFTB7PAz9QR4_JOCs4r1IfCRbz4ZBKGwZHVMyCF8VcA1UZsqQe7qXUVHrZ1KoYmrnqeQUXYX2aHcrYcQQj12JE6hp8-0zTxUsVbdyBQsxnNaunLHk5uUPvK561xevgpKmXioIlSr2m4iKnGUznyzgYlQ",
    fallbackSrc:
      "https://images.unsplash.com/photo-1614914135242-49197c364741?auto=format&fit=crop&q=80&w=400",
  },
];

const Biology = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F8FAFC] dark:bg-transparent text-[#0F172A] dark:text-white min-h-screen selection:bg-[#00D4FF]/20 font-sans p-6 md:p-12 -m-6 lg:-m-8 rounded-tr-3xl rounded-tl-3xl animate-in fade-in slide-in-from-bottom-4 duration-500"
      // ── Context attributes: picked up by usePageContext hook ──
      data-context-page="Biology – AR Library"
      data-context-section="Biology Topics"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <div className="flex flex-col gap-3">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
              data-context-heading
            >
              Biology
            </h1>
            <p
              className="text-lg text-[#64748B] dark:text-[#B0B3C0] font-medium"
              data-context-text
            >
              Explore foundational and advanced topics in life sciences
            </p>
          </div>
          <div className="mt-10 group">
            <div className="relative max-w-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-slate-200 dark:focus-within:ring-[#00D4FF]/40 rounded-2xl">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-[#00D4FF] transition-colors">
                search
              </span>
              <input
                className="w-full bg-[#FFFFFF] dark:bg-[#1E1E2F] border border-[#E5E7EB] dark:border-slate-700/50 rounded-2xl py-5 pl-14 pr-6 text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-400 shadow-sm dark:shadow-none focus:outline-none transition-all"
                placeholder="Search anatomy, genetics, or cellular structures..."
                type="text"
              />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARDS.map((card) => (
            <ImageCard
              key={card.id}
              {...card}
              onClick={
                card.id === "human-heart" || card.id === "human-anatomy"
                  ? () => navigate(`/dashboard/biology/${card.id}`)
                  : undefined
              }
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Biology;
