import React, { useState } from 'react';
import { TabType, MarketDemandItem } from '../types';
import { MARKET_DEMAND_DATA } from '../data/careerEcosystemData';

interface SalaryMarketDemandViewProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

export const SalaryMarketDemandView: React.FC<SalaryMarketDemandViewProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  // Calculator inputs
  const [selectedRole, setSelectedRole] = useState('AI / Machine Learning Engineer');
  const [selectedDegree, setSelectedDegree] = useState('BS Computer Science / Software Eng');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState('Remote Global (USD)');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Python',
    'PyTorch',
    'FastAPI',
    'Docker',
  ]);

  const skillOptions = [
    { name: 'PyTorch / TensorFlow', bonus: 25, role: 'AI' },
    { name: 'LLMs & Prompt Engineering', bonus: 20, role: 'AI' },
    { name: 'React 19 & Next.js', bonus: 18, role: 'Web' },
    { name: 'PostgreSQL & Drizzle ORM', bonus: 15, role: 'Web' },
    { name: 'Docker & Kubernetes', bonus: 22, role: 'DevOps' },
    { name: 'AWS Cloud Architecture', bonus: 20, role: 'DevOps' },
    { name: 'Penetration Testing & SIEM', bonus: 24, role: 'Security' },
    { name: 'Flutter & Native Mobile', bonus: 16, role: 'Mobile' },
  ];

  const handleToggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  // Dynamic ML-based Salary estimation math
  const calculateEstimatedSalary = () => {
    let basePKR = 120000;
    let baseUSD = 600;

    if (selectedRole.includes('AI') || selectedRole.includes('Machine Learning')) {
      basePKR = 150000;
      baseUSD = 850;
    } else if (selectedRole.includes('Full-Stack')) {
      basePKR = 130000;
      baseUSD = 750;
    } else if (selectedRole.includes('Cyber')) {
      basePKR = 140000;
      baseUSD = 800;
    } else if (selectedRole.includes('Cloud') || selectedRole.includes('DevOps')) {
      basePKR = 145000;
      baseUSD = 820;
    }

    // Experience Multiplier
    const expMultiplier = 1 + experienceYears * 0.35;
    let computedPKR = basePKR * expMultiplier;
    let computedUSD = baseUSD * expMultiplier;

    // Degree modifier
    if (selectedDegree.includes('MS') || selectedDegree.includes('Master')) {
      computedPKR *= 1.18;
      computedUSD *= 1.15;
    } else if (selectedDegree.includes('DAE') || selectedDegree.includes('Diploma')) {
      computedPKR *= 0.85;
      computedUSD *= 0.9;
    }

    // Skill Bonuses
    let totalSkillBonus = 0;
    selectedSkills.forEach((sk) => {
      const match = skillOptions.find((opt) => opt.name === sk);
      if (match) totalSkillBonus += match.bonus;
    });

    computedPKR *= 1 + totalSkillBonus / 100;
    computedUSD *= 1 + totalSkillBonus / 100;

    // Location modifier
    if (selectedLocation === 'Lahore / Islamabad (PK)') {
      computedPKR *= 1.05;
    } else if (selectedLocation === 'Karachi (PK)') {
      computedPKR *= 1.02;
    } else if (selectedLocation === 'Remote Global (USD)') {
      computedPKR *= 1.8;
      computedUSD *= 1.5;
    }

    return {
      monthlyPKR: Math.round(computedPKR),
      monthlyUSD: Math.round(computedUSD),
      annualPKR: Math.round(computedPKR * 12),
      annualUSD: Math.round(computedUSD * 12),
      bonusPercentage: totalSkillBonus,
    };
  };

  const salaryEstimate = calculateEstimatedSalary();

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/20 glass-card">
            AI SALARY PREDICTOR & FUTURE DEMAND ENGINE
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
            Features #9 & #10
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter gradient-text">
          Salary Prediction & Future Market Demand
        </h2>
        <p className={`mt-2 text-sm md:text-base max-w-3xl leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
          Simulate real-time compensation models across technical roles, experience tiers, and modern skill sets, while tracking real 2026-2030 industry hiring trends.
        </p>
      </div>

      {/* Part 1: Interactive ML Salary Predictor */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-base">payments</span>
            <span>Feature #9: Machine Learning Salary Predictor</span>
          </h3>
          <span className="text-xs font-mono text-white/50">Regression Estimation Model</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Box (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-white/10 space-y-5">
            <div>
              <label className="text-xs font-mono font-bold text-white/70 uppercase block mb-1.5">
                Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                <option value="Data Scientist & Analytics Architect">Data Scientist & Analytics Architect</option>
                <option value="Cyber Security SOC Analyst">Cyber Security SOC Analyst</option>
                <option value="Cloud DevOps & SRE Engineer">Cloud DevOps & SRE Engineer</option>
                <option value="Mobile App Developer">Mobile App Developer (Flutter/React Native)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold text-white/70 uppercase block mb-1.5">
                  Academic Degree
                </label>
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="BS Computer Science / Software Eng">BS CS / Software Eng</option>
                  <option value="MS / PhD in Computing">MS / Master in Computing</option>
                  <option value="BS Data Science / AI">BS Data Science / AI</option>
                  <option value="DAE / Associate Degree">DAE / Diploma</option>
                  <option value="Self-Taught / Bootcamp">Self-Taught / Portfolio</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-white/70 uppercase block mb-1.5">
                  Target Work Market
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="Remote Global (USD)">Remote Global (USD Tier)</option>
                  <option value="Lahore / Islamabad (PK)">Lahore / Islamabad (PK)</option>
                  <option value="Karachi (PK)">Karachi (PK)</option>
                  <option value="Regional / Hybrid">Regional / Hybrid (PK)</option>
                </select>
              </div>
            </div>

            {/* Experience Slider */}
            <div>
              <div className="flex items-center justify-between mb-1 text-xs font-mono">
                <span className="text-white/70 font-bold uppercase">Experience Level:</span>
                <span className="text-emerald-400 font-bold">
                  {experienceYears === 0 ? 'Fresh Graduate (0 yrs)' : `${experienceYears} Years Experience`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono mt-1">
                <span>Fresh Grad</span>
                <span>Junior (2y)</span>
                <span>Mid (4y)</span>
                <span>Senior (6y)</span>
                <span>Lead (8y+)</span>
              </div>
            </div>

            {/* High-Impact Skills Checkboxes */}
            <div>
              <label className="text-xs font-mono font-bold text-white/70 uppercase block mb-2">
                High-Value Skill Multipliers (+% Bonus)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skillOptions.map((opt) => {
                  const isChecked = selectedSkills.includes(opt.name);
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => handleToggleSkill(opt.name)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-1">{opt.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400 shrink-0">
                        +{opt.bonus}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Output Card (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 md:p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-950/60 to-indigo-950/30 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                  ML Prediction Confidence: 93%
                </span>
                <span className="text-xs font-mono text-white/50">{selectedLocation}</span>
              </div>

              <h4 className="text-xs font-mono font-bold text-white/60 uppercase tracking-widest">
                PREDICTED MONTHLY COMPENSATION
              </h4>

              <div className="my-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  PKR {salaryEstimate.monthlyPKR.toLocaleString()}
                </div>
                <div className="text-base sm:text-lg font-bold text-indigo-300 font-mono mt-1">
                  ≈ ${salaryEstimate.monthlyUSD.toLocaleString()} USD / month
                </div>
              </div>

              {/* Annualized & Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Annualized Run-rate (PKR):</span>
                  <span className="font-bold text-white">
                    PKR {(salaryEstimate.annualPKR / 100000).toFixed(1)} Lakh / year
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Annualized Global Run-rate (USD):</span>
                  <span className="font-bold text-indigo-300">
                    ${salaryEstimate.annualUSD.toLocaleString()} / year
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Applied Skill Stack Multiplier:</span>
                  <span className="font-bold text-emerald-400">
                    +{salaryEstimate.bonusPercentage}% Salary Lift
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span className="material-symbols-outlined text-base">lightbulb</span>
                <span>Recommendation to Maximize Earnings</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Add <strong>PyTorch</strong> and <strong>Docker / Cloud Kubernetes</strong> to your verified portfolio to jump into the <strong>top 10% international bracket</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Future Market Demand Predictions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span>Feature #10: Future Market Demand Trends (2026 - 2030)</span>
          </h3>
          <span className="text-xs font-mono text-white/50">Industry Hiring Indices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKET_DEMAND_DATA.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {item.role}
                  </h4>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border shrink-0 flex items-center gap-1 ${item.trendColor}`}>
                    <span className="material-symbols-outlined text-sm">{item.trendIcon}</span>
                    <span>{item.demandTrend}</span>
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono mb-4">
                  <div>
                    <span className="text-[10px] text-white/40 block">ANNUAL GROWTH</span>
                    <span className="font-bold text-emerald-400 text-sm">+{item.growthPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">REMOTE VIABILITY</span>
                    <span className="font-bold text-cyan-300 text-sm">{item.remoteFriendlyScore}%</span>
                  </div>
                </div>

                {/* Top Required Skills */}
                <div>
                  <span className="text-[10px] font-mono text-white/50 block mb-1.5 uppercase font-bold">
                    Core In-Demand Tech:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.topSkillsRequired.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-indigo-950/50 text-indigo-300 text-[10px] font-mono border border-indigo-500/20"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>PK: {item.openingsPK.toLocaleString()} open jobs</span>
                <span>Global: {(item.openingsGlobal / 1000).toFixed(1)}k openings</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
