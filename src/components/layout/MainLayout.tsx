import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from './Sidebar';
import { FloatingCareerCoach } from '../careerpath/FloatingCareerCoach';
import { GlobalActivityTracker } from '../careerpath/GlobalActivityTracker';
import { useAuth } from '../../context/AuthContext';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/';
  const showSidebar = !isHomePage || isAuthenticated;

  // Desktop sidebar collapsed state (persisted)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('intellipath_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Mobile drawer slide-out state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const toggleDesktopCollapse = () => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('intellipath_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Global Unified Sidebar (Desktop Collapsible & Mobile Slide-Out Drawer) */}
      {showSidebar && (
        <Sidebar
          isCollapsed={isDesktopCollapsed}
          onToggleCollapse={toggleDesktopCollapse}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Global Header (Clean, minimal, 1 global header across app) */}
        <Header
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
          onToggleDesktopSidebar={toggleDesktopCollapse}
          isDesktopSidebarCollapsed={isDesktopCollapsed}
        />

        {/* Dynamic Page Outlet */}
        <main
          className={`flex-1 flex flex-col w-full mx-auto pb-12 ${
            isHomePage && !isAuthenticated ? 'max-w-full p-0' : 'max-w-7xl p-4 sm:p-6 lg:p-8'
          }`}
        >
          <Outlet />
        </main>

        {/* Global Footer */}
        <Footer />
        {isAuthenticated && <><GlobalActivityTracker /><FloatingCareerCoach /></>}
      </div>
    </div>
  );
};
