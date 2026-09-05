import { CourseDetailItem, COMPREHENSIVE_COURSES_DATA } from '../utils/courseData';
import { UserProfile } from '../types';
import { readUserScoped, writeUserScoped } from '../utils/userScopedStorage';

const COURSES_STORAGE_KEY = 'intellipath_courses_master_state';
const ACTIVE_COURSE_KEY = 'intellipath_active_selected_course_id';

function cloneCourseData(): CourseDetailItem[] {
  return JSON.parse(JSON.stringify(COMPREHENSIVE_COURSES_DATA)) as CourseDetailItem[];
}

export const courseService = {
  getAllCourses(): CourseDetailItem[] {
    return readUserScoped<CourseDetailItem[]>(COURSES_STORAGE_KEY, cloneCourseData());
  },

  saveCourses(courses: CourseDetailItem[]) { writeUserScoped(COURSES_STORAGE_KEY, courses); },

  getCourseById(courseId: string): CourseDetailItem | undefined {
    return this.getAllCourses().find((c) => c.id === courseId);
  },

  getActiveCourseId(): string {
    const saved = readUserScoped<string | null>(ACTIVE_COURSE_KEY, null);
    if (saved && this.getCourseById(saved)) return saved;
    return 'tech-programming-fundamentals';
  },

  getActiveCourse(): CourseDetailItem {
    const course = this.getCourseById(this.getActiveCourseId());
    return course || this.getAllCourses()[0];
  },

  selectAndEnrollCourse(courseId: string): CourseDetailItem {
    const courses = this.getAllCourses().map((c) => c.id === courseId ? { ...c, isEnrolled: true } : c);
    writeUserScoped(ACTIVE_COURSE_KEY, courseId);
    this.saveCourses(courses);
    return courses.find((c) => c.id === courseId) || courses[0];
  },

  toggleMilestoneCompletion(courseId: string, milestoneId: string): CourseDetailItem | undefined {
    const courses = this.getAllCourses();
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) return undefined;
    targetCourse.roadmap = targetCourse.roadmap.map((m) => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
    const completedCount = targetCourse.roadmap.filter((m) => m.completed).length;
    targetCourse.progress = targetCourse.roadmap.length ? Math.round((completedCount / targetCourse.roadmap.length) * 100) : 0;
    targetCourse.isCompleted = targetCourse.progress === 100;
    this.saveCourses(courses);
    return targetCourse;
  },

  markCourseCompleted(courseId: string): CourseDetailItem | undefined {
    const courses = this.getAllCourses();
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) return undefined;
    targetCourse.roadmap = targetCourse.roadmap.map((m) => ({ ...m, completed: true }));
    targetCourse.progress = 100;
    targetCourse.isCompleted = true;
    this.saveCourses(courses);
    return targetCourse;
  },

  resetCourseProgress(courseId: string): CourseDetailItem | undefined {
    const courses = this.getAllCourses();
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) return undefined;
    targetCourse.roadmap = targetCourse.roadmap.map((m) => ({ ...m, completed: false }));
    targetCourse.progress = 0;
    targetCourse.isCompleted = false;
    this.saveCourses(courses);
    return targetCourse;
  },

  getRecommendedCoursesForUser(user: UserProfile | null) {
    const score = user?.aptitudeScore ?? 0;
    const allCourses = this.getAllCourses();
    const userInterests = user?.interests || [];
    const lowerInterests = userInterests.map((i) => i.toLowerCase());
    let tierCode: 'tier1_advanced' | 'tier2_intermediate' | 'tier3_foundation' | 'tier4_early';
    let tierTitle = '', tierSubtitle = '', adviceMessage = '';
    if (score >= 80) {
      tierCode = 'tier1_advanced'; tierTitle = 'Advanced & Specialization Track'; tierSubtitle = `Aptitude Score: ${score}% (Score ≥ 80%)`;
      adviceMessage = 'Your diagnostic assessment strongly validates your selected career path! Enter specialized and advanced courses directly.';
    } else if (score >= 60) {
      tierCode = 'tier2_intermediate'; tierTitle = 'Intermediate & Applied Foundation Track'; tierSubtitle = `Aptitude Score: ${score}% (Score 60–79%)`;
      adviceMessage = 'Strong potential. Start with applied foundation courses to solidify core skills before advanced architecture.';
    } else if (score >= 40) {
      tierCode = 'tier3_foundation'; tierTitle = 'Foundational Bridge Track'; tierSubtitle = `Aptitude Score: ${score}% (Score 40–59%)`;
      adviceMessage = 'Build confidence with foundational coursework before moving to advanced career-specific courses.';
    } else {
      tierCode = 'tier4_early'; tierTitle = 'Early-Stage Foundation Track'; tierSubtitle = `Aptitude Score: ${score}% (Score < 40%)`;
      adviceMessage = 'Start with foundational skills and progress step-by-step toward a career-specific track.';
    }

    const matched = allCourses.filter((c) => {
      if (tierCode === 'tier1_advanced') return c.level === 'Pro' || c.level === 'Advanced' || c.level === 'Intermediate';
      if (tierCode === 'tier2_intermediate') return c.level === 'Intermediate' || c.level === 'Beginner';
      return c.level === 'Beginner';
    }).sort((a, b) => {
      const aDomain = lowerInterests.some((i) => `${a.title} ${a.category} ${a.domain}`.toLowerCase().includes(i)) ? 1 : 0;
      const bDomain = lowerInterests.some((i) => `${b.title} ${b.category} ${b.domain}`.toLowerCase().includes(i)) ? 1 : 0;
      return bDomain - aDomain || b.matchScore - a.matchScore;
    });
    return { tierTitle, tierSubtitle, tierCode, adviceMessage, courses: matched.slice(0, 5) };
  },
};
