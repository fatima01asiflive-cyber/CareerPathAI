import React, { useEffect, useState } from 'react';
import { IntelliPathLogo } from './IntelliPathLogo';

interface AppUpdateModalProps {
  isOpen: boolean;
  onComplete?: () => void;
  title?: string;
  subtitle?: string;
}

export const AppUpdateModal: React.FC<AppUpdateModalProps> = ({
  isOpen,
  title = 'Updating IntelliPath',
  subtitle = 'Logging out current session, purging cache, and reloading newly...',
}) => {
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState('Checking new assets...');

  useEffect(() => {
    if (!isOpen) {
      setProgress(15);
      return;
    }

    const t1 = setTimeout(() => {
      setProgress(45);
      setStage('Purging cached session state...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(75);
      setStage('Signing out user session safely...');
    }, 800);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStage('Reloading application newly...');
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Animated Brand Identity */}
        <div className="flex justify-center">
          <div className="animate-pulse">
            <IntelliPathLogo size="xl" variant="stacked" />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span className="text-sky-400 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              {stage}
            </span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-mono">
          Please wait while the fresh application bundle initializes.
        </p>
      </div>
    </div>
  );
};
