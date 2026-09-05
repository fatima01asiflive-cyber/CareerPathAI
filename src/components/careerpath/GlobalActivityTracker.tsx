import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  addActivityTime,
} from '../../utils/activityTimeTracker';

export const GlobalActivityTracker: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      // Track usage only. Streaks are intentionally NOT time-based.
      // The student must manually check in once per day.
      addActivityTime('app', 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [user?.id]);

  return null;
};
