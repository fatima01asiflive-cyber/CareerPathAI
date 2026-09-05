import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { IntelliPathLogo } from '../components/IntelliPathLogo';

export const ProfileSetup: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState<number | ''>(user?.age ?? '');
  const [gender, setGender] = useState(user?.gender || '');
  const [city, setCity] = useState(user?.city || '');
  const [country] = useState('Pakistan');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const pakistaniCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Multan',
    'Faisalabad',
    'Peshawar',
    'Quetta',
    'Gujranwala',
    'Sialkot',
    'Hyderabad',
    'Bahawalpur',
    'Sargodha',
    'Abbottabad',
    'Sukkur',
    'Mardan',
  ];

  const [educationLevel, setEducationLevel] = useState(
    user?.educationLevel || 'Intermediate (FSc)'
  );
  const [institution, setInstitution] = useState(user?.institution || '');
  const [academicField, setAcademicField] = useState(
    user?.academicField || ''
  );
  const [marksPercentage, setMarksPercentage] = useState<number | ''>(user?.marksPercentage ?? '');
  const [favoriteSubjects, setFavoriteSubjects] = useState(
    user?.favoriteSubjects || ''
  );
  const [previousQualifications, setPreviousQualifications] = useState(
    user?.previousQualifications || ''
  );

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );
  const [otherInterests, setOtherInterests] = useState(user?.otherInterests || '');

  const [careerGoals, setCareerGoals] = useState<string[]>(
    user?.careerGoals || []
  );
  const [continueStudies, setContinueStudies] = useState<'Yes' | 'Maybe' | 'No' | ''>(
    user?.continueStudies || ''
  );
  const [marksError, setMarksError] = useState('');

  const avatarOptions = [
    { id: 'avatar-1', icon: 'person', label: 'Tech Lead' },
    { id: 'avatar-2', icon: 'psychology', label: 'AI Researcher' },
    { id: 'avatar-3', icon: 'design_services', label: 'Designer' },
    { id: 'avatar-4', icon: 'insights', label: 'Data Analyst' },
    { id: 'avatar-5', icon: 'biotech', label: 'Bio Scientist' },
  ];

  const interestCategories = [
    {
      category: 'Computer Science',
      items: [
        'Software Development',
        'AI/ML',
        'Data Science',
        'Cloud Computing',
        'Cyber Security',
        'Web Development',
        'Mobile Development',
        'DevOps',
      ],
    },
  ];

  const goalOptions = [
    'Get a high-paying job',
    'Continue higher education (Master’s/PhD)',
    'Build professional skills & certifications',
    'Start freelancing & independent consulting',
    'Start a business / tech startup',
    'Prepare for a specific career switch',
    'Explore different career options',
  ];

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = (goal: string) => {
    setCareerGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNextStep = async () => {
    if (step === 2) {
      const hasMarks = marksPercentage !== '' && !Number.isNaN(Number(marksPercentage));

      if (!hasMarks) {
        setMarksError('Please enter your current percentage, marks, or GPA before continuing.');
        return;
      }

      setMarksError('');
    }

    if (step < 4) {
      setStep((step + 1) as 2 | 3 | 4);
    } else {
      // Step 4 Complete -> Save and Trigger AI Interest Analysis
      await updateProfile({
        name,
        age: Number(age) || undefined,
        gender,
        city,
        country: 'Pakistan',
        avatar,
        educationLevel,
        institution,
        academicField,
        marksPercentage: Number(marksPercentage) || undefined,
        favoriteSubjects,
        previousQualifications,
        interests: selectedInterests,
        otherInterests,
        careerGoals,
        continueStudies: continueStudies || undefined,
        profileCompleted: true,
      });

      setIsAnalyzing(true);

      // Multi-stage AI Interest Analysis simulation
      setTimeout(() => setAnalysisStep(1), 700);
      setTimeout(() => setAnalysisStep(2), 1400);
      setTimeout(() => setAnalysisStep(3), 2100);
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate('/assessment');
      }, 2900);
    }
  };

  // AI Interest Analysis Transitional Loading Screen
  if (isAnalyzing) {
    const analysisStepsText = [
      'Analyzing your Computer Science academic profile...',
      'Mapping your current Computer Science interests...',
      'Preparing Computer Science aptitude categories...',
      'Preparing your personalized 10-question diagnostic assessment...',
    ];

    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center space-y-8 bg-slate-950">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin" />
          <span className="material-symbols-outlined text-3xl text-sky-400 absolute inset-0 flex items-center justify-center animate-pulse">
            psychology
          </span>
        </div>

        <div className="space-y-3 max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>AI ENGINE ACTIVE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Personalizing Your Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 transition-all font-medium">
            {analysisStepsText[analysisStep]}
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="w-full max-w-xs bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-linear-to-r from-sky-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${((analysisStep + 1) / 4) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
          <span>Student Onboarding Wizard</span>
          <span className="text-sky-400 font-bold">• Step {step} of 4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Educational Background'}
          {step === 3 && 'Course & Career Interests'}
          {step === 4 && 'Future Goals & Aspirations'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          {step === 1 && 'Tell us a bit about yourself to personalize your profile and workspace.'}
          {step === 2 && 'Share your academic stream, favorite subjects, and current marks.'}
          {step === 3 && 'Select all fields you are passionate about exploring (multiple choices allowed).'}
          {step === 4 && 'Define what you want to achieve next in your academic and professional career.'}
        </p>
      </div>

      {/* Progress Steps Indicators */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
        {[
          { num: 1, label: 'Personal' },
          { num: 2, label: 'Education' },
          { num: 3, label: 'Interests' },
          { num: 4, label: 'Goals' },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-full h-1.5 rounded-full transition-colors ${
                step >= s.num ? 'bg-sky-400' : 'bg-slate-800'
              }`}
            />
            <span
              className={`text-[10px] sm:text-xs font-medium ${
                step === s.num ? 'text-sky-400 font-bold' : 'text-slate-500'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Choose Profile Avatar / Persona
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAvatar(opt.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all ${
                      avatar === opt.id
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md shadow-sky-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
                    <span className="text-[10px] font-medium truncate w-full text-center">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
                <input
                  type="number"
                  min={12}
                  max={99}
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 20"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Gender (Optional)
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">City</label>
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="" disabled>Select your city</option>
                  {pakistaniCities.map((pakistaniCity) => (
                    <option key={pakistaniCity} value={pakistaniCity}>{pakistaniCity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country</label>
                <input
                  type="text"
                  value={country}
                  readOnly
                  aria-readonly="true"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Educational Background */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Intermediate (FSc)">Intermediate (FSc)</option>
                  </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Institution / School Name
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. College / School name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Academic Field / Stream
                </label>
                <select
                  value={academicField}
                  onChange={(e) => setAcademicField(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Computer Science">Computer Science</option>
                  </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Percentage / Marks / GPA
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={marksPercentage}
                  onChange={(e) => {
                    const value = e.target.value === '' ? '' : Number(e.target.value);
                    setMarksPercentage(value);
                    if (value !== '' && !Number.isNaN(value)) {
                      setMarksError('');
                    }
                  }}
                  placeholder="e.g. 85%"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none ${
                    marksError ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-sky-500'
                  }`}
                />
                {marksError && (
                  <p className="mt-2 text-[10px] font-medium text-rose-400">{marksError}</p>
                )}
              </div>
            </div>

            {/* <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Favorite Subjects
              </label>
              <input
                type="text"
                value={favoriteSubjects}
                onChange={(e) => setFavoriteSubjects(e.target.value)}
                placeholder="e.g. Computer Science, Calculus, Chemistry, Psychology"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div> */}
          </div>
        )}

        {/* STEP 3: Multi-Domain Interests */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base">info</span>
              <span>
                Select the Computer Science specialization you want CareerPath AI to analyze.
              </span>
            </div>

            <div className="space-y-5">
              {interestCategories.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => {
                      const isSelected = selectedInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Other Specific Interests / Topics (Optional)
              </label>
              <input
                type="text"
                value={otherInterests}
                onChange={(e) => setOtherInterests(e.target.value)}
                placeholder="e.g. Quantum Computing, Game Design, Bio-Robotics"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div> */}
          </div>
        )}

        {/* STEP 4: Goals & Study Intentions */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-3">
                What would you like to achieve with IntelliPath? (Select multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goalOptions.map((goal) => {
                  const isChecked = careerGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left text-xs transition-all ${
                        isChecked
                          ? 'bg-sky-500/15 border-sky-400 text-sky-200 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                          isChecked ? 'bg-sky-400 text-slate-950' : 'border border-slate-700'
                        }`}
                      >
                        {isChecked && '✓'}
                      </span>
                      <span>{goal}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Do you plan to continue your higher education / academic studies?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Yes', 'Maybe', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setContinueStudies(opt)}
                    className={`py-2.5 px-4 rounded-2xl border text-xs font-bold transition-all ${
                      continueStudies === opt
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {opt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation CTAs */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
              icon="arrow_back"
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleNextStep}
            icon={step === 4 ? 'auto_awesome' : 'arrow_forward'}
            iconPosition="right"
          >
            {step === 4 ? 'Analyze & Start Aptitude Test' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};
