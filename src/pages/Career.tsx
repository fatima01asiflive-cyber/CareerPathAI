import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  CAREER_DATABASE,
  COMING_SOON_CAREERS,
  CareerDetail,
} from '../utils/careerData';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

export const Career: React.FC = () => {
  const { selectedCareer, setSelectedCareer, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeDomain, setActiveDomain] = useState('All CS Categories');
  const [selectedDetail, setSelectedDetail] = useState<CareerDetail | null>(null);
  const [comingSoonNotified, setComingSoonNotified] = useState<Record<string, boolean>>({});

  const CS_CATEGORIES = ['All CS Categories', 'Software Development', 'AI/ML', 'Data Science', 'Cloud Computing', 'Cyber Security', 'Web Development', 'Mobile Development', 'DevOps'];
  const allCareers = Object.values(CAREER_DATABASE).filter((c) =>
    /computer science|artificial intelligence|data science|cyber|cloud|software|web|mobile|devops/i.test(`${c.domain} ${c.category}`)
  );

  const categoryMatches = (career: CareerDetail, category: string) => {
    if (category === 'All CS Categories') return true;
    const text = `${career.name} ${career.category} ${career.domain}`.toLowerCase();
    const map: Record<string, RegExp> = {
      'Software Development': /software|developer|programming/,
      'AI/ML': /artificial intelligence|machine learning|ai/,
      'Data Science': /data science|analytics/,
      'Cloud Computing': /cloud|architecture/,
      'Cyber Security': /cyber|security/,
      'Web Development': /web|frontend|full.?stack/,
      'Mobile Development': /mobile|react native|flutter/,
      'DevOps': /devops|cloud/,
    };
    return map[category]?.test(text) || false;
  };

  const filteredCareers = allCareers.filter((c) => categoryMatches(c, activeDomain));
  const filteredComingSoon = COMING_SOON_CAREERS.filter((c) => /computer science|artificial intelligence|data science|cyber|cloud|software|web|mobile|devops/i.test(`${c.domain} ${c.name}`) && categoryMatches(c as unknown as CareerDetail, activeDomain));

  const handleSelectCareer = async (career: CareerDetail) => {
    setSelectedCareer(career);
    await updateProfile({ recommendedCareerId: career.id });
    navigate('/roadmap');
  };

  const handleNotifyMe = (id: string) => {
    setComingSoonNotified((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Computer Science Career Discovery Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore Computer Science Career Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Choose a Computer Science specialization such as AI/ML, Data Science, Cloud Computing, Cyber Security, Web Development, Mobile Development or DevOps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link to="/skill-gap">
              <Button variant="outline" size="sm" icon="compare_arrows">
                Skill Gap Check
              </Button>
            </Link>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 relative z-10">
          {CS_CATEGORIES.map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => setActiveDomain(domain)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeDomain === domain
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Active Available Pathways Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Available Specialized Pathways ({filteredCareers.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCareers.map((career) => {
            const isCurrentlySelected = selectedCareer?.id === career.id;

            return (
              <div
                key={career.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between space-y-4 backdrop-blur-xl transition-all ${
                  isCurrentlySelected
                    ? 'bg-sky-500/10 border-sky-400 shadow-xl shadow-sky-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-sky-400 uppercase font-bold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                      {career.domain}
                    </span>
                    {isCurrentlySelected && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        ACTIVE TRACK
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{career.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{career.description}</p>
                  </div>

                  {/* Market Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Salary Range</span>
                      <span className="text-slate-200 font-bold">{career.salaryRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Job Growth</span>
                      <span className="text-emerald-400 font-bold">{career.growthRate}</span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {career.requiredSkills.slice(0, 3).map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[10px] font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedDetail(career)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant={isCurrentlySelected ? 'outline' : 'primary'}
                    size="sm"
                    fullWidth
                    onClick={() => handleSelectCareer(career)}
                  >
                    {isCurrentlySelected ? 'View Roadmap' : 'Select Track'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming Soon Tracks */}
      {filteredComingSoon.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Coming Soon Pathways (Under Industry Review)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredComingSoon.map((item) => {
              const isNotified = comingSoonNotified[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-5 bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-3 opacity-80"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {item.domain}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-amber-400 px-2 py-0.5 rounded-md">
                        {item.expectedDate}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-300">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isNotified}
                    onClick={() => handleNotifyMe(item.id)}
                    icon={isNotified ? 'check' : 'notifications'}
                  >
                    {isNotified ? 'Subscribed for Alert' : 'Notify on Release'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Career Details Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase bg-sky-500/10 px-2.5 py-1 rounded-md">
                  {selectedDetail.domain} • {selectedDetail.demand} Demand
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  {selectedDetail.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedDetail.description}
            </p>

            {/* Compensation & Growth */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Average Compensation</span>
                <span className="text-white font-bold text-sm">{selectedDetail.salaryRange}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Projected Market Growth</span>
                <span className="text-emerald-400 font-bold text-sm">{selectedDetail.growthRate}</span>
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Required Core Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDetail.requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* 6-Month Roadmap Preview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">6-Month Curriculum Preview</h4>
              <div className="space-y-2">
                {selectedDetail.roadmap.slice(0, 3).map((r) => (
                  <div
                    key={r.month}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                        M{r.month}
                      </span>
                      <span className="font-semibold text-slate-200">{r.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{r.resourcesCount || 16} Resources</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedDetail(null)}>
                Close
              </Button>
              <Link to="/skill-gap">
                <Button variant="outline" size="sm" icon="compare_arrows">
                  Analyze Skill Gap
                </Button>
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleSelectCareer(selectedDetail);
                  setSelectedDetail(null);
                }}
                icon="check"
              >
                Select as My Target Career
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
