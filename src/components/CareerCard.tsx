import React from 'react';
import { CareerDetail } from '../utils/careerData';
import { Button } from './Button';

interface CareerCardProps {
  career: CareerDetail;
  isPrimary?: boolean;
  onSelect?: (career: CareerDetail) => void;
  onViewRoadmap?: (career: CareerDetail) => void;
  className?: string;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  career,
  isPrimary = false,
  onSelect,
  onViewRoadmap,
  className = '',
}) => {
  const demandBadgeColors = {
    'Very High': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    High: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    Moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Growing: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between p-5 md:p-6 ${
        isPrimary
          ? 'bg-gradient-to-b from-sky-950/40 via-slate-900/80 to-slate-900 border-sky-500/50 ring-1 ring-sky-500/30 shadow-xl shadow-sky-500/5'
          : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
      } ${className}`}
    >
      <div className="space-y-4">
        {/* Header Badges & Title */}
        <div className="flex items-start justify-between gap-3">
          <div>
            {isPrimary && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-2">
                <span className="material-symbols-outlined text-xs">recommend</span>
                Top Recommendation
              </span>
            )}
            <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
              {career.name}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{career.category}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl md:text-2xl font-black text-sky-400 font-mono">
              {career.matchScore}%
            </div>
            <span className="text-[10px] font-mono text-slate-400">Match Score</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {career.description}
        </p>

        {/* Demand & Details */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
              demandBadgeColors[career.demand] || demandBadgeColors.High
            }`}
          >
            Demand: {career.demand}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 text-xs font-mono">
            6-Month Roadmap
          </span>
        </div>

        {/* Key Skills Tags */}
        <div className="space-y-1.5 pt-2">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {career.requiredSkills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700/60"
              >
                {skill}
              </span>
            ))}
            {career.requiredSkills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-800/40 text-slate-400 text-[11px] font-mono">
                +{career.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-5 mt-4 border-t border-slate-800/80">
        {onSelect && (
          <Button
            variant={isPrimary ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => onSelect(career)}
            icon="visibility"
            iconPosition="left"
          >
            View Details
          </Button>
        )}
        {onViewRoadmap && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewRoadmap(career)}
            icon="alt_route"
            iconPosition="right"
          >
            View Roadmap
          </Button>
        )}
      </div>
    </div>
  );
};
