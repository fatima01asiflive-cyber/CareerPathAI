import React from 'react';
import { Link } from 'react-router-dom';
import { IntelliPathLogo } from './IntelliPathLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & Slogan */}
        <div className="space-y-3 sm:col-span-2 md:col-span-1">
          <Link
            to="/"
            className="inline-flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl"
          >
            <IntelliPathLogo size="sm" variant="horizontal" showTagline={false} />
          </Link>
          <p className="text-xs text-sky-400 font-medium tracking-wide">
            &ldquo;Discover. Learn. Grow. Succeed.&rdquo;
          </p>
          <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
            Personalized, multi-domain AI career intelligence, comprehensive 6-month curriculum roadmaps, and verified diagnostic testing.
          </p>
        </div>

        {/* Col 2: Quick Navigation */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <Link to="/dashboard" className="text-slate-400 hover:text-sky-400 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/career" className="text-slate-400 hover:text-sky-400 transition-colors">
                Career Tracks
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-slate-400 hover:text-sky-400 transition-colors">
                Courses Catalog
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="text-slate-400 hover:text-sky-400 transition-colors">
                6-Month Roadmap
              </Link>
            </li>
            <li>
              <Link to="/resources" className="text-slate-400 hover:text-sky-400 transition-colors">
                Resources Library
              </Link>
            </li>
            <li>
              <Link to="/chatbot" className="text-slate-400 hover:text-sky-400 transition-colors">
                AI Career Coach
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Discovery & Evaluation */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            Discovery & Tools
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <Link to="/assessment" className="text-slate-400 hover:text-sky-400 transition-colors">
                Aptitude Diagnostic
              </Link>
            </li>
            <li>
              <Link to="/skill-gap" className="text-slate-400 hover:text-sky-400 transition-colors">
                Skill Gap & Readiness
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Legal */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            Support
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <a
                href="mailto:support@intellipath.ai"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                Help & FAQs
              </a>
            </li>
            <li>
              <Link to="/settings" className="text-slate-400 hover:text-sky-400 transition-colors">
                Settings & Preferences
              </Link>
            </li>
            <li>
              <a
                href="mailto:contact@intellipath.ai"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                Contact Academic Team
              </a>
            </li>
            <li>
              <Link to="/admin" className="text-slate-400 hover:text-sky-400 transition-colors">
                Admin & Telemetry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
        <p>© 2026 IntelliPath. All rights reserved.</p>
        <p className="text-[11px] text-slate-600">
          Built for Multi-Domain Engineering, Medical, CS & Business Students
        </p>
      </div>
    </footer>
  );
};
