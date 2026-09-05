import React, { useState } from 'react';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const interviewQuestions = [
  {
    id: 1,
    company: "Tier 1 Big Tech",
    category: "Technical & System Design",
    question: "How would you design a rate limiter for an API endpoint handling 100,000 requests/sec?",
    sampleAnswer: "I would use a Token Bucket or Leaky Bucket algorithm backed by Redis memory store. Slide time windows with Lua scripts guarantee atomic decrementing and prevent race conditions.",
  },
  {
    id: 2,
    company: "FinTech Leader",
    category: "Behavioral & Leadership",
    question: "Describe a time when you had to balance technical debt against meeting a strict project deadline.",
    sampleAnswer: "I highlighted critical security and scaling bottlenecks to stakeholders, prioritized zero-downtime micro-tasks for launch, and scheduled a 2-week tech debt sprint immediately following the release.",
  },
  {
    id: 3,
    company: "AI Research Lab",
    category: "Machine Learning & Algorithms",
    question: "Explain collaborative filtering and how you mitigate the 'cold start' user problem in recommendation systems.",
    sampleAnswer: "Collaborative filtering relies on user-item interaction matrices. For new users without historical interactions, we use hybrid content-based filtering or demographic baseline defaults until initial clicks are logged.",
  },
];

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFeedback, setRecordingFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setRecordingFeedback(null);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingFeedback("Voice Analysis: Clear pace (140 wpm), high confidence tone (88%), minimal filler words detected.");
    }, 2500);
  };

  const currentQ = interviewQuestions[activeIdx];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="glass-card max-w-xl w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-indigo-400">psychology</span>
            <h3 className="font-extrabold text-lg tracking-tight">50+ Tier 1 Mock Questions</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {interviewQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setActiveIdx(idx);
                setShowAnswer(false);
                setRecordingFeedback(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeIdx === idx
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              Question #{idx + 1}
            </button>
          ))}
        </div>

        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 mb-6 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-white/50">
            <span className="font-bold text-indigo-400 uppercase tracking-wider">{currentQ.company}</span>
            <span>{currentQ.category}</span>
          </div>
          <p className="font-bold text-base md:text-lg leading-snug text-white">{currentQ.question}</p>
        </div>

        {/* Voice Practice Box */}
        <div className="bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-500/30 text-white p-4 rounded-2xl mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-filled text-indigo-400">mic</span>
              <span className="font-bold text-sm">Voice Response Practice</span>
            </div>
            <button
              onClick={handleSimulateVoice}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                isRecording ? "bg-rose-600 text-white animate-pulse" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
              }`}
            >
              {isRecording ? "Listening..." : "Record Answer"}
            </button>
          </div>
          {recordingFeedback && (
            <p className="text-xs bg-indigo-950/80 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 mt-3 font-mono leading-relaxed">
              {recordingFeedback}
            </p>
          )}
        </div>

        {/* Sample Answer Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs font-mono font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              {showAnswer ? "visibility_off" : "visibility"}
            </span>
            <span>{showAnswer ? "Hide Sample Model Answer" : "Show Sample Model Answer"}</span>
          </button>
          {showAnswer && (
            <div className="mt-3 p-4 bg-emerald-950/40 text-emerald-200 text-xs rounded-2xl border border-emerald-500/30 leading-relaxed font-mono">
              <span className="font-bold block mb-1 text-emerald-300">AI Coach Model Answer:</span>
              {currentQ.sampleAnswer}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/10 font-mono">
          <button
            disabled={activeIdx === 0}
            onClick={() => {
              setActiveIdx(activeIdx - 1);
              setShowAnswer(false);
            }}
            className="px-4 py-2 glass-card border border-white/15 rounded-xl text-xs font-semibold text-white disabled:opacity-30 hover:bg-white/10 transition-all"
          >
            Previous
          </button>
          <span className="text-xs text-white/50">
            {activeIdx + 1} / {interviewQuestions.length}
          </span>
          <button
            disabled={activeIdx === interviewQuestions.length - 1}
            onClick={() => {
              setActiveIdx(activeIdx + 1);
              setShowAnswer(false);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
