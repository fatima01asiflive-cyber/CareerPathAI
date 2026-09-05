import React, { useState } from 'react';
import { TabType } from '../types';

interface CareerLadderViewProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

interface CareerStage {
  level: string;
  title: string;
  experience: string;
  salaryPKR: string;
  salaryUSD: string;
  timeToPromote: string;
  icon: string;
  badgeColor: string;
  description: string;
  coreResponsibilities: string[];
  keyMilestonesToAdvance: string[];
}

const CAREER_LADDER_STAGES: CareerStage[] = [
  {
    level: 'Stage 0',
    title: 'University Graduate / Final Year Student',
    experience: '0 Years',
    salaryPKR: 'PKR 0 (Academic Project Phase)',
    salaryUSD: '$0',
    timeToPromote: '3 - 6 Months',
    icon: 'school',
    badgeColor: 'from-blue-500 to-cyan-600',
    description:
      'Mastering theoretical fundamentals (Data Structures, Algorithms, DBMS, Operating Systems, Linear Algebra) and completing production-grade Capstone portfolio projects.',
    coreResponsibilities: [
      'Build 2-3 full-stack / AI deployed projects with public GitHub repositories',
      'Solve 150+ LeetCode / HackerRank DSA challenges',
      'Maintain strong academic CGPA and participate in national hackathons (SOFTEC, Procom, NASCON)',
    ],
    keyMilestonesToAdvance: [
      'ATS-optimized resume ready with verified portfolio links',
      'Pass technical mock interviews with 80%+ confidence rating',
    ],
  },
  {
    level: 'Stage 1',
    title: 'Software / AI Engineering Intern',
    experience: '0 - 6 Months',
    salaryPKR: 'PKR 45,000 - 85,000 / mo',
    salaryUSD: '$300 - $600 / mo',
    timeToPromote: '3 - 6 Months',
    icon: 'start',
    badgeColor: 'from-emerald-500 to-teal-600',
    description:
      'Onboarding into professional engineering teams, getting familiar with production codebases, ticket management (Jira), and CI/CD pipelines.',
    coreResponsibilities: [
      'Implement bug fixes, write unit tests, and submit clean pull requests',
      'Shadow senior engineers during system architecture and code review sessions',
      'Learn deployment workflows using Docker, staging environments, and Git branching strategies',
    ],
    keyMilestonesToAdvance: [
      'Independent feature delivery without requiring constant unblocking',
      'Consistent code reviews with zero critical security or performance regressions',
    ],
  },
  {
    level: 'Stage 2',
    title: 'Junior Software Engineer / Associate AI Engineer',
    experience: '1 - 2 Years',
    salaryPKR: 'PKR 120,000 - 220,000 / mo',
    salaryUSD: '$1,200 - $2,500 / mo ($15k - $30k/yr)',
    timeToPromote: '1.5 - 2 Years',
    icon: 'laptop_chromebook',
    badgeColor: 'from-indigo-500 to-purple-600',
    description:
      'Autonomous contributor owning end-to-end user-facing features, REST/GraphQL APIs, database queries, and async background workers.',
    coreResponsibilities: [
      'Design modular components with type-safe interfaces and robust error handling',
      'Optimize database queries, indexes, and caching layers (Redis)',
      'Participate in on-call triage and resolve production bugs swiftly',
    ],
    keyMilestonesToAdvance: [
      'Lead a minor project release from design document to production rollout',
      'Proactively mentor incoming interns and contribute to engineering wiki docs',
    ],
  },
  {
    level: 'Stage 3',
    title: 'Mid-Level Software Engineer / ML Practitioner',
    experience: '2 - 4 Years',
    salaryPKR: 'PKR 250,000 - 450,000 / mo',
    salaryUSD: '$3,000 - $5,500 / mo ($40k - $70k/yr)',
    timeToPromote: '2 - 3 Years',
    icon: 'terminal',
    badgeColor: 'from-purple-500 to-pink-600',
    description:
      'Subject matter expert taking technical ownership of entire microservice domains, data pipelines, and infrastructure integrations.',
    coreResponsibilities: [
      'Architect resilient, decoupled microservices with high availability',
      'Drive performance optimizations (profiling flamegraphs, memory leaks, latency percentiles)',
      'Conduct rigorous code reviews and enforce architectural best practices',
    ],
    keyMilestonesToAdvance: [
      'Design a distributed system handling high concurrent traffic with 99.9% uptime SLA',
      'Successfully balance technical debt reduction with business roadmap deliveries',
    ],
  },
  {
    level: 'Stage 4',
    title: 'Senior Software Engineer / AI Lead',
    experience: '4 - 7 Years',
    salaryPKR: 'PKR 500,000 - 900,000 / mo',
    salaryUSD: '$6,000 - $12,000 / mo ($75k - $145k/yr)',
    timeToPromote: '3+ Years',
    icon: 'workspace_premium',
    badgeColor: 'from-amber-500 to-orange-600',
    description:
      'High-leverage engineering leader influencing multi-team architecture, cloud infrastructure, tech stack decisions, and mentoring engineers.',
    coreResponsibilities: [
      'Author foundational RFCs (Request for Comments) on system architecture and scalability',
      'Lead cross-functional sprints with product managers, designers, and DevOps engineers',
      'Set engineering standards for testing, security compliance (SOC2/GDPR), and observability',
    ],
    keyMilestonesToAdvance: [
      'Demonstrated multi-million dollar business impact or critical system migration with zero downtime',
      'Track record of growing junior and mid-level engineers into independent leads',
    ],
  },
  {
    level: 'Stage 5',
    title: 'Tech Lead / Staff Software Engineer',
    experience: '7 - 10 Years',
    salaryPKR: 'PKR 900,000 - 1,500,000 / mo',
    salaryUSD: '$12,000 - $18,000 / mo ($145k - $220k/yr)',
    timeToPromote: 'Strategic / Executive Track',
    icon: 'hub',
    badgeColor: 'from-red-500 to-rose-600',
    description:
      'Strategic architect bridging high-level corporate vision with complex distributed engineering systems across multiple product lines.',
    coreResponsibilities: [
      'Define 3-year technical roadmap and technology radar for the organization',
      'Resolve organization-wide bottlenecks in developer productivity, cloud costs, and reliability',
      'Represent the engineering department in investor pitches and client architecture audits',
    ],
    keyMilestonesToAdvance: [
      'Architected company-wide core platform adopted across dozens of services',
      'Established culture of engineering excellence, psychological safety, and innovation',
    ],
  },
  {
    level: 'Stage 6',
    title: 'Engineering Manager / Principal Architect / CTO',
    experience: '10+ Years',
    salaryPKR: 'PKR 1,500,000 - 3,000,000+ / mo',
    salaryUSD: '$200,000 - $350,000+ / yr',
    timeToPromote: 'Executive Peak',
    icon: 'crown',
    badgeColor: 'from-yellow-400 to-amber-600',
    description:
      'Executive organizational leader setting technology vision, scaling global engineering divisions, allocating multi-million dollar budgets, and steering company strategy.',
    coreResponsibilities: [
      'Own total engineering budget, compensation bands, and global talent acquisition',
      'Direct strategic R&D in AI, cloud infrastructure, and proprietary intellectual property',
      'Report directly to CEO and Board of Directors on tech risk, uptime, and innovation velocity',
    ],
    keyMilestonesToAdvance: [
      'Industry-recognized technology leadership and enterprise-scale track record',
    ],
  },
];

export const CareerLadderView: React.FC<CareerLadderViewProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  const [selectedStage, setSelectedStage] = useState<CareerStage>(CAREER_LADDER_STAGES[2]); // Default Junior

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">stairs</span>
              <span>POST-GRADUATION CAREER TRAJECTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Post-Graduation Tech Career Ladder
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Understand the step-by-step career progression from Graduate to Principal Architect / CTO, including realistic Pakistan & remote global salary benchmarks, promotion timelines, and core responsibilities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Learning Roadmap</span>
            </button>
            <button
              onClick={() => onNavigate('scholarships')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">card_giftcard</span>
              <span>Scholarships</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Trajectory Flow */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex items-center gap-3 min-w-[900px]">
          {CAREER_LADDER_STAGES.map((stage, idx) => {
            const isSelected = selectedStage.level === stage.level;
            return (
              <React.Fragment key={stage.level}>
                <div
                  onClick={() => setSelectedStage(stage)}
                  className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer space-y-2 group ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-950/80 to-slate-900 border-amber-500 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      {stage.level}
                    </span>
                    <span className="material-symbols-outlined text-sm text-white/50 group-hover:text-amber-400 transition-colors">
                      {stage.icon}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-2 leading-tight">
                    {stage.title}
                  </h4>
                  <span className="text-[10px] font-mono text-white/50 block">
                    {stage.experience}
                  </span>
                </div>

                {idx < CAREER_LADDER_STAGES.length - 1 && (
                  <span className="material-symbols-outlined text-white/30 shrink-0 text-sm">
                    arrow_forward
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* In-Depth Stage Dossier */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                {selectedStage.level}
              </span>
              <span className="text-xs font-mono text-white/60">
                Typical Experience: <strong>{selectedStage.experience}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              {selectedStage.title}
            </h2>
          </div>

          {/* Salary Badges */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-left">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                Pakistan Tech Market
              </span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-white">
                {selectedStage.salaryPKR}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-blue-950/50 border border-blue-500/30 text-left">
              <span className="text-[10px] font-mono uppercase text-blue-400 block font-bold">
                Remote Global / US Tier
              </span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-white">
                {selectedStage.salaryUSD}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-mono text-white/50 uppercase font-bold tracking-wider">
            Stage Overview
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {selectedStage.description}
          </p>
        </div>

        {/* Core Responsibilities & Promotion Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>Day-to-Day Engineering Responsibilities</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {selectedStage.coreResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-sm mt-0.5">check</span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">upgrade</span>
              <span>Key Milestones to Reach Next Promotion</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {selectedStage.keyMilestonesToAdvance.map((milestone, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">arrow_forward</span>
                  <span className="leading-relaxed">{milestone}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-xs font-mono text-white/50 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Average Time-to-Promote: {selectedStage.timeToPromote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
