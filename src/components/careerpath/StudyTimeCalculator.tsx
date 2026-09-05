import React, { useEffect, useRef, useState } from 'react';
import { Clock3, RotateCcw, Play, Pause, BellRing } from 'lucide-react';
import { addActivityTime, formatActivityTime, getActivityTime } from '../../utils/activityTimeTracker';

function beep(frequency = 880, duration = 0.18) {
  try {
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextCtor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export const StudyTimeCalculator: React.FC = () => {
  const [activity, setActivity] = useState(getActivityTime());
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setActivity(getActivityTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      addActivityTime('time-calculator', 1);
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          setCompleted(true);
          beep(1046, 0.35);
          window.setTimeout(() => beep(1318, 0.35), 180);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const toggle = () => {
    if (!running) {
      setCompleted(false);
      beep(660, 0.16);
    }
    setRunning((v) => !v);
  };

  const reset = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    setCompleted(false);
    setSecondsLeft(60 * 60);
  };

  const total = activity.resources + activity.chatbot + activity['merit-calculator'] + activity['time-calculator'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-sky-400" /> Focus Timer
          </h3>
          <p className="text-[10px] text-slate-500 mt-1">Starts with a beep and rings when the focus session ends.</p>
        </div>
        <button onClick={reset} className="p-2 text-slate-500 hover:text-white" title="Reset timer"><RotateCcw className="w-4 h-4" /></button>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
        <div className="text-4xl font-black font-mono text-white">{formatActivityTime(secondsLeft)}</div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">60-minute focus session</p>
        {completed && <div className="mt-3 text-xs text-emerald-300 flex justify-center items-center gap-1"><BellRing className="w-3.5 h-3.5" /> Session complete</div>}
        <button onClick={toggle} className={`mt-4 px-5 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-2 ${running ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300' : 'bg-sky-500 text-slate-950'}`}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause Focus' : 'Start Focus'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        <TimeItem label="Resources" value={activity.resources} />
        <TimeItem label="AI Chatbot" value={activity.chatbot} />
        <TimeItem label="Merit" value={activity['merit-calculator']} />
        <TimeItem label="Focus Timer" value={activity['time-calculator']} />
      </div>
      <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500">Tracked feature time</span>
        <strong className="text-sm text-emerald-400">{formatActivityTime(total)}</strong>
      </div>
    </div>
  );
};

const TimeItem = ({ label, value }: { label: string; value: number }) => (
  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
    <div className="text-[10px] text-slate-500">{label}</div>
    <div className="text-sm font-bold text-white mt-1">{formatActivityTime(value)}</div>
  </div>
);
