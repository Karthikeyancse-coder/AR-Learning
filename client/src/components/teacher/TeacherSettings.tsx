import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/* ─────────────────── Types ─────────────────── */
interface ProfileData {
  name: string; employeeId: string; regNo: string; designation: string;
  department: string; campus: string; bio: string; joinedDate: string;
  email: string; altEmail: string; phone: string; emergency: string;
  officeLocation: string; officeHours: string;
}
interface AcademicData { qualification: string; specialization: string; academicYear: string; subjects: string[]; sections: string[]; }
interface PwdData { current: string; newPwd: string; confirmPwd: string; }
interface PrefData { language: string; defaultPage: string; emailAlerts: boolean; submissionAlerts: boolean; deadlineReminders: boolean; quizAlerts: boolean; atRiskAlerts: boolean; }
interface DocFile { name: string; size: string; url: string | null; }
interface DocsData { certificate: DocFile | null; resume: DocFile | null; idProof: DocFile | null; }
interface Errors { [key: string]: string; }

/* ─────────────────── Constants ─────────────────── */
const TABS = [
  { id: "profile", label: "Profile", icon: "person" },
  { id: "academic", label: "Academic", icon: "school" },
  { id: "security", label: "Security", icon: "security" },
  { id: "preferences", label: "Preferences", icon: "tune" },
  { id: "documents", label: "Documents", icon: "folder_open" },
];
const STATS = [
  { label: "Active Classes", value: "4", icon: "class", color: "text-blue-400" },
  { label: "Total Students", value: "132", icon: "groups", color: "text-emerald-400" },
  { label: "Quizzes Created", value: "28", icon: "quiz", color: "text-violet-400" },
  { label: "Assignments", value: "41", icon: "assignment", color: "text-amber-400" },
  { label: "Pending Reviews", value: "7", icon: "rate_review", color: "text-red-400" },
  { label: "Avg. Performance", value: "73%", icon: "analytics", color: "text-sky-400" },
];
const DEPARTMENTS = ["Biological Sciences","Chemistry","Physics","Mathematics","Computer Science","Environmental Science"];
const CAMPUSES = ["Main Campus, Block B","North Campus, Block A","South Campus, Block C","Online Campus"];
const QUALIFICATIONS = ["M.Sc. Biological Sciences","Ph.D. Molecular Biology","M.Tech. Biotechnology","B.Ed + M.Sc.","M.Phil. Life Sciences"];
const LANGUAGES = ["English (India)","English (US)","Tamil","Hindi","Telugu","Malayalam","Kannada"];
const PAGES = ["Overview","Analytics","Courses","Students","Insights"];
const ACADEMIC_YEARS = ["2025–2026, Semester I","2025–2026, Semester II","2024–2025, Semester I","2024–2025, Semester II"];
const ALL_SUBJECTS = ["Biology (Gr 10)","Ecology (Gr 11)","Genetics (Gr 12)","Environmental Science","Life Sciences Lab","Molecular Biology","Botany (Gr 12)"];
const ALL_SECTIONS = ["10-A","10-B","11-Bio","11-Chem","12-Science","12-Bio"];

/* ─────────────────── Helpers ─────────────────── */
const LS_KEY = "teacher_settings_v1";
const loadLS = () => { try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : null; } catch { return null; } };
const saveLS = (d: object) => { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {} };
const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validatePhone = (v: string) => /^[+]?[\d\s\-()]{7,15}$/.test(v.trim());
const pwdStrength = (p: string) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};

/* ─────────────────── Sub-components ─────────────────── */
const cl = (dark: boolean, d: string, l: string) => dark ? d : l;

const Label = ({ text, dark }: { text: string; dark: boolean }) => (
  <label className={`text-[10px] font-black uppercase tracking-widest block mb-1.5 ${cl(dark,"text-slate-500","text-slate-400")}`}>{text}</label>
);

const InputField = ({
  label, value, onChange, type="text", placeholder, dark, error, id, readOnly, rightEl
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; dark: boolean; error?: string; id?: string; readOnly?: boolean; rightEl?: React.ReactNode;
}) => (
  <div className="space-y-1">
    <Label text={label} dark={dark} />
    <div className="relative">
      <input id={id} type={type} value={value} readOnly={readOnly}
        onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 transition-all ${rightEl ? "pr-11" : ""} ${
          readOnly ? "opacity-60 cursor-not-allowed" : ""
        } ${error
          ? (dark ? "bg-red-900/20 border border-red-500/50 text-red-300 focus:ring-red-500/30" : "bg-red-50 border border-red-300 text-red-800 focus:ring-red-400/30")
          : (dark ? "bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:ring-blue-500/40 focus:border-blue-500/50"
                   : "bg-slate-50 border border-slate-200 text-[#181c22] placeholder:text-slate-400 focus:ring-[#006493]/30 focus:border-[#006493]/50 focus:bg-white")
        }`}
      />
      {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
    </div>
    {error && <p className={`text-[11px] font-medium ${dark ? "text-red-400" : "text-red-500"}`}>{error}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, options, dark }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; dark: boolean;
}) => (
  <div className="space-y-1">
    <Label text={label} dark={dark} />
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 transition-all appearance-none ${
        cl(dark,"bg-slate-800 border border-slate-700 text-slate-200 focus:ring-blue-500/40",
               "bg-slate-50 border border-slate-200 text-[#181c22] focus:ring-[#006493]/30")
      }`}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Toggle = ({ label, sub, value, onChange, dark }: {
  label: string; sub?: string; value: boolean; onChange: (v: boolean) => void; dark: boolean;
}) => (
  <div className={`flex items-center justify-between py-4 border-b last:border-0 ${cl(dark,"border-slate-700/60","border-slate-100")}`}>
    <div className="pr-4">
      <p className={`text-[13px] font-semibold ${cl(dark,"text-slate-200","text-[#181c22]")}`}>{label}</p>
      {sub && <p className={`text-[11px] mt-0.5 ${cl(dark,"text-slate-500","text-slate-400")}`}>{sub}</p>}
    </div>
    <button type="button" onClick={() => onChange(!value)} role="switch" aria-checked={value}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shrink-0 ${value ? "bg-[#006493]" : cl(dark,"bg-slate-700","bg-slate-200")}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? "translate-x-5" : ""}`} />
    </button>
  </div>
);

const CardSection = ({ title, icon, dark, children }: { title: string; icon: string; dark: boolean; children: React.ReactNode }) => (
  <div className={`rounded-2xl border p-6 ${cl(dark,"bg-[#1e293b] border-slate-700","bg-white border-slate-200 shadow-sm")}`}>
    <h3 className={`text-[13px] font-black flex items-center gap-2 mb-6 ${cl(dark,"text-white","text-[#181c22]")}`}>
      <span className={`material-symbols-outlined text-[18px] ${cl(dark,"text-blue-400","text-[#006493]")}`}>{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const SaveBar = ({ dirty, saving, onSave, onReset, dark }: {
  dirty: boolean; saving: boolean; onSave: () => void; onReset: () => void; dark: boolean;
}) => (
  <div className={`flex items-center justify-end gap-3 pt-2 ${dirty ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
    <button type="button" onClick={onReset} className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${
        cl(dark,"bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700","bg-white text-slate-500 hover:bg-slate-100 border border-slate-200")}`}>
      Discard
    </button>
    <button type="button" onClick={onSave} disabled={saving}
      className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#006493] hover:bg-[#004e73] transition-all hover:-translate-y-0.5 shadow-md active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
      {saving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {saving ? "Saving…" : "Save Changes"}
    </button>
  </div>
);

/* ─────────────────── Main Component ─────────────────── */
const TeacherSettings = () => {
  const { dark } = useOutletContext<{ dark: boolean }>();
  const { user } = useAuth();

  const rawName = user?.name || "Dr. Ananya Kumar";
  const rawEmail = user?.email || "ananya.kumar@learn.ar";

  const saved = loadLS();

  /* Profile state */
  const defaultProfile: ProfileData = {
    name: saved?.profile?.name || rawName,
    employeeId: saved?.profile?.employeeId || "LRN-TCH-2021-047",
    regNo: saved?.profile?.regNo || "FAC-2021-LS-047",
    designation: saved?.profile?.designation || "Senior Instructor",
    department: saved?.profile?.department || "Biological Sciences",
    campus: saved?.profile?.campus || "Main Campus, Block B",
    bio: saved?.profile?.bio || "Passionate educator with 5+ years of experience in Biological Sciences. Specializing in molecular biology and advanced genetics.",
    joinedDate: saved?.profile?.joinedDate || "March 2021",
    email: saved?.profile?.email || rawEmail,
    altEmail: saved?.profile?.altEmail || "",
    phone: saved?.profile?.phone || "+91 98765 43210",
    emergency: saved?.profile?.emergency || "",
    officeLocation: saved?.profile?.officeLocation || "Block B, Room 214",
    officeHours: saved?.profile?.officeHours || "Mon–Fri, 10am–12pm",
  };
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [savedProfile, setSavedProfile] = useState<ProfileData>(defaultProfile);
  const [profileErrors, setProfileErrors] = useState<Errors>({});
  const [avatarUrl, setAvatarUrl] = useState<string | null>(saved?.avatarUrl || null);
  const avatarRef = useRef<HTMLInputElement>(null);

  /* Academic state */
  const defaultAcademic: AcademicData = {
    qualification: saved?.academic?.qualification || "M.Sc. Biological Sciences",
    specialization: saved?.academic?.specialization || "Molecular Biology & Advanced Genetics",
    academicYear: saved?.academic?.academicYear || "2025–2026, Semester II",
    subjects: saved?.academic?.subjects || ["Biology (Gr 10)","Ecology (Gr 11)","Genetics (Gr 12)"],
    sections: saved?.academic?.sections || ["10-A","10-B","11-Bio"],
  };
  const [academic, setAcademic] = useState<AcademicData>(defaultAcademic);
  const [savedAcademic, setSavedAcademic] = useState<AcademicData>(defaultAcademic);

  /* Security state */
  const [pwd, setPwd] = useState<PwdData>({ current: "", newPwd: "", confirmPwd: "" });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });
  const [pwdErrors, setPwdErrors] = useState<Errors>({});
  const [twoFA, setTwoFA] = useState(saved?.twoFA ?? false);
  const [loginAlerts, setLoginAlerts] = useState(saved?.loginAlerts ?? true);
  const [pwdSaving, setPwdSaving] = useState(false);

  /* Preferences state */
  const defaultPrefs: PrefData = {
    language: saved?.prefs?.language || "English (India)",
    defaultPage: saved?.prefs?.defaultPage || "Overview",
    emailAlerts: saved?.prefs?.emailAlerts ?? true,
    submissionAlerts: saved?.prefs?.submissionAlerts ?? true,
    deadlineReminders: saved?.prefs?.deadlineReminders ?? false,
    quizAlerts: saved?.prefs?.quizAlerts ?? true,
    atRiskAlerts: saved?.prefs?.atRiskAlerts ?? true,
  };
  const [prefs, setPrefs] = useState<PrefData>(defaultPrefs);
  const [savedPrefs, setSavedPrefs] = useState<PrefData>(defaultPrefs);

  /* Documents state */
  const defaultDocs: DocsData = saved?.docs || { certificate: null, resume: null, idProof: null };
  const [docs, setDocs] = useState<DocsData>(defaultDocs);
  const certRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  /* UI state */
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);
  const [academicSaving, setAcademicSaving] = useState(false);
  const [prefsSaving, setPrefsSaving] = useState(false);

  const profileDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);
  const academicDirty = JSON.stringify(academic) !== JSON.stringify(savedAcademic);
  const prefsDirty = JSON.stringify(prefs) !== JSON.stringify(savedPrefs);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const persistAll = useCallback((updates: object) => {
    const current = loadLS() || {};
    saveLS({ ...current, ...updates });
  }, []);

  /* ── Profile validation & save ── */
  const validateProfile = () => {
    const e: Errors = {};
    if (!profile.name.trim()) e.name = "Full name is required";
    if (!validateEmail(profile.email)) e.email = "Enter a valid email address";
    if (profile.altEmail && !validateEmail(profile.altEmail)) e.altEmail = "Enter a valid alternate email";
    if (!validatePhone(profile.phone)) e.phone = "Enter a valid phone number";
    if (profile.emergency && !validatePhone(profile.emergency)) e.emergency = "Enter a valid phone number";
    if (!profile.employeeId.trim()) e.employeeId = "Employee ID is required";
    setProfileErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveProfile = async () => {
    if (!validateProfile()) { showToast("Please fix validation errors before saving.", "error"); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSavedProfile({ ...profile });
    persistAll({ profile, avatarUrl });
    setSaving(false);
    showToast("Profile saved successfully!");
  };

  /* ── Password validation & save ── */
  const validatePassword = () => {
    const e: Errors = {};
    if (!pwd.current) e.current = "Current password is required";
    if (pwd.newPwd.length < 8) e.newPwd = "Must be at least 8 characters";
    if (pwdStrength(pwd.newPwd) < 2) e.newPwd = "Password is too weak. Add uppercase, numbers, or symbols.";
    if (pwd.newPwd !== pwd.confirmPwd) e.confirmPwd = "Passwords do not match";
    setPwdErrors(e);
    return Object.keys(e).length === 0;
  };

  const savePassword = async () => {
    if (!validatePassword()) return;
    setPwdSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setPwd({ current: "", newPwd: "", confirmPwd: "" });
    setPwdErrors({});
    setPwdSaving(false);
    showToast("Password updated successfully!");
  };

  /* ── Academic save ── */
  const saveAcademic = async () => {
    setAcademicSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSavedAcademic({ ...academic });
    persistAll({ academic });
    setAcademicSaving(false);
    showToast("Academic details saved!");
  };

  /* ── Prefs save ── */
  const savePrefs = async () => {
    setPrefsSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSavedPrefs({ ...prefs });
    persistAll({ prefs, twoFA, loginAlerts });
    setPrefsSaving(false);
    showToast("Preferences saved!");
  };

  /* ── Security toggles persist immediately ── */
  useEffect(() => { persistAll({ twoFA, loginAlerts }); }, [twoFA, loginAlerts, persistAll]);

  /* ── Avatar upload ── */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) { showToast("Only JPG, PNG or WebP images are supported.", "error"); return; }
    if (file.size > 2 * 1024 * 1024) { showToast("Image must be under 2MB.", "error"); return; }
    const reader = new FileReader();
    reader.onload = ev => { const url = ev.target?.result as string; setAvatarUrl(url); persistAll({ avatarUrl: url }); };
    reader.readAsDataURL(file);
  };

  /* ── Document upload ── */
  const handleDocUpload = (field: keyof DocsData, ref: React.RefObject<HTMLInputElement>) => { ref.current?.click(); };
  const handleDocChange = (field: keyof DocsData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["application/pdf","image/jpeg","image/png","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) { showToast("Unsupported file type.", "error"); return; }
    if (file.size > 10 * 1024 * 1024) { showToast("File must be under 10MB.", "error"); return; }
    const sizeStr = file.size < 1024*1024 ? `${(file.size/1024).toFixed(1)} KB` : `${(file.size/(1024*1024)).toFixed(1)} MB`;
    const updated = { ...docs, [field]: { name: file.name, size: sizeStr, url: URL.createObjectURL(file) } };
    setDocs(updated);
    persistAll({ docs: updated });
    showToast(`${file.name} uploaded successfully!`);
  };
  const removeDoc = (field: keyof DocsData) => {
    const updated = { ...docs, [field]: null };
    setDocs(updated);
    persistAll({ docs: updated });
  };

  /* ── Subject / section chips ── */
  const toggleChip = <T extends string>(arr: T[], val: T): T[] => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const initial = (avatarUrl ? null : profile.name.charAt(0).toUpperCase()) || "T";
  const strength = pwdStrength(pwd.newPwd);
  const strengthColors = ["bg-red-500","bg-red-400","bg-amber-400","bg-emerald-500"];
  const strengthLabels = ["Very weak","Weak","Fair","Strong"];

  const setP = (field: keyof ProfileData) => (v: string) => {
    setProfile(prev => ({ ...prev, [field]: v }));
    if (profileErrors[field]) setProfileErrors(prev => { const n = {...prev}; delete n[field]; return n; });
  };

  return (
    <div className="min-h-full" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-white animate-in slide-in-from-bottom duration-300 ${
          toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
        }`}>
          <span className="material-symbols-outlined text-[20px]">{toast.type === "success" ? "check_circle" : "error"}</span>
          <span className="text-[13px] font-bold">{toast.msg}</span>
        </div>
      )}

      {/* Page header */}
      <div className={`border-b px-6 md:px-8 py-6 ${cl(dark,"border-slate-800 bg-[#0f172a]","border-slate-100 bg-slate-50/70")}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-2xl font-black ${cl(dark,"text-white","text-[#181c22]")}`}>Account Settings</h1>
          <p className={`text-[13px] mt-1 ${cl(dark,"text-slate-400","text-slate-500")}`}>Manage your profile, academic details, security, and preferences</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className={`border-b sticky top-0 z-10 ${cl(dark,"bg-[#0f172a] border-slate-800","bg-white border-slate-100")}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex gap-1 overflow-x-auto scrollbar-none">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 text-[12px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? cl(dark,"border-blue-500 text-blue-400","border-[#006493] text-[#006493]")
                  : cl(dark,"border-transparent text-slate-500 hover:text-slate-300","border-transparent text-slate-500 hover:text-[#181c22]")
              }`}>
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 space-y-6">

        {/* ══ PROFILE TAB ══ */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <CardSection title="Faculty Identity" icon="badge" dark={dark}>
                <div className={`flex flex-col items-center text-center gap-4 pb-6 mb-6 border-b border-dashed ${cl(dark,"border-slate-700/60","border-slate-200")}`}>
                  <div className="relative">
                    {avatarUrl
                      ? <img src={avatarUrl} alt="avatar" className="w-24 h-24 rounded-3xl object-cover shadow-xl" />
                      : <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#006493] to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl">{initial}</div>
                    }
                    <button onClick={() => avatarRef.current?.click()}
                      className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg border-2 transition-colors ${
                        cl(dark,"bg-slate-700 border-[#1e293b] text-white hover:bg-slate-600","bg-white border-white text-[#006493] hover:bg-slate-50")
                      }`}>
                      <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                    </button>
                    <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                  <div>
                    <p className={`text-[16px] font-black ${cl(dark,"text-white","text-[#181c22]")}`}>{profile.name || "Teacher Profile"}</p>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1 inline-block ${cl(dark,"bg-blue-500/10 text-blue-400","bg-blue-50 text-[#006493]")}`}>{profile.designation}</span>
                  </div>
                  {avatarUrl && (
                    <button onClick={() => { setAvatarUrl(null); persistAll({ avatarUrl: null }); }} className={`text-[11px] font-bold ${cl(dark,"text-red-400 hover:text-red-300","text-red-500 hover:text-red-600")}`}>Remove photo</button>
                  )}
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "badge", label: "Employee ID", val: profile.employeeId },
                    { icon: "mail", label: "Email", val: profile.email },
                    { icon: "school", label: "Department", val: profile.department },
                    { icon: "groups", label: "Classes", val: "Gr 10, 11, 12" },
                    { icon: "calendar_today", label: "Joined", val: profile.joinedDate },
                    { icon: "apartment", label: "Campus", val: profile.campus },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[16px] shrink-0 ${cl(dark,"text-slate-500","text-slate-400")}`}>{item.icon}</span>
                      <div className="min-w-0">
                        <p className={`text-[9px] font-black uppercase tracking-wider ${cl(dark,"text-slate-600","text-slate-400")}`}>{item.label}</p>
                        <p className={`text-[12px] font-semibold truncate ${cl(dark,"text-slate-300","text-slate-700")}`}>{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardSection>

              {/* Pro Summary */}
              <CardSection title="Professional Summary" icon="analytics" dark={dark}>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map(s => (
                    <div key={s.label} className={`flex flex-col items-center p-3 rounded-xl ${cl(dark,"bg-slate-800/60","bg-slate-50 border border-slate-100")}`}>
                      <span className={`material-symbols-outlined text-[20px] mb-1 ${s.color}`}>{s.icon}</span>
                      <p className={`text-[18px] font-black ${cl(dark,"text-white","text-[#181c22]")}`}>{s.value}</p>
                      <p className={`text-[9px] font-bold text-center ${cl(dark,"text-slate-500","text-slate-400")}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardSection>
            </div>

            {/* Right column */}
            <div className="col-span-2 space-y-6">
              <CardSection title="Personal & Identity Details" icon="person" dark={dark}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Full Name" value={profile.name} onChange={setP("name")} dark={dark} error={profileErrors.name} />
                  <InputField label="Employee / Teacher ID" value={profile.employeeId} onChange={setP("employeeId")} dark={dark} error={profileErrors.employeeId} />
                  <InputField label="Registration Number" value={profile.regNo} onChange={setP("regNo")} dark={dark} />
                  <InputField label="Designation" value={profile.designation} onChange={setP("designation")} dark={dark} />
                  <SelectField label="Department" value={profile.department} onChange={setP("department")} options={DEPARTMENTS} dark={dark} />
                  <SelectField label="Campus / Branch" value={profile.campus} onChange={setP("campus")} options={CAMPUSES} dark={dark} />
                </div>
                <div className="mt-5 space-y-1">
                  <Label text="Short Bio" dark={dark} />
                  <textarea value={profile.bio} onChange={e => setP("bio")(e.target.value)} rows={3}
                    className={`w-full px-4 py-3 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 resize-none transition-all ${
                      cl(dark,"bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:ring-blue-500/40",
                             "bg-slate-50 border border-slate-200 text-[#181c22] focus:ring-[#006493]/30 focus:bg-white")
                    }`}
                  />
                </div>
              </CardSection>

              <CardSection title="Contact Information" icon="contact_mail" dark={dark}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Primary Email" type="email" value={profile.email} onChange={setP("email")} dark={dark} error={profileErrors.email} />
                  <InputField label="Alternate Email" type="email" value={profile.altEmail} onChange={setP("altEmail")} placeholder="alternate@email.com" dark={dark} error={profileErrors.altEmail} />
                  <InputField label="Phone Number" value={profile.phone} onChange={setP("phone")} dark={dark} error={profileErrors.phone} />
                  <InputField label="Emergency Contact" value={profile.emergency} onChange={setP("emergency")} placeholder="+91 XXXXX XXXXX" dark={dark} error={profileErrors.emergency} />
                  <InputField label="Office / Cabin Number" value={profile.officeLocation} onChange={setP("officeLocation")} dark={dark} />
                  <InputField label="Office Hours" value={profile.officeHours} onChange={setP("officeHours")} dark={dark} />
                </div>
              </CardSection>

              <SaveBar dirty={profileDirty} saving={saving} onSave={saveProfile} onReset={() => { setProfile(savedProfile); setProfileErrors({}); }} dark={dark} />
            </div>
          </div>
        )}

        {/* ══ ACADEMIC TAB ══ */}
        {activeTab === "academic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSection title="Academic Background" icon="school" dark={dark}>
                <div className="space-y-5">
                  <SelectField label="Highest Qualification" value={academic.qualification} onChange={v => setAcademic(p => ({...p, qualification: v}))} options={QUALIFICATIONS} dark={dark} />
                  <InputField label="Specialization" value={academic.specialization} onChange={v => setAcademic(p => ({...p, specialization: v}))} dark={dark} />
                  <SelectField label="Academic Year / Semester" value={academic.academicYear} onChange={v => setAcademic(p => ({...p, academicYear: v}))} options={ACADEMIC_YEARS} dark={dark} />
                </div>
              </CardSection>

              <CardSection title="Subjects & Sections" icon="menu_book" dark={dark}>
                <div className="space-y-5">
                  <div>
                    <Label text="Subjects Handled (toggle to select)" dark={dark} />
                    <div className="flex flex-wrap gap-2 mt-1">
                      {ALL_SUBJECTS.map(s => (
                        <button key={s} type="button" onClick={() => setAcademic(p => ({...p, subjects: toggleChip(p.subjects, s)}))}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${academic.subjects.includes(s)
                            ? "bg-[#006493] text-white border-[#006493]"
                            : cl(dark,"bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600","bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300")
                          }`}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label text="Assigned Sections (toggle to select)" dark={dark} />
                    <div className="flex flex-wrap gap-2 mt-1">
                      {ALL_SECTIONS.map(s => (
                        <button key={s} type="button" onClick={() => setAcademic(p => ({...p, sections: toggleChip(p.sections, s)}))}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${academic.sections.includes(s)
                            ? cl(dark,"bg-blue-500/20 text-blue-300 border-blue-500/40","bg-blue-50 text-[#006493] border-blue-200")
                            : cl(dark,"bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600","bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300")
                          }`}>{s}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardSection>
            </div>
            <SaveBar dirty={academicDirty} saving={academicSaving} onSave={saveAcademic} onReset={() => setAcademic(savedAcademic)} dark={dark} />
          </div>
        )}

        {/* ══ SECURITY TAB ══ */}
        {activeTab === "security" && (
          <div className="space-y-6 max-w-2xl">
            <CardSection title="Change Password" icon="lock" dark={dark}>
              <div className="space-y-4">
                <InputField label="Current Password" type={showPwd.current ? "text" : "password"} value={pwd.current}
                  onChange={v => { setPwd(p => ({...p, current: v})); if (pwdErrors.current) setPwdErrors(e => {const n={...e}; delete n.current; return n;}); }}
                  placeholder="Enter your current password" dark={dark} error={pwdErrors.current}
                  rightEl={<button type="button" onClick={() => setShowPwd(s=>({...s,current:!s.current}))} className={cl(dark,"text-slate-500 hover:text-slate-300","text-slate-400 hover:text-slate-600")}>
                    <span className="material-symbols-outlined text-[18px]">{showPwd.current ? "visibility_off" : "visibility"}</span>
                  </button>}
                />
                <InputField label="New Password" type={showPwd.new ? "text" : "password"} value={pwd.newPwd}
                  onChange={v => { setPwd(p => ({...p, newPwd: v})); if (pwdErrors.newPwd) setPwdErrors(e => {const n={...e}; delete n.newPwd; return n;}); }}
                  placeholder="Minimum 8 characters" dark={dark} error={pwdErrors.newPwd}
                  rightEl={<button type="button" onClick={() => setShowPwd(s=>({...s,new:!s.new}))} className={cl(dark,"text-slate-500 hover:text-slate-300","text-slate-400 hover:text-slate-600")}>
                    <span className="material-symbols-outlined text-[18px]">{showPwd.new ? "visibility_off" : "visibility"}</span>
                  </button>}
                />
                {pwd.newPwd && (
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[0,1,2,3].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength-1] : cl(dark,"bg-slate-700","bg-slate-200")}`} />)}
                    </div>
                    <p className={`text-[11px] font-medium ${cl(dark,"text-slate-400","text-slate-500")}`}>Strength: {strengthLabels[Math.min(strength,3)]}</p>
                  </div>
                )}
                <InputField label="Confirm New Password" type={showPwd.confirm ? "text" : "password"} value={pwd.confirmPwd}
                  onChange={v => { setPwd(p => ({...p, confirmPwd: v})); if (pwdErrors.confirmPwd) setPwdErrors(e => {const n={...e}; delete n.confirmPwd; return n;}); }}
                  placeholder="Repeat your new password" dark={dark} error={pwdErrors.confirmPwd}
                  rightEl={<button type="button" onClick={() => setShowPwd(s=>({...s,confirm:!s.confirm}))} className={cl(dark,"text-slate-500 hover:text-slate-300","text-slate-400 hover:text-slate-600")}>
                    <span className="material-symbols-outlined text-[18px]">{showPwd.confirm ? "visibility_off" : "visibility"}</span>
                  </button>}
                />
                <button type="button" onClick={savePassword} disabled={pwdSaving}
                  className="w-full py-3 rounded-xl text-[13px] font-bold text-white bg-[#006493] hover:bg-[#004e73] transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60">
                  {pwdSaving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {pwdSaving ? "Updating…" : "Update Password"}
                </button>
              </div>
            </CardSection>

            <CardSection title="Login & Access" icon="manage_accounts" dark={dark}>
              <Toggle label="Two-Factor Authentication" sub="Require OTP on every new login" value={twoFA} onChange={setTwoFA} dark={dark} />
              <Toggle label="Login Alerts via Email" sub="Get notified when a new device signs in" value={loginAlerts} onChange={setLoginAlerts} dark={dark} />
              <div className={`flex items-center justify-between py-4 border-b ${cl(dark,"border-slate-700/60","border-slate-100")}`}>
                <div>
                  <p className={`text-[13px] font-semibold ${cl(dark,"text-slate-200","text-[#181c22]")}`}>Active Sessions</p>
                  <p className={`text-[11px] mt-0.5 ${cl(dark,"text-slate-500","text-slate-400")}`}>2 devices currently logged in</p>
                </div>
                <button onClick={() => showToast("All other sessions signed out.")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                    cl(dark,"bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20","bg-red-50 text-red-600 border border-red-200 hover:bg-red-100")
                  }`}>Sign Out All</button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className={`text-[13px] font-semibold ${cl(dark,"text-slate-200","text-[#181c22]")}`}>Last Password Update</p>
                  <p className={`text-[11px] mt-0.5 ${cl(dark,"text-slate-500","text-slate-400")}`}>January 14, 2026</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${cl(dark,"bg-emerald-500/10 text-emerald-400","bg-emerald-50 text-emerald-700")}`}>Secure</span>
              </div>
            </CardSection>

            <div className={`rounded-2xl border p-5 ${cl(dark,"bg-red-500/5 border-red-500/20","bg-red-50 border-red-100")}`}>
              <h3 className={`text-[13px] font-black mb-2 ${cl(dark,"text-red-400","text-red-600")}`}>Danger Zone</h3>
              <p className={`text-[12px] mb-4 ${cl(dark,"text-slate-400","text-slate-500")}`}>Permanently deactivating your account will remove all your data. This cannot be undone.</p>
              <button onClick={() => showToast("Please contact your administrator to deactivate.", "error")}
                className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-colors ${cl(dark,"bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20","bg-red-100 text-red-700 border border-red-200 hover:bg-red-200")}`}>
                Deactivate Account
              </button>
            </div>
          </div>
        )}

        {/* ══ PREFERENCES TAB ══ */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSection title="Appearance & Language" icon="palette" dark={dark}>
                <div className={`flex items-center justify-between p-4 rounded-xl mb-5 ${cl(dark,"bg-slate-800/50 border border-slate-700","bg-slate-50 border border-slate-200")}`}>
                  <div>
                    <p className={`text-[13px] font-bold ${cl(dark,"text-white","text-[#181c22]")}`}>Theme Mode</p>
                    <p className={`text-[11px] ${cl(dark,"text-slate-400","text-slate-500")}`}>Toggle via the navigation bar icon</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold pointer-events-none ${cl(dark,"bg-slate-700 text-amber-400","bg-white border text-slate-600 shadow-sm")}`}>
                    <span className="material-symbols-outlined text-[18px]">{dark ? "dark_mode" : "light_mode"}</span>
                    {dark ? "Dark" : "Light"}
                  </div>
                </div>
                <div className="space-y-4">
                  <SelectField label="Language" value={prefs.language} onChange={v => setPrefs(p => ({...p, language: v}))} options={LANGUAGES} dark={dark} />
                  <SelectField label="Default Dashboard Page" value={prefs.defaultPage} onChange={v => setPrefs(p => ({...p, defaultPage: v}))} options={PAGES} dark={dark} />
                </div>
              </CardSection>

              <CardSection title="Notification Preferences" icon="notifications" dark={dark}>
                <Toggle label="Email Notifications" sub="Receive alerts in your inbox" value={prefs.emailAlerts} onChange={v => setPrefs(p => ({...p, emailAlerts: v}))} dark={dark} />
                <Toggle label="Assignment Submission Alerts" sub="Notify when a student submits" value={prefs.submissionAlerts} onChange={v => setPrefs(p => ({...p, submissionAlerts: v}))} dark={dark} />
                <Toggle label="Deadline Reminders" sub="Alert 24 hours before due date" value={prefs.deadlineReminders} onChange={v => setPrefs(p => ({...p, deadlineReminders: v}))} dark={dark} />
                <Toggle label="Quiz Result Updates" sub="Alert when auto-scoring completes" value={prefs.quizAlerts} onChange={v => setPrefs(p => ({...p, quizAlerts: v}))} dark={dark} />
                <Toggle label="At-Risk Student Alerts" sub="Weekly classification digest" value={prefs.atRiskAlerts} onChange={v => setPrefs(p => ({...p, atRiskAlerts: v}))} dark={dark} />
              </CardSection>
            </div>
            <SaveBar dirty={prefsDirty} saving={prefsSaving} onSave={savePrefs} onReset={() => setPrefs(savedPrefs)} dark={dark} />
          </div>
        )}

        {/* ══ DOCUMENTS TAB ══ */}
        {activeTab === "documents" && (
          <div className="space-y-6 max-w-3xl">
            <CardSection title="Verification Status" icon="verified_user" dark={dark}>
              {[
                { label: "Faculty Verification", status: "Verified", color: "emerald" },
                { label: "Email Address", status: "Verified", color: "emerald" },
                { label: "Phone Number", status: "Pending", color: "amber" },
                { label: "Government ID Proof", status: docs.idProof ? "Submitted" : "Not Uploaded", color: docs.idProof ? "blue" : "red" },
              ].map(v => (
                <div key={v.label} className={`flex items-center justify-between py-4 border-b last:border-0 ${cl(dark,"border-slate-700/60","border-slate-100")}`}>
                  <p className={`text-[13px] font-semibold ${cl(dark,"text-slate-200","text-[#181c22]")}`}>{v.label}</p>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    v.color === "emerald" ? cl(dark,"bg-emerald-500/10 text-emerald-400","bg-emerald-50 text-emerald-700") :
                    v.color === "amber" ? cl(dark,"bg-amber-500/10 text-amber-400","bg-amber-50 text-amber-700") :
                    v.color === "blue" ? cl(dark,"bg-blue-500/10 text-blue-400","bg-blue-50 text-blue-700") :
                    cl(dark,"bg-red-500/10 text-red-400","bg-red-50 text-red-700")
                  }`}>{v.status}</span>
                </div>
              ))}
            </CardSection>

            <CardSection title="Document Uploads" icon="upload_file" dark={dark}>
              {/* hidden file inputs */}
              <input ref={certRef} type="file" accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={handleDocChange("certificate")} />
              <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={handleDocChange("resume")} />
              <input ref={idRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleDocChange("idProof")} />

              {([
                { key: "certificate" as keyof DocsData, label: "Qualification Certificate", icon: "picture_as_pdf", ref: certRef },
                { key: "resume" as keyof DocsData, label: "Resume / Curriculum Vitae", icon: "description", ref: resumeRef },
                { key: "idProof" as keyof DocsData, label: "Government ID Proof", icon: "badge", ref: idRef },
              ]).map(doc => {
                const file = docs[doc.key];
                return (
                  <div key={doc.key} className={`flex items-center justify-between py-4 border-b last:border-0 ${cl(dark,"border-slate-700/60","border-slate-100")}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cl(dark,"bg-slate-800","bg-slate-100")}`}>
                        <span className={`material-symbols-outlined text-[20px] ${file ? cl(dark,"text-blue-400","text-[#006493]") : cl(dark,"text-slate-500","text-slate-400")}`}>{doc.icon}</span>
                      </div>
                      <div>
                        <p className={`text-[13px] font-bold ${cl(dark,"text-slate-200","text-[#181c22]")}`}>{doc.label}</p>
                        <p className={`text-[11px] ${cl(dark,"text-slate-500","text-slate-400")}`}>
                          {file ? `${file.name} · ${file.size}` : "No file uploaded — PDF, DOC or image, max 10MB"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {file && (
                        <button onClick={() => removeDoc(doc.key)} className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${cl(dark,"bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20","bg-red-50 text-red-600 border border-red-200 hover:bg-red-100")}`}>Remove</button>
                      )}
                      <button onClick={() => handleDocUpload(doc.key, doc.ref)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                          file ? cl(dark,"bg-slate-700 text-slate-300 hover:bg-slate-600","bg-slate-100 text-slate-600 hover:bg-slate-200")
                               : "bg-[#006493] text-white hover:bg-[#004e73]"
                        }`}>
                        {file ? "Replace" : "Upload"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </CardSection>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSettings;
