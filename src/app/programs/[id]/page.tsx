'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause,
  Clock, 
  Users, 
  Star, 
  Heart,
  Share2,
  Download,
  CheckCircle,
  Lock,
  Crown,
  ArrowLeft,
  Target,
  Calendar,
  Award,
  Volume2,
  VolumeX,
  Maximize,
  Settings
} from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVideo } from '@/contexts/VideoContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  isCompleted: boolean;
  order: number;
}

interface ProgramDetail {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorBio: string;
  instructorImage: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Yoga' | 'Pilates' | 'HIIT' | 'Strength' | 'Cardio' | 'Meditation';
  thumbnail: string;
  rating: number;
  totalRatings: number;
  isPremium: boolean;
  tags: string[];
  videos: Video[];
  equipment: string[];
  benefits: string[];
  completionRate: number;
}

const mockProgramDetail: ProgramDetail = {
  id: '1',
  title: 'Morning Yoga Flow',
  description: 'Start your day with energizing yoga sequences designed to awaken your body and mind. This comprehensive program combines traditional yoga poses with modern flow techniques to create a perfect morning routine that will leave you feeling refreshed, centered, and ready to tackle your day.',
  instructor: 'Sarah Johnson',
  instructorBio: 'Sarah is a certified yoga instructor with over 10 years of experience. She specializes in Vinyasa and Hatha yoga and has helped thousands of students develop their practice.',
  instructorImage: '/api/placeholder/100/100',
  duration: 240, // total program duration
  difficulty: 'Beginner',
  category: 'Yoga',
  thumbnail: '/api/placeholder/800/450',
  rating: 4.8,
  totalRatings: 1247,
  isPremium: false,
  tags: ['Morning', 'Flexibility', 'Mindfulness', 'Energy'],
  equipment: ['Yoga Mat', 'Yoga Block (Optional)', 'Strap (Optional)'],
  benefits: [
    'Improved flexibility and mobility',
    'Better posture and alignment',
    'Reduced stress and anxiety',
    'Increased energy levels',
    'Enhanced mind-body connection'
  ],
  completionRate: 65,
  videos: [
    {
      id: 'v1',
      title: 'Introduction to Morning Yoga',
      description: 'Learn the basics and prepare for your yoga journey',
      duration: 15,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: true,
      order: 1
    },
    {
      id: 'v2',
      title: 'Sun Salutation Sequence',
      description: 'Master the foundational sun salutation flow',
      duration: 25,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: true,
      order: 2
    },
    {
      id: 'v3',
      title: 'Standing Poses Flow',
      description: 'Build strength and stability with standing poses',
      duration: 30,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 3
    },
    {
      id: 'v4',
      title: 'Seated Poses and Twists',
      description: 'Improve flexibility with seated poses and spinal twists',
      duration: 28,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 4
    },
    {
      id: 'v5',
      title: 'Backbends and Heart Openers',
      description: 'Open your heart and strengthen your back',
      duration: 32,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 5
    },
    {
      id: 'v6',
      title: 'Hip Openers and Forward Folds',
      description: 'Release tension in hips and hamstrings',
      duration: 35,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 6
    },
    {
      id: 'v7',
      title: 'Inversions and Arm Balances',
      description: 'Challenge yourself with inversions and arm balances',
      duration: 40,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 7
    },
    {
      id: 'v8',
      title: 'Final Relaxation and Meditation',
      description: 'Complete your practice with deep relaxation',
      duration: 20,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/placeholder/video',
      isCompleted: false,
      order: 8
    }
  ]
};

const ProgramDetailPage: React.FC = () => {
  const params = useParams();
  const { user } = useAuth();
  const { currentPlan, checkAccess } = useSubscription();
  const { 
    videoState, 
    updateVideoState, 
    currentVideo, 
    setCurrentVideo, 
    markVideoComplete,
    getVideoProgress,
    updateVideoProgress 
  } = useVideo();
  const [program, setProgram] = useState<ProgramDetail>(mockProgramDetail);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'instructor'>('overview');

  const canAccessProgram = program && (!program.isPremium || checkAccess('premiumContent'));
  
  // Get video progress from context
  const getVideoCompletionStatus = (videoId: string) => {
    const progress = getVideoProgress(videoId, program.id);
    return progress?.completed || false;
  };
  
  const completedVideos = program?.videos.filter(v => getVideoCompletionStatus(v.id)).length || 0;
  const totalVideos = program?.videos.length || 0;
  const progressPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

  const handleVideoSelect = (video: Video) => {
    if (!canAccessProgram) return;
    setCurrentVideo({
      id: video.id,
      programId: program.id,
      title: video.title,
      url: video.videoUrl
    });
    setShowVideoPlayer(true);
    updateVideoState({ isPlaying: true });
    
    // Update video progress when starting
    updateVideoProgress({
      videoId: video.id,
      programId: program.id,
      currentTime: 0,
      duration: video.duration * 60 // convert minutes to seconds
    });
  };

  const handleMarkVideoComplete = (videoId: string) => {
    markVideoComplete(videoId, program.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Player Modal */}
      {showVideoPlayer && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-4">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
                  <p className="text-sm opacity-80">Video player would be integrated here</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateVideoState({ isPlaying: !videoState.isPlaying })}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {videoState.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={() => updateVideoState({ isMuted: !videoState.isMuted })}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {videoState.isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <span className="text-sm">
                      {(() => {
                        const video = program.videos.find(v => v.id === currentVideo.id);
                        const duration = video?.duration || 0;
                        return `0:00 / ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;
                      })()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMarkVideoComplete(currentVideo.id)}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark Complete
                    </button>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <Settings className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <Maximize className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setShowVideoPlayer(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentVideo.title}</h3>
              <p className="text-gray-600">{program.videos.find(v => v.id === currentVideo.id)?.description || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton href="/programs" label="Back to Programs" />
        </div>

        {/* Program Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="md:flex">
            {/* Program Image */}
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative">
                <Play className="w-20 h-20 text-white opacity-80" />
                {!canAccessProgram && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-medium">Premium Required</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Program Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(program.difficulty)}`}>
                  {program.difficulty}
                </span>
                {program.isPremium && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                )}
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {program.rating} ({program.totalRatings} reviews)
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{program.title}</h1>
              <p className="text-gray-600 mb-4">{program.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{Math.floor(program.duration / 60)}h {program.duration % 60}m total</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Target className="w-5 h-5 mr-2" />
                  <span>{totalVideos} videos</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{program.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-2" />
                  <span>{Math.round(progressPercentage)}% complete</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{completedVideos}/{totalVideos} videos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {canAccessProgram ? (
                  <>
                    <button
                      onClick={() => {
                        const nextVideo = program.videos.find(v => !getVideoCompletionStatus(v.id)) || program.videos[0];
                        handleVideoSelect(nextVideo);
                      }}
                      className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {completedVideos === 0 ? 'Start Program' : 'Continue'}
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </>
                ) : (
                  <Link
                    href="/subscription"
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors flex items-center justify-center"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Access
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'videos', label: 'Videos' },
                { id: 'instructor', label: 'Instructor' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Gain</h3>
                  <ul className="space-y-3">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Equipment & Tags */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Equipment Needed</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.equipment.map(item => (
                      <span key={item} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-4">
                {program.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`border rounded-lg p-4 transition-all ${
                      canAccessProgram ? 'hover:shadow-md cursor-pointer' : 'opacity-60'
                    }`}
                    onClick={() => canAccessProgram && handleVideoSelect(video)}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-20 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center">
                          {getVideoCompletionStatus(video.id) ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : canAccessProgram ? (
                            <Play className="w-6 h-6 text-white" />
                          ) : (
                            <Lock className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                          {video.order}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{video.duration} minutes</span>
                          {getVideoCompletionStatus(video.id) && (
                            <span className="ml-4 text-green-600 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {canAccessProgram && (
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{program.instructor}</h3>
                  <p className="text-gray-600 mb-4">{program.instructorBio}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {program.rating} rating
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {program.totalRatings} students
                    </span>
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

export default ProgramDetailPage;