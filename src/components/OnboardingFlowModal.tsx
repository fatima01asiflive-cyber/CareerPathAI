import React, { useState } from 'react';
import { UserAccount, TabType, AcademicData } from '../types';
import { IntelliPathLogo } from './IntelliPathLogo';

interface OnboardingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onCompleteOnboarding: (userData: Partial<UserAccount>, academicData: Partial<AcademicData>, targetTab?: TabType) => void;
  onNavigate?: (tab: TabType) => void;
}

export const OnboardingFlowModal: React.FC<OnboardingFlowModalProps> = ({
  isOpen,
  onClose,
  user,
  onCompleteOnboarding,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  // Step 1: Account Info
  const [fullName, setFullName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [provider, setProvider] = useState<'email' | 'google' | 'apple' | 'facebook'>('email');

  // Step 2: Educational Background
  const [qualification, setQualification] = useState<string>('ICS (Computer Science)');
  const [boardOrUni, setBoardOrUni] = useState<string>('BISE Lahore');
  const [totalMarks, setTotalMarks] = useState<number>(1100);
  const [obtainedMarks, setObtainedMarks] = useState<number>(970);
  const [interestedInUni, setInterestedInUni] = useState<boolean>(true);
  const [passingYear, setPassingYear] = useState<string>('2026');
  const [city, setCity] = useState<string>('Lahore');

  // Step 3: Interests Selection (Multi-select)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'AI & Machine Learning',
    'Software Development',
    'Data Science',
  ]);

  // Step 5: Skill Self-Ratings
  const [skillRatings, setSkillRatings] = useState<Record<string, 'Beginner' | 'Intermediate' | 'Advanced'>>({
    Programming: 'Intermediate',
    Communication: 'Intermediate',
    ProblemSolving: 'Advanced',
    English: 'Advanced',
    Mathematics: 'Intermediate',
    PublicSpeaking: 'Beginner',
    Design: 'Beginner',
  });

  // Step 6: AI Mock Eligibility & Aptitude Test
  const [targetField, setTargetField] = useState<string>('AI & Machine Learning');
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);
  const [isTestPassed, setIsTestPassed] = useState<boolean>(true);

  if (!isOpen) return null;

  // Calculate percentage dynamically
  const marksPercentage = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 88;

  // Qualifications list as requested
  const qualificationsList = [
    'Matric (Science)',
    'Matric (Arts)',
    'FSC Pre-Medical',
    'FSC Pre-Engineering',
    'ICS (Computer Science)',
    'ICOM (Commerce)',
    'FA (Humanities & Arts)',
    'DAE (Diploma of Associate Engineering)',
    'A Levels (Cambridge / Edexcel)',
    'O Levels (Cambridge / Edexcel)',
    'BS Student (Undergraduate)',
    'Graduate (BS / MS Completed)',
  ];

  const boardsList = [
    'BISE Lahore',
    'FBISE (Federal Board Islamabad)',
    'BISE Rawalpindi',
    'BISE Faisalabad',
    'BISE Karachi (BIEK)',
    'BISE Peshawar',
    'BISE Multan',
    'BISE Gujranwala',
    'BISE Hyderabad',
    'BISE Quetta',
    'Cambridge Assessment International (CIE)',
    'University / Direct Institution',
  ];

  const availableInterests = [
    { id: 'ai', name: 'AI & Machine Learning', icon: 'psychology' },
    { id: 'software', name: 'Software Development', icon: 'code' },
    { id: 'robotics', name: 'Robotics & IoT', icon: 'robot_2' },
    { id: 'cyber', name: 'Cyber Security', icon: 'security' },
    { id: 'data', name: 'Data Science & Analytics', icon: 'analytics' },
    { id: 'cloud', name: 'Cloud Architecture & DevOps', icon: 'cloud' },
    { id: 'uiux', name: 'Graphic Design & UI/UX', icon: 'palette' },
    { id: 'business', name: 'Business & Tech Management', icon: 'business_center' },
    { id: 'medicine', name: 'Medicine & HealthTech', icon: 'medical_services' },
    { id: 'finance', name: 'Finance & FinTech', icon: 'attach_money' },
    { id: 'architecture', name: 'Architecture & 3D Modeling', icon: 'architecture' },
    { id: 'psychology', name: 'Psychology & HCI', icon: 'neurology' },
    { id: 'teaching', name: 'Teaching & EdTech', icon: 'school' },
  ];

  // Adaptive Aptitude Test Questions for Step 6
  const aptitudeQuestions = [
    {
      id: 1,
      category: 'Logic & Programming',
      question: 'What is the algorithmic time complexity of searching a sorted array of 1,000,000 items using Binary Search?',
      options: ['O(1)', 'O(log N) — ~20 comparisons', 'O(N) — 1,000,000 comparisons', 'O(N^2)'],
      correctIndex: 1,
    },
    {
      id: 2,
      category: 'Mathematics & Statistics',
      question: 'If a matrix A has dimensions (4 × 3) and matrix B has dimensions (3 × 5), what is the shape of their product A × B?',
      options: ['(4 × 5)', '(3 × 3)', '(5 × 4)', 'Cannot be multiplied'],
      correctIndex: 0,
    },
    {
      id: 3,
      category: 'Pattern Recognition',
      question: 'Identify the next number in the computational sequence: 3, 7, 15, 31, 63, __?',
      options: ['95', '127 (Rule: 2n + 1)', '128', '110'],
      correctIndex: 1,
    },
    {
      id: 4,
      category: 'Problem Solving & System Logic',
      question: 'In a real-time web application handling 50,000 concurrent requests, what is the best strategy to prevent database bottlenecks?',
      options: [
        'Use Redis in-memory caching and connection pooling',
        'Restart the database server every 5 minutes',
        'Store everything in browser localStorage',
        'Run recursive synchronous loops',
      ],
      correctIndex: 0,
    },
    {
      id: 5,
      category: 'Technical Comprehension',
      question: 'What is the primary role of a loss function in training machine learning models?',
      options: [
        'To quantify the difference between predicted outputs and ground truth values',
        'To speed up CPU clock frequency',
        'To compress database tables into zip archives',
        'To render 3D graphics in the web browser',
      ],
      correctIndex: 0,
    },
  ];

  const handleToggleInterest = (name: string) => {
    if (selectedInterests.includes(name)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== name));
      }
    } else {
      setSelectedInterests([...selectedInterests, name]);
    }
  };

  const handleSocialSelect = (p: 'google' | 'apple' | 'facebook') => {
    setLoadingProvider(p);
    setTimeout(() => {
      setProvider(p);
      if (p === 'google') {
        setFullName(fullName || 'Alex Rivera (Google)');
        setEmail(email || 'alex.rivera.google@gmail.com');
      } else if (p === 'apple') {
        setFullName(fullName || 'Alex Rivera (Apple)');
        setEmail(email || 'alex.rivera@icloud.com');
      }
      setLoadingProvider(null);
      setCurrentStep(2); // Advance to Educational Background
    }, 600);
  };

  const handleAptitudeSubmit = () => {
    let score = 0;
    aptitudeQuestions.forEach((q) => {
      if (testAnswers[q.id] === q.correctIndex) {
        score += 20; // 5 questions = 100 points
      }
    });

    setTestScore(score);
    const passed = score >= 60; // 60% threshold
    setIsTestPassed(passed);
    setTestSubmitted(true);
  };

  const handleFinishOnboarding = () => {
    // Determine eligibility score based on marks + test
    const finalEligibility = Math.round(marksPercentage * 0.5 + testScore * 0.5);

    const fscStreamFormatted = qualification.includes('Pre-Medical')
      ? 'Pre-Medical'
      : qualification.includes('Pre-Engineering')
      ? 'Pre-Engineering'
      : qualification.includes('ICS')
      ? 'ICS'
      : qualification.includes('A Levels')
      ? 'A-Levels'
      : qualification.includes('O Levels')
      ? 'O-Levels'
      : qualification.includes('BS')
      ? 'BS Student'
      : qualification.includes('Graduate')
      ? 'Graduate'
      : 'ICS';

    const updatedUser: Partial<UserAccount> = {
      isLoggedIn: true,
      name: fullName || 'Career Architect',
      email: email || 'student@intellipath.edu',
      provider: provider,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email || fullName || 'Alex')}`,
      role: `${qualification} Candidate`,
      preferredField: selectedInterests[0] || 'AI & Machine Learning',
      interestedInUni: interestedInUni,
      fscStream: fscStreamFormatted as any,
      lastMarks: `${obtainedMarks} / ${totalMarks} (${marksPercentage}%)`,
      eligibilityScore: finalEligibility,
      eligibilityStatus: isTestPassed ? 'Direct Eligible' : 'Recommended Foundation Month',
      dailyStudyHours: 3,
    };

    const academicData: Partial<AcademicData> = {
      qualification: qualification,
      boardOrUni: boardOrUni,
      totalMarks: String(totalMarks),
      obtainedMarks: String(obtainedMarks),
      percentage: marksPercentage,
      aggregateMarks: `${marksPercentage}% Aggregate`,
      fscStream: fscStreamFormatted as any,
      passingYear: passingYear,
      city: city,
    };

    // If test score is lower than threshold, send user to foundation courses / skill-gap first!
    const targetTab: TabType = !isTestPassed
      ? 'courses'
      : interestedInUni
      ? 'universities'
      : 'roadmap';

    onCompleteOnboarding(updatedUser, academicData, targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-white relative my-8 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 mb-6">
          <IntelliPathLogo size="sm" variant="horizontal" />
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-[11px] font-bold">
              STEP {currentStep} OF 5
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="grid grid-cols-5 gap-1.5 mb-6 relative z-10">
          {[
            { num: 1, label: 'Account' },
            { num: 2, label: 'Education' },
            { num: 3, label: 'Interests' },
            { num: 4, label: 'Skills' },
            { num: 5, label: 'Aptitude Test' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                  currentStep >= s.num
                    ? 'bg-gradient-to-r from-sky-400 to-emerald-400'
                    : 'bg-white/10'
                }`}
              />
              <span
                className={`text-[9px] font-mono hidden sm:inline ${
                  currentStep === s.num
                    ? 'text-sky-300 font-bold'
                    : currentStep > s.num
                    ? 'text-emerald-400'
                    : 'text-white/40'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: ACCOUNT AUTHENTICATION */}
        {currentStep === 1 && (
          <div className="space-y-6 relative z-10 animate-fade-in">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {authMode === 'signup' ? 'Create Your IntelliPath Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                “Discover your path. Build your skills. Shape your future.”
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSelect('google')}
                disabled={loadingProvider !== null}
                className="py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSelect('apple')}
                disabled={loadingProvider !== null}
                className="py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-base">apple</span>
                <span>Apple ID</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-mono uppercase text-white/40">Or with Email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep(2);
              }}
              className="space-y-4"
            >
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Fatima Asif"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@intellipath.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
                  className="text-sky-400 hover:underline"
                >
                  {authMode === 'signup'
                    ? 'Already have an account? Sign In'
                    : 'New to IntelliPath? Register'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl font-bold font-mono text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Educational Background</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: EDUCATIONAL BACKGROUND & MARKS */}
        {currentStep === 2 && (
          <div className="space-y-5 relative z-10 animate-fade-in">
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400">school</span>
                <span>Step 2: Educational Background</span>
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Tell us your current qualification so the AI can evaluate university and career eligibility.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">
                  Select Current Qualification
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-hidden focus:border-sky-500"
                >
                  {qualificationsList.map((q) => (
                    <option key={q} value={q} className="bg-slate-900 text-white">
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Board / University
                  </label>
                  <select
                    value={boardOrUni}
                    onChange={(e) => setBoardOrUni(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-hidden focus:border-sky-500"
                  >
                    {boardsList.map((b) => (
                      <option key={b} value={b} className="bg-slate-900 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    City / Domicile
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore, Islamabad, Karachi"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Marks & Percentage */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-300">
                    Academic Scores & Percentage
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                    {marksPercentage}% Calculated
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(Number(e.target.value) || 1100)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">
                      Obtained Marks
                    </label>
                    <input
                      type="number"
                      value={obtainedMarks}
                      onChange={(e) => setObtainedMarks(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* University vs Direct Skill Track */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <label className="block text-xs font-mono font-bold text-white mb-2">
                  What is your primary goal after this stage?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterestedInUni(true)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      interestedInUni
                        ? 'bg-sky-500/20 border-sky-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-400 text-lg">account_balance</span>
                      <span className="text-xs font-bold font-mono">University Admissions</span>
                    </div>
                    <p className="text-[10px] text-white/60 mt-1">
                      Target BS programs (NUST, FAST, COMSATS, GIKI)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterestedInUni(false)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      !interestedInUni
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-lg">bolt</span>
                      <span className="text-xs font-bold font-mono">Direct Skill / Job Track</span>
                    </div>
                    <p className="text-[10px] text-white/60 mt-1">
                      Hands-on bootcamps, capstones & remote tech jobs
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white text-xs font-mono"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold font-mono text-xs flex items-center gap-2 shadow-md shadow-sky-600/30"
              >
                <span>Continue to Interests</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS SELECTION */}
        {currentStep === 3 && (
          <div className="space-y-5 relative z-10 animate-fade-in">
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">target</span>
                <span>Step 3: Define Your Future Interests</span>
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Select the technical and creative disciplines you are enthusiastic to explore.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.name);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleToggleInterest(interest.name)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-amber-400' : 'text-white/40'}`}>
                        {interest.icon}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-xs text-amber-400 font-bold">check</span>
                      )}
                    </div>
                    <span className="text-xs font-bold leading-tight">{interest.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white text-xs font-mono"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl font-extrabold font-mono text-xs flex items-center gap-2 shadow-md shadow-amber-600/30"
              >
                <span>Continue to Skill Rating</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SKILL SELF-ASSESSMENT */}
        {currentStep === 4 && (
          <div className="space-y-5 relative z-10 animate-fade-in">
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-400">checklist</span>
                <span>Step 4: Skill Self-Rating</span>
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Rate your current proficiency in each fundamental capability.
              </p>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {[
                'Programming',
                'Communication',
                'ProblemSolving',
                'English',
                'Mathematics',
                'PublicSpeaking',
                'Design',
              ].map((skillKey) => {
                const currentRating = skillRatings[skillKey] || 'Beginner';
                return (
                  <div
                    key={skillKey}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <span className="text-xs font-bold font-mono text-white">
                      {skillKey === 'ProblemSolving'
                        ? 'Problem Solving'
                        : skillKey === 'PublicSpeaking'
                        ? 'Public Speaking'
                        : skillKey}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSkillRatings({ ...skillRatings, [skillKey]: lvl })}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all ${
                            currentRating === lvl
                              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                              : 'bg-white/5 text-white/50 hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white text-xs font-mono"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-extrabold font-mono text-xs flex items-center gap-2 shadow-md shadow-cyan-500/30"
              >
                <span>Take Mock Aptitude Test</span>
                <span className="material-symbols-outlined text-sm font-bold">verified</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: AI MOCK ELIGIBILITY & APTITUDE TEST */}
        {currentStep === 5 && (
          <div className="space-y-5 relative z-10 animate-fade-in">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">verified</span>
                  <span>Step 5: AI Mock Aptitude & Diagnostic Test</span>
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  {selectedInterests[0] || 'AI & Machine Learning'}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                Attempt these 5 screening questions. If you pass (≥60%), your direct roadmap unlocks; otherwise, the AI customizes a Foundation Month for you!
              </p>
            </div>

            {!testSubmitted ? (
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {aptitudeQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-400">
                        Q{qIdx + 1}: {q.category}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white leading-relaxed">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setTestAnswers({ ...testAnswers, [q.id]: optIdx })}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                            testAnswers[q.id] === optIdx
                              ? 'bg-sky-600/30 border-sky-500 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                          }`}
                        >
                          <span>{opt}</span>
                          {testAnswers[q.id] === optIdx && (
                            <span className="material-symbols-outlined text-sm text-sky-400">check_circle</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAptitudeSubmit}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-extrabold text-xs font-mono rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>Evaluate Aptitude & Calculate Roadmap</span>
                </button>
              </div>
            ) : (
              /* TEST RESULTS SCREEN */
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-5 text-center animate-fade-in">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl shadow-xl ${
                    isTestPassed
                      ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400'
                      : 'bg-amber-500/20 border-2 border-amber-400 text-amber-400'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {isTestPassed ? 'workspace_premium' : 'psychology_alt'}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-white">
                    {isTestPassed ? 'Target Field Readiness Verified!' : 'Foundation Track Recommended'}
                  </h4>
                  <p className="text-xs text-white/70 max-w-md mx-auto mt-1">
                    {isTestPassed
                      ? `You scored ${testScore}% on the ${selectedInterests[0]} Aptitude Test. Your direct advanced career roadmap is unlocked!`
                      : `You scored ${testScore}%. The AI has scheduled a 1-month Foundation module (CS Logic & Math Primer) so you achieve 100% mastery.`}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-mono text-white/50">Aptitude Score</p>
                    <p className="text-base font-extrabold text-sky-400 font-mono">{testScore}%</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-mono text-white/50">Academic Merit</p>
                    <p className="text-base font-extrabold text-emerald-400 font-mono">{marksPercentage}%</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-mono text-white/50">Pathway</p>
                    <p className="text-xs font-bold text-amber-300 font-mono mt-1">
                      {isTestPassed ? 'Direct Track' : 'Foundation 1M'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 via-indigo-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-sky-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch My Personalized IntelliPath Workspace</span>
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
