import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { CAREER_DATABASE } from '../utils/careerData';
import { courseService } from '../services/courseService';

export const Profile: React.FC = () => {
  const {
    user,
    updateProfile,
    selectedCareer,
    setSelectedCareer,
    roadmapCompletionPercentage,
    completedCoursesCount,
  } = useAuth();

  // Mode: 'view' vs 'edit'
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit form state
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    age: user?.age ? String(user.age) : '21',
    city: user?.city || 'Islamabad',
    educationLevel: user?.educationLevel || 'Undergraduate / Bachelor’s',
    institution: user?.institution || 'Not provided',
    marksPercentage: user?.marksPercentage ? String(user.marksPercentage) : '85%',
    favoriteSubjects: user?.favoriteSubjects || 'Computer Programming, Applied Physics, Mathematics',
    interests: user?.interests && user.interests.length > 0
      ? user.interests
      : ['Software Development', 'Artificial Intelligence', 'Data Science'],
    newInterestInput: '',
    preferredCareer: selectedCareer?.id || user?.recommendedCareerId || 'software-engineer',
    studyPreference: user?.continueStudies || 'Yes',
    avatar: user?.avatar || '',
  });

  const aptitudeScore = user?.aptitudeScore ?? 0;
  const careerMatchScore = selectedCareer?.matchScore ?? 92;

  // Active or currently ongoing course
  const allCourses = courseService.getAllCourses();
  const currentCourse = allCourses.find((c) => !c.isCompleted)?.title || 'Modern Full-Stack Web Architecture';

  const avatarOptions = [
    { id: 'avatar-1', bg: 'bg-sky-500/20 text-sky-400 border-sky-500/40', icon: 'person' },
    { id: 'avatar-2', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: 'psychology' },
    { id: 'avatar-3', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/40', icon: 'terminal' },
    { id: 'avatar-4', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40', icon: 'school' },
    { id: 'avatar-5', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40', icon: 'robot_2' },
    { id: 'avatar-6', bg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40', icon: 'science' },
  ];

  const handleAddInterest = () => {
    if (formData.newInterestInput.trim() && !formData.interests.includes(formData.newInterestInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, prev.newInterestInput.trim()],
        newInterestInput: '',
      }));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCareerObj = Object.values(CAREER_DATABASE).find(
      (c) => c.id === formData.preferredCareer
    );

    if (selectedCareerObj) {
      setSelectedCareer(selectedCareerObj);
    }

    await updateProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || undefined,
      city: formData.city.trim(),
      educationLevel: formData.educationLevel,
      institution: formData.institution.trim(),
      marksPercentage: Number(formData.marksPercentage) || undefined,
      favoriteSubjects: formData.favoriteSubjects.trim(),
      interests: formData.interests,
      recommendedCareerId: formData.preferredCareer,
      continueStudies: formData.studyPreference as 'Yes' | 'Maybe' | 'No',
      avatar: formData.avatar,
    });

    setIsEditing(false);
    setSuccessMessage('Profile information saved and synchronized successfully!');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleCancelEdit = () => {
    // Reset to current user profile
    setFormData({
      name: user?.name || '',
      age: user?.age ? String(user.age) : '21',
      city: user?.city || 'Islamabad',
      educationLevel: user?.educationLevel || 'Undergraduate / Bachelor’s',
      institution: user?.institution || 'Not provided',
      marksPercentage: user?.marksPercentage ? String(user.marksPercentage) : '85',
      favoriteSubjects: user?.favoriteSubjects || 'Computer Programming, Applied Physics, Mathematics',
      interests: user?.interests && user.interests.length > 0
        ? user.interests
        : ['Software Development', 'Artificial Intelligence', 'Data Science'],
      newInterestInput: '',
      preferredCareer: selectedCareer?.id || user?.recommendedCareerId || 'software-engineer',
      studyPreference: user?.continueStudies || 'Yes',
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Feedback Toast */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between shadow-lg shadow-emerald-500/5 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-emerald-200"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header Profile Hero Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
          {/* Avatar with Edit Avatar trigger */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-3xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-3xl font-black shrink-0 shadow-inner">
              {user?.avatar ? (
                <span className="material-symbols-outlined text-3xl">{user.avatar}</span>
              ) : (
                <span>{user?.name ? user.name[0].toUpperCase() : 'U'}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-950 border border-slate-800 text-sky-400 hover:bg-slate-900 shadow-md transition-all"
              title="Edit Avatar"
              aria-label="Edit Avatar"
            >
              <span className="material-symbols-outlined text-xs">photo_camera</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified Student Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {user?.name || 'Alex Morgan'}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              {user?.email || 'student@intellipath.edu'} • {user?.city || 'Islamabad'} • Age {user?.age || '21'}
            </p>
            <p className="text-xs text-sky-400 font-semibold pt-0.5">
              Target Track: {selectedCareer?.name || 'Software Engineer'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0 w-full sm:w-auto relative z-10">
          {!isEditing ? (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => setIsEditing(true)}
              icon="edit"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={handleCancelEdit}
              icon="close"
            >
              Cancel Edit
            </Button>
          )}

          <Link to="/assessment" className="w-full">
            <Button variant="outline" size="sm" fullWidth icon="quiz">
              Retake Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: Career Match */}
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-center space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Career Match</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {careerMatchScore}%
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {selectedCareer?.name || 'Target Track'}
          </span>
        </div>

        {/* Metric 2: Aptitude Score */}
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-center space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Aptitude Score</span>
          <div className="text-2xl font-black text-sky-400 font-mono">
            {aptitudeScore}%
          </div>
          <span className="text-[10px] text-slate-400 block">Diagnostic Result</span>
        </div>

        {/* Metric 3: Current Course */}
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-center space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Current Course</span>
          <div className="text-xs font-bold text-white line-clamp-2 h-7 flex items-center justify-center">
            {currentCourse}
          </div>
          <span className="text-[10px] text-indigo-400 block font-medium">In Progress</span>
        </div>

        {/* Metric 4: Roadmap Progress */}
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-center space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Roadmap Progress</span>
          <div className="text-2xl font-black text-white font-mono">
            {roadmapCompletionPercentage}%
          </div>
          <span className="text-[10px] text-slate-400 block">6-Month Curriculum</span>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* EDIT MODE: Interactive Form                                             */}
      {/* ======================================================================= */}
      {isEditing ? (
        <form
          onSubmit={handleSaveProfile}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8 animate-fade-in"
        >
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-base">edit_note</span>
              <span>Edit Student Profile Information</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Update your personal details, academic history, and career track preferences below.
            </p>
          </div>

          {/* 1. Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              1. Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Age</label>
                <input
                  type="number"
                  min="12"
                  max="80"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Education Information */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              2. Education & Academic Background
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option value="Matriculation / O-Levels">Matriculation / O-Levels</option>
                  <option value="Intermediate / FSc / A-Levels">Intermediate / FSc / A-Levels</option>
                  <option value="Undergraduate / Bachelor’s">Undergraduate / Bachelor’s</option>
                  <option value="Postgraduate / Master’s">Postgraduate / Master’s</option>
                  <option value="Self-Taught / Professional">Self-Taught / Professional</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Institution</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. NUST, FAST-NUCES, LUMS, State College"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Marks / Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.marksPercentage}
                  onChange={(e) => setFormData({ ...formData, marksPercentage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Favorite Subjects</label>
                <input
                  type="text"
                  value={formData.favoriteSubjects}
                  onChange={(e) => setFormData({ ...formData, favoriteSubjects: e.target.value })}
                  placeholder="e.g. Mathematics, Programming, Physics"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Career Information */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              3. Career & Study Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Preferred Career Track</label>
                <select
                  value={formData.preferredCareer}
                  onChange={(e) => setFormData({ ...formData, preferredCareer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  {Object.values(CAREER_DATABASE).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.domain})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Study Preference / Higher Ed</label>
                <select
                  value={formData.studyPreference}
                  onChange={(e) => setFormData({ ...formData, studyPreference: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option value="Yes">Yes - Intend to pursue higher degree / university</option>
                  <option value="Maybe">Maybe - Open to direct skills / certifications</option>
                  <option value="No">No - Prefer direct industry job & portfolio</option>
                </select>
              </div>
            </div>

            Interests Tagging
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase block">Selected Interests</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add another passion or skill interest..."
                  value={formData.newInterestInput}
                  onChange={(e) => setFormData({ ...formData, newInterestInput: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddInterest}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
            <Button type="button" variant="outline" size="md" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" icon="save">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        /* ======================================================================= */
        /* VIEW MODE: Complete Profile Display                                     */
        /* ======================================================================= */
        <div className="space-y-6 animate-fade-in">
          {/* Section 1: Academic & Education Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-base">school</span>
                <span>Education Background</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Education Level:</span>
                  <span className="font-semibold text-white">
                    {user?.educationLevel || 'Undergraduate / Bachelor’s'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Institution:</span>
                  <span className="font-semibold text-white">
                    {user?.institution || 'Not provided'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Academic Score / Marks:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {user?.marksPercentage ? `${user.marksPercentage}%` : '85%'}
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Favorite Subjects:</span>
                  <span className="font-medium text-slate-200">
                    {user?.favoriteSubjects || 'Computer Programming, Applied Physics, Mathematics'}
                  </span>
                </div>

                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Study Preference:</span>
                  <span className="font-semibold text-sky-400">
                    {user?.continueStudies || 'Yes (Higher Degree Track)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Passions & Selected Interests */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400 text-base">interests</span>
                <span>Selected Interests & Goals</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Selected Interests:</span>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(user?.interests && user.interests.length > 0
                      ? user.interests
                      : ['Software Development', 'Artificial Intelligence', 'Data Science']
                    ).map((int) => (
                      <span
                        key={int}
                        className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Target Career Pathway:</span>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {selectedCareer?.name || 'Software Engineer'}
                      </h4>
                      <p className="text-[11px] text-slate-400">{selectedCareer?.domain || 'Computer Science'}</p>
                    </div>
                    <Link to="/roadmap">
                      <Button variant="outline" size="sm" className="text-[11px] py-1 px-2.5">
                        View Roadmap
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Select Profile Avatar
              </h3>
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Choose a representative profile icon. Custom image uploads will be enabled in future connected releases.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={async () => {
                    await updateProfile({ avatar: opt.icon });
                    setFormData((prev) => ({ ...prev, avatar: opt.icon }));
                    setShowAvatarModal(false);
                    setSuccessMessage('Profile avatar updated!');
                    setTimeout(() => setSuccessMessage(null), 2500);
                  }}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 ${opt.bg}`}
                >
                  <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
                  <span className="text-[10px] font-mono capitalize">{opt.icon}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowAvatarModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
