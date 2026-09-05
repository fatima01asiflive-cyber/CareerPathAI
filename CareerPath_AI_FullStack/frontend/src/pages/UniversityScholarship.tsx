import React, { useState } from 'react';
import { UNIVERSITIES_DATA, SCHOLARSHIPS_DATA, University, Scholarship } from '../data/universitiesScholarshipsData';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const UniversityScholarship: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'universities' | 'scholarships'>('universities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedUniModal, setSelectedUniModal] = useState<University | null>(null);
  const [selectedScholModal, setSelectedScholModal] = useState<Scholarship | null>(null);

  const studentMarks = user?.marksPercentage || 85;

  const domains = [
    'All',
    'Computer Science & Technology',
    'Engineering & Physical Sciences',
    'Medicine & Health',
    'Business, Finance & Management',
    'Arts, Design & Media',
    'Social Sciences & Research',
  ];

  // Filter Universities
  const filteredUniversities = UNIVERSITIES_DATA.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.featuredPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain =
      selectedDomain === 'All' || uni.domains.includes(selectedDomain);

    const matchesCountry =
      selectedCountry === 'All' ||
      (selectedCountry === 'Pakistan' && uni.country === 'Pakistan') ||
      (selectedCountry === 'International' && uni.country !== 'Pakistan');

    const matchesStatus =
      selectedStatus === 'All' || uni.admissionStatus === selectedStatus;

    return matchesSearch && matchesDomain && matchesCountry && matchesStatus;
  });

  // Filter Scholarships
  const filteredScholarships = SCHOLARSHIPS_DATA.filter((sch) => {
    const matchesSearch =
      sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.coverage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      selectedDomain === 'All' ||
      sch.eligibleDomains.some((d) => d === selectedDomain || d.includes(selectedDomain));

    const matchesCountry =
      selectedCountry === 'All' ||
      (selectedCountry === 'Pakistan' && sch.location.includes('Pakistan')) ||
      (selectedCountry === 'International' && !sch.location.includes('Pakistan'));

    return matchesSearch && matchesDomain && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FYP Module • Higher Education & Funding Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              University Admissions & Scholarships Guidance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Explore accredited Pakistani and global universities, match degree admission criteria against your marks ({studentMarks}%), and apply for fully funded national and international scholarships.
            </p>
          </div>

          {/* Quick Eligibility Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 text-center sm:text-right">
            <p className="text-[11px] font-mono text-slate-400">Your Academic Standing</p>
            <p className="text-xl font-extrabold text-white">
              {studentMarks}% <span className="text-emerald-400 text-xs font-normal">(Eligible for 95%+ Programs)</span>
            </p>
          </div>
        </div>

        {/* Tab Toggle: Universities vs Scholarships */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('universities')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'universities'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">school</span>
            <span>Universities ({filteredUniversities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scholarships')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'scholarships'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">redeem</span>
            <span>Scholarships ({filteredScholarships.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder={activeTab === 'universities' ? 'Search university, program...' : 'Search scholarships, grants...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Domain Filter */}
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          {domains.map((d) => (
            <option key={d} value={d}>
              {d === 'All' ? 'All Academic Fields' : d}
            </option>
          ))}
        </select>

        {/* Country Filter */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="All">All Locations (PK & Global)</option>
          <option value="Pakistan">Pakistan Only</option>
          <option value="International">International (US / UK / EU)</option>
        </select>

        {/* Status / Eligibility Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="All">All Admission Statuses</option>
          <option value="Open">Admissions Open Now</option>
          <option value="Upcoming">Upcoming Admissions</option>
        </select>
      </div>

      {/* Main Content Area */}
      {activeTab === 'universities' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUniversities.map((uni) => {
            const isEligible = studentMarks >= uni.minPercentage;
            return (
              <div
                key={uni.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 transition-all duration-200 group hover:shadow-xl hover:shadow-sky-500/5"
              >
                <div className="space-y-3">
                  {/* Top Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs font-mono">
                        {uni.shortName.slice(0, 3)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                          uni.admissionStatus === 'Open'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {uni.admissionStatus}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {uni.location.split(',')[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                      {uni.name}
                    </h3>
                    <p className="text-[11px] text-sky-400 font-mono mt-0.5">{uni.ranking}</p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{uni.description}</p>

                  {/* Featured Programs */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Featured Programs
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {uni.featuredPrograms.slice(0, 3).map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300"
                        >
                          {p}
                        </span>
                      ))}
                      {uni.featuredPrograms.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-500 font-mono">
                          +{uni.featuredPrograms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Criteria & Fee */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Min. Eligibility</span>
                      <span className={`font-semibold ${isEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {uni.minPercentage}% {isEligible ? '✓ Match' : '⚠ Below'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Fee / Sem</span>
                      <span className="text-slate-300 font-medium truncate block">
                        {uni.feePerSemester.split(' ')[0]} {uni.feePerSemester.split(' ')[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedUniModal(uni)}
                    icon="info"
                  >
                    Details & Criteria
                  </Button>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-colors"
                    title="Visit Official University Portal"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScholarships.map((sch) => {
            const isEligible = studentMarks >= sch.minMarksPercentage;
            return (
              <div
                key={sch.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 transition-all duration-200 group hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="space-y-3">
                  {/* Provider & Type Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      {sch.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{sch.location}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {sch.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{sch.provider}</p>
                  </div>

                  {/* Coverage Highlight Card */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-300">
                    <p className="text-[10px] font-mono text-emerald-400 uppercase font-semibold mb-0.5">
                      Funding Coverage
                    </p>
                    <p className="line-clamp-2 text-[11px] leading-relaxed">{sch.coverage}</p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{sch.description}</p>

                  {/* Deadline & Eligibility */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Deadline</span>
                      <span className="text-slate-300 font-mono font-medium">{sch.deadline}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Min. Marks</span>
                      <span className={`font-semibold ${isEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {sch.minMarksPercentage}% {isEligible ? '✓ Eligible' : '⚠ Below'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedScholModal(sch)}
                    icon="info"
                  >
                    View Details
                  </Button>
                  <a
                    href={sch.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Apply</span>
                    <span className="material-symbols-outlined text-xs">arrow_outward</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* University Detail Modal */}
      {selectedUniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                  {selectedUniModal.shortName}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedUniModal.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{selectedUniModal.location} • {selectedUniModal.ranking}</p>
              </div>
              <button
                onClick={() => setSelectedUniModal(null)}
                className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedUniModal.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Admission Criteria</span>
                <p className="text-xs text-white font-semibold">{selectedUniModal.minEligibility}</p>
                <p className="text-[11px] text-emerald-400 mt-1">
                  Your standing: {studentMarks}% ({studentMarks >= selectedUniModal.minPercentage ? 'Qualified' : 'Requires improvement'})
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Fee Structure & Aid</span>
                <p className="text-xs text-white font-semibold">{selectedUniModal.feePerSemester}</p>
                <p className="text-[11px] text-sky-400 mt-1">Scholarships & Need Aid Supported</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-white">Degree Programs Offered:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedUniModal.featuredPrograms.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-white">Campus Labs & Facilities:</p>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                {selectedUniModal.facilities.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedUniModal(null)}>
                Close
              </Button>
              <a
                href={selectedUniModal.website}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Visit Official Admissions Portal</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scholarship Detail Modal */}
      {selectedScholModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  {selectedScholModal.type}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedScholModal.title}</h2>
                <p className="text-xs text-slate-400 font-mono">{selectedScholModal.provider} • {selectedScholModal.location}</p>
              </div>
              <button
                onClick={() => setSelectedScholModal(null)}
                className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Full Funding Package</span>
              <p className="text-xs text-emerald-200 font-medium">{selectedScholModal.coverage}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedScholModal.description}</p>

            <div className="space-y-2">
              <p className="text-xs font-bold text-white">Eligibility Requirements:</p>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                {selectedScholModal.requirements.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">APPLICATION DEADLINE</span>
                <span className="text-white font-bold">{selectedScholModal.deadline}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">YOUR MATCH STATUS</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {studentMarks >= selectedScholModal.minMarksPercentage ? '✓ Eligible' : '⚠ Competitive Check'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedScholModal(null)}>
                Close
              </Button>
              <a
                href={selectedScholModal.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Proceed to Application Portal</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
