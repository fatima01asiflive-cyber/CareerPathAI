import React, { useEffect, useState } from 'react';

interface AlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  deadlineDate?: string;
  deadlineTime?: string;
  moduleName?: string;
  onMarkDone?: () => void;
}

export const AlarmModal: React.FC<AlarmModalProps> = ({
  isOpen,
  onClose,
  title = "Python Foundations & Algorithmic Logic Deadline",
  deadlineDate = "03/09/2026",
  deadlineTime = "10:00 PM",
  moduleName = "Month 1: Computer Science Core",
  onMarkDone,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Web Audio API synth beep
  useEffect(() => {
    if (!isOpen || !soundEnabled) return;

    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playBeep = (freq: number, delayMs: number) => {
        setTimeout(() => {
          if (ctx.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }, delayMs);
      };

      // 3 rhythmic alert beeps
      playBeep(880, 100);
      playBeep(1046.5, 300);
      playBeep(1318.5, 500);

      return () => {
        if (ctx.state !== 'closed') {
          ctx.close();
        }
      };
    } catch (e) {
      console.log('Audio playback prevented by browser policy', e);
    }
  }, [isOpen, soundEnabled]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-lg w-full bg-slate-950 border-2 border-rose-500/70 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(244,63,94,0.4)] text-white overflow-hidden">
        {/* Glowing emergency background backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Alarm Banner Header */}
        <div className="flex items-center justify-between border-b border-rose-500/30 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-extrabold uppercase tracking-widest">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span>3x/DAY URGENT DEADLINE ALARM</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white text-xs flex items-center gap-1 font-mono"
            title="Toggle Alarm Beep"
          >
            <span className="material-symbols-outlined text-base">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span>{soundEnabled ? 'Beep On' : 'Mute'}</span>
          </button>
        </div>

        {/* Main Alert Body */}
        <div className="text-center space-y-4 relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 shadow-xl shadow-rose-500/20 animate-bounce">
            <span className="material-symbols-outlined text-4xl">alarm_on</span>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold mb-2">
              CRITICAL MILESTONE DUE TODAY
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white leading-snug">
              {title}
            </h2>
            <p className="text-xs font-mono text-rose-300/80 mt-1">
              Module: <span className="text-white font-bold">{moduleName}</span>
            </p>
          </div>

          {/* Time Card Display */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-indigo-950/80 border border-rose-500/40 space-y-2 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
              ⏰ DEADLINE TARGET TIMESTAMP
            </span>
            <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-black font-mono text-white tracking-wider">
              <span>{deadlineDate}</span>
              <span className="text-rose-400">@</span>
              <span className="text-amber-400">{deadlineTime}</span>
            </div>
            <p className="text-xs text-white/70">
              Automatic study reminder #3 sent today. Complete your monthly topic to maintain your 12-day streak!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                if (onMarkDone) onMarkDone();
                onClose();
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Mark Topic as Done (AI/ML Verification)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onClose}
                className="py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">snooze</span>
                <span>Remind in 1 Hr</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-4 border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span>Dismiss Alarm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
