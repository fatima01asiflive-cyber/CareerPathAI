import React, { useState } from 'react';
import { QuizRunnerModal } from './QuizRunnerModal';

interface AssessmentsPrepProps {
  isDarkMode: boolean;
}

export const AssessmentsPrep: React.FC<AssessmentsPrepProps> = ({ isDarkMode }) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [pathCompleted, setPathCompleted] = useState(false);
  const [completingPath, setCompletingPath] = useState(false);

  const capstoneImg =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5l5BdfL9VI6XibFvex6DRc75Nk532jGvixAb8Nc6aHOD15TzFLERX_3wTAGK9KqPeqvAhq65p4Hb5YXXDzH-f9WrNkngaGs9N_4EU-TCcwQP9n_Fb7q4xWs307TRL9Hu_pBo-Fs3-j_yKm1iZSKusSJFwVifNjW3HrIdt9ZH3WqtyjoWi0dUTMrPcqfiTNjdL7hgP5fH20cCAORcL0bF5V23xZCDL8T6acxX_xQ-Cf9y7uFY6-s";

  const handleCompletePath = () => {
    setCompletingPath(true);
    setTimeout(() => {
      setCompletingPath(false);
      setPathCompleted(true);
    }, 1500);
  };

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      <div className="space-y-10">
        {/* Asymmetric Grid: Course Quiz & Interview Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Course Quiz (7 cols) */}
          <section className={`lg:col-span-7 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all glass-card ${
            isDarkMode ? "hover:border-indigo-500/30" : "hover:border-indigo-300"
          }`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold mb-3">
                  COURSE QUIZ
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">
                  Data Structures Mastery
                </h3>
                <p className="text-xs md:text-sm text-white/60 mt-1">
                  Test your fundamental understanding of algorithmic efficiency.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-indigo-400">
                  school
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {/* Topic 1 */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="font-semibold text-sm">Topic 1: Big O Analysis</span>
                </div>
                <span className="material-symbols-filled text-emerald-400">check_circle</span>
              </div>

              {/* Topic 2 */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <span className="font-semibold text-sm">Topic 2: Linked Lists & Trees</span>
                </div>
                <span className="material-symbols-outlined text-white/40">radio_button_unchecked</span>
              </div>

              {/* Topic 3 */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/30 transition-all opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="font-semibold text-sm">Topic 3: Hash Tables Efficiency</span>
                </div>
                <span className="material-symbols-outlined text-white/40">lock</span>
              </div>
            </div>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
            >
              <span>Start Module Quiz</span>
              <span className="material-symbols-outlined">play_arrow</span>
            </button>
          </section>

        </div>


        {/* Final Capstone Project Card */}
        <section className="rounded-3xl overflow-hidden glass-card border border-white/10 shadow-xl relative transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 h-64 lg:h-auto relative overflow-hidden">
              <img
                src={capstoneImg}
                alt="Capstone Project Visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 lg:hidden">
                <span className="text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase">CAPSTONE</span>
                <h4 className="text-white font-extrabold text-lg">AI-Driven Path Finder</h4>
              </div>
            </div>

            <div className="lg:col-span-8 p-6 md:p-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="hidden lg:inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold mb-2">
                    CAPSTONE PROJECT
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Final Capstone Project
                  </h3>
                  <p className="text-sm md:text-base text-white/60 mt-1">
                    Build a comprehensive AI Recommendation Engine using Python and TensorFlow.
                  </p>
                </div>

                <div className="bg-rose-500/20 text-rose-300 px-4 py-2 rounded-2xl border border-rose-500/30 deadline-pulse shrink-0">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest leading-tight">
                    PROJECT DEADLINE
                  </p>
                  <p className="font-bold text-base md:text-lg font-mono leading-tight">Oct 24, 2023</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-6">
                {/* Project Brief */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">description</span>
                    <span>Detailed Brief</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                    Your task is to design, develop, and deploy a web application that predicts career success based on educational background and interests. Must include a documentation suite and a 5-minute video presentation.
                  </p>
                </div>

                {/* Required Resources */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">folder_open</span>
                    <span>Required Resources</span>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li className="flex items-center gap-2 text-white/70 font-mono">
                      <span className="material-symbols-outlined text-base text-indigo-400">attachment</span>
                      <span>Dataset: CareerMetrics_V2.csv</span>
                    </li>
                    <li className="flex items-center gap-2 text-white/70 font-mono">
                      <span className="material-symbols-outlined text-base text-indigo-400">attachment</span>
                      <span>API Specification Doc (v1.4)</span>
                    </li>
                    <li className="flex items-center gap-2 text-white/70 font-mono">
                      <span className="material-symbols-outlined text-base text-indigo-400">attachment</span>
                      <span>Brand Assets & UI Guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[65%]" />
                </div>
                <div className="flex justify-between text-xs font-mono font-bold text-indigo-300">
                  <span>65% PRE-REQUISITES MET</span>
                  <span>3 MODULES REMAINING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shrink-0 shadow-lg shadow-indigo-600/30">
              <span className="material-symbols-filled text-2xl">workspace_premium</span>
            </div>
            <div>
              <p className="font-bold text-lg md:text-xl text-white">
                Professional Certification
              </p>
              <p className="text-xs md:text-sm text-white/60">
                Upon completion, you'll receive a verified AI Career Architect credential.
              </p>
            </div>
          </div>

          <button
            onClick={handleCompletePath}
            disabled={completingPath}
            className={`w-full md:w-auto px-10 py-4 rounded-2xl font-medium text-base shadow-lg transition-all flex items-center justify-center gap-3 shrink-0 ${
              pathCompleted
                ? "bg-emerald-600 text-white shadow-emerald-600/25"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95"
            }`}
          >
            <span>
              {completingPath
                ? "Verifying Path..."
                : pathCompleted
                ? "Path Verified & Certified"
                : "Complete Path"}
            </span>
            <span className="material-symbols-outlined">
              {completingPath
                ? "hourglass_empty"
                : pathCompleted
                ? "check_circle"
                : "arrow_forward_ios"}
            </span>
          </button>
        </div>
      </div>

      <QuizRunnerModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
};
