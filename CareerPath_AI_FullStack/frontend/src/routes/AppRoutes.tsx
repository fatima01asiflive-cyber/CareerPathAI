import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';


import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { ProfileSetup } from '../pages/ProfileSetup';
import { Assessment } from '../pages/Assessment';
import { Result } from '../pages/Result';
import { Dashboard } from '../pages/Dashboard';
import { AcademicJourneyPage } from '../pages/AcademicJourneyPage';
import { Career } from '../pages/Career';
import { Courses } from '../pages/Courses';
import { Resources } from '../pages/Resources';
import { Roadmap } from '../pages/Roadmap';
import { Projects } from '../pages/Projects';
import { Chatbot } from '../pages/Chatbot';
import { Profile } from '../pages/Profile';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { ResumeAnalyzer } from '../pages/ResumeAnalyzer';
import { PersonalityTest } from '../pages/PersonalityTest';
import { SkillGap } from '../pages/SkillGap';
import { AdminDashboard } from '../pages/AdminDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';

const ProfileRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const FeatureRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requireProfile requireAssessment>{children}</ProtectedRoute>
);

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile-setup" element={<ProfileRoute><ProfileSetup /></ProfileRoute>} />

      <Route path="/assessment" element={<ProtectedRoute requireProfile><Assessment /></ProtectedRoute>} />
      <Route path="/result" element={<FeatureRoute><Result /></FeatureRoute>} />

      <Route path="/dashboard" element={<FeatureRoute><Dashboard /></FeatureRoute>} />
      <Route path="/academic-journey" element={<FeatureRoute><AcademicJourneyPage /></FeatureRoute>} />
      <Route path="/career" element={<FeatureRoute><Career /></FeatureRoute>} />
      <Route path="/roadmap" element={<FeatureRoute><Roadmap /></FeatureRoute>} />
      <Route path="/resources" element={<FeatureRoute><Resources /></FeatureRoute>} />

      {/* Existing secondary modules remain accessible but are not primary sidebar navigation. */}
      <Route path="/courses" element={<FeatureRoute><Courses /></FeatureRoute>} />
      <Route path="/courses/:id" element={<FeatureRoute><Courses /></FeatureRoute>} />
      <Route path="/projects" element={<FeatureRoute><Projects /></FeatureRoute>} />
      <Route path="/projects/:id" element={<FeatureRoute><Projects /></FeatureRoute>} />
      <Route path="/chatbot" element={<FeatureRoute><Chatbot /></FeatureRoute>} />
      <Route path="/profile" element={<ProfileRoute><Profile /></ProfileRoute>} />
      <Route path="/notifications" element={<FeatureRoute><Notifications /></FeatureRoute>} />
      <Route path="/settings" element={<ProfileRoute><Settings /></ProfileRoute>} />
      <Route path="/resume-analyzer" element={<FeatureRoute><ResumeAnalyzer /></FeatureRoute>} />
      <Route path="/resume" element={<FeatureRoute><ResumeAnalyzer /></FeatureRoute>} />
      <Route path="/personality-test" element={<FeatureRoute><PersonalityTest /></FeatureRoute>} />
      <Route path="/personality" element={<FeatureRoute><PersonalityTest /></FeatureRoute>} />
      <Route path="/skill-gap" element={<FeatureRoute><SkillGap /></FeatureRoute>} />
      <Route path="/admin" element={<FeatureRoute><AdminDashboard /></FeatureRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
