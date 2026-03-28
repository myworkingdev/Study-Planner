/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Timer, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Play, 
  RotateCcw, 
  SkipForward, 
  Flame, 
  ChevronRight, 
  BookOpen, 
  History, 
  Languages, 
  Plus, 
  Quote,
  CheckCircle2,
  Droplets,
  Trees,
  Waves,
  Volume2,
  VolumeX,
  ExternalLink,
  Award,
  Zap,
  Lock,
  MoreHorizontal,
  Verified,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'dashboard' | 'focus' | 'tasks' | 'analytics';

interface Task {
  id: string;
  title: string;
  subtitle: string;
  priority: 'high' | 'medium' | 'low';
  category: 'study' | 'assignment' | 'exam';
  due: string;
  completed: boolean;
  urgent?: boolean;
}

// --- Mock Data ---

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Advanced Calculus: Practice Test 4',
    subtitle: 'Chapter 4: Integration Techniques',
    priority: 'high',
    category: 'exam',
    due: 'Due tomorrow, 10:00 AM',
    completed: false
  },
  {
    id: '2',
    title: 'History Essay Draft',
    subtitle: 'Industrial Revolution Impact',
    priority: 'medium',
    category: 'assignment',
    due: 'Friday, April 12',
    completed: false
  },
  {
    id: '3',
    title: 'Anatomy Lab Report',
    subtitle: 'Due tomorrow by 10:00 PM',
    priority: 'high',
    category: 'assignment',
    due: 'Tonight, 11:59 PM',
    completed: false,
    urgent: true
  },
  {
    id: '4',
    title: 'Review Bio-Chemistry Chapter 8',
    subtitle: 'Metabolic Pathways',
    priority: 'low',
    category: 'study',
    due: 'April 15, 2024',
    completed: false
  }
];

const HISTORY = [
  { id: 'h1', title: 'Advanced Calculus', time: 'Today • 2:45 PM', duration: '90m', xp: '+120 XP', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'h2', title: 'Organic Chemistry', time: 'Yesterday • 10:15 AM', duration: '45m', xp: '+60 XP', icon: History, color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 'h3', title: 'French Vocabulary', time: 'Oct 24 • 4:30 PM', duration: '25m', xp: '+35 XP', icon: Languages, color: 'text-tertiary', bg: 'bg-tertiary/10' },
];

const ACHIEVEMENTS = [
  { id: 'a1', title: 'EARLY BIRD', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50', locked: false },
  { id: 'a2', title: 'DEEP WORK', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50', locked: false },
  { id: 'a3', title: '7-DAY WARRIOR', icon: Award, color: 'text-rose-500', bg: 'bg-rose-50', locked: false },
  { id: 'a4', title: 'NIGHT OWL', icon: Lock, color: 'text-outline', bg: 'bg-surface-container-low', locked: true },
  { id: 'a5', title: 'CONQUEROR', icon: Lock, color: 'text-outline', bg: 'bg-surface-container-low', locked: true },
];

// --- Components ---

const TopBar = () => (
  <header className="fixed top-0 w-full z-50 glass-nav shadow-sm shadow-primary/5 flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden transition-transform active:scale-90">
        <img 
          src="https://picsum.photos/seed/student/100/100" 
          alt="Profile" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="font-headline font-extrabold text-primary text-lg tracking-tight">Study Planner</span>
    </div>
    <button className="text-outline hover:text-primary transition-colors active:scale-90">
      <Settings size={24} />
    </button>
  </header>
);

const BottomNav = ({ activeView, setView }: { activeView: View, setView: (v: View) => void }) => {
  const navItems: { id: View; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'focus', label: 'Focus', icon: Timer },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 glass-nav rounded-t-3xl z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all duration-300 active:scale-95 ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-outline hover:text-primary/60'
            }`}
          >
            <Icon size={24} fill={isActive ? "currentColor" : "none"} />
            <span className="font-label font-medium text-[10px] uppercase tracking-wider mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const DashboardView = ({ setView }: { setView: (v: View) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }}
    className="space-y-10"
  >
    <section className="mt-8">
      <h1 className="text-4xl font-headline font-bold text-on-surface leading-tight tracking-tight max-w-2xl">
        Success is the sum of small efforts, repeated day in and day out.
      </h1>
      <p className="mt-4 text-on-surface-variant font-body text-lg opacity-70">Welcome back. Your academic sanctuary is ready.</p>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Focus Card */}
      <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-8 relative overflow-hidden group shadow-sm border border-outline-variant/10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Timer size={120} className="rotate-12 transition-transform group-hover:rotate-0" />
        </div>
        <div className="relative z-10 space-y-6">
          <header className="flex flex-col gap-1">
            <span className="text-primary font-label font-bold text-sm tracking-[0.15em] uppercase">Today's Focus Goal</span>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface">Focus for 4 hours today</h2>
          </header>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-headline font-bold text-primary">02</span>
            <span className="text-2xl font-headline font-medium text-on-surface-variant mb-2">/ 04 hrs</span>
          </div>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-container w-1/2 rounded-full"></div>
          </div>
          <div className="pt-4">
            <button 
              onClick={() => setView('focus')}
              className="inline-flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-2xl font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
            >
              <Play size={24} fill="currentColor" />
              Start Focus session
            </button>
          </div>
        </div>
      </div>

      {/* Daily Streak */}
      <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-sm border border-outline-variant/10">
        <span className="text-on-surface-variant font-label font-bold text-xs tracking-widest uppercase">Daily Streak</span>
        <div className="py-6">
          <div className="relative inline-block">
            <Flame size={80} className="text-secondary" fill="currentColor" />
            <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full"></div>
          </div>
          <div className="text-6xl font-headline font-extrabold text-on-surface mt-2">12</div>
          <div className="text-on-surface-variant font-medium">Days of deep work</div>
        </div>
        <div className="text-sm text-secondary font-medium bg-secondary-container/30 px-4 py-2 rounded-full">
          Top 5% of students
        </div>
      </div>

      {/* Today's Priority */}
      <div className="md:col-span-7 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-headline font-bold text-2xl text-on-surface">Today's Priority</h3>
          <button onClick={() => setView('tasks')} className="text-primary font-label font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {INITIAL_TASKS.slice(0, 3).map(task => (
            <div key={task.id} className="group flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl transition-all hover:translate-x-1 shadow-sm border border-outline-variant/5">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors cursor-pointer"></div>
                <div>
                  <h4 className="font-body font-semibold text-on-surface">{task.title}</h4>
                  <p className="text-xs text-on-surface-variant">{task.subtitle}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-outline-variant group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Insights */}
      <div className="md:col-span-5 bg-tertiary-container/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative border border-tertiary/10">
        <div className="relative z-10">
          <span className="text-tertiary font-label font-bold text-xs tracking-widest uppercase">Weekly Insights</span>
          <h3 className="text-2xl font-headline font-bold text-on-surface mt-2">Steady Progress</h3>
        </div>
        <div className="relative z-10 py-6 flex items-end gap-1 h-32">
          {[40, 60, 55, 80, 95, 30, 10].map((h, i) => (
            <div 
              key={i} 
              className={`w-full rounded-t-lg transition-all duration-500 ${i === 4 ? 'bg-tertiary' : 'bg-tertiary/20'}`} 
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
        <div className="relative z-10">
          <p className="text-sm text-on-surface-variant font-body">Your concentration peak is between <span className="font-bold text-tertiary">9 AM - 11 AM</span>.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const FocusView = ({ key }: { key?: string }) => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins
  const [isActive, setIsActive] = useState(false);
  const [atmosphere, setAtmosphere] = useState('nature');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((1500 - timeLeft) / 1500) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-2xl mx-auto space-y-10"
    >
      <section className="text-center space-y-2 mt-8">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Focus Session</span>
        <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Deep Work Flow</h2>
      </section>

      <section className="relative flex flex-col items-center justify-center py-8">
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-2xl shadow-primary/5 border border-outline-variant/5">
          <svg className="absolute w-full h-full p-2 -rotate-90" viewBox="0 0 100 100">
            <circle className="text-surface-container-high" cx="50" cy="50" fill="transparent" r="46" stroke="currentColor" strokeWidth="3" />
            <circle 
              className="text-primary transition-all duration-1000" 
              cx="50" cy="50" fill="transparent" r="46" 
              stroke="currentColor" strokeWidth="3" 
              strokeDasharray="289" 
              strokeDashoffset={289 - (289 * progress) / 100} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="text-center z-10">
            <div className="font-headline text-6xl font-extrabold text-on-surface tracking-tight">{formatTime(timeLeft)}</div>
            <div className="font-label text-sm text-outline font-medium tracking-widest uppercase mt-1">Minutes Left</div>
          </div>
        </div>

        <div className="flex items-center gap-8 mt-12">
          <button 
            onClick={() => { setTimeLeft(1500); setIsActive(false); }}
            className="w-14 h-14 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary/10 transition-all active:scale-90"
          >
            <RotateCcw size={28} />
          </button>
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            {isActive ? <div className="w-6 h-6 bg-white rounded-sm" /> : <Play size={40} fill="currentColor" />}
          </button>
          <button className="w-14 h-14 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary/10 transition-all active:scale-90">
            <SkipForward size={28} />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-sm font-bold text-on-surface uppercase tracking-wider">Intervals</h3>
            <Timer size={20} className="text-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-primary text-on-primary font-medium text-sm transition-all shadow-md">
              <span>Standard Pomodoro</span>
              <span className="font-bold">25/5</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-all font-medium text-sm">
              <span>Deep Concentration</span>
              <span className="font-bold">50/10</span>
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-sm font-bold text-on-surface uppercase tracking-wider">Atmosphere</h3>
            <BarChart3 size={20} className="text-primary" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'rain', label: 'Rain', icon: Droplets },
              { id: 'nature', label: 'Nature', icon: Trees },
              { id: 'white', label: 'White', icon: Waves },
            ].map(item => {
              const Icon = item.icon;
              const isSelected = atmosphere === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setAtmosphere(item.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                    isSelected ? 'bg-secondary-container text-secondary ring-1 ring-secondary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon size={20} fill={isSelected ? "currentColor" : "none"} />
                  <span className="text-[10px] font-bold uppercase">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 px-1">
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
              <div className="h-full w-2/3 bg-primary rounded-full"></div>
            </div>
            <div className="flex justify-between mt-2">
              <VolumeX size={12} className="text-outline" />
              <Volume2 size={12} className="text-outline" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 p-5 rounded-3xl flex items-center gap-4 border border-primary/10">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
          <BookOpen size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Current Goal</div>
          <div className="text-sm font-semibold text-on-surface">Advanced Thermodynamics Thesis</div>
        </div>
        <button className="p-2 text-outline-variant hover:text-primary transition-colors">
          <ExternalLink size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const TasksView = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="space-y-10"
  >
    <section className="mt-8">
      <h2 className="font-headline font-bold text-4xl text-on-surface tracking-tight mb-2">My Tasks</h2>
      <div className="flex items-center gap-4">
        <p className="font-body text-on-surface-variant text-sm">7 items remaining for this week</p>
        <div className="h-[1px] flex-grow bg-outline-variant opacity-20"></div>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-primary">April 2024</span>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
        <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant block mb-2">High Priority</span>
        <div className="flex items-end justify-between">
          <span className="font-headline font-extrabold text-3xl text-error">03</span>
          <AlertCircle size={24} className="text-error opacity-50" />
        </div>
      </div>
      <div className="bg-primary text-on-primary p-6 rounded-2xl shadow-xl shadow-primary/20 bg-gradient-to-br from-primary to-primary-container">
        <span className="font-label text-[10px] uppercase tracking-wider text-on-primary/70 block mb-2">Focus Session</span>
        <div className="flex items-end justify-between">
          <span className="font-headline font-extrabold text-3xl">45m</span>
          <Timer size={24} />
        </div>
      </div>
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
        <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant block mb-2">Completion</span>
        <div className="flex items-end justify-between">
          <span className="font-headline font-extrabold text-3xl text-secondary">68%</span>
          <BarChart3 size={24} className="text-secondary opacity-50" />
        </div>
      </div>
    </div>

    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {['All Tasks', 'Study', 'Assignments', 'Exam Prep'].map((filter, i) => (
        <button 
          key={filter}
          className={`px-5 py-2 rounded-full font-label text-xs font-semibold whitespace-nowrap transition-colors ${
            i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    <div className="space-y-3">
      {INITIAL_TASKS.map(task => (
        <div key={task.id} className="group bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md hover:translate-x-1 border border-transparent hover:border-primary/5 shadow-sm">
          <div className={`w-1.5 h-12 rounded-full shrink-0 ${
            task.priority === 'high' ? 'bg-error' : task.priority === 'medium' ? 'bg-secondary' : 'bg-outline-variant'
          }`}></div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                task.priority === 'high' ? 'bg-error/10 text-error' : task.priority === 'medium' ? 'bg-secondary/10 text-secondary' : 'bg-surface-container-highest text-on-surface-variant'
              }`}>
                {task.priority}
              </span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
                {task.category}
              </span>
            </div>
            <h3 className="font-body font-semibold text-on-surface">{task.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
                <Timer size={14} />
                {task.due}
              </span>
              {task.urgent && (
                <span className="flex items-center gap-1 text-[11px] text-error font-bold">
                  <AlertCircle size={14} />
                  Urgent
                </span>
              )}
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-outline hover:text-primary transition-colors">
            <CheckCircle2 size={24} />
          </button>
        </div>
      ))}
    </div>

    <div className="mt-12 bg-surface-container-low p-8 rounded-[2.5rem] relative overflow-hidden text-center border border-white/40">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <Quote size={40} className="text-secondary mx-auto mb-4 opacity-40" />
      <p className="font-headline font-semibold text-on-surface text-lg leading-relaxed italic">
        "Productivity is being able to do things that you were never able to do before."
      </p>
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mt-4">— Franz Kafka</p>
    </div>

    <button className="fixed bottom-32 right-6 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center active:scale-90 transition-transform z-50">
      <Plus size={32} />
    </button>
  </motion.div>
);

const AnalyticsView = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }}
    className="space-y-10"
  >
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.2em] opacity-80">Current Momentum</span>
            <h1 className="font-headline text-4xl font-extrabold mt-2">12 Day Streak</h1>
            <p className="font-body text-sm mt-2 opacity-90 max-w-xs">You're in the top 5% of learners this week. Keep the fire burning!</p>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Flame size={20} fill="currentColor" />
            </div>
            <div className="flex -space-x-2">
              {['M', 'T', 'W'].map((day, i) => (
                <div key={day} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  i === 2 ? 'border-white bg-white text-primary' : 'border-primary bg-surface-container-highest text-primary'
                }`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-center space-y-6 shadow-sm border border-outline-variant/10">
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-outline">Total Focus</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline text-3xl font-bold text-on-surface">148</span>
            <span className="text-sm font-medium text-outline">hours</span>
          </div>
        </div>
        <div className="h-px bg-surface-container-high"></div>
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-outline">Rank</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline text-3xl font-bold text-secondary">Elite II</span>
            <Verified size={16} className="text-secondary" fill="currentColor" />
          </div>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="font-headline text-xl font-bold text-on-surface">Weekly Commitment</h3>
            <p className="font-body text-sm text-outline">Comparison of daily study sessions</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-surface-container text-[10px] font-bold uppercase tracking-wider rounded-full text-on-surface-variant">Daily</span>
            <span className="px-3 py-1 bg-primary text-[10px] font-bold uppercase tracking-wider rounded-full text-on-primary">Weekly</span>
          </div>
        </div>
        <div className="flex items-end justify-between h-48 gap-4 px-2">
          {[40, 65, 90, 50, 75, 30, 20].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-full group">
              <div 
                className={`w-full rounded-t-xl relative transition-all duration-500 ${i === 2 ? 'bg-primary' : 'bg-surface-container-high group-hover:bg-primary/20'}`} 
                style={{ height: `${h}%` }}
              >
                {i === 2 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">6.5h</div>
                )}
              </div>
              <span className={`font-label text-[10px] ${i === 2 ? 'text-on-surface font-bold' : 'text-outline'}`}>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-8 flex flex-col items-center justify-between text-center border border-white/50 shadow-sm">
        <h3 className="font-headline text-lg font-bold">Task Velocity</h3>
        <div className="relative w-32 h-32 flex items-center justify-center my-6">
          <svg className="w-full h-full -rotate-90">
            <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
            <circle className="text-secondary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="100" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline text-2xl font-bold">72%</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-body text-sm font-medium">Almost there!</p>
          <p className="font-body text-xs text-outline-variant">8 tasks left for today</p>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold">Focus History</h3>
          <button className="text-primary font-label text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">View All</button>
        </div>
        <div className="space-y-3">
          {HISTORY.map(item => (
            <div key={item.id} className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group hover:shadow-lg hover:shadow-primary/5 transition-all border border-outline-variant/5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-on-surface">{item.title}</h4>
                  <p className="text-[10px] font-label text-outline uppercase tracking-wider">{item.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline font-bold text-on-surface">{item.duration}</span>
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">{item.xp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold">Achievements</h3>
          <span className="font-label text-xs text-outline">12 / 48 Unlocked</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {ACHIEVEMENTS.map(badge => (
            <div key={badge.id} className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-sm border ${
              badge.locked ? 'bg-surface-container-low grayscale opacity-40 border-dashed border-outline-variant' : 'bg-white border-slate-50'
            }`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.bg} ${badge.color}`}>
                <badge.icon size={24} fill={!badge.locked ? "currentColor" : "none"} />
              </div>
              <span className="font-label text-[10px] font-bold leading-tight">{badge.title}</span>
            </div>
          ))}
          <div className="aspect-square bg-primary/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center space-y-1 border border-primary/10">
            <MoreHorizontal size={24} className="text-primary" />
            <span className="font-label text-[10px] font-bold text-primary">SEE MORE</span>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen pb-32">
      <TopBar />
      
      <main className="max-w-5xl mx-auto px-6 pt-24">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && <DashboardView key="dashboard" setView={setView} />}
          {view === 'focus' && <FocusView key="focus" />}
          {view === 'tasks' && <TasksView key="tasks" />}
          {view === 'analytics' && <AnalyticsView key="analytics" />}
        </AnimatePresence>
      </main>

      <BottomNav activeView={view} setView={setView} />
    </div>
  );
}
