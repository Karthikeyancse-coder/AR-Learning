/**
 * usePageContext.ts
 * ─────────────────────────────────────────────
 * Custom hook that builds a `ScreenContext` object from:
 *  - React Router's current pathname/route
 *  - Queryable DOM elements inside the main content area
 *
 * Pages that want to expose richer context should render
 * elements with data-context-* attributes (see README below).
 *
 * Attribute conventions:
 *  data-context-page      → human-readable page name
 *  data-context-section   → module / section / unit title
 *  data-context-topic     → the currently selected topic/card/item
 *  data-context-heading   → any visible heading (h1–h4 level)
 *  data-context-text      → important visible paragraphs / descriptions
 *  data-context-bullet    → bullet / list items visible on the page
 *  data-context-course    → course or subject name
 *  data-context-level     → student level (beginner / intermediate / advanced)
 */

import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScreenContext {
  /** Human-readable page name, e.g. "Biology – Human Anatomy" */
  pageName: string;
  /** Current module / section / unit, e.g. "Chapter 3: Digestive System" */
  sectionTitle: string;
  /** The card / topic item the student is focused on */
  selectedTopic: string;
  /** Up to 5 visible headings distilled from the DOM */
  visibleHeadings: string[];
  /** Up to 400 chars of visible paragraph text */
  visibleText: string;
  /** Up to 10 visible bullet points */
  visibleBullets: string[];
  /** React Router pathname, useful as a fallback */
  routePath: string;
  /** Subject / course name */
  courseName: string;
  /** Student level (from user profile if available) */
  studentLevel: string;
}

// ─── Route → Page Name Map ──────────────────────────────────────────────────

const ROUTE_PAGE_NAMES: Record<string, string> = {
  "/dashboard/home": "Dashboard Home",
  "/dashboard/chemistry": "Chemistry – Course Overview",
  "/dashboard/biology": "Biology – AR Library",
  "/dashboard/self-study": "Self Study / Assignments",
  "/dashboard/profile": "Profile & Settings",
  "/dashboard/billing": "Billing & Plans",
  "/dashboard/security": "Security & Privacy",
  "/dashboard/challenge": "Weekly Challenge",
};

/** Derives a readable page name from a pathname */
function resolvePageName(pathname: string): string {
  // Exact match first
  if (ROUTE_PAGE_NAMES[pathname]) return ROUTE_PAGE_NAMES[pathname];

  // Dynamic routes
  if (/^\/dashboard\/chemistry\/.+/.test(pathname))
    return "Chemistry – Chapter Lesson";
  if (/^\/dashboard\/biology\/.+/.test(pathname))
    return "Biology – AR Model Viewer";

  return "AR Learning Platform";
}

// ─── DOM Scraper ─────────────────────────────────────────────────────────────

/**
 * Extracts text from elements carrying a `data-context-*` attribute.
 * Falls back to semantic selectors if no data attributes are present.
 */
function scrapeContext(attrName: string, fallbackSelector: string, limit: number): string[] {
  // Prefer data-attribute elements (explicit, accurate)
  const dataEls = Array.from(
    document.querySelectorAll(`[data-context-${attrName}]`)
  );
  if (dataEls.length) {
    return [...new Set(dataEls.map((el) => el.textContent?.trim() ?? ""))]
      .filter(Boolean)
      .slice(0, limit);
  }

  // Fallback: semantic selectors
  return [...new Set(
    Array.from(document.querySelectorAll(fallbackSelector))
      .map((el) => el.textContent?.trim() ?? "")
      .filter(Boolean)
  )].slice(0, limit);
}

function scrapeFirst(attrName: string, fallbackSelector: string): string {
  const result = scrapeContext(attrName, fallbackSelector, 1);
  return result[0] ?? "";
}

/** Clips a string to `maxChars` at a word boundary */
function clip(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s\S+$/, "") + "…";
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Returns the current screen context.
 * Call this inside the DashboardLayout (or any page component) just before
 * dispatching a chat message.
 *
 * @example
 * const context = usePageContext();
 * dispatch(sendMessage({ message: inputText, screenContext: context }));
 */
export function usePageContext(): ScreenContext {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // ── Page name ──────────────────────────────────────────────────────────────
  const pageName =
    scrapeFirst("page", "[data-page-title]") ||
    resolvePageName(location.pathname);

  // ── Section / Module ────────────────────────────────────────────────────────
  const sectionTitle =
    scrapeFirst("section", "h1, h2, [data-section-title]");

  // ── Selected Topic ──────────────────────────────────────────────────────────
  const selectedTopic =
    scrapeFirst("topic", "[aria-selected='true'], .selected-topic, [data-selected]");

  // ── Headings ────────────────────────────────────────────────────────────────
  const visibleHeadings = scrapeContext("heading", "h1, h2, h3, h4", 5);

  // ── Paragraph text ──────────────────────────────────────────────────────────
  const rawText = scrapeContext("text", "main p, article p, section p", 6)
    .join(" ");
  const visibleText = clip(rawText, 400);

  // ── Bullets ─────────────────────────────────────────────────────────────────
  const visibleBullets = scrapeContext(
    "bullet",
    "main li, article li, ul li, ol li",
    10
  );

  // ── Course / subject ────────────────────────────────────────────────────────
  const courseName =
    scrapeFirst("course", "[data-course-name]") ||
    (location.pathname.includes("chemistry") ? "Chemistry" : "") ||
    (location.pathname.includes("biology") ? "Biology" : "") ||
    "";

  // ── Student level ───────────────────────────────────────────────────────────
  // If your user profile carries a `level` field, include it;
  // otherwise leave blank and the tutor will treat the student as a general learner.
  const studentLevel = (user as any)?.level ?? "";

  return {
    pageName,
    sectionTitle,
    selectedTopic,
    visibleHeadings,
    visibleText,
    visibleBullets,
    routePath: location.pathname,
    courseName,
    studentLevel,
  };
}
