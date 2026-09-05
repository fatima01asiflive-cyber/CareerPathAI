import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { assessmentService } from '../services/assessmentService';
import { AptitudeQuestion } from '../utils/questions';
import { Button } from '../components/Button';

export const Assessment: React.FC = () => {
  const { user, saveAptitudeScore, roadmapCompletionPercentage } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluatingStep, setEvaluatingStep] = useState(0);

  const normalizedEducation = String(user?.educationLevel || user?.previousQualifications || '').toLowerCase();
  const normalizedField = String(user?.academicField || user?.fscStream || user?.preferredField || '').toLowerCase();
  const hasIntermediate = normalizedEducation.includes('intermediate') || normalizedEducation.includes('fsc') || normalizedEducation.includes('hssc');
  const hasComputerScienceInterest = normalizedField.includes('computer') || normalizedField.includes('cs') || (user?.interests || []).some((i) => /computer science|software|web development|ai|machine learning|data science|cyber|cloud|devops|mobile/i.test(i));
  const profileReady = Boolean(hasIntermediate && hasComputerScienceInterest && user?.interests?.length);

  // Load a fresh, randomized CS aptitude set on every assessment mount/reload.
  useEffect(() => {
    if (!profileReady) { setQuestions([]); return; }
    const qList = assessmentService.getQuestions(user?.interests || []);
    setQuestions(qList);
  }, [user, profileReady]);

  // Live Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || isEvaluating) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isEvaluating]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleSubmitTest = async () => {
    setIsEvaluating(true);

    // Calculate score
    const result = assessmentService.calculateScore(questions, answers);

    // Calculate category breakdown
    const categoryScores: Record<string, number> = {};
    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctIndex;
      const cat = q.category || 'Logic & Problem Solving';
      if (!categoryScores[cat]) {
        categoryScores[cat] = isCorrect ? 90 : 60;
      } else {
        categoryScores[cat] = isCorrect ? Math.min(categoryScores[cat] + 15, 95) : Math.max(categoryScores[cat] - 10, 50);
      }
    });

    // Multi-stage evaluation screen simulation
    setTimeout(() => setEvaluatingStep(1), 700);
    setTimeout(() => setEvaluatingStep(2), 1400);
    setTimeout(() => setEvaluatingStep(3), 2100);

    setTimeout(async () => {
      await saveAptitudeScore(result.scorePercentage, categoryScores);
      setIsEvaluating(false);
      navigate('/result');
    }, 2800);
  };

  const assignedProject = (() => {
    const projects = projectService.getAllProjects();
    if (roadmapCompletionPercentage >= 100) return projects.find((p) => p.stage === 'Pro');
    if (roadmapCompletionPercentage >= 33) return projects.find((p) => p.stage === 'Intermediate');
    if (roadmapCompletionPercentage > 0) return projects.find((p) => p.stage === 'Beginner');
    return undefined;
  })();

  if (!profileReady) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-xl w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-7 text-center">
          <span className="material-symbols-outlined text-4xl text-sky-400">school</span>
          <h2 className="text-xl font-black text-white mt-3">Complete Academic Journey First</h2>
          <p className="text-sm text-slate-400 mt-2">Your last degree is Intermediate/FSc and your interest is in Computer Science. The test mixes logic, mathematics and category-specific Computer Science questions to identify your strongest areas.</p>
          <button onClick={() => navigate('/academic-journey')} className="mt-5 px-5 py-3 rounded-xl bg-sky-500 text-slate-950 text-xs font-black">Complete Academic Journey</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  // AI Evaluation Processing Screen
  if (isEvaluating) {
    const stepsText = [
      'Grading multiple-choice responses against domain benchmarks...',
      'Computing category proficiencies across logic, math and specialized skills...',
      'Applying IntelliPath 85% Confidence Decision Matrix...',
      'Generating your personalized roadmap and foundation recommendations...',
    ];

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin" />
          <span className="material-symbols-outlined text-3xl text-sky-400 absolute inset-0 flex items-center justify-center animate-pulse">
            analytics
          </span>
        </div>

        <div className="space-y-3 max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>AI DIAGNOSTIC ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Analyzing Your Assessment Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 transition-all font-medium">
            {stepsText[evaluatingStep]}
          </p>
        </div>

        <div className="w-full max-w-xs bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-linear-to-r from-sky-500 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${((evaluatingStep + 1) / 4) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentQ.id];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-6 animate-fade-in">
  {assignedProject && (
    <div className="max-w-3xl mx-auto mb-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p className="text-[9px] uppercase tracking-widest font-black text-violet-300">Roadmap Project Assignment</p>
        <h3 className="text-sm font-black text-white mt-1">{assignedProject.stage}: {assignedProject.title}</h3>
        <p className="text-[10px] text-slate-400 mt-1">Complete the matching roadmap stage, then submit the project with GitHub and a live deployment for review.</p>
      </div>
      <button onClick={() => navigate('/projects')} className="shrink-0 px-4 py-2.5 rounded-xl bg-violet-500 text-white text-[10px] font-black inline-flex items-center justify-center gap-2">View Project</button>
    </div>
  )}

      {/* Top Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>IntelliPath Career Aptitude Diagnostic</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-white mt-1">
            Question {currentIndex + 1} of {questions.length}
          </h1>
          <p className="text-xs text-slate-400">
            Category:{' '}
            <span className="text-sky-400 font-semibold">{currentQ.category}</span>
          </p>
        </div>

        {/* Timer Control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-sky-400">
            <span className="material-symbols-outlined text-base">timer</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white text-xs"
            title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
          >
            <span className="material-symbols-outlined text-sm">
              {isTimerRunning ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>Progress: {answeredCount} / {questions.length} Answered</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="space-y-2">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 text-[10px] font-mono font-bold uppercase">
            {currentQ.domain}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all group ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-sky-400 text-slate-950 shadow-xs'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white'
                  }`}
                >
                  {letter}
                </div>
                <span className="text-xs sm:text-sm font-medium flex-1">{option}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-sky-400 text-lg">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="md"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            icon="arrow_back"
          >
            Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              icon="arrow_forward"
              iconPosition="right"
            >
              Next Question
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleSubmitTest}
              icon="send"
              iconPosition="right"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold"
            >
              Submit Diagnostic Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
