import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { careerService, CareerRecommendationResult } from '../services/careerService';
import { CareerDetail } from '../utils/careerData';
import { courseService } from '../services/courseService';
import { projectService } from '../services/projectService';
import { userScopedKey } from '../utils/userScopedStorage';
import { notificationService } from '../services/notificationService';
import { AppNotification, CourseDetailItem, UserProfile } from '../types';
import { AppUpdateModal } from '../components/AppUpdateModal';

export const APP_VERSION = '3.4.0';
const APP_VERSION_STORAGE_KEY = 'intellipath_app_version';

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  appVersion: string;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => void;
  logoutAndReload: () => void;
  updateAppAndReload: (options?: { hardReset?: boolean }) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  saveAptitudeScore: (score: number, categoryScores?: Record<string, number>) => Promise<void>;
  profileCompleted: boolean;
  assessmentCompleted: boolean;
  recommendation: CareerRecommendationResult | null;
  selectedCareer: CareerDetail | null;
  setSelectedCareer: (career: CareerDetail) => void;
  activeCourse: CourseDetailItem;
  selectCourse: (courseId: string) => void;
  toggleCourseMilestone: (milestoneId: string) => void;
  markCourseAsComplete: (courseId?: string) => void;
  recommendedCoursesBundle: {
    tierTitle: string;
    tierSubtitle: string;
    tierCode: 'tier1_advanced' | 'tier2_intermediate' | 'tier3_foundation' | 'tier4_early';
    adviceMessage: string;
    courses: CourseDetailItem[];
  };
  roadmapProgress: Record<number, boolean>;
  toggleRoadmapMonth: (month: number) => void;
  roadmapCompletionPercentage: number;
  completedCoursesCount: number;
  completedProjectsCount: number;
  notifications: AppNotification[];
  unreadNotifsCount: number;
  markNotifsAsRead: () => void;
  markNotifAsRead: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createDefaultRoadmapProgress = (): Record<number, boolean> => ({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
});

const normalizeRoadmapProgress = (value?: Record<number, boolean> | null): Record<number, boolean> => {
  const baseline = createDefaultRoadmapProgress();
  if (!value || typeof value !== 'object') return baseline;

  return {
    1: false,
    2: Boolean(value[2]),
    3: Boolean(value[3]),
    4: Boolean(value[4]),
    5: Boolean(value[5]),
    6: Boolean(value[6]),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);
  const [activeCourse, setActiveCourse] = useState<CourseDetailItem>(() => courseService.getActiveCourse());
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<Record<number, boolean>>(createDefaultRoadmapProgress());

  // Version Validation & Mount Initializer
  useEffect(() => {
    const storedVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);

    // If an older session version exists, invalidate session and ask user to log in again
    if (storedVersion && storedVersion !== APP_VERSION) {
      localStorage.setItem(APP_VERSION_STORAGE_KEY, APP_VERSION);
      authService.logout();
      setUser(null);
      setIsLoading(false);
      // If user was on an authenticated page, redirect to login with update flag
      if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.replace('/login?updated=true');
        return;
      }
    } else if (!storedVersion) {
      localStorage.setItem(APP_VERSION_STORAGE_KEY, APP_VERSION);
    }

    const existing = authService.getCurrentUser();
    if (existing) {
      setUser(existing);
      loadUserState(existing);
      if (existing.recommendedCareerId) {
        const found = careerService.getCareerById(existing.recommendedCareerId);
        if (found) setSelectedCareer(found);
      }
    }
    if (!existing) {
      setRoadmapProgress(createDefaultRoadmapProgress());
      setNotifications([]);
      setActiveCourse(courseService.getActiveCourse());
    }
    setIsLoading(false);
  }, []);

  // Keep notification state synchronized with activity-generated notifications.
  useEffect(() => {
    const sync = () => setNotifications(notificationService.getNotifications());
    window.addEventListener('careerpath:notification', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('careerpath:notification', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Roadmap progress is scoped to the logged-in account.
  useEffect(() => {
    if (!user?.id) return;
    try { localStorage.setItem(userScopedKey('intellipath_roadmap_progress', user.id), JSON.stringify(roadmapProgress)); } catch {}
  }, [roadmapProgress, user?.id]);

  const loadUserState = (profile: UserProfile) => {
    try {
      const raw = localStorage.getItem(userScopedKey('intellipath_roadmap_progress', profile.id));
      const parsed = raw ? JSON.parse(raw) : null;
      setRoadmapProgress(normalizeRoadmapProgress(parsed));
    } catch {
      setRoadmapProgress(createDefaultRoadmapProgress());
    }
    setActiveCourse(courseService.getActiveCourse());
    setNotifications(notificationService.getNotifications());
    try { window.dispatchEvent(new CustomEvent('careerpath:auth-changed')); } catch {}
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const profile = await authService.login(email, password);
      setUser(profile);
      setSelectedCareer(null);
      loadUserState(profile);
      if (profile.recommendedCareerId) {
        const found = careerService.getCareerById(profile.recommendedCareerId);
        if (found) setSelectedCareer(found);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const profile = await authService.signup(name, email, password);
      setUser(profile);
      // New accounts intentionally receive a pristine roadmap and empty activity state.
      setRoadmapProgress(createDefaultRoadmapProgress());
      setNotifications([]);
      setActiveCourse(courseService.getActiveCourse());
      try { window.dispatchEvent(new CustomEvent('careerpath:auth-changed')); } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    try {
      const profile = await authService.socialLogin(provider);
      setUser(profile);
      setSelectedCareer(null);
      loadUserState(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setSelectedCareer(null);
    setRoadmapProgress(createDefaultRoadmapProgress());
  };

  const logoutAndReload = () => {
    logout();
    window.location.replace('/');
  };

  const selectCourse = (courseId: string) => {
    const selected = courseService.selectAndEnrollCourse(courseId);
    setActiveCourse(selected);
  };

  const toggleCourseMilestone = (milestoneId: string) => {
    const before = activeCourse.roadmap.find((m: any) => m.id === milestoneId);
    const updated = courseService.toggleMilestoneCompletion(activeCourse.id, milestoneId);
    if (updated) {
      setActiveCourse({ ...updated });
      const after = updated.roadmap.find((m: any) => m.id === milestoneId);
      const justCompleted = Boolean(after?.completed) && !Boolean(before?.completed);
      const done = updated.roadmap.filter((m: any) => m.completed).length;
      const total = updated.roadmap.length || 1;
      const pct = Math.round((done / total) * 100);

      if (justCompleted) {
        notificationService.addNotification({
          type: 'course',
          title: `Learning milestone completed: ${after?.title || 'Roadmap task'}`,
          message: `Completed at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Your roadmap progress is now ${pct}%.`,
          actionUrl: '/roadmap',
        });
      }

      if (justCompleted && pct === 100) {
        notificationService.addNotification({
          type: 'project',
          title: 'Roadmap completed — final project unlocked',
          message: 'Your final roadmap milestone is done. Open Projects to submit the unlocked Pro project before its deadline.',
          actionUrl: '/projects',
        });
      }
    }
  };

  useEffect(() => {
    const refreshNotifications = () => {
      setNotifications(notificationService.getNotifications());
    };
    window.addEventListener('careerpath:notifications-updated', refreshNotifications);
    return () => window.removeEventListener('careerpath:notifications-updated', refreshNotifications);
  }, []);

  const markCourseAsComplete = (courseId?: string) => {
    const targetId = courseId || activeCourse.id;
    const updated = courseService.markCourseCompleted(targetId);
    if (updated) {
      setActiveCourse({ ...updated });
    }
  };

  /**
   * Safe Update and Clean Reload Workflow
   */
  const updateAppAndReload = async (options?: { hardReset?: boolean }) => {
    setIsUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      authService.logout();
      setUser(null);
      setSelectedCareer(null);

      if (options?.hardReset) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        localStorage.removeItem('intellipath_current_user');
        localStorage.removeItem('intellipath_roadmap_progress');
        localStorage.removeItem('intellipath_chat_history');
      }

      localStorage.setItem(APP_VERSION_STORAGE_KEY, APP_VERSION);
      await new Promise((resolve) => setTimeout(resolve, 600));
      window.location.replace('/login?updated=true');
    } catch {
      window.location.reload();
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  const saveAptitudeScore = async (score: number, categoryScores?: Record<string, number>) => {
    const updated = await updateProfile({ aptitudeScore: score, categoryScores, assessmentCompleted: true });
    const rec = careerService.getRecommendation(updated);
    if (rec.recommendedCareer) {
      setSelectedCareer(rec.recommendedCareer);
      await updateProfile({ recommendedCareerId: rec.recommendedCareer.id });
    }
  };

  const recommendation = user ? careerService.getRecommendation(user) : null;
  const profileCompleted = Boolean(user?.profileCompleted || (
    user?.name &&
    user?.educationLevel &&
    user?.academicField &&
    user?.interests?.length &&
    user?.careerGoals?.length &&
    user?.continueStudies
  ));
  const assessmentCompleted = Boolean(user?.assessmentCompleted || typeof user?.aptitudeScore === 'number');
  const activeCareer = selectedCareer || (recommendation ? recommendation.recommendedCareer : null);

  const toggleRoadmapMonth = (month: number) => {
    setRoadmapProgress((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const completedMonths = Object.values(roadmapProgress).filter(Boolean).length;
  const courseMilestones = activeCourse?.roadmap || [];
  const completedCourseMilestones = courseMilestones.filter((m: any) => m.completed).length;
  const roadmapCompletionPercentage = courseMilestones.length
    ? Math.round((completedCourseMilestones / courseMilestones.length) * 100)
    : Math.round((completedMonths / 6) * 100);

  const allCourses = courseService.getAllCourses();
  const completedCoursesCount = allCourses.filter((c) => c.isCompleted).length;
  const completedProjectsCount = projectService.getAllProjects().filter((p) => p.status === 'graded').length;

  const recommendedCoursesBundle = courseService.getRecommendedCoursesForUser(user);

  useEffect(() => {
    if (!user) return;
    const { newlyAssigned } = projectService.syncProjectAssignments(roadmapCompletionPercentage);
    newlyAssigned.forEach((project) => {
      const deadline = project.submission?.deadlineAt ? new Date(project.submission.deadlineAt) : null;
      notificationService.addNotification({
        type: 'project',
        title: `New ${project.stage} project assigned: ${project.title}`,
        message: deadline
          ? `You completed the required roadmap level. Submit the project by ${deadline.toLocaleDateString()} and include your GitHub + live deployment link.`
          : `You completed the required roadmap level. Open Projects to start your ${project.category} deliverable.`,
        actionUrl: '/projects',
      });
    });
  }, [user?.id, roadmapCompletionPercentage]);

  const markNotifsAsRead = () => {
    const updated = notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const markNotifAsRead = (id: string) => {
    const updated = notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isUpdating,
        appVersion: APP_VERSION,
        login,
        signup,
        socialLogin,
        logout,
        logoutAndReload,
        updateAppAndReload,
        updateProfile,
        saveAptitudeScore,
        profileCompleted,
        assessmentCompleted,
        recommendation,
        selectedCareer: activeCareer,
        setSelectedCareer,
        activeCourse,
        selectCourse,
        toggleCourseMilestone,
        markCourseAsComplete,
        recommendedCoursesBundle,
        roadmapProgress,
        toggleRoadmapMonth,
        roadmapCompletionPercentage,
        completedCoursesCount,
        completedProjectsCount,
        notifications,
        unreadNotifsCount,
        markNotifsAsRead,
        markNotifAsRead,
      }}
    >
      {children}
      <AppUpdateModal isOpen={isUpdating} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
