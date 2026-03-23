import { useState } from "react";

interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Cell Membrane Structure Analysis",
    course: "Biology",
    dueDate: "Today, 4:00 PM",
    completed: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Organic Synthesis Lab Report",
    course: "Chemistry",
    dueDate: "Tomorrow",
    completed: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Vector Calculus Exercise 4.2",
    course: "Mathematics",
    dueDate: "Completed",
    completed: true,
    priority: "low",
  },
  {
    id: "4",
    title: "Thermodynamics Mid-term Prep",
    course: "Physics",
    dueDate: "Oct 24, 2023",
    completed: false,
    priority: "high",
  },
];

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    course: "General",
    priority: "medium",
    date: "",
    time: ""
  });

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // Defaulting to Oct 2023 as per UI reference, but using actual date logic
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 9, 12)); // Defaulting to the 12th as per UI

  // Calendar logic helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const prevMonthDaysCount = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const hasEventsOnDate = (year: number, month: number, day: number) => {
    const isToday = year === 2023 && month === 9 && day === 12; // Oct 12, 2023 setup
    const isTomorrow = year === 2023 && month === 9 && day === 13;
    
    const hasTask = tasks.some(task => {
      if (isToday && task.dueDate.includes("Today")) return true;
      if (isTomorrow && task.dueDate.includes("Tomorrow")) return true;
      if (task.dueDate.includes(`${monthNames[month].substring(0, 3)} ${day}, ${year}`)) return true;
      return false;
    });

    if (isToday) return true; // Static calendar mock events
    return hasTask;
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed && (task.dueDate.includes("Today") || task.dueDate.includes("Tomorrow"));
    if (filter === "completed") return task.completed;
    return true;
  });

  const priorityWeight: Record<string, number> = { high: 1, medium: 2, low: 3 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    // Both active or both completed, order by priority
    return priorityWeight[a.priority] - priorityWeight[b.priority];
  });

  const stats = {
    total: tasks.length,
    dueToday: tasks.filter(t => t.priority === "high" && !t.completed).length,
    scheduled: tasks.filter(t => !t.completed).length,
    completedWeek: tasks.filter(t => t.completed).length,
  };

  const handleToggle = (id: string) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    setActiveMenu(null);
  };

  const handleAddNewTaskTrigger = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!newTask.title.trim()) return;
    
    let formattedDate = "Upcoming";
    if (newTask.date) {
      const dateParts = newTask.date.split('-'); 
      if (dateParts.length === 3) {
        // Native local date formatting avoidance of timezone skew
        const dateObj = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
        formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } else {
        formattedDate = newTask.date;
      }
    }
    
    if (newTask.time) {
      let [hours, minutes] = newTask.time.split(':');
      const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      hours = (parseInt(hours) % 12 || 12).toString();
      formattedDate = newTask.date ? `${formattedDate}, ${hours}:${minutes} ${ampm}` : `${hours}:${minutes} ${ampm}`;
    }

    setTasks([{
      id: Date.now().toString(),
      title: newTask.title.trim(),
      course: newTask.course,
      dueDate: formattedDate,
      completed: false,
      priority: newTask.priority as any,
    }, ...tasks]);
    
    setIsModalOpen(false);
    setNewTask({ title: "", course: "General", priority: "medium", date: "", time: "" });
  };

  const getPriorityColor = (priority: string, completed: boolean = false) => {
    if (completed) return "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 shadow-none";
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "low": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getPriorityContainerStyle = (priority: string, completed: boolean) => {
    if (completed) return "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-[0.85]";
    switch (priority) {
      case "high": return "bg-red-100/70 dark:bg-red-900/30 border-red-300 dark:border-red-800/60 hover:border-red-400 hover:shadow-[0_4px_20px_rgba(239,68,68,0.12)] dark:hover:shadow-none";
      case "medium": return "bg-amber-100/70 dark:bg-amber-900/30 border-amber-300 dark:border-amber-800/60 hover:border-amber-400 hover:shadow-[0_4px_20px_rgba(245,158,11,0.12)] dark:hover:shadow-none";
      case "low": return "bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-800/60 hover:border-emerald-400 hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)] dark:hover:shadow-none";
      default: return "bg-slate-50 dark:bg-[#1e293b] border-slate-200 dark:border-slate-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-none";
    }
  };

  const getTaskIcon = (priority: string, completed: boolean) => {
    if (completed) return "task_alt";
    switch (priority) {
      case "high": return "error"; 
      case "medium": return "flag"; 
      case "low": return "low_priority";
      default: return "task";
    }
  };

  const getTaskIconColor = (priority: string, completed: boolean) => {
    if (completed) return "text-slate-600 dark:text-slate-400";
    switch (priority) {
      case "high": return "text-red-500 dark:text-red-400";
      case "medium": return "text-amber-500 dark:text-amber-400";
      case "low": return "text-emerald-500 dark:text-emerald-400";
      default: return "text-slate-500 dark:text-slate-400";
    }
  };

  const getCourseTextColor = (course: string, completed: boolean = false) => {
    if (completed) return "text-slate-400 dark:text-slate-500";
    switch (course) {
      case "Biology": return "text-[#059669] dark:text-[#34d399]";
      case "Chemistry": return "text-[#0284c7] dark:text-[#38bdf8]";
      case "Mathematics": return "text-slate-400";
      default: return "text-[#006493] dark:text-blue-400";
    }
  };

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500 p-2 sm:p-6 pb-20" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Background Mesh (Light Mode Only) */}
      <div 
        className="absolute inset-0 z-0 rounded-[3rem] opacity-100 dark:opacity-0 pointer-events-none" 
        style={{ background: "linear-gradient(135deg, hsla(270, 100%, 98%, 1) 0%, hsla(220, 100%, 97%, 1) 50%, hsla(330, 100%, 97%, 1) 100%)" }}
      />
      
      <div className="relative z-10 w-full mx-auto max-w-7xl">
      
        {/* ── Summary Dashboard ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-[#181c22] dark:text-white">
              {stats.total.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-l-4 border-red-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Due Today</p>
            <p className="text-3xl font-bold text-red-500">
              {stats.dueToday.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Scheduled Today</p>
            <p className="text-3xl font-bold text-[#181c22] dark:text-white">
              {stats.scheduled.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Completed (Week)</p>
            <p className="text-3xl font-bold text-[#059669]">
              {stats.completedWeek.toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* ── Main Layout: Split into Left Tasks & Right Panels ─────────────────────────── */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* 60% Left Area: Tasks Management */}
          <section className="flex-1 w-full">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#181c22] dark:text-white">To-Do List</h1>
              <button 
                onClick={handleAddNewTaskTrigger}
                className="bg-[#006493] dark:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#006493]/20 hover:scale-105 transition-transform active:scale-95 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Task
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
              {[ 
                { id: 'all', label: 'All Tasks' }, 
                { id: 'pending', label: 'Today' }, 
                { id: 'completed', label: 'Completed' } 
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    filter === tab.id
                      ? "bg-[#006493] dark:bg-blue-600 text-white shadow-sm" 
                      : "bg-white dark:bg-[#1e293b] text-[#64748b] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {sortedTasks.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center bg-white dark:bg-[#1e293b] rounded-[2rem]">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600">done_all</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#181c22] dark:text-white mb-2">You're all caught up!</h3>
                  <p className="text-sm text-[#64748b] dark:text-slate-400 max-w-sm">
                    No tasks found. Take a break!
                  </p>
                </div>
              ) : (
                sortedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`rounded-[2rem] flex items-center group transition-all relative pr-4 py-4 border ${getPriorityContainerStyle(task.priority, task.completed)}`}
                  >
                    {/* Checkbox */}
                    <button 
                      onClick={() => handleToggle(task.id)}
                      className={`w-6 h-6 rounded-md border-2 text-white flex items-center justify-center ml-6 shrink-0 transition-all ${
                        task.completed 
                          ? "bg-[#006493] border-[#006493] dark:bg-blue-600 dark:border-blue-600" 
                          : "border-slate-300 dark:border-slate-600 hover:border-[#006493] focus:ring-2 focus:ring-[#006493]"
                      }`}
                    >
                      {task.completed && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                    </button>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 ml-5 flex items-start mt-0.5">
                      {/* Task Symbol */}
                      <div className={`mr-3.5 mt-[2px] ${getTaskIconColor(task.priority, task.completed)}`}>
                        <span className="material-symbols-outlined text-[18px]">
                          {getTaskIcon(task.priority, task.completed)}
                        </span>
                      </div>
                      
                      {/* Text Column */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold mb-1 truncate transition-all ${
                          task.completed ? "text-slate-400 dark:text-slate-500 line-through opacity-80" : "text-[#181c22] dark:text-white group-hover:text-[#006493]"
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mt-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${getCourseTextColor(task.course, task.completed)}`}>
                            {task.course}
                          </span>
                          <div className={`flex items-center gap-1 ${task.completed ? 'text-slate-400 dark:text-slate-500' : 'text-[#64748b] dark:text-slate-500'}`}>
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            <span className="text-[10px] font-medium">{task.dueDate}</span>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${getPriorityColor(task.priority, task.completed)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <div className="relative ml-2">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === task.id ? null : task.id)}
                        className="material-symbols-outlined text-slate-300 hover:text-[#006493] dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                      >
                        more_vert
                      </button>
                      
                      {activeMenu === task.id && (
                        <div className="absolute right-0 top-[100%] mt-1 w-32 bg-white dark:bg-[#1e293b] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 z-50 overflow-hidden">
                          <button 
                            onClick={() => setActiveMenu(null)}
                            className="w-full text-left px-4 py-2 text-sm font-medium text-[#181c22] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
          </section>

          {/* 40% Right Area: Scheduling & Performance */}
          <aside className="w-full xl:w-[22rem] shrink-0 space-y-6">
            
            {/* ── Mini Calendar Section ── */}
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,100,147,0.04)] dark:shadow-none">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-[#181c22] dark:text-white tracking-tight">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="material-symbols-outlined text-lg text-[#64748b] hover:text-[#006493] transition-colors rounded-full hover:bg-slate-50 p-1">chevron_left</button>
                  <button onClick={handleNextMonth} className="material-symbols-outlined text-lg text-[#64748b] hover:text-[#006493] transition-colors rounded-full hover:bg-slate-50 p-1">chevron_right</button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-3 text-center mb-6">
                {/* Day Headers */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <span key={day} className="text-[10px] font-bold text-[#64748b] dark:text-slate-500 pb-2">{day}</span>
                ))}
                
                {/* Previous Month trailing days */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex justify-center">
                    <span className="w-8 h-8 flex items-center justify-center text-xs py-1 text-slate-300 dark:text-slate-700 font-medium">
                      {prevMonthDaysCount - firstDay + i + 1}
                    </span>
                  </div>
                ))}
                
                {/* Current Month days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = selectedDate.getDate() === dayNum && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();
                  const hasEvents = hasEventsOnDate(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
                  
                  return (
                    <div key={dayNum} className="flex justify-center">
                      <button 
                        onClick={() => handleDateClick(dayNum)}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-full cursor-pointer transition-colors relative ${
                          isSelected 
                            ? "bg-[#006493] text-white shadow-md shadow-[#006493]/30 font-bold" 
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300 text-[#181c22]"
                        }`}
                      >
                        <span className={hasEvents ? "mb-[3px]" : ""}>{dayNum}</span>
                        {hasEvents && (
                          <span className={`absolute bottom-[5px] w-1 h-1 rounded-full ${isSelected ? "bg-amber-300" : "bg-[#f59e0b] dark:bg-amber-400"}`}></span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {/* Scheduled Events for Selected Date (Mock Display logic) */}
              <div className="mt-2 space-y-3">
                <div className="bg-[#f1f3fc] dark:bg-slate-800/50 p-3.5 rounded-2xl border-l-4 border-[#3713ec]">
                  <p className="text-[9px] font-extrabold text-[#3713ec] dark:text-indigo-400 uppercase tracking-widest mb-1">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • 11:30 AM 
                  </p>
                  <p className="text-xs font-bold text-[#181c22] dark:text-white">Advanced Neuroscience Class</p>
                </div>
                {/* Conditionally reveal an event when "12" is selected to mock specific date logic */}
                {selectedDate.getDate() === 12 && (
                  <div className="bg-[#f1f3fc] dark:bg-slate-800/50 p-3.5 rounded-2xl border-l-4 border-[#059669]">
                    <p className="text-[9px] font-extrabold text-[#059669] dark:text-[#34d399] uppercase tracking-widest mb-1">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • 2:00 PM
                    </p>
                    <p className="text-xs font-bold text-[#181c22] dark:text-white">Paper Submission Deadline</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Performance: Today's Focus ── */}
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,100,147,0.04)] dark:shadow-none">
              <h4 className="font-bold text-sm text-[#181c22] dark:text-white mb-6 tracking-tight">Today's Focus</h4>
              
              <div className="flex items-center justify-center mb-8 relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-[#e2e8f0] dark:text-slate-700" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-[#3713ec] dark:text-indigo-500 drop-shadow-[0_0_8px_rgba(51,4,233,0.3)] transition-all duration-1000 ease-in-out" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="56" 
                    stroke="currentColor" 
                    strokeDasharray="351.85" 
                    strokeDashoffset={351.85 - (351.85 * 70) / 100} 
                    strokeWidth="8"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-[#181c22] dark:text-white mt-1">70%</span>
                  <span className="text-[8px] font-bold text-[#64748b] dark:text-slate-500 uppercase tracking-widest">Done</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-bold text-[#64748b] dark:text-slate-500 uppercase tracking-widest mb-1">Weekly Goal</p>
                    <p className="text-[13px] font-bold text-[#181c22] dark:text-white">18/25 Tasks</p>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div className="w-[72%] h-full bg-[#006493] dark:bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-50 dark:border-slate-800/60">
                  <p className="text-[9px] font-bold text-[#64748b] dark:text-slate-500 uppercase tracking-widest mb-4">Activity Trend</p>
                  
                  <div className="flex items-end justify-between gap-1.5 h-12 px-1">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-[4px] h-[40%] hover:bg-[#c4c0ff] transition-colors cursor-pointer"></div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-[4px] h-[60%] hover:bg-[#c4c0ff] transition-colors cursor-pointer"></div>
                    <div className="w-full bg-[#c4c0ff] dark:bg-indigo-900/40 rounded-t-[4px] h-[90%] hover:bg-[#3713ec] transition-colors cursor-pointer"></div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-[4px] h-[50%] hover:bg-[#c4c0ff] transition-colors cursor-pointer"></div>
                    <div className="w-full bg-[#3713ec] dark:bg-indigo-500 rounded-t-lg h-[100%] shadow-[0_0_10px_rgba(51,4,233,0.3)] cursor-pointer"></div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-[4px] h-[30%] hover:bg-[#c4c0ff] transition-colors cursor-pointer"></div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-[4px] h-[20%] hover:bg-[#c4c0ff] transition-colors cursor-pointer"></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Mon</span>
                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Tue</span>
                    <span className="text-[8px] font-bold text-[#c4c0ff] dark:text-indigo-400 uppercase tracking-wider">Wed</span>
                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Thu</span>
                    <span className="text-[8px] font-bold text-[#3713ec] dark:text-indigo-500 uppercase tracking-wider">Fri</span>
                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Sat</span>
                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-wider">Sun</span>
                  </div>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ── Task Creation Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Panel */}
          <div className="relative bg-white dark:bg-[#1e293b] w-full max-w-md rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 sm:p-10 animate-in zoom-in-95 fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#181c22] dark:text-white tracking-tight">Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors shrink-0 outline-none">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Task Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. History Essay Draft" 
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#006493] focus:ring-1 focus:ring-[#006493] transition-all text-[#181c22] dark:text-white placeholder-slate-400" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                  autoFocus
                />
              </div>

              {/* Description (Static UI for demo) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Description <span className="text-slate-400 font-normal normal-case">(optional)</span></label>
                <textarea 
                  placeholder="Add details, links, or notes..." 
                  rows={2} 
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#006493] focus:ring-1 focus:ring-[#006493] transition-all resize-none text-[#181c22] dark:text-white placeholder-slate-400"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Subject</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-bold text-[#181c22] dark:text-white focus:outline-none focus:border-[#006493] transition-all appearance-none pr-10 hover:border-slate-300" 
                      value={newTask.course} 
                      onChange={(e) => setNewTask({...newTask, course: e.target.value})}
                    >
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="General">General</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                
                {/* Priority */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Priority</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-bold text-[#181c22] dark:text-white focus:outline-none focus:border-[#006493] transition-all appearance-none pr-10 hover:border-slate-300" 
                      value={newTask.priority} 
                      onChange={(e: any) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <option value="high">High (!)</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-bold text-[#181c22] dark:text-white focus:outline-none focus:border-[#006493] transition-all hover:border-slate-300" 
                    value={newTask.date} 
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})} 
                  />
                </div>
                {/* Time */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Time</label>
                  <input 
                    type="time" 
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-sm font-bold text-[#181c22] dark:text-white focus:outline-none focus:border-[#006493] transition-all hover:border-slate-300" 
                    value={newTask.time} 
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex-[0.8] px-5 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-2xl text-sm transition-colors outline-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTask} 
                disabled={!newTask.title.trim()}
                className="flex-1 px-5 py-4 bg-[#006493] hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-[#006493]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">add_task</span>
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
