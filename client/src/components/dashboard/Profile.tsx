import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#0f172a] -m-6 sm:-m-8 pb-12 transition-colors duration-300">
      {/* Profile Header Block */}
      <section 
        className="h-48 relative flex items-end bg-cover bg-center bg-no-repeat transition-all duration-300" 
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuABg2pcJRXW25lLHeLWNvEKp5538PXe18QTfBfuspiYk4dpNix2j3gNwlpeVqbbaN7sqPBuX-mYiKxSTvZ7u9kyppx0XKwjb3gdozX4BdwekNAzYFcYaiheC25pw2Dm9B2H9xZD-0O4e2U1vtNn1enlP6SBZI_nzlYRk4PBGPhLk8ubW1Y3lcLyGrCAj7QmE2xh7RRHuoyBQO6W11ThBScmt-nJQBaPbpRnSnVGzsAplFA6Ku5-sqhp_uqCdkvQmgiVcARG1Bx57w')" }}
      >
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 flex items-end gap-4 sm:gap-6 -mb-16 relative z-10">
          <div className="relative group shrink-0">
            {user?.name ? (
              <img 
                alt="Student profile avatar" 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-white dark:border-[#0f172a] object-cover shadow-xl bg-white transition-colors duration-300" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdMSxBHdmM2g0BO0U09FaL6nZmdrru3MgAykcaVPlsMtFnJ7WPK6cpe6UeAsHOGsM9ZgXRT1VqwgstLTUqjGjqZUn4VjSi261EAO3GSFqj0NdqBh5GGg8dvDAf0sSTbFFhlgTeUUM5DlK-iCsNV1FJIgcSQQNHkKWdS6vjL3oonxTgeRCFIEygOzRaq1KoolDTfzAK9Qf5OjvJdS5PG3g9Y36m4o2hX6hFWQ9u5CsUmxPvvrDfX_fYKZmxcC-RvKqr-nvEyXUi3w" 
              />
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-white dark:border-[#0f172a] shadow-xl bg-linear-to-br from-[#006493] to-blue-600 flex items-center justify-center text-5xl font-bold text-white transition-colors duration-300">
                {user?.name?.charAt(0) || "S"}
              </div>
            )}
            <button className="absolute bottom-2 right-2 p-1.5 sm:p-2 bg-white dark:bg-[#1e293b] text-[#006493] dark:text-blue-400 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => console.log('Edit profile clicked')}>
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div className="flex flex-col justify-center pb-2 truncate">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight truncate transition-colors">{user?.name}</h1>
            <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base truncate transition-colors">{user?.email}</p>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Stats Section (Left Column) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-5 sm:gap-6">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Academic Performance</h3>
          
          {/* Horizontal Stat Cards */}
          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors duration-300">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 transition-colors">grade</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors">Cumulative GPA</p>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1 transition-colors">3.88</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 flex items-center py-0.5 rounded transition-colors">+0.2</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 transition-colors">auto_stories</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors">Completed Courses</p>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1 transition-colors">24</p>
              </div>
            </div>
            <div className="text-right text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0 transition-colors">OF 30</div>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 transition-colors">verified_user</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors">Attendance Rate</p>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1 transition-colors">96.4%</p>
              </div>
            </div>
          </div>
          
          {/* Side Action Card */}
          <div className="bg-slate-900 dark:bg-[#0f172a] border border-transparent dark:border-slate-800 rounded-xl p-6 text-white overflow-hidden relative group mt-2 lg:mt-0 shadow-lg transition-colors duration-300">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
            <h4 className="font-bold mb-2 relative z-10">Need Academic Help?</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed relative z-10 transition-colors">Book a session with our top-tier tutors or explore personalized learning paths.</p>
            <button 
              onClick={() => navigate("/dashboard")}
              className="w-full relative z-10 py-2.5 bg-[#006493] hover:bg-[#004e75] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              View Tutoring Options
            </button>
          </div>
        </div>
        
        {/* Settings Section (Right Column) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-5 sm:gap-6 mt-4 lg:mt-0">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">General Settings</h3>
          
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm divide-y divide-slate-100 dark:divide-slate-800/50 overflow-hidden transition-colors duration-300">
            
            <button className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-[#0f172a] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 transition-colors">person</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Personal Information</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 pr-2 transition-colors">Edit your name, bio, and contact details for the university portal.</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 shrink-0 transition-colors">chevron_right</span>
            </button>
            
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-start gap-4 pr-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-[#0f172a] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 transition-colors">notifications_active</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Push Notifications</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Manage alerts for class schedules, exam dates, and grade releases.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006493] dark:peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <button className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-[#0f172a] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 transition-colors">lock</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Security & Privacy</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 pr-2 transition-colors">Update password, enable 2FA, and manage connected devices.</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 shrink-0 transition-colors">chevron_right</span>
            </button>
            
            <button className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-[#0f172a] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 transition-colors">credit_card</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Billing & Fees</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 pr-2 transition-colors">View transaction history, download invoices, and pay semester fees.</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 shrink-0 transition-colors">chevron_right</span>
            </button>
            
            <button className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-[#0f172a] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 transition-colors">language</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Language & Region</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 pr-2 transition-colors">Set your preferred interface language and timezone.</p>
                </div>
              </div>
              <div className="text-xs font-bold text-[#006493] dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg shrink-0 border border-blue-100 dark:border-blue-500/20 transition-colors">English (US)</div>
            </button>

          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-red-50/50 dark:bg-red-500/5 border border-red-200 dark:border-red-900/50 rounded-xl mt-2 sm:mt-4 gap-4 sm:gap-0 transition-colors duration-300">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-bold">Sign out from all devices</span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:py-2 bg-white dark:bg-red-950/20 border border-red-500 dark:border-red-500/50 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white dark:hover:border-red-600 transition-colors cursor-pointer active:scale-[0.98]"
            >
              <span>Sign out</span>
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
