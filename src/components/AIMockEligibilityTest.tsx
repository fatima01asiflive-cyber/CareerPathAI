import React, { useState } from 'react';
import { EligibilityTestResult, TabType } from '../types';

interface AIMockEligibilityTestProps {
  onComplete: (result: EligibilityTestResult) => void;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  savedResult?: EligibilityTestResult | null;
}

interface TestQuestion {
  id: number;
  category: 'Domain & Programming' | 'Logical Reasoning' | 'Mathematics & Stats' | 'Pattern Recognition' | 'Technical Comprehension';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const FIELD_QUESTIONS: Record<string, TestQuestion[]> = {
  'Artificial Intelligence & Machine Learning': [
    {
      id: 1,
      category: 'Domain & Programming',
      question: 'In Python, what is the output of multiplying a 2D NumPy array of shape (3, 1) with an array of shape (1, 4) using broadcasting?',
      codeSnippet: 'import numpy as np\na = np.ones((3, 1))\nb = np.ones((1, 4))\nprint((a * b).shape)',
      options: ['(3, 4)', '(1, 1)', '(3, 1, 4)', 'ValueError: operands could not be broadcast together'],
      correctIndex: 0,
      explanation: 'NumPy broadcasting stretches dimensions of size 1, resulting in a shape of (3, 4).',
    },
    {
      id: 2,
      category: 'Mathematics & Stats',
      question: 'What is the primary function of the derivative (gradient) calculated during backpropagation in a neural network?',
      options: [
        'To update weights in the direction that minimizes the loss function.',
        'To normalize the input pixel values between 0 and 1.',
        'To randomly shuffle training batches to prevent overfitting.',
        'To convert categorical labels into one-hot encoded tensors.',
      ],
      correctIndex: 0,
      explanation: 'The gradient indicates the direction of steepest increase; moving in the opposite direction (gradient descent) minimizes the loss.',
    },
    {
      id: 3,
      category: 'Logical Reasoning',
      question: 'A classifier has 99% accuracy on a dataset where 99% of samples belong to Class A and 1% to Class B. What is the most critical metric to evaluate true model utility?',
      options: [
        'Precision, Recall, and F1-Score (or PR-AUC)',
        'Raw Training Accuracy',
        'Epoch Training Speed',
        'Batch Size',
      ],
      correctIndex: 0,
      explanation: 'In severely imbalanced classes, raw accuracy is deceptive. Precision, Recall, and F1-Score expose false negatives.',
    },
    {
      id: 4,
      category: 'Pattern Recognition',
      question: 'Which sequence correctly continues the algorithmic progression: 2, 6, 12, 20, 30, __?',
      options: ['42 (Pattern: n * (n+1) -> 6 * 7)', '40', '36', '48'],
      correctIndex: 0,
      explanation: 'The difference increases by 2 each time (+4, +6, +8, +10, +12). 30 + 12 = 42.',
    },
    {
      id: 5,
      category: 'Technical Comprehension',
      question: 'What does "Retrieval-Augmented Generation (RAG)" solve in Large Language Model (LLM) applications?',
      options: [
        'Injects relevant external domain context/documents at inference time to prevent hallucinations.',
        'Compresses weights to 4-bit quantization.',
        'Speeds up GPU video memory transfer over PCIe.',
        'Translates Python code to C++ automatically.',
      ],
      correctIndex: 0,
      explanation: 'RAG retrieves relevant verified factual knowledge from vector stores and includes it in the prompt prompt window.',
    },
  ],
  'Full Stack & Software Engineering': [
    {
      id: 1,
      category: 'Domain & Programming',
      question: 'What happens in JavaScript when an async function throws an uncaught error inside a Promise?',
      codeSnippet: 'async function fetchUser() {\n  throw new Error("DB connection failure");\n}\nfetchUser().catch(err => console.log("Handled"));',
      options: [
        'The Promise rejects and the .catch() block handles the error gracefully.',
        'The browser tab crashes instantly.',
        'It returns undefined without triggering .catch().',
        'It triggers an infinite event loop block.',
      ],
      correctIndex: 0,
      explanation: 'Async functions always return Promises; unhandled exceptions inside reject the returned Promise.',
    },
    {
      id: 2,
      category: 'Logical Reasoning',
      question: 'Which HTTP method should be strictly idempotent according to RFC specifications?',
      options: ['GET and PUT', 'POST only', 'PATCH and POST', 'None of the above'],
      correctIndex: 0,
      explanation: 'GET, PUT, and DELETE are idempotent (calling them multiple times produces the same system state).',
    },
    {
      id: 3,
      category: 'Mathematics & Stats',
      question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (AVL / Red-Black) with N nodes?',
      options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
      correctIndex: 0,
      explanation: 'A balanced BST maintains height proportional to log2(N), guaranteeing O(log N) lookup.',
    },
    {
      id: 4,
      category: 'Pattern Recognition',
      question: 'In software architecture, which pattern is best suited for decoupling event publishers from subscribers without direct references?',
      options: ['Observer / Pub-Sub Pattern', 'Singleton Pattern', 'Factory Method', 'Decorator'],
      correctIndex: 0,
      explanation: 'Pub-Sub enables loose coupling across microservices and async event brokers.',
    },
    {
      id: 5,
      category: 'Technical Comprehension',
      question: 'Why is database indexing using B-Trees preferred over Hash indexes for timestamp range queries (e.g. BETWEEN date1 AND date2)?',
      options: [
        'B-Trees store keys in sorted sequential order, enabling efficient range scans.',
        'Hash indexes require more RAM.',
        'B-Trees compress text strings automatically.',
        'Hash indexes cannot store integers.',
      ],
      correctIndex: 0,
      explanation: 'Hash tables only support O(1) point lookups; B-Tree leaf node linked lists allow sequential range scans.',
    },
  ],
};

export const AIMockEligibilityTest: React.FC<AIMockEligibilityTestProps> = ({
  onComplete,
  onNavigate,
  isDarkMode,
  savedResult,
}) => {
  const [selectedField, setSelectedField] = useState<string>('Artificial Intelligence & Machine Learning');
  const [testActive, setTestActive] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<EligibilityTestResult | null>(savedResult || null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const questions = FIELD_QUESTIONS[selectedField] || FIELD_QUESTIONS['Artificial Intelligence & Machine Learning'];
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    const updated = { ...selectedAnswers, [currentQ.id]: optionIndex };
    setSelectedAnswers(updated);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      evaluateTest(updated);
    }
  };

  const evaluateTest = (answers: Record<number, number>) => {
    setIsEvaluating(true);

    setTimeout(() => {
      let correctCount = 0;
      const categoryScores: Record<string, { correct: number; total: number }> = {};

      questions.forEach((q) => {
        const userChoice = answers[q.id];
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { correct: 0, total: 0 };
        }
        categoryScores[q.category].total += 1;

        if (userChoice === q.correctIndex) {
          correctCount += 1;
          categoryScores[q.category].correct += 1;
        }
      });

      const overallPercentage = Math.round((correctCount / questions.length) * 100);

      const breakdown = Object.entries(categoryScores).map(([cat, score]) => {
        const catPercent = Math.round((score.correct / score.total) * 100);
        let feedback = 'Solid grasp of core fundamentals.';
        if (catPercent < 60) {
          feedback = 'Recommended foundation review before advancing to complex topics.';
        } else if (catPercent >= 90) {
          feedback = 'Mastery level performance in this discipline.';
        }
        return {
          category: cat,
          score: catPercent,
          max: 100,
          feedback,
        };
      });

      const strengths: string[] = [];
      const growthAreas: string[] = [];

      breakdown.forEach((b) => {
        if (b.score >= 75) {
          strengths.push(`${b.category} (${b.score}%)`);
        } else {
          growthAreas.push(`${b.category} (${b.score}%)`);
        }
      });

      if (strengths.length === 0) strengths.push('Tenacity and motivation to bridge foundational skills');
      if (growthAreas.length === 0) growthAreas.push('Continuous real-world open-source contributions');

      let verdict: 'High Readiness' | 'Moderate Readiness - Foundation Needed' | 'Requires Prerequisites' = 'High Readiness';
      if (overallPercentage < 50) {
        verdict = 'Requires Prerequisites';
      } else if (overallPercentage < 80) {
        verdict = 'Moderate Readiness - Foundation Needed';
      }

      const generatedResult: EligibilityTestResult = {
        targetField: selectedField,
        overallReadiness: overallPercentage,
        breakdown,
        strengths,
        growthAreas,
        verdict,
        testDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      setResult(generatedResult);
      setIsEvaluating(false);
      setTestActive(false);
      onComplete(generatedResult);
    }, 1400);
  };

  const startTest = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setResult(null);
    setTestActive(true);
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>STEP 6: AI MOCK ELIGIBILITY BENCHMARK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              AI Mock Eligibility & Readiness Test
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Before committing to a career roadmap, test your analytical reasoning, technical comprehension, and mathematical readiness to calculate your precise match percentage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('skill-gap')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">checklist</span>
              <span>Skill Gap Analysis</span>
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Career Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {!testActive && !result && !isEvaluating && (
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Select Your Target Field</h3>
            <p className="text-xs text-white/60">
              The AI will customize questions across programming logic, math/stats, pattern recognition, and technical comprehension.
            </p>
          </div>

          <div className="space-y-3">
            {Object.keys(FIELD_QUESTIONS).map((field) => (
              <label
                key={field}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedField === field
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => setSelectedField(field)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-400">
                    {field.includes('AI') ? 'psychology' : 'code'}
                  </span>
                  <span className="font-bold text-sm">{field}</span>
                </div>
                <input
                  type="radio"
                  name="field-choice"
                  checked={selectedField === field}
                  onChange={() => setSelectedField(field)}
                  className="accent-emerald-500 w-4 h-4"
                />
              </label>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-white/70">
            <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono">
              <span className="material-symbols-outlined text-base">info</span>
              <span>Test Overview</span>
            </div>
            <p>• 5 In-depth Adaptive Questions</p>
            <p>• Multi-dimensional Readiness Score (% breakdown)</p>
            <p>• Instant AI strength & prerequisite gap analysis</p>
          </div>

          <button
            onClick={startTest}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-mono font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>Start AI Mock Eligibility Test</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}

      {isEvaluating && (
        <div className="glass-card rounded-3xl p-12 text-center border border-emerald-500/30 space-y-6 max-w-xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-spin">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Calculating Field Readiness Index...</h3>
            <p className="text-xs text-white/60">
              Scoring programming syntax, statistical reasoning, and deduction accuracy for {selectedField}.
            </p>
          </div>
        </div>
      )}

      {testActive && currentQ && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Header */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-white/60 font-mono">
                Category: <strong className="text-white">{currentQ.category}</strong>
              </span>
            </div>

            <div className="w-full sm:w-48 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentIdx + 1) / questions.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* Question Body */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                {selectedField} Eligibility Challenge
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>

              {currentQ.codeSnippet && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
                  {currentQ.codeSnippet}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/50 text-white transition-all flex items-start gap-3.5 group min-h-[52px]"
                >
                  <span className="w-6 h-6 rounded-lg bg-white/10 text-white/70 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90 group-hover:text-white leading-relaxed">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {result && !testActive && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Score Banner */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-slate-900/60 to-slate-950/80 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>{result.verdict} • Tested on {result.testDate}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Target Field: <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">{result.targetField}</span>
                </h2>
                <p className="text-sm text-white/80 leading-relaxed">
                  Based on your performance in programming syntax, logical deductions, and mathematical concepts, your calculated readiness index is:
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-6 rounded-3xl bg-slate-950/80 border border-emerald-500/40 text-center shadow-xl">
                  <span className="text-4xl font-extrabold font-mono text-emerald-400 block">
                    {result.overallReadiness}%
                  </span>
                  <span className="text-[10px] font-mono uppercase text-white/60 tracking-wider">
                    AI Readiness Score
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.breakdown.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{item.category}</h4>
                  <span className="text-base font-extrabold font-mono text-emerald-400">
                    {item.score}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 80 ? 'bg-emerald-500' : item.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p className="text-xs text-white/60 leading-relaxed">{item.feedback}</p>
              </div>
            ))}
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="material-symbols-outlined">thumb_up</span>
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-white/80">
                {result.strengths.map((str, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="material-symbols-outlined">trending_up</span>
                <span>Prioritized Focus Areas for Roadmap</span>
              </div>
              <ul className="space-y-2 text-xs text-white/80">
                {result.growthAreas.map((gr, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-sm">arrow_forward</span>
                    <span>{gr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button
              onClick={() => {
                setResult(null);
                setTestActive(false);
              }}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Test Another Field</span>
            </button>

            <button
              onClick={() => onNavigate('skill-gap')}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span>Explore AI Skill Gap & Ranked Career Matches</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
