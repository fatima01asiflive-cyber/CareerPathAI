import React, { useState } from 'react';
import { AcademicData, TabType } from '../types';

interface AcademicJourneyProps {
  academicData: AcademicData;
  onUpdateAcademic: (data: Partial<AcademicData>) => void;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

export const AcademicJourney: React.FC<AcademicJourneyProps> = ({
  academicData,
  onUpdateAcademic,
  onNavigate,
  isDarkMode,
}) => {
  const [degree, setDegree] = useState(academicData.degree || '');
  const [marks, setMarks] = useState(academicData.aggregateMarks || '');
  const [cgpa, setCgpa] = useState(academicData.cgpa || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAcademic({ degree, aggregateMarks: marks, cgpa });
    onNavigate('interests');
  };

  const studentAvatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAaKlTXFBlS-lLdE9ok1Ql10dc9HJYmy555y2nubetlj8Y0FrVL2UHw_Y-FRPu4ibpVIR470-wvI44kkt74_8L0DEnf2anf2v8u5x1NtEqmD0lLwpp66t1LdftGa0WK30gZQHGoCx0jTAGBp4szElthmjjZ9iYYMENPpDg9GO3eJJCzzdJd7Fwbl6vR4eKrS2tnsfOgrYy6qHSr7JgXk2JzwyKYTa-2MNUw8v6Sv0Dz3eoI6XmCbJE";

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-[#f8ddd2]" : "text-[#191c1e]"}`}>
      {/* Progress Growth Path Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-3 text-xs md:text-sm">
          <span className="font-bold text-[#003535] dark:text-[#ffb693]">Academic Background</span>
          <span className="text-[#707978]">Step 1 of 4</span>
        </div>
        <div className="h-3 w-full bg-[#eceef0] dark:bg-[#362720] rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#fb7800] w-1/4 rounded-full transition-all duration-700 ease-out" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-[#003535] dark:bg-[#ffb693] rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Guiding Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4 mb-2 lg:hidden">
            <img src={studentAvatar} alt="Student profile" className="w-12 h-12 rounded-full object-cover border" />
            <div>
              <p className="font-bold text-sm">Welcome Alex</p>
              <p className="text-xs text-[#707978]">Computer Science Student</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#003535] dark:text-[#ffb693] leading-tight">
            Tell us about your <br />
            <span className="text-[#994700] dark:text-[#ffb68b]">Academic Journey.</span>
          </h2>

          <p className="text-sm md:text-base text-[#707978] leading-relaxed">
            Your academic records help our AI engine map your current skills to industry benchmarks. This ensures your career roadmap is both ambitious and achievable.
          </p>

          <div className={`p-6 border rounded-xl space-y-3 ${
            isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
          }`}>
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-[#fb7800] text-2xl shrink-0">
                verified
              </span>
              <div>
                <h4 className="font-bold text-sm text-[#003535] dark:text-[#ffb693]">
                  Why this matters?
                </h4>
                <p className="text-xs text-[#707978] mt-1 leading-relaxed">
                  Top companies use academic metrics as initial filters. We use them to calibrate your preparation intensity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Canvas */}
        <div className="lg:col-span-7">
          <div className={`border rounded-2xl p-6 md:p-8 shadow-sm transition-all ${
            isDarkMode ? "bg-[#170b06] border-[#5a4136]" : "bg-white border-[#bfc8c8]"
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Last Degree */}
              <div className="space-y-2">
                <label className="font-bold text-xs uppercase tracking-wider text-[#707978]">
                  Last Degree / Current Pursuit
                </label>
                <div className="relative">
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                    className={`w-full h-12 px-4 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#003535] appearance-none ${
                      isDarkMode ? "border-[#5a4136] text-[#f8ddd2]" : "border-[#bfc8c8] text-[#191c1e]"
                    }`}
                  >
                    <option value="" disabled className="dark:bg-[#170b06]">Select your degree</option>
                    <option value="B.Tech / B.E." className="dark:bg-[#170b06]">B.Tech / B.E. Computer Science</option>
                    <option value="B.Sc CS" className="dark:bg-[#170b06]">B.Sc Computer Science</option>
                    <option value="MCA" className="dark:bg-[#170b06]">Master of Computer Applications</option>
                    <option value="M.Tech" className="dark:bg-[#170b06]">M.Tech / M.E.</option>
                    <option value="Other" className="dark:bg-[#170b06]">Other Professional Degree</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#707978]">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aggregate Marks */}
                <div className="space-y-2">
                  <label className="font-bold text-xs uppercase tracking-wider text-[#707978]">
                    Aggregate Marks (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 85"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      required
                      className={`w-full h-12 px-4 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#003535] ${
                        isDarkMode ? "border-[#5a4136] text-[#f8ddd2]" : "border-[#bfc8c8] text-[#191c1e]"
                      }`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#707978] font-bold text-xs">
                      %
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707978] italic">Average across all semesters</p>
                </div>

                {/* CGPA */}
                <div className="space-y-2">
                  <label className="font-bold text-xs uppercase tracking-wider text-[#707978]">
                    CGPA (On 10-point scale)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. 8.5"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      required
                      className={`w-full h-12 px-4 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#003535] ${
                        isDarkMode ? "border-[#5a4136] text-[#f8ddd2]" : "border-[#bfc8c8] text-[#191c1e]"
                      }`}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#707978] text-lg">
                      star
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707978] italic">Standard scale preferred</p>
                </div>
              </div>

              {/* Info Tip */}
              <div className={`flex items-start gap-3 p-4 rounded-xl ${
                isDarkMode ? "bg-[#261812]" : "bg-[#f2f4f6]"
              }`}>
                <span className="material-symbols-filled text-[#85bdbc] text-xl shrink-0">
                  info
                </span>
                <p className="text-xs text-[#707978] leading-relaxed">
                  If your university uses a different scale, please convert it to a percentage or 10-point CGPA for better AI matching.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#fb7800] hover:bg-[#994700] text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Next: Select Interests</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
