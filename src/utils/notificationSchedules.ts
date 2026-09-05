import { readUserScoped, writeUserScoped } from './userScopedStorage';

export interface StudyAlarm {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  title: string;
  subtitle: string;
  enabled: boolean;
  actionUrl: string;
  actionLabel: string;
}

const KEY = 'careerpath_notification_alarms_v1';

export const DEFAULT_STUDY_ALARMS: StudyAlarm[] = [
  { id: 'alarm-1', time: '08:00 AM', period: 'Morning', title: 'Morning Formula Revision & High-Yield Flashcards', subtitle: 'Review your weakest Computer Science roadmap topics before starting your day.', enabled: true, actionUrl: '/resources', actionLabel: 'Open Resources' },
  { id: 'alarm-2', time: '02:00 PM', period: 'Afternoon', title: 'Daily Computer Science Aptitude Drill', subtitle: 'Sharpen your speed with 10 random MCQs.', enabled: true, actionUrl: '/assessment', actionLabel: 'Start Assessment' },
  { id: 'alarm-3', time: '07:00 PM', period: 'Evening', title: 'Concept Booster Video Lecture', subtitle: 'Watch a focused lesson matched to your current category.', enabled: true, actionUrl: '/resources', actionLabel: 'Watch Resource' },
  { id: 'alarm-4', time: '09:00 PM', period: 'Night', title: 'Project Submission Deadline Reminder', subtitle: 'Check your current project deadline and submission status.', enabled: true, actionUrl: '/projects', actionLabel: 'Open Project' },
];

export const getStudyAlarms = (): StudyAlarm[] => readUserScoped<StudyAlarm[]>(KEY, DEFAULT_STUDY_ALARMS.map((a) => ({ ...a })));
export const saveStudyAlarms = (alarms: StudyAlarm[]) => writeUserScoped(KEY, alarms);
