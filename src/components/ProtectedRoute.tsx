import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
  requireAssessment?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireProfile = false, requireAssessment = false }) => {
  const { isAuthenticated, isLoading, profileCompleted, assessmentCompleted } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-400">Loading your profile...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireProfile && !profileCompleted) {
    return <Navigate to="/profile-setup" replace />;
  }

  if (requireAssessment && !assessmentCompleted) {
    return <Navigate to="/assessment" replace />;
  }

  return <>{children}</>;
};
