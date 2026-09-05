export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  age?: number;
  gender?: string;
  city?: string;
  country?: string;
  avatar?: string;
  educationLevel?: string;
  institution?: string;
  academicField?: string;
  preferredField?: string;
  fscStream?: string;
  lastMarks?: number | string;
  eligibilityScore?: number | string;
  eligibilityStatus?: string;
  dailyStudyHours?: number | string;
  interestedInUni?: boolean | string;
  marksPercentage?: number;
  favoriteSubjects?: string;
  previousQualifications?: string;
  interests?: string[];
  otherInterests?: string;
  careerGoals?: string[];
  continueStudies?: 'Yes' | 'Maybe' | 'No';
  aptitudeScore?: number;
  categoryScores?: Record<string, number>;
  recommendedCareerId?: string;
  profileCompleted?: boolean;
  assessmentCompleted?: boolean;
  isLoggedIn?: boolean;
  provider?: string;
  createdAt?: string;
  streakCount?: number;
  xpPoints?: number;
  studyTimeSeconds?: number;
}

export type UserAccount = UserProfile;

export interface AcademicData {
  field?: string;
  fscStream?: string;
  city?: string;
  percentage?: number;
  totalMarks?: number | string;
  obtainedMarks?: number | string;
  aggregateMarks?: number | string;
  passingYear?: string | number;
  qualification?: string;
  qualifications?: string[];
  subjects?: string[];
  institution?: string;
  boardOrUni?: string;
  level?: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  weight?: number;
  priority: 'low' | 'medium' | 'high' | 'Urgent' | 'Medium' | 'Standard' | string;
  completed?: boolean;
  isCompleted?: boolean;
  dueDate: string;
  time?: string;
}

export type TabType =
  | 'dashboard'
  | 'academic'
  | 'profile'
  | 'onboarding'
  | 'personality'
  | 'personality-assessment'
  | 'interests'
  | 'roadmap'
  | 'courses'
  | 'projects'
  | 'interviews'
  | 'jobs'
  | 'scholarships'
  | 'salary'
  | 'salary-market'
  | 'coach'
  | 'admin'
  | 'study-planner'
  | 'career-ladder'
  | 'resume-builder'
  | 'resume-analyzer'
  | 'skill-gap'
  | 'notifications'
  | 'settings'
  | 'eligibility-test'
  | 'prep'
  | 'universities';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'exercise';
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
  completed: boolean;
}

export type { CourseDetailItem, CourseRoadmapMilestone, CourseResourceBundle } from './utils/courseData';

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  domain: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  duration: string;
  rating: number;
  studentsCount: number;
  matchScore: number;
  isFree?: boolean;
  description: string;
  skillsGained: string[];
  careerRelevance?: string;
  whyRecommended?: string;
  modules?: CourseModule[];
  roadmap?: any[];
  resources?: any;
  progress: number; // 0 to 100
  isEnrolled: boolean;
  isCompleted: boolean;
  assignedProjectId?: string;
}

export interface ProjectSubmission {
  githubUrl?: string;
  liveUrl?: string;
  notes?: string;
  submittedAt?: string;
  assignedAt?: string;
  deadlineAt?: string;
}

export interface ProjectAIFeedback {
  score: number;
  strengths: string[];
  weaknesses?: string[];
  mistakes: string[];
  suggestions: string[];
  nextSteps: string[];
  marketFitScore?: number;
  marketReview?: string;
  reviewedAt: string;
}

export interface CapstoneProject {
  id: string;
  title: string;
  courseId: string;
  careerId: string;
  category: string;
  field?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro' | 'Industry-Ready';
  estimatedHours: number;
  deadlineDays: number;
  stage?: 'Beginner' | 'Intermediate' | 'Pro';
  courseMonths?: number;
  description: string;
  requirements: string[];
  skillsTested: string[];
  status: 'assigned' | 'in_progress' | 'submitted' | 'graded';
  submission?: ProjectSubmission;
  submissionRepo?: string;
  submissionNotes?: string;
  feedback?: ProjectAIFeedback;
  aiFeedback?: ProjectAIFeedback;
}


export interface AppNotification {
  id: string;
  type: 'course' | 'milestone' | 'project' | 'assessment' | 'recommendation';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'coach';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export type AppTheme = 'dark' | 'light' | 'purple' | 'ocean' | 'emerald';

export interface PersonalityDimension {
  id?: string;
  name?: string;
  dimension?: string;
  score: number;
  trait?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface PersonalityAssessmentResult {
  dimensions: PersonalityDimension[];
  dominantType?: string;
  primaryType?: string;
  archetype?: string;
  summary?: string;
  recommendedTracks?: string[];
  recommendedCareers?: any[];
  completedAt?: string;
}

export interface EligibilityTestResult {
  score?: number;
  isEligible?: boolean;
  targetCareer?: string;
  targetField?: string;
  overallReadiness?: string | number;
  verdict?: string;
  testDate?: string;
  breakdown?: Record<string, any> | Array<any>;
  strengths: string[];
  growthAreas?: string[];
  recommendations?: string[];
}

export interface ResumeAnalysisResult {
  score: number;
  strengths: string[];
  missingKeywords: string[];
  actionableTips: string[];
}

export interface ResumeData {
  title?: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  education: Array<{ degree: string; institution: string; year: string; gpa?: string; gradeOrCgpa?: string }>;
  experience: Array<{ title?: string; role?: string; company: string; duration: string; details?: string; bullets?: string[] }>;
  skills: string[];
  certifications?: string[];
  atsScore?: number;
  atsFeedback?: any;
  projects: Array<{ title?: string; name?: string; description: string; link?: string; technologies?: string[] | string }>;
}

export interface SkillRating {
  skill: string;
  category?: string;
  score?: number;
  level?: string;
  currentLevel?: number;
  targetLevel?: number;
  gap?: number;
  learningResource?: string;
}

export interface CareerRecommendation {
  id: string;
  title?: string;
  category?: string;
  careerName?: string;
  domain?: string;
  matchScore: number;
  salary?: string;
  avgSalaryPKR?: string;
  avgSalaryUSD?: string;
  growthRate?: string;
  demand?: string;
  whyFit?: string;
  missingSkills?: string[];
  topUniversities?: string[];
  careerLadder?: any[];
  requiredSkills: string[];
  recommendedCourses?: string[];
}

export interface StudyPlanDay {
  day: string;
  date?: string;
  slots?: Array<{ time: string; activity?: string; type: string; subject?: string; topic?: string; durationMin?: number; status?: string }>;
  tasks?: Array<{ id: string; title: string; duration: string; completed: boolean }>;
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  matchScore: number;
}

export interface ScholarshipItem {
  id: string;
  title: string;
  organization?: string;
  provider?: string;
  amount?: string;
  coverage?: string;
  deadline?: string;
  eligibility?: string;
  domain?: string;
  badge?: string;
  description?: string;
  eligibleProvinces?: string[];
  minMarksPercentage?: number;
  applicationPeriod?: string;
  link?: string;
}

export interface MarketDemandItem {
  role: string;
  demandGrowth: string;
  medianSalary: string;
  topSkills: string[];
  openPositions: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  roadmapReminders: boolean;
  projectGradingAlerts: boolean;
  weeklyDigest: boolean;
}
