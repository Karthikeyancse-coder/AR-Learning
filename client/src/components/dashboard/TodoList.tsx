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
    title: "Review Cellular Biology AR Model",
    course: "Biology",
    dueDate: "Today, 5:00 PM",
    completed: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Complete Acid-Base Reaction Quiz",
    course: "Chemistry",
    dueDate: "Tomorrow",
    completed: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Read Chapter 4: Human Anatomy",
    course: "Biology",
    dueDate: "Oct 24",
    completed: false,
    priority: "low",
  },
  {
    id: "4",
    title: "Submit Mid-term General Assignment",
    course: "General",
    dueDate: "Oct 15",
    completed: true,
    priority: "high",
  },
];

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  const handleToggle = (id: string) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      course: "General",
      dueDate: "Upcoming",
      completed: false,
      priority: "medium",
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20";
      case "medium": return "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20";
      case "low": return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20";
      default: return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getCourseColor = (course: string) => {
    switch (course) {
      case "Biology": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
      case "Chemistry": return "text-sky-500 bg-sky-50 dark:bg-sky-500/10";
      default: return "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase" style={{ letterSpacing: "-0.025em" }}>
            My <span className="font-normal text-slate-400">TO-DO LIST</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl text-base">
            Stay on top of your assignments, quizzes, and AR study sessions.
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => document.getElementById('new-task-input')?.focus()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#006493] dark:bg-blue-600 hover:bg-[#004e75] dark:hover:bg-blue-500 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Task
        </button>
      </div>

      {/* ── Stats Overview ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Tasks</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400 text-2xl">format_list_bulleted</span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Pending</p>
            <p className="text-3xl font-black text-amber-500">{stats.pending}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-500 text-2xl">pending_actions</span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Completed</p>
            <p className="text-3xl font-black text-emerald-500">{stats.completed}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-500 text-2xl">task_alt</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ──────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">
        
        {/* Filters & Add Task */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-transparent flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl inline-flex self-start">
            {[ 
              { id: 'all', label: 'All Tasks' }, 
              { id: 'pending', label: 'Pending' }, 
              { id: 'completed', label: 'Completed' } 
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  filter === tab.id 
                    ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddTask} className="flex flex-1 max-w-md relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">add_task</span>
            <input
              id="new-task-input"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006493] dark:focus:ring-blue-500 transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </form>
        </div>

        {/* Task List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">done_all</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-2">You're all caught up!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                No {filter !== 'all' ? filter : ''} tasks found. Take a break or explore the AR library for new modules.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-5 flex items-start sm:items-center gap-4 group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${
                  task.completed ? "opacity-75" : ""
                }`}
              >
                <button 
                  onClick={() => handleToggle(task.id)}
                  className={`mt-1 sm:mt-0 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    task.completed 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "border-slate-300 dark:border-slate-600 group-hover:border-[#006493] dark:group-hover:border-blue-400"
                  }`}
                >
                  {task.completed && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-base font-semibold mb-1 truncate transition-all ${
                    task.completed ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-800 dark:text-white group-hover:text-[#006493] dark:group-hover:text-blue-400"
                  }`}>
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`px-2 py-0.5 rounded-md font-bold ${getCourseColor(task.course)}`}>
                      {task.course}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 min-w-0 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100 hidden sm:block p-2">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
