import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalityService, PersonalityEvaluation } from '../services/personalityService';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const PersonalityTest: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const questions = personalityService.getQuestions();

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<PersonalityEvaluation | null>(null);

  const currentQ = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Evaluate results
      setIsEvaluating(true);
      setTimeout(() => {
        const result = personalityService.evaluatePersonality(selectedAnswers);
        setEvaluationResult(result);
        setIsEvaluating(false);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  if (isEvaluating) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin" />
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Synthesizing Psychometric Profile...</h2>
          <p className="text-xs font-mono text-slate-400">
            Mapping OCEAN Big-Five Dimensions & Holland RIASEC Career Codes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span>FYP AI/ML Module • Big-Five (OCEAN) & Holland RIASEC Model</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Psychometric & Personality Trait Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Discover how your cognitive mindset, work habits, and problem-solving intuition align with high-growth technical and strategic professions.
        </p>
      </div>

      {!evaluationResult ? (
        /* Question Card */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl">
          {/* Question Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span className="text-indigo-400 font-bold">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              Dimension: {currentQ.dimension}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Prompt */}
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/80 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500 text-white'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              icon="arrow_back"
            >
              Previous
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              icon={currentIdx === questions.length - 1 ? 'psychology' : 'arrow_forward'}
              iconPosition="right"
              className="bg-indigo-600 hover:bg-indigo-500 text-white border-transparent"
            >
              {currentIdx === questions.length - 1 ? 'Analyze Personality' : 'Next Question'}
            </Button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Display */
        <div className="space-y-6 animate-fade-in">
          {/* Main Archetype Banner */}
          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold">
                  {evaluationResult.archetypeBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {evaluationResult.primaryArchetype}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0">
                <span className="text-xs font-mono text-slate-400 block">Analytical Index</span>
                <span className="text-2xl font-black text-indigo-400">
                  {evaluationResult.oceanScores.analyticalMindset}%
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {evaluationResult.summary}
            </p>
          </div>

          {/* Big Five OCEAN Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OCEAN Trait Bars */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Big Five (OCEAN) Personality Metrics
              </h3>

              <div className="space-y-3">
                {Object.entries(evaluationResult.oceanScores).map(([trait, score]) => {
                  const traitNames: Record<string, string> = {
                    openness: 'Openness to Experience & Curiosity',
                    conscientiousness: 'Conscientiousness & Execution',
                    extraversion: 'Extraversion & Team Collaboration',
                    agreeableness: 'Agreeableness & Empathy',
                    analyticalMindset: 'Analytical & Algorithmic Rigor',
                  };
                  return (
                    <div key={trait} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300">{traitNames[trait] || trait}</span>
                        <span className="text-indigo-400 font-bold">{score}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Holland Codes (RIASEC) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Holland Career Codes (RIASEC)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(evaluationResult.hollandCodes).map(([code, val]) => (
                  <div key={code} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 capitalize">{code}</span>
                    <p className="text-lg font-bold text-white">{val}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Career Alignments */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Personality-Aligned Career Matches
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {evaluationResult.recommendedCareerMatches.map((cm, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{cm.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold">
                      {cm.compatibility}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{cm.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setEvaluationResult(null);
                setCurrentIdx(0);
                setSelectedAnswers({});
              }}
              icon="restart_alt"
            >
              Retake Assessment
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/roadmap')}
              icon="alt_route"
            >
              View Recommended Roadmap
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
