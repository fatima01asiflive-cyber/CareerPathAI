import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { notificationService } from '../../services/notificationService';

export function ProjectDeadlineNotifier() {
  const { user, roadmapCompletionPercentage } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const checkDeadlines = () => {
      const { projects, newlyAssigned } = projectService.syncProjectAssignments(roadmapCompletionPercentage);
      newlyAssigned.forEach((project) => notificationService.addNotification({
        type: 'project',
        title: `New ${project.stage} project assigned: ${project.title}`,
        message: `You unlocked this ${project.category} deliverable. Complete it within ${project.deadlineDays} days and submit GitHub + live deployment links for review.`,
        actionUrl: '/projects',
      }));

      const now = Date.now();
      projects.forEach((project) => {
        if (!project.submission?.deadlineAt || project.status === 'graded') return;
        const deadline = new Date(project.submission.deadlineAt).getTime();
        const remaining = deadline - now;
        if (remaining <= 0) {
          notificationService.ensureProjectDeadlineNotification(project.id, project.title, 'now', '/projects');
          return;
        }
        if (remaining <= 72 * 60 * 60 * 1000) {
          const hours = Math.max(1, Math.ceil(remaining / (60 * 60 * 1000)));
          notificationService.ensureProjectDeadlineNotification(project.id, project.title, `in approximately ${hours} hour${hours === 1 ? '' : 's'}`, '/projects');
        }
      });
    };

    checkDeadlines();
    const id = window.setInterval(checkDeadlines, 15 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [user?.id, roadmapCompletionPercentage]);

  return null;
}
