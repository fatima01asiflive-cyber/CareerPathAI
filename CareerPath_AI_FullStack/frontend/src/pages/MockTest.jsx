import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Assuming React Router and Tailwind CSS are set up

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15:00 Timer (900 seconds)
  const [isTestActive, setIsTestActive] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Gamification states
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch 10 random questions from backend on mount
  const fetchQuestions = async () => {
    try {
      // In a real app, you would pass the JWT token in headers
      const res = await axios.get('/api/mocktest/questions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuestions(res.data.questions);
    } catch (error) {
      console.error("Error fetching questions", error);
      // Fallback for UI testing
      setQuestions([
        { _id: '1', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'] },
        { _id: '2', question: 'Derivative of x^2 is?', options: ['x', '2x', 'x^2', '2'] }
      ]);
    }
  };

  // Start the test and timer
  const startTest = () => {
    fetchQuestions();
    setIsTestActive(true);
    setIsSubmitted(false);
    setTimeLeft(15 * 60);
    setAnswers({});
    setCurrentIdx(0);
  };

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTestActive) {
      // Auto submit on timer end
      submitTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectOption = (qIdx, optIdx) => {
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  const submitTest = () => {
    setIsTestActive(false);
    setIsSubmitted(true);
    
    // Logic to calculate score based on correctAnswer (in real app, submit to backend)
    // Here we just mock a score for Gamified UI demo
    const calculatedScore = Object.keys(answers).length * 10; 
    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      setShowConfetti(true);
    }
  };

  // Mocked 7-day streak history
  const streakHistory = [
    { day: 'M', status: 'completed' },
    { day: 'T', status: 'completed' },
    { day: 'W', status: 'missed' }, // Missed day shows space
    { day: 'T', status: 'completed' },
    { day: 'F', status: 'completed' },
    { day: 'S', status: 'upcoming' },
    { day: 'S', status: 'upcoming' },
  ];

  if (!isTestActive && !isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-t-4 border-indigo-500">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Daily Mock Challenge</h1>
          <p className="text-slate-500 mb-6">10 Random Questions • 15 Minutes</p>

          {/* 7-Day Streak Container UI */}
          <div className="mb-8 w-full bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your 7-Day Streak</h3>
            <div className="flex justify-between items-center gap-2">
              {streakHistory.map((item, index) => {
                let containerClass = "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ";
                
                if (item.status === 'completed') {
                  // Filled up container for used app
                  containerClass += "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110";
                } else if (item.status === 'missed') {
                  // Space of the container for missed day
                  containerClass += "bg-transparent border-2 border-dashed border-slate-300 text-slate-400 opacity-70";
                } else {
                  // Upcoming empty state
                  containerClass += "bg-slate-100 text-slate-400";
                }

                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className={containerClass}>
                      {item.status === 'completed' ? '✓' : ''}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl mb-6 text-sm font-semibold">
            🎯 Pass with 85% to maintain your streak!
          </div>
          <button 
            onClick={startTest}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2"
          >
            <span>Start Test Now</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans relative">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-6xl">
            🎉🎊🌟
          </div>
        )}
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Completed!</h2>
          <div className="my-6">
            <span className="text-5xl font-black text-indigo-600">{score}%</span>
            <p className="text-slate-500 mt-2 font-medium">Accuracy</p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 text-sm font-semibold">
            {score >= 85 ? 'Outstanding! You are on track.' : 'Keep practicing! Review your weak concepts.'}
          </div>
          <button 
            onClick={() => {setIsSubmitted(false); setShowConfetti(false);}}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-3xl">
        
        {/* Top Gamified Header */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-center justify-between border border-slate-100">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1.5 rounded-lg">
              Q {currentIdx + 1} / {questions.length}
            </span>
          </div>
          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-mono font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-900 text-white'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
          <button 
            onClick={submitTest}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Submit Early
          </button>
        </div>

        {/* Question Card */}
        {currentQ && (
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-snug">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentIdx, idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-base font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Navigation Bottom Bar */}
        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white shadow-sm disabled:opacity-50 transition-all hover:bg-slate-50"
          >
            Previous
          </button>
          
          {currentIdx < questions.length - 1 ? (
            <button 
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              className="px-8 py-3 rounded-xl font-bold text-white bg-slate-900 shadow-md hover:bg-slate-800 transition-all"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={submitTest}
              className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition-all"
            >
              Finish Test
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default MockTest;
