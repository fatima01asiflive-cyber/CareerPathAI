import React, { useState } from 'react';
import { AcademicData, TabType } from '../types';

interface DefineFutureInterestsProps {
  academicData: AcademicData;
  onNavigate: (tab: TabType) => void;
  onRoadmapGenerated: (data: any) => void;
  isDarkMode: boolean;
}

const recommendedCategories = [
  { id: 'ai', label: 'AI / Machine Learning', recommended: true },
  { id: 'web', label: 'Web Development', recommended: true },
  { id: 'data', label: 'Data Science & Analytics', recommended: true },
  { id: 'design', label: 'UI/UX Design', recommended: false },
  { id: 'sec', label: 'Cybersecurity', recommended: false },
  { id: 'cloud', label: 'Cloud Computing & DevOps', recommended: true },
  { id: 'pm', label: 'Product Management', recommended: false },
  { id: 'blockchain', label: 'Blockchain & Web3', recommended: false },
];

const trendingSkills = [
  'Next.js 15', 'Microservices Architecture', 'LLM Fine-Tuning', 'System Design', 'Kubernetes', 'GraphQL', 'PyTorch'
];

export const DefineFutureInterests: React.FC<DefineFutureInterestsProps> = ({
  academicData,
  onNavigate,
  onRoadmapGenerated,
  isDarkMode,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Web Development',
    'AI / Machine Learning',
    'Cloud Computing & DevOps',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [generating, setGenerating] = useState(false);

  const toggleInterest = (label: string) => {
    if (selectedInterests.includes(label)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== label));
    } else {
      setSelectedInterests([...selectedInterests, label]);
    }
  };

  const handleGenerateRoadmap = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests: selectedInterests,
          academicInfo: academicData,
        }),
      });
      const data = await res.json();
      onRoadmapGenerated(data);
    } catch (e) {
      console.error('Failed to generate roadmap:', e);
    } finally {
      setGenerating(false);
      onNavigate('roadmap');
    }
  };

  const filteredCategories = recommendedCategories.filter((cat) =>
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-[#f8ddd2]" : "text-[#191c1e]"}`}>
      {/* Step Header */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-3 text-xs md:text-sm">
          <span className="font-bold text-[#003535] dark:text-[#ffb693]">Define Future & Interests</span>
          <span className="text-[#707978]">Step 2 of 4</span>
        </div>
        <div className="h-3 w-full bg-[#eceef0] dark:bg-[#362720] rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#fb7800] w-2/4 rounded-full transition-all duration-700 ease-out" />
          <div className="absolute top-1/2 left-2/4 -translate-y-1/2 w-2 h-2 bg-[#003535] dark:bg-[#ffb693] rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003535] dark:text-[#ffb693]">
            Define Your Future
          </h2>
          <p className="text-sm md:text-base text-[#707978] max-w-xl mx-auto">
            Select fields you're passionate about. Our AI engine builds a tailored roadmap aligned with your dream roles.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707978]">
            search
          </span>
          <input
            type="text"
            placeholder="Search skills, frameworks, or roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-12 pl-12 pr-4 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#003535] ${
              isDarkMode ? "border-[#5a4136] text-[#f8ddd2]" : "border-[#bfc8c8] text-[#191c1e]"
            }`}
          />
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#707978]">
            RECOMMENDED FOR YOU
          </h3>

          <div className="flex flex-wrap gap-3">
            {filteredCategories.map((cat) => {
              const isSelected = selectedInterests.includes(cat.label);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleInterest(cat.label)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#0d4d4d] text-white border-[#0d4d4d] shadow-md scale-102"
                      : isDarkMode
                      ? "bg-[#170b06] border-[#5a4136] text-[#e2bfb0] hover:bg-[#2b1c16]"
                      : "bg-white border-[#bfc8c8] text-[#404848] hover:bg-[#f2f4f6]"
                  }`}
                >
                  {cat.recommended && (
                    <span className={`material-symbols-filled text-base ${isSelected ? "text-amber-300" : "text-[#fb7800]"}`}>
                      star
                    </span>
                  )}
                  <span>{cat.label}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-sm">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trending Skills Section */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#707978]">
            TRENDING SKILLS & FRAMEWORKS
          </h3>

          <div className="flex flex-wrap gap-2">
            {trendingSkills.map((skill) => {
              const isSelected = selectedInterests.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleInterest(skill)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                    isSelected
                      ? "bg-[#fb7800] text-white border-[#fb7800]"
                      : isDarkMode
                      ? "bg-[#261812] border-[#5a4136] text-[#e2bfb0]"
                      : "bg-[#f2f4f6] border-[#e0e3e5] text-[#404848]"
                  }`}
                >
                  + {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Selection Summary Box */}
        <div className={`p-6 border rounded-2xl shadow-sm space-y-4 ${
          isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fb7800]">auto_awesome</span>
              <h4 className="font-bold text-base text-[#003535] dark:text-[#ffb693]">
                Selected Interests
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#fb7800] text-white font-bold text-xs">
              {selectedInterests.length} Selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
            {selectedInterests.length === 0 ? (
              <p className="text-xs text-[#707978] italic">Click chips above to select your interests...</p>
            ) : (
              selectedInterests.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-[#b4edec] text-[#002020] font-semibold text-xs flex items-center gap-1.5"
                >
                  <span>{item}</span>
                  <button onClick={() => toggleInterest(item)} className="hover:opacity-70">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              ))
            )}
          </div>

          <button
            onClick={handleGenerateRoadmap}
            disabled={generating || selectedInterests.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
              generating || selectedInterests.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#003535] text-white hover:bg-[#0d4d4d] active:scale-98"
            }`}
          >
            <span className="material-symbols-outlined">
              {generating ? "hourglass_empty" : "auto_awesome"}
            </span>
            <span>{generating ? "Synthesizing AI Roadmap..." : "Generate My Roadmap"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
