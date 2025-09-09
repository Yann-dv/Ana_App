'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface VideoProgress {
  videoId: string;
  programId: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatched: Date;
}

interface VideoState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  quality: 'auto' | '720p' | '1080p' | '480p';
  subtitles: boolean;
  fullscreen: boolean;
}

interface VideoContextType {
  // Video Progress
  videoProgress: VideoProgress[];
  updateVideoProgress: (progress: Partial<VideoProgress> & { videoId: string; programId: string }) => void;
  getVideoProgress: (videoId: string, programId: string) => VideoProgress | null;
  markVideoComplete: (videoId: string, programId: string) => void;
  
  // Video State
  videoState: VideoState;
  updateVideoState: (state: Partial<VideoState>) => void;
  
  // Playback Controls
  currentVideo: {
    id: string;
    programId: string;
    title: string;
    url: string;
  } | null;
  setCurrentVideo: (video: {
    id: string;
    programId: string;
    title: string;
    url: string;
  } | null) => void;
  
  // Statistics
  getTotalWatchTime: () => number;
  getCompletedVideosCount: () => number;
  getProgramProgress: (programId: string) => {
    completed: number;
    total: number;
    percentage: number;
  };
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isMuted: false,
    volume: 1,
    playbackRate: 1,
    quality: 'auto',
    subtitles: false,
    fullscreen: false
  });
  const [currentVideo, setCurrentVideo] = useState<{
    id: string;
    programId: string;
    title: string;
    url: string;
  } | null>(null);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('videoProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setVideoProgress(parsed.map((p: any) => ({
          ...p,
          lastWatched: new Date(p.lastWatched)
        })));
      } catch (error) {
        console.error('Failed to load video progress:', error);
      }
    }

    const savedState = localStorage.getItem('videoState');
    if (savedState) {
      try {
        setVideoState(JSON.parse(savedState));
      } catch (error) {
        console.error('Failed to load video state:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('videoProgress', JSON.stringify(videoProgress));
  }, [videoProgress]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('videoState', JSON.stringify(videoState));
  }, [videoState]);

  const updateVideoProgress = (progress: Partial<VideoProgress> & { videoId: string; programId: string }) => {
    setVideoProgress(prev => {
      const existingIndex = prev.findIndex(
        p => p.videoId === progress.videoId && p.programId === progress.programId
      );

      const updatedProgress: VideoProgress = {
        currentTime: 0,
        duration: 0,
        completed: false,
        lastWatched: new Date(),
        ...(existingIndex >= 0 ? prev[existingIndex] : {}),
        ...progress
      };

      if (existingIndex >= 0) {
        const newProgress = [...prev];
        newProgress[existingIndex] = updatedProgress;
        return newProgress;
      } else {
        return [...prev, updatedProgress];
      }
    });
  };

  const getVideoProgress = (videoId: string, programId: string): VideoProgress | null => {
    return videoProgress.find(p => p.videoId === videoId && p.programId === programId) || null;
  };

  const markVideoComplete = (videoId: string, programId: string) => {
    updateVideoProgress({
      videoId,
      programId,
      completed: true,
      lastWatched: new Date()
    });
  };

  const updateVideoState = (state: Partial<VideoState>) => {
    setVideoState(prev => ({ ...prev, ...state }));
  };

  const getTotalWatchTime = (): number => {
    return videoProgress.reduce((total, progress) => {
      return total + (progress.completed ? progress.duration : progress.currentTime);
    }, 0);
  };

  const getCompletedVideosCount = (): number => {
    return videoProgress.filter(p => p.completed).length;
  };

  const getProgramProgress = (programId: string) => {
    const programVideos = videoProgress.filter(p => p.programId === programId);
    const completed = programVideos.filter(p => p.completed).length;
    const total = programVideos.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { completed, total, percentage };
  };

  const value: VideoContextType = {
    videoProgress,
    updateVideoProgress,
    getVideoProgress,
    markVideoComplete,
    videoState,
    updateVideoState,
    currentVideo,
    setCurrentVideo,
    getTotalWatchTime,
    getCompletedVideosCount,
    getProgramProgress
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export default VideoContext;