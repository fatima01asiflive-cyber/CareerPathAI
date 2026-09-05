import React, { useState } from 'react';
import { UserAccount } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  courseTitle: string;
  provider: string;
  issueDate?: string;
  credentialId?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
  courseTitle,
  provider,
  issueDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
  credentialId = `CP-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://careerpath.ai/verify/${credentialId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCertificate = () => {
    const certText = `
================================================================================
                    CAREERPATH AI & ${provider.toUpperCase()}
                       VERIFIED CERTIFICATE OF COMPLETION
================================================================================

This is to certify that

                            ${(user.name || 'STUDENT').toUpperCase()}

has successfully completed all requirements, practical lab assignments, and
technical milestone defenses for the professional course:

              "${courseTitle.toUpperCase()}"

Issued On: ${issueDate}
Credential ID: ${credentialId}
Issuer: Intelli Path Global Accreditation Board in partnership with ${provider}
Verification URL: https://intellipath.ai/verify/${credentialId}

Director of Academic Standards                   Lead AI Industry Chair
Dr. Marcus Vance, L8 Google                       Sarah Jenkins, Microsoft Director
================================================================================
`;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_${courseTitle.replace(/\s+/g, '_')}_${credentialId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="max-w-3xl w-full rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 border border-amber-500/40 bg-slate-950 text-white shadow-2xl space-y-4 sm:space-y-6 relative my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all print:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close Certificate Modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Certificate Frame Container */}
        <div className="p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-amber-500/60 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden text-center shadow-inner">
          {/* Watermark Ribbon */}
          <div className="absolute -top-12 -right-12 w-32 h-32 sm:w-44 sm:h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 sm:w-44 sm:h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header Seal */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-amber-300">
              <span className="material-symbols-outlined text-2xl sm:text-3xl font-extrabold">workspace_premium</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              CAREERPATH AI & {provider} ACCREDITATION
            </span>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-serif">
              Certificate of Completion
            </h1>
          </div>

          <p className="text-[11px] sm:text-xs md:text-sm text-white/60 font-mono">This is officially presented to</p>

          {/* Candidate Name */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-amber-300 my-3 sm:my-4 tracking-tight underline decoration-amber-500/40 decoration-2 underline-offset-8 break-words">
            {user.name || 'Student Candidate'}
          </h2>

          <p className="text-[11px] sm:text-xs md:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
            for successfully completing all practical engineering modules, technical assessments, and capstone project requirements in:
          </p>

          {/* Course Title */}
          <div className="my-4 sm:my-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-amber-500/30 max-w-xl mx-auto shadow-md">
            <h3 className="text-base sm:text-xl md:text-2xl font-black text-white leading-snug break-words">
              {courseTitle}
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-indigo-300 mt-1">
              Issued in Partnership with {provider}
            </p>
          </div>

          {/* Signatures & Accreditation Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 text-center font-mono">
            <div>
              <div className="font-serif italic text-amber-300 text-xs sm:text-sm md:text-base border-b border-white/20 pb-1 mb-1">
                Marcus Vance
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/60">Dr. Marcus Vance</p>
              <p className="text-[8px] sm:text-[9px] text-indigo-400">Google AI Chair</p>
            </div>

            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-[10px] sm:text-xs mb-1">
                SEAL
              </div>
              <p className="text-[8px] sm:text-[9px] text-white/50">VERIFIED ACCREDITED</p>
            </div>

            <div className="col-span-2 md:col-span-1">
              <div className="font-serif italic text-amber-300 text-xs sm:text-sm md:text-base border-b border-white/20 pb-1 mb-1">
                Sarah Jenkins
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/60">Sarah Jenkins</p>
              <p className="text-[8px] sm:text-[9px] text-indigo-400">Microsoft AI Director</p>
            </div>
          </div>

          {/* Certificate Metadata */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-1 text-[9px] sm:text-[10px] font-mono text-white/40 pt-3 sm:pt-4 border-t border-white/10">
            <span>Issue Date: {issueDate}</span>
            <span>Credential ID: {credentialId}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 print:hidden">
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-base">link</span>
            <span>{copiedLink ? 'Link Copied!' : 'Copy Verification Link'}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadCertificate}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs font-mono transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Official Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
