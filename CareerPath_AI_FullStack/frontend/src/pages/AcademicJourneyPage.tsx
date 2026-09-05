import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Save, Brain, Target, AlertCircle } from 'lucide-react';

const CS_INTERESTS = [
  'Software Development', 'AI/ML', 'Data Science', 'Cloud Computing',
  'Cyber Security', 'Web Development', 'Mobile Development', 'DevOps',
];

export const AcademicJourneyPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [marks, setMarks] = useState(user?.marksPercentage?.toString() || '');
  const [subjects, setSubjects] = useState(user?.favoriteSubjects || '');
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) => prev.includes(interest) ? prev.filter((x) => x !== interest) : [...prev, interest]);
    setSaved(false);
  };

  const canSave = Boolean(marks && subjects.trim() && interests.length > 0);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    await updateProfile({
      educationLevel: 'Intermediate (FSc)',
      academicField: 'Computer Science',
      fscStream: 'Computer Science',
      marksPercentage: Number(marks),
      favoriteSubjects: subjects.trim(),
      interests,
    });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-6 animate-fade-in">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-sky-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-4">Academic Journey</h1>
        <p className="text-sm text-slate-400 mt-2">
          Your last education is <strong className="text-sky-300">Intermediate (FSc)</strong> and the platform focuses only on <strong className="text-sky-300">Computer Science</strong>. Nothing else is pre-filled: enter your own marks, subjects and current CS interest.
        </p>
      </header>

      <form onSubmit={save} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Last Education</label>
            <div className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white">Intermediate (FSc)</div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300">Domain</label>
            <div className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white">Computer Science</div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">FSc Subjects <span className="text-rose-400">*</span></label>
          <input value={subjects} onChange={(e) => { setSubjects(e.target.value); setSaved(false); }} required
            className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white"
            placeholder="Enter your subjects, e.g. Computer Science, Mathematics, Physics" />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Intermediate Percentage <span className="text-rose-400">*</span></label>
          <input type="number" min="0" max="100" value={marks} onChange={(e) => { setMarks(e.target.value); setSaved(false); }} required
            className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white"
            placeholder="Enter your percentage" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-violet-400" /><span className="text-xs font-bold text-white">Current CS Interest <span className="text-rose-400">*</span></span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CS_INTERESTS.map((interest) => (
              <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${interests.includes(interest) ? 'bg-sky-500/15 border-sky-400/40 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                {interest}
              </button>
            ))}
          </div>
        </div>

        {!canSave && <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>Complete your percentage, subjects and at least one CS interest before saving.</span></div>}

        <div className="flex flex-wrap gap-3 items-center">
          <button type="submit" disabled={!canSave} className="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 text-xs font-black inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"><Save className="w-4 h-4" /> Save Academic Profile</button>
          <button type="button" disabled={!canSave} onClick={() => navigate('/assessment')} className="px-5 py-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-black inline-flex items-center gap-2 disabled:opacity-40"><Brain className="w-4 h-4" /> Take Aptitude Test</button>
          {saved && <span className="text-xs text-emerald-400 font-semibold">✓ Academic information saved.</span>}
        </div>
      </form>

      {user?.aptitudeScore !== undefined && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs text-slate-500 uppercase font-bold">Latest Aptitude</p>
          <p className="text-3xl font-black text-white mt-1">{user.aptitudeScore}%</p>
          <p className="text-xs text-slate-400 mt-2">{user.aptitudeScore < 80 ? 'Your selected interest is retained, but the roadmap first strengthens the CS foundations needed for that interest.' : 'Your aptitude supports moving directly into your selected CS interest track.'}</p>
        </div>
      )}
    </div>
  );
};
