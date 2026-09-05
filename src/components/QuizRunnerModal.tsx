import React, { useState } from 'react';

interface QuizRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: "What is the worst-case time complexity of lookup in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctIndex: 1,
    explanation: "In a balanced BST, the height is logarithmic (log N), ensuring lookup runs in O(log N) time.",
  },
  {
    id: 2,
    question: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
    options: ["Stack", "Queue", "Heap", "Hash Map"],
    correctIndex: 1,
    explanation: "A Queue processes elements in FIFO order, where the first element added is the first one removed.",
  },
  {
    id: 3,
    question: "What handles hash collisions by chaining multiple elements in the same hash bucket?",
    options: ["Separate Chaining", "Open Addressing", "Linear Probing", "Binary Heap"],
    correctIndex: 0,
    explanation: "Separate chaining stores colliding entries in a linked list or array at the bucket index.",
  },
];

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (index: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = index;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = selectedAnswers.reduce((acc, sel, idx) => {
    return sel === quizQuestions[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="glass-card max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-indigo-400">school</span>
            <h3 className="font-extrabold text-lg tracking-tight">Data Structures Mastery Quiz</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {!showResults ? (
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-indigo-300 mb-4">
              <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
              <span>Topic 1: Big O & Data Structures</span>
            </div>

            <p className="font-semibold text-base md:text-lg mb-6 leading-snug text-white">
              {quizQuestions[currentIdx].question}
            </p>

            <div className="space-y-3 mb-8">
              {quizQuestions[currentIdx].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-600/30 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`material-symbols-outlined text-lg ${isSelected ? "text-indigo-400" : "text-white/30"}`}>
                      {isSelected ? "check_circle" : "radio_button_unchecked"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              disabled={selectedAnswers[currentIdx] === undefined}
              onClick={handleNext}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                selectedAnswers[currentIdx] !== undefined
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-98"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              <span>{currentIdx < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/20">
              <span className="material-symbols-filled text-3xl">workspace_premium</span>
            </div>
            <h4 className="text-2xl font-extrabold mb-2 text-white">Quiz Completed!</h4>
            <p className="text-sm text-white/70 mb-6">
              You scored <span className="font-mono font-bold text-indigo-400 text-lg">{score}</span> out of {quizQuestions.length}!
            </p>

            <div className="bg-white/5 p-4 rounded-2xl text-left text-xs space-y-2 mb-6 border border-white/10 font-mono">
              {quizQuestions.map((q, idx) => (
                <div key={idx} className="border-b border-white/10 pb-2 last:border-b-0">
                  <p className="font-bold text-white">{idx + 1}. {q.question}</p>
                  <p className={selectedAnswers[idx] === q.correctIndex ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                    Your answer: {q.options[selectedAnswers[idx]] || "None"}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetQuiz}
                className="flex-1 py-3 glass-card border border-white/15 rounded-xl font-medium text-sm hover:bg-white/10 transition-all"
              >
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
