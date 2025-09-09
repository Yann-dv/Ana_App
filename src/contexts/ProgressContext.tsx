'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'workout' | 'streak' | 'time' | 'milestone' | 'social';
  requirement: {
    type: 'videos_completed' | 'total_time' | 'streak_days' | 'programs_completed' | 'consecutive_days';
    value: number;
  };
  points: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

interface UserProgress {
  totalPoints: number;
  level: number;
  experiencePoints: number;
  experienceToNextLevel: number;
  totalVideosCompleted: number;
  totalWatchTime: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  programsCompleted: number;
  lastActivityDate?: Date;
  weeklyGoal: {
    target: number; // minutes per week
    current: number;
    weekStart: Date;
  };
  monthlyStats: {
    videosCompleted: number;
    timeWatched: number;
    programsStarted: number;
    month: number;
    year: number;
  };
}

interface DailyActivity {
  date: string; // YYYY-MM-DD format
  videosCompleted: number;
  timeWatched: number; // in seconds
  programsStarted: number;
  points: number;
}

interface ProgressContextType {
  // User Progress
  userProgress: UserProgress;
  updateProgress: (activity: Partial<DailyActivity>) => void;
  
  // Achievements
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  checkAndUnlockAchievements: () => Achievement[];
  
  // Daily Activity
  dailyActivities: DailyActivity[];
  getTodayActivity: () => DailyActivity;
  getWeeklyActivity: () => DailyActivity[];
  getMonthlyActivity: () => DailyActivity[];
  
  // Goals and Streaks
  updateWeeklyGoal: (target: number) => void;
  calculateStreak: () => number;
  
  // Statistics
  getProgressStats: () => {
    totalWorkouts: number;
    averageSessionTime: number;
    favoriteCategory: string;
    improvementRate: number;
  };
  
  // Scoring
  addPoints: (points: number, reason: string) => void;
  getPointsHistory: () => { date: string; points: number; reason: string }[];
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first_video',
    title: 'First Steps',
    description: 'Complete your first workout video',
    icon: '🎯',
    category: 'milestone',
    requirement: { type: 'videos_completed', value: 1 },
    points: 50,
    isUnlocked: false
  },
  {
    id: 'five_videos',
    title: 'Getting Started',
    description: 'Complete 5 workout videos',
    icon: '🔥',
    category: 'workout',
    requirement: { type: 'videos_completed', value: 5 },
    points: 100,
    isUnlocked: false
  },
  {
    id: 'ten_videos',
    title: 'Dedicated Learner',
    description: 'Complete 10 workout videos',
    icon: '💪',
    category: 'workout',
    requirement: { type: 'videos_completed', value: 10 },
    points: 200,
    isUnlocked: false
  },
  {
    id: 'first_hour',
    title: 'Time Keeper',
    description: 'Watch 1 hour of content',
    icon: '⏰',
    category: 'time',
    requirement: { type: 'total_time', value: 3600 },
    points: 75,
    isUnlocked: false
  },
  {
    id: 'five_hours',
    title: 'Committed Student',
    description: 'Watch 5 hours of content',
    icon: '📚',
    category: 'time',
    requirement: { type: 'total_time', value: 18000 },
    points: 250,
    isUnlocked: false
  },
  {
    id: 'three_day_streak',
    title: 'Consistency',
    description: 'Maintain a 3-day workout streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak_days', value: 3 },
    points: 150,
    isUnlocked: false
  },
  {
    id: 'week_streak',
    title: 'Weekly Warrior',
    description: 'Maintain a 7-day workout streak',
    icon: '⚡',
    category: 'streak',
    requirement: { type: 'streak_days', value: 7 },
    points: 300,
    isUnlocked: false
  },
  {
    id: 'first_program',
    title: 'Program Pioneer',
    description: 'Complete your first program',
    icon: '🏆',
    category: 'milestone',
    requirement: { type: 'programs_completed', value: 1 },
    points: 500,
    isUnlocked: false
  }
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 0,
    level: 1,
    experiencePoints: 0,
    experienceToNextLevel: 100,
    totalVideosCompleted: 0,
    totalWatchTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    programsCompleted: 0,
    weeklyGoal: {
      target: 150, // 2.5 hours per week
      current: 0,
      weekStart: new Date()
    },
    monthlyStats: {
      videosCompleted: 0,
      timeWatched: 0,
      programsStarted: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    }
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
  const [pointsHistory, setPointsHistory] = useState<{ date: string; points: number; reason: string }[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setUserProgress({
          ...parsed,
          lastActivityDate: parsed.lastActivityDate ? new Date(parsed.lastActivityDate) : undefined,
          weeklyGoal: {
            ...parsed.weeklyGoal,
            weekStart: new Date(parsed.weeklyGoal.weekStart)
          }
        });
      } catch (error) {
        console.error('Failed to load user progress:', error);
      }
    }

    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      try {
        const parsed = JSON.parse(savedAchievements);
        setAchievements(parsed.map((a: any) => ({
          ...a,
          unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined
        })));
      } catch (error) {
        console.error('Failed to load achievements:', error);
      }
    }

    const savedActivities = localStorage.getItem('dailyActivities');
    if (savedActivities) {
      try {
        setDailyActivities(JSON.parse(savedActivities));
      } catch (error) {
        console.error('Failed to load daily activities:', error);
      }
    }

    const savedPointsHistory = localStorage.getItem('pointsHistory');
    if (savedPointsHistory) {
      try {
        setPointsHistory(JSON.parse(savedPointsHistory));
      } catch (error) {
        console.error('Failed to load points history:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('dailyActivities', JSON.stringify(dailyActivities));
  }, [dailyActivities]);

  useEffect(() => {
    localStorage.setItem('pointsHistory', JSON.stringify(pointsHistory));
  }, [pointsHistory]);

  const getTodayActivity = (): DailyActivity => {
    const today = new Date().toISOString().split('T')[0];
    return dailyActivities.find(a => a.date === today) || {
      date: today,
      videosCompleted: 0,
      timeWatched: 0,
      programsStarted: 0,
      points: 0
    };
  };

  const updateProgress = (activity: Partial<DailyActivity>) => {
    const today = new Date().toISOString().split('T')[0];
    const todayActivity = getTodayActivity();
    
    const updatedActivity: DailyActivity = {
      ...todayActivity,
      ...activity,
      date: today
    };

    // Update daily activities
    setDailyActivities(prev => {
      const filtered = prev.filter(a => a.date !== today);
      return [...filtered, updatedActivity];
    });

    // Update user progress
    setUserProgress(prev => {
      const newProgress = { ...prev };
      
      if (activity.videosCompleted) {
        newProgress.totalVideosCompleted += activity.videosCompleted;
        newProgress.monthlyStats.videosCompleted += activity.videosCompleted;
      }
      
      if (activity.timeWatched) {
        newProgress.totalWatchTime += activity.timeWatched;
        newProgress.monthlyStats.timeWatched += activity.timeWatched;
        newProgress.weeklyGoal.current += Math.floor(activity.timeWatched / 60); // convert to minutes
      }
      
      if (activity.programsStarted) {
        newProgress.monthlyStats.programsStarted += activity.programsStarted;
      }
      
      newProgress.lastActivityDate = new Date();
      newProgress.currentStreak = calculateStreak();
      
      // Update level based on experience points
      const newExperience = newProgress.experiencePoints + (activity.points || 0);
      const newLevel = Math.floor(newExperience / 100) + 1;
      
      newProgress.experiencePoints = newExperience;
      newProgress.level = newLevel;
      newProgress.experienceToNextLevel = (newLevel * 100) - newExperience;
      
      return newProgress;
    });
  };

  const calculateStreak = (): number => {
    const sortedActivities = [...dailyActivities].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let currentDate = new Date();
    
    for (const activity of sortedActivities) {
      const activityDate = new Date(activity.date);
      const daysDiff = Math.floor((currentDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak && activity.videosCompleted > 0) {
        streak++;
        currentDate = activityDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const checkAndUnlockAchievements = (): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];
    
    setAchievements(prev => {
      return prev.map(achievement => {
        if (achievement.isUnlocked) return achievement;
        
        let shouldUnlock = false;
        
        switch (achievement.requirement.type) {
          case 'videos_completed':
            shouldUnlock = userProgress.totalVideosCompleted >= achievement.requirement.value;
            break;
          case 'total_time':
            shouldUnlock = userProgress.totalWatchTime >= achievement.requirement.value;
            break;
          case 'streak_days':
            shouldUnlock = userProgress.currentStreak >= achievement.requirement.value;
            break;
          case 'programs_completed':
            shouldUnlock = userProgress.programsCompleted >= achievement.requirement.value;
            break;
        }
        
        if (shouldUnlock) {
          const unlockedAchievement = {
            ...achievement,
            isUnlocked: true,
            unlockedAt: new Date()
          };
          newlyUnlocked.push(unlockedAchievement);
          addPoints(achievement.points, `Achievement: ${achievement.title}`);
          return unlockedAchievement;
        }
        
        return achievement;
      });
    });
    
    return newlyUnlocked;
  };

  const addPoints = (points: number, reason: string) => {
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      experiencePoints: prev.experiencePoints + points
    }));
    
    setPointsHistory(prev => [
      ...prev,
      {
        date: new Date().toISOString(),
        points,
        reason
      }
    ]);
  };

  const getWeeklyActivity = (): DailyActivity[] => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    return dailyActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate >= weekStart;
    });
  };

  const getMonthlyActivity = (): DailyActivity[] => {
    const monthStart = new Date();
    monthStart.setDate(1);
    
    return dailyActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate >= monthStart;
    });
  };

  const updateWeeklyGoal = (target: number) => {
    setUserProgress(prev => ({
      ...prev,
      weeklyGoal: {
        ...prev.weeklyGoal,
        target
      }
    }));
  };

  const getProgressStats = () => {
    const totalWorkouts = userProgress.totalVideosCompleted;
    const averageSessionTime = totalWorkouts > 0 ? userProgress.totalWatchTime / totalWorkouts : 0;
    
    return {
      totalWorkouts,
      averageSessionTime,
      favoriteCategory: 'Yoga', // This would be calculated from actual data
      improvementRate: 15 // This would be calculated based on performance over time
    };
  };

  const getPointsHistory = () => pointsHistory;

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);

  const value: ProgressContextType = {
    userProgress,
    updateProgress,
    achievements,
    unlockedAchievements,
    checkAndUnlockAchievements,
    dailyActivities,
    getTodayActivity,
    getWeeklyActivity,
    getMonthlyActivity,
    updateWeeklyGoal,
    calculateStreak,
    getProgressStats,
    addPoints,
    getPointsHistory
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;