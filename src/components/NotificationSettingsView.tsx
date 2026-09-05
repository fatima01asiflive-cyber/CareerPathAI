import React, { useState } from 'react';
import { NotificationSettings } from '../types';

interface NotificationSettingsViewProps {
  settings: NotificationSettings;
  onUpdateSettings: (newSettings: Partial<NotificationSettings>) => void;
  isDarkMode: boolean;
  onTriggerAlarm?: (title: string, date: string, time: string, module: string) => void;
}

export const NotificationSettingsView: React.FC<NotificationSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  isDarkMode,
  onTriggerAlarm,
}) => {
  const [autoReminders, setAutoReminders] = useState(settings.autoReminders ?? true);
  const [morningTime, setMorningTime] = useState(settings.morningTime || '08:30 AM');
  const [afternoonTime, setAfternoonTime] = useState(settings.afternoonTime || '02:00 PM');
  const [eveningTime, setEveningTime] = useState(settings.eveningTime || '08:00 PM');
  const [aiCoachUpdates, setAiCoachUpdates] = useState(settings.aiCoachUpdates ?? true);
  const [projectMilestones, setProjectMilestones] = useState(settings.projectMilestones ?? true);

  const handleSave = () => {
    onUpdateSettings({
      autoReminders,
      morningTime,
      afternoonTime,
      eveningTime,
      aiCoachUpdates,
      projectMilestones,
    });
  };

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-[#f8ddd2]" : "text-[#191c1e]"}`}>
      <section className="mb-8">
        <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-[#ffb693]" : "text-[#003535]"}`}>
          Notification Settings
        </h2>
        <p className="text-xs md:text-sm text-[#707978] mt-1">
          Customize how and when you receive path updates, deadline reminders, and coach feedback.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Automatic Deadline Reminders */}
          <div className={`p-6 border rounded-2xl shadow-sm space-y-6 transition-all ${
            isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
          }`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#fb7800]/10 text-[#fb7800] rounded-xl">
                  <span className="material-symbols-filled text-2xl">notifications_active</span>
                </div>
                <div>
                  <h3 className={`font-bold text-base ${isDarkMode ? "text-[#ffb693]" : "text-[#003535]"}`}>
                    Automatic Deadline Reminders
                  </h3>
                  <p className="text-xs text-[#707978]">
                    Send 3x daily alerts for urgent quizzes and milestone deadlines.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setAutoReminders(!autoReminders);
                  handleSave();
                }}
                className={`w-12 h-7 rounded-full p-1 transition-colors ${
                  autoReminders ? "bg-[#fb7800]" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  autoReminders ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Time Pickers for 3x Daily Reminders */}
            {autoReminders && (
              <div className="space-y-4 border-t border-[#bfc8c8] dark:border-[#5a4136] pt-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#707978]">
                  SCHEDULED DAILY REMINDER SLOTS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Slot 1 */}
                  <div className={`p-3 rounded-xl border ${
                    isDarkMode ? "bg-[#261812] border-[#5a4136]" : "bg-[#f2f4f6] border-[#e0e3e5]"
                  }`}>
                    <label className="text-[11px] font-semibold text-[#707978] block mb-1">
                      Morning Slot
                    </label>
                    <input
                      type="text"
                      value={morningTime}
                      onChange={(e) => {
                        setMorningTime(e.target.value);
                        handleSave();
                      }}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* Slot 2 */}
                  <div className={`p-3 rounded-xl border ${
                    isDarkMode ? "bg-[#261812] border-[#5a4136]" : "bg-[#f2f4f6] border-[#e0e3e5]"
                  }`}>
                    <label className="text-[11px] font-semibold text-[#707978] block mb-1">
                      Afternoon Slot
                    </label>
                    <input
                      type="text"
                      value={afternoonTime}
                      onChange={(e) => {
                        setAfternoonTime(e.target.value);
                        handleSave();
                      }}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* Slot 3 */}
                  <div className={`p-3 rounded-xl border ${
                    isDarkMode ? "bg-[#261812] border-[#5a4136]" : "bg-[#f2f4f6] border-[#e0e3e5]"
                  }`}>
                    <label className="text-[11px] font-semibold text-[#707978] block mb-1">
                      Evening Slot
                    </label>
                    <input
                      type="text"
                      value={eveningTime}
                      onChange={(e) => {
                        setEveningTime(e.target.value);
                        handleSave();
                      }}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Coach Updates Toggle */}
          <div className={`p-6 border rounded-2xl shadow-sm flex justify-between items-center transition-all ${
            isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#003535]/10 text-[#003535] dark:text-[#ffb693] rounded-xl">
                <span className="material-symbols-filled text-2xl">robot_2</span>
              </div>
              <div>
                <h3 className={`font-bold text-base ${isDarkMode ? "text-[#ffb693]" : "text-[#003535]"}`}>
                  AI Coach Updates
                </h3>
                <p className="text-xs text-[#707978]">
                  Receive real-time career advice and progress check-ins from Coach Sarah.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setAiCoachUpdates(!aiCoachUpdates);
                handleSave();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                aiCoachUpdates ? "bg-[#fb7800]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                aiCoachUpdates ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* Project Milestones Toggle */}
          <div className={`p-6 border rounded-2xl shadow-sm flex justify-between items-center transition-all ${
            isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#85bdbc]/20 text-[#003535] dark:text-[#ffb693] rounded-xl">
                <span className="material-symbols-filled text-2xl">assignment_turned_in</span>
              </div>
              <div>
                <h3 className={`font-bold text-base ${isDarkMode ? "text-[#ffb693]" : "text-[#003535]"}`}>
                  Project Milestones
                </h3>
                <p className="text-xs text-[#707978]">
                  Alerts for capstone sub-deliverable approvals and peer reviews.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setProjectMilestones(!projectMilestones);
                handleSave();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                projectMilestones ? "bg-[#fb7800]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                projectMilestones ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>

        {/* Right Column: Smartphone Lock Screen Notification Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#707978] mb-4">
            REAL-TIME LOCK SCREEN PREVIEW
          </p>

          <div className="w-[300px] h-[580px] rounded-[40px] bg-gradient-to-b from-[#1c2e3d] to-[#091118] border-[8px] border-gray-800 shadow-2xl relative overflow-hidden flex flex-col p-6 text-white select-none">
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-gray-900 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20" />

            {/* Time & Lock Header */}
            <div className="text-center pt-8 space-y-1">
              <span className="material-symbols-outlined text-lg opacity-80">lock</span>
              <h2 className="text-5xl font-extralight tracking-tight">09:41</h2>
              <p className="text-xs font-medium text-gray-300">Wednesday, October 18</p>
            </div>

            {/* Lock Screen Notification Cards Stack */}
            <div className="mt-12 space-y-3">
              {/* Active Toast Notification */}
              {autoReminders ? (
                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg text-left transition-all animate-fadeIn">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                        IP
                      </div>
                      <span className="font-bold text-[11px] text-white/90">Intelli Path</span>
                      <span className="text-[10px] text-white/60">• {morningTime}</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-300 uppercase">URGENT</span>
                  </div>
                  <p className="font-bold text-xs text-white">Upcoming Quiz Tomorrow!</p>
                  <p className="text-[11px] text-gray-200 mt-0.5 leading-snug">
                    Data Structures Quiz tomorrow at {morningTime}! Review the 'Binary Trees' module.
                  </p>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl text-center text-xs text-gray-400">
                  Daily deadline reminders are paused.
                </div>
              )}

              {aiCoachUpdates && (
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-md text-left">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#003535] flex items-center justify-center text-[10px] text-white">
                        <span className="material-symbols-filled text-[12px]">robot_2</span>
                      </div>
                      <span className="font-bold text-[11px] text-white/90">Coach Sarah</span>
                      <span className="text-[10px] text-white/60">• 1h ago</span>
                    </div>
                  </div>
                  <p className="font-semibold text-xs text-white">CGPA Optimization Tip</p>
                  <p className="text-[11px] text-gray-200 mt-0.5 leading-snug">
                    "Great work scoring 98% on TypeScript! Next step is your Capstone architecture."
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Swipe Bar */}
            <div className="mt-auto pt-4 text-center">
              <div className="w-32 h-1 bg-white/50 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
