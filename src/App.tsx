import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ProjectDeadlineNotifier } from './components/careerpath/ProjectDeadlineNotifier';
import { StudyAlarmNotifier } from './components/careerpath/StudyAlarmNotifier';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen app-shell selection:bg-sky-500 selection:text-slate-950 font-sans">
            <ProjectDeadlineNotifier />
            <StudyAlarmNotifier />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
