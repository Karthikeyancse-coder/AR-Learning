import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecurityPrivacy = () => {
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Privacy toggles state
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    allowRecommendations: true,
    emailAlerts: true,
    saveHistory: true,
    aiSuggestions: true,
  });

  const togglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Mock devices
  const activeDevices = [
    {
      id: 1,
      name: "Chrome on Windows",
      location: "Chennai, India",
      status: "Active now",
      icon: "laptop_chromebook",
      current: true,
    },
    {
      id: 2,
      name: "Mobile App on Android",
      location: "Chennai, India",
      status: "Last active 2 hours ago",
      icon: "smartphone",
      current: false,
    },
    {
      id: 3,
      name: "Edge on Laptop",
      location: "Bangalore, India",
      status: "Last active yesterday",
      icon: "laptop_windows",
      current: false,
    },
  ];

  // Mock timeline
  const loginActivity = [
    { id: 1, action: "Successful login", device: "Chrome · Windows", time: "2 minutes ago", icon: "login", color: "text-emerald-500" },
    { id: 2, action: "Password changed", device: "Mobile App · Android", time: "28 days ago", icon: "key", color: "text-blue-500" },
    { id: 3, action: "New device login detected", device: "Edge · Laptop", time: "1 month ago", icon: "devices", color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#0f172a] -m-6 sm:-m-8 pb-12 transition-colors duration-300 font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12">
        
        {/* Header Block */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 font-bold text-xs uppercase tracking-wider group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Settings
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl text-[#006493] dark:text-blue-400">shield_lock</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Security & Privacy</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm">Update password, enable 2FA, and manage connected devices.</p>
            </div>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100 fill-mode-both">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined">password</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">Strong</span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Password Status</p>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">Last changed 28 days ago</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined">phonelink_lock</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${twoFactorEnabled ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-700/50'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Two-Factor Auth</p>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{twoFactorEnabled ? 'Protected via App' : 'Additional setup required'}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined">devices</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Active Devices</p>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">3 devices connected</p>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200 fill-mode-both">
          
          {/* Left Column (Main Actions) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
            
            {/* Change Password */}
            <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">key</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Change Password</h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006493] dark:focus:ring-blue-500 transition-all shadow-sm"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006493] dark:focus:ring-blue-500 transition-all shadow-sm"
                    placeholder="Create a strong password"
                  />
                  {/* Strength Indicator */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full w-2/3 bg-[#0da6f2] rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Good</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006493] dark:focus:ring-blue-500 transition-all shadow-sm"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="pt-2">
                  <button className="w-full sm:w-auto px-6 py-2.5 bg-[#006493] hover:bg-[#004e75] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-[0.98]">
                    Update Password
                  </button>
                </div>
              </div>
            </section>

            {/* Connected Devices */}
            <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">multiple_devices</span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Connected Devices</h2>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {activeDevices.map(device => (
                  <div key={device.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl shrink-0 ${device.current ? 'bg-[#006493]/10 text-[#006493] dark:bg-blue-500/10 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                        <span className="material-symbols-outlined">{device.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{device.name}</p>
                          {device.current && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#006493] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-500/20 px-1.5 py-0.5 rounded">This Device</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{device.location} · {device.status}</p>
                      </div>
                    </div>
                    {!device.current && (
                      <button className="text-xs font-bold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0">
                        Sign Out
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 flex justify-end">
                <button className="text-xs font-black uppercase tracking-widest text-[#006493] hover:text-[#004e75] dark:text-blue-400 mt-1 cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  Sign Out of All Other Devices
                </button>
              </div>
            </section>

          </div>

          {/* Right Column (Side Actions) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
            
            {/* Two-Factor Auth */}
            <section className={`bg-white dark:bg-[#1e293b] rounded-2xl border ${twoFactorEnabled ? 'border-[#006493]/30 dark:border-blue-500/30' : 'border-slate-200 dark:border-slate-800'} shadow-sm overflow-hidden transition-all duration-300 relative`}>
              {twoFactorEnabled && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006493]/5 dark:bg-blue-500/5 rounded-bl-[100px] -z-0"></div>
              )}
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">verified_user</span>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Two-Factor Authentication</h2>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006493] dark:peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Protect your account with an extra layer of security. We will ask for a verification code when you sign in.
                </p>

                {twoFactorEnabled ? (
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#006493] dark:text-blue-400 text-sm">fact_check</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Authenticator App</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">Configured</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-sm">sms</span>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">SMS Backup</span>
                      </div>
                      <button className="text-[10px] uppercase font-bold text-[#006493] hover:text-[#004e75] dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 px-2 flex items-center h-6 rounded transition-colors cursor-pointer">
                        Add Number
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setTwoFactorEnabled(true)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700">
                    Set Up 2FA
                  </button>
                )}
              </div>
            </section>

            {/* Privacy Controls */}
            <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">visibility_off</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Privacy Controls</h2>
              </div>
              <div className="p-2 space-y-1">
                {[
                  { id: "showProfile", label: "Show profile to classmates", desc: "Allow other students to see your achievements" },
                  { id: "allowRecommendations", label: "Academic recommendations", desc: "Use activity logic to suggest modules" },
                  { id: "emailAlerts", label: "Security email notifications", desc: "Receive alerts for new sign-ins" },
                  { id: "saveHistory", label: "Save activity history", desc: "Keep records of your chapter interactions" },
                  { id: "aiSuggestions", label: "Personalized AI Tutoring", desc: "Grant AI access to quiz performance" }
                ].map((toggle) => (
                  <div key={toggle.id} className="p-4 sm:px-4 sm:py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                    <div className="pr-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{toggle.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{toggle.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={privacySettings[toggle.id as keyof typeof privacySettings]}
                        onChange={() => togglePrivacy(toggle.id as keyof typeof privacySettings)}
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006493] dark:peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* Login Activity */}
            <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">history</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-6">
                  {loginActivity.map((log) => (
                    <div key={log.id} className="relative pl-6">
                      <div className="absolute -left-[14px] top-1 px-1 bg-white dark:bg-[#1e293b]">
                         <span className={`material-symbols-outlined text-[16px] ${log.color}`}>{log.icon}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{log.device}</span>
                        <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-[11px] font-medium text-slate-400">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Danger Zone */}
            <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden transition-colors duration-300 relative group pt-2 mt-4 lg:mt-0">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500"></div>
              <div className="p-6">
                <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span> Danger Zone
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  Permanently delete your account and all associated data, or temporarily deactivate it to hide your profile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-500 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer">
                    Deactivate Account
                  </button>
                  <button className="flex-1 py-2 bg-red-50 hover:bg-red-500 dark:bg-red-500/10 dark:hover:bg-red-500 border border-red-100 dark:border-red-500/20 text-red-600 hover:text-white dark:text-red-400 text-xs font-bold rounded-lg transition-colors cursor-pointer active:scale-[0.98]">
                    Delete Account
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacy;
