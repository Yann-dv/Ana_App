'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Flame,
  CheckCircle,
  Lock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Crown,
  Medal,
  Gift
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const {
    userProgress,
    achievements,
    unlockedAchievements,
    getTodayActivity,
    getWeeklyActivity,
    getMonthlyActivity,
    getProgressStats,
    updateWeeklyGoal
  } = useProgress();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'statistics' | 'goals'>('overview');
  const [newGoalTarget, setNewGoalTarget] = useState(userProgress.weeklyGoal.target);
  
  const todayActivity = getTodayActivity();
  const weeklyActivity = getWeeklyActivity();
  const monthlyActivity = getMonthlyActivity();
  const stats = getProgressStats();
  
  // Calculate weekly progress
  const weeklyTimeWatched = weeklyActivity.reduce((total, day) => total + day.timeWatched, 0) / 60; // convert to minutes
  const weeklyProgress = (weeklyTimeWatched / userProgress.weeklyGoal.target) * 100;
  
  // Calculate level progress
  const levelProgress = ((userProgress.experiencePoints % 100) / 100) * 100;
  
  const getDifficultyColor = (category: string) => {
    switch (category) {
      case 'workout': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'streak': return 'bg-red-100 text-red-800 border-red-200';
      case 'time': return 'bg-green-100 text-green-800 border-green-200';
      case 'milestone': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'social': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };
  
  const getWeeklyChart = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    return days.map((day, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      const dateStr = date.toISOString().split('T')[0];
      
      const activity = weeklyActivity.find(a => a.date === dateStr);
      const timeInMinutes = activity ? activity.timeWatched / 60 : 0;
      
      return {
        day,
        time: timeInMinutes,
        isToday: date.toDateString() === today.toDateString()
      };
    });
  };
  
  const weeklyChart = getWeeklyChart();
  const maxWeeklyTime = Math.max(...weeklyChart.map(d => d.time), 30); // minimum 30 for scale

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your progress</h2>
          <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <BackButton href="/dashboard" label="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your fitness journey and celebrate your achievements</p>
        </motion.div>

        {/* Level and XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {userProgress.level}</h2>
                <p className="opacity-90">{userProgress.totalPoints} total points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Next Level</p>
              <p className="text-lg font-semibold">{userProgress.experienceToNextLevel} XP to go</p>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
                { id: 'statistics', label: 'Statistics', icon: PieChart },
                { id: 'goals', label: 'Goals', icon: Target }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Target className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-blue-600">Videos Completed</p>
                        <p className="text-2xl font-bold text-blue-900">{userProgress.totalVideosCompleted}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-600">Total Time</p>
                        <p className="text-2xl font-bold text-green-900">{formatTime(userProgress.totalWatchTime)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Flame className="w-8 h-8 text-red-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-red-600">Current Streak</p>
                        <p className="text-2xl font-bold text-red-900">{userProgress.currentStreak} days</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Trophy className="w-8 h-8 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-purple-600">Achievements</p>
                        <p className="text-2xl font-bold text-purple-900">{unlockedAchievements.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Weekly Activity Chart */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">This Week's Activity</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-end justify-between h-40">
                      {weeklyChart.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full flex justify-center mb-2">
                            <div 
                              className={`w-8 rounded-t transition-all duration-300 ${
                                day.isToday ? 'bg-blue-500' : 'bg-blue-300'
                              }`}
                              style={{ 
                                height: `${Math.max((day.time / maxWeeklyTime) * 120, 4)}px` 
                              }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            day.isToday ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {day.day}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(day.time)}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unlockedAchievements.slice(-6).map(achievement => (
                      <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{achievement.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(achievement.category)}`}>
                            {achievement.category}
                          </span>
                          <span className="text-sm font-medium text-yellow-600">+{achievement.points} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">All Achievements</h3>
                  <div className="text-sm text-gray-600">
                    {unlockedAchievements.length} of {achievements.length} unlocked
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`border rounded-lg p-6 transition-all ${
                        achievement.isUnlocked 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`text-3xl mr-4 ${
                          achievement.isUnlocked ? '' : 'grayscale'
                        }`}>
                          {achievement.isUnlocked ? achievement.icon : '🔒'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(achievement.category)}`}>
                          {achievement.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{achievement.points} XP</span>
                        </div>
                      </div>
                      
                      {achievement.isUnlocked && achievement.unlockedAt && (
                        <div className="mt-3 pt-3 border-t border-yellow-200">
                          <p className="text-xs text-gray-500">
                            Unlocked {achievement.unlockedAt.toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className="space-y-8">
                {/* Monthly Stats */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">This Month</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900">Videos Completed</h4>
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-900">{userProgress.monthlyStats.videosCompleted}</p>
                      <p className="text-sm text-blue-600 mt-1">+{Math.round(userProgress.monthlyStats.videosCompleted * 0.15)} from last month</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-900">Time Watched</h4>
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-900">{formatTime(userProgress.monthlyStats.timeWatched)}</p>
                      <p className="text-sm text-green-600 mt-1">+{Math.round(userProgress.monthlyStats.timeWatched * 0.12 / 60)}m from last month</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-purple-900">Programs Started</h4>
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-900">{userProgress.monthlyStats.programsStarted}</p>
                      <p className="text-sm text-purple-600 mt-1">New this month</p>
                    </div>
                  </div>
                </div>
                
                {/* Performance Stats */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Average Session Time</h4>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{formatTime(stats.averageSessionTime)}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min((stats.averageSessionTime / 1800) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Target: 30 minutes</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Longest Streak</h4>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{userProgress.longestStreak} days</p>
                      <div className="flex items-center">
                        <Flame className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">Keep it up!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-8">
                {/* Weekly Goal */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goal</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Workout Time Goal</h4>
                        <p className="text-sm text-gray-600">Current: {Math.round(weeklyTimeWatched)} / {userProgress.weeklyGoal.target} minutes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{Math.round(weeklyProgress)}%</p>
                        <p className="text-sm text-gray-600">Complete</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                          weeklyProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                      ></div>
                    </div>
                    
                    {weeklyProgress >= 100 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">Goal achieved! Great work!</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={newGoalTarget}
                        onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-24"
                        min="30"
                        max="1000"
                      />
                      <span className="text-sm text-gray-600">minutes per week</span>
                      <button
                        onClick={() => updateWeeklyGoal(newGoalTarget)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Update Goal
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Suggested Goals */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Goals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <Target className="w-6 h-6 text-blue-600 mr-3" />
                        <h4 className="font-medium text-blue-900">Complete 5 Videos This Week</h4>
                      </div>
                      <p className="text-sm text-blue-700 mb-4">Build consistency with regular workout sessions</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600">Progress: {weeklyActivity.reduce((sum, day) => sum + day.videosCompleted, 0)}/5</span>
                        <span className="text-sm font-medium text-blue-600">+100 XP</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <Flame className="w-6 h-6 text-green-600 mr-3" />
                        <h4 className="font-medium text-green-900">Maintain 7-Day Streak</h4>
                      </div>
                      <p className="text-sm text-green-700 mb-4">Keep your momentum going strong</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600">Current: {userProgress.currentStreak}/7 days</span>
                        <span className="text-sm font-medium text-green-600">+300 XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;