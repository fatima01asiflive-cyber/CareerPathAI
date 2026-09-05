import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'sky' | 'emerald' | 'indigo' | 'purple' | 'amber';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  size = 'md',
  color = 'sky',
  showPercentage = true,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    sky: 'bg-sky-500 from-sky-500 to-cyan-400',
    emerald: 'bg-emerald-500 from-emerald-500 to-teal-400',
    indigo: 'bg-indigo-500 from-indigo-500 to-purple-400',
    purple: 'bg-purple-500 from-purple-500 to-pink-400',
    amber: 'bg-amber-500 from-amber-500 to-orange-400',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            {label && <span className="font-semibold text-slate-200">{label}</span>}
            {sublabel && <span className="text-slate-400 text-[11px]">{sublabel}</span>}
          </div>
          {showPercentage && <span className="font-bold text-sky-400">{clamped}%</span>}
        </div>
      )}

      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 ${heightClasses[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
