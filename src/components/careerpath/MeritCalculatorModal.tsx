import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, X, Info, CheckCircle2 } from 'lucide-react';
import { addActivityTime } from '../../utils/activityTimeTracker';

type TestType = 'None' | 'MDCAT' | 'ECAT' | 'NET' | 'FAST';

const PRESETS: Record<Exclude<TestType, 'None'>, { matric: number; inter: number; test: number; label: string }> = {
  MDCAT: { matric: 10, inter: 40, test: 50, label: '10% Matric + 40% FSc/Inter + 50% MDCAT' },
  ECAT: { matric: 17, inter: 50, test: 33, label: '17% Matric + 50% FSc/Inter + 33% ECAT' },
  NET: { matric: 15, inter: 10, test: 75, label: '15% Academic + 10% Academic + 75% NET (Pathfinder preset)' },
  FAST: { matric: 50, inter: 0, test: 50, label: '50% Academic + 50% FAST/NU Test (Pathfinder preset)' },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MeritCalculatorModal: React.FC<Props> = ({ open, onClose }) => {
  const [testType, setTestType] = useState<TestType>('None');
  const [testAttempted, setTestAttempted] = useState<'yes' | 'no'>('no');
  const [matric, setMatric] = useState(88);
  const [inter, setInter] = useState(85);
  const [test, setTest] = useState(0);

  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => addActivityTime('merit-calculator', 1), 1000);
    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (testAttempted === 'no') {
      setTestType('None');
      setTest(0);
    }
  }, [testAttempted]);

  const result = useMemo(() => {
    if (testType === 'None') {
      return { score: Number(((matric + inter) / 2).toFixed(2)), formula: 'Academic average only — no entry test selected.' };
    }
    const p = PRESETS[testType];
    const score = Number(((matric * p.matric + inter * p.inter + test * p.test) / 100).toFixed(2));
    return { score, formula: p.label };
  }, [matric, inter, test, testType]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl">
        <header className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Merit & Aggregate Calculator</h2>
              <p className="text-xs text-slate-500">Choose the test the student actually attempted.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900"><X className="w-5 h-5" /></button>
        </header>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-slate-300">Have you attempted an entry test?</span>
              <select value={testAttempted} onChange={(e) => setTestAttempted(e.target.value as 'yes' | 'no')} className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white">
                <option value="no">No, not yet</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <label className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-slate-300">Entry test</span>
              <select value={testType} disabled={testAttempted === 'no'} onChange={(e) => setTestType(e.target.value as TestType)} className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white disabled:opacity-50">
                <option value="None">No test selected</option>
                <option value="MDCAT">MDCAT</option>
                <option value="ECAT">ECAT</option>
                <option value="NET">NUST NET</option>
                <option value="FAST">FAST / NU Test</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NumberField label="Matric %" value={matric} setValue={setMatric} />
            <NumberField label="FSc / Inter %" value={inter} setValue={setInter} />
            <NumberField label={`${testType === 'None' ? 'Entry Test' : testType} %`} value={test} setValue={setTest} disabled={testAttempted === 'no'} />
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-500/10 to-violet-500/10 border border-sky-500/20 p-6 text-center">
            <p className="text-[10px] uppercase tracking-widest text-sky-300 font-bold">Calculated Aggregate</p>
            <p className="text-5xl font-black text-white mt-2">{result.score}%</p>
            <p className="text-xs text-slate-400 mt-2">{result.formula}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-3">
            <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              These presets are adapted from the Pathfinder project. Admission formulas vary by institution and year; verify the official formula before making an admission decision.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> No university recommendations are generated by this calculator.
          </div>
        </div>

        <footer className="p-4 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold">Done</button>
        </footer>
      </div>
    </div>
  );
};

const NumberField = ({ label, value, setValue, disabled = false }: { label: string; value: number; setValue: (v: number) => void; disabled?: boolean }) => (
  <label className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
    <span className="text-xs font-bold text-slate-300">{label}</span>
    <input type="number" min={0} max={100} step={0.1} value={value} disabled={disabled} onChange={(e) => setValue(Math.max(0, Math.min(100, Number(e.target.value) || 0)))} className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white disabled:opacity-50" />
  </label>
);
