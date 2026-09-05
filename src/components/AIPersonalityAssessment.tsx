import React, { useState } from 'react';
import { PERSONALITY_QUESTIONS } from '../data/careerEcosystemData';
import { PersonalityAssessmentResult, PersonalityDimension, TabType } from '../types';

interface AIPersonalityAssessmentProps {
  onComplete: (result: PersonalityAssessmentResult) => void;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  savedResult?: PersonalityAssessmentResult | null;
}

export const AIPersonalityAssessment: React.FC<AIPersonalityAssessmentProps> = ({
  onComplete,
  onNavigate,
  isDarkMode,
  savedResult,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<PersonalityAssessmentResult | null>(savedResult || null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const currentQuestion = PERSONALITY_QUESTIONS[currentQuestionIndex];
  const totalQuestions = PERSONALITY_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    setIsEvaluating(true);

    setTimeout(() => {
      // Group dimensions
      const dimensionMap: Record<string, { total: number; count: number; icon: string; color: string; desc: string }> = {
        'Logical Reasoning': {
          total: 0,
          count: 0,
          icon: 'psychology',
          color: 'from-blue-500 to-indigo-600',
          desc: 'Ability to dissect premises, identify patterns, and apply formal deductive logic.',
        },
        'Problem Solving': {
          total: 0,
          count: 0,
          icon: 'build',
          color: 'from-purple-500 to-pink-600',
          desc: 'Tenacity when resolving ambiguous technical constraints and debugging under pressure.',
        },
        'Creativity': {
          total: 0,
          count: 0,
          icon: 'palette',
          color: 'from-amber-500 to-orange-600',
          desc: 'Original thinking, novel UI design exploration, and entrepreneurial innovation.',
        },
        'Mathematics': {
          total: 0,
          count: 0,
          icon: 'calculate',
          color: 'from-emerald-500 to-teal-600',
          desc: 'Grasp of discrete math, statistical probability, linear algebra, and algorithmic efficiency.',
        },
        'Communication': {
          total: 0,
          count: 0,
          icon: 'forum',
          color: 'from-cyan-500 to-blue-600',
          desc: 'Clarity in articulating complex architectures to technical and non-technical stakeholders.',
        },
        'Leadership': {
          total: 0,
          count: 0,
          icon: 'military_tech',
          color: 'from-red-500 to-rose-600',
          desc: 'Proactive ownership, sprint prioritization, team mentorship, and unblocking teammates.',
        },
        'Teamwork': {
          total: 0,
          count: 0,
          icon: 'groups',
          color: 'from-violet-500 to-purple-600',
          desc: 'Empathy in code reviews, collaborative pairing, and cross-functional synergy.',
        },
        'Analytical Thinking': {
          total: 0,
          count: 0,
          icon: 'analytics',
          color: 'from-indigo-500 to-cyan-600',
          desc: 'Data-driven benchmarking, telemetry analysis, and rigorous architectural tradeoff evaluation.',
        },
      };

      PERSONALITY_QUESTIONS.forEach((q) => {
        const score = finalAnswers[q.id] || 3;
        if (dimensionMap[q.dimension]) {
          dimensionMap[q.dimension].total += score;
          dimensionMap[q.dimension].count += 1;
        }
      });

      const dimensions: PersonalityDimension[] = Object.entries(dimensionMap).map(([name, data]) => {
        const avgScore = data.count > 0 ? (data.total / (data.count * 5)) * 100 : 70;
        return {
          name,
          score: Math.round(avgScore),
          description: data.desc,
          icon: data.icon,
          color: data.color,
        };
      });

      // Determine Primary Archetype
      const sorted = [...dimensions].sort((a, b) => b.score - a.score);
      const topDim = sorted[0].name;

      let archetype = 'The Algorithmic Architect';
      let summary = 'You possess strong analytical problem-solving instincts, making you exceptionally well-suited for high-throughput software and machine learning engineering.';
      let recommended = ['AI & Machine Learning Engineer', 'Distributed Systems Architect', 'Data Scientist'];

      if (topDim === 'Creativity') {
        archetype = 'The Product Innovator & UX Architect';
        summary = 'You merge aesthetic design thinking with technical implementation to build intuitive user experiences.';
        recommended = ['UI/UX Product Designer', 'Frontend Architect', 'Creative Technologist'];
      } else if (topDim === 'Analytical Thinking' || topDim === 'Mathematics') {
        archetype = 'The Quantitative & Deep Learning Strategist';
        summary = 'Your passion for mathematical precision and rigorous benchmarking fits complex AI models and Big Data analytics.';
        recommended = ['AI Research Engineer', 'Data Scientist', 'Quantitative FinTech Developer'];
      } else if (topDim === 'Leadership' || topDim === 'Communication') {
        archetype = 'The Technical Lead & Systems Strategist';
        summary = 'You excel at cross-team synthesis, unblocking complex sprint bottlenecks, and architecting scalable roadmaps.';
        recommended = ['Engineering Manager', 'Technical Product Manager', 'Cloud DevOps Lead'];
      }

      const generatedResult: PersonalityAssessmentResult = {
        completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        primaryType: topDim,
        archetype,
        summary,
        dimensions,
        recommendedCareers: recommended,
      };

      setResult(generatedResult);
      setIsEvaluating(false);
      onComplete(generatedResult);
    }, 1200);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>AI COGNITIVE & PERSONALITY ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              AI Personality & Trait Assessment
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Discover your cognitive strengths across 8 core engineering dimensions: Logical reasoning, Problem solving, Creativity, Mathematics, Communication, Leadership, Teamwork, and Analytical thinking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('interests')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">target</span>
              <span>Define Interests</span>
            </button>
            <button
              onClick={() => onNavigate('eligibility-test')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Mock Eligibility Test</span>
            </button>
          </div>
        </div>
      </div>

      {isEvaluating ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-purple-500/30 space-y-6 max-w-xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 mx-auto flex items-center justify-center animate-spin">
            <span className="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Synthesizing Personality Matrix...</h3>
            <p className="text-xs text-white/60">
              Correlating 8 cognitive dimensions against industry engineering archetypes and global career vectors.
            </p>
          </div>
        </div>
      ) : result ? (
        /* Result View */
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-slate-950/80 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Assessment Completed • {result.completedAt}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Archetype: <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">{result.archetype}</span>
                </h2>
                <p className="text-sm text-white/80 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>Retake Assessment</span>
                </button>
                <button
                  onClick={() => onNavigate('skill-gap')}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>View Skill Gap & Careers</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* 8 Cognitive Dimensions Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">radar</span>
                <span>8 Cognitive & Engineering Dimensions</span>
              </h3>
              <span className="text-xs font-mono text-white/50">Normalized Score Range (0 - 100%)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {result.dimensions.map((dim, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-purple-500/30 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-xl">{dim.icon}</span>
                    </div>
                    <span className="text-lg font-extrabold font-mono text-purple-300">
                      {dim.score}%
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">{dim.name}</h4>
                    <p className="text-[11px] text-white/60 leading-snug mt-1 line-clamp-2">
                      {dim.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dim.color}`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Matched Career Tracks */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">recommend</span>
              <span>Recommended Fields Based on Your Cognitive Profile</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.recommendedCareers.map((career, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      Match #{i + 1}
                    </span>
                    <span className="material-symbols-outlined text-emerald-400 text-sm">stars</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{career}</h4>
                  <p className="text-[11px] text-white/60">
                    High synergy with your {result.primaryType.toLowerCase()} profile and logical reasoning.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Questionnaire View */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-white/60 font-mono">
                Category: <strong className="text-white">{currentQuestion.dimension}</strong>
              </span>
            </div>

            <div className="w-full sm:w-48 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Question Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold block">
                Scenario Evaluation
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/50 text-white transition-all flex items-start gap-3.5 group min-h-[52px]"
                >
                  <span className="w-6 h-6 rounded-lg bg-white/10 text-white/70 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90 group-hover:text-white leading-relaxed">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Step Navigation Back */}
            {currentQuestionIndex > 0 && (
              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Previous Question</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
