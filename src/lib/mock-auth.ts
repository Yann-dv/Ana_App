// Mock authentication service for static deployment
import { User, SubscriptionTier } from '@/types/auth';

// Use the actual User type from auth.ts

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@ana-fitness.com',
    subscription: 'premium',
    createdAt: '2024-01-01T00:00:00Z',
    progress: {
      totalWorkouts: 45,
      totalMinutes: 1250,
      currentStreak: 7,
      longestStreak: 15,
      favoritePrograms: ['yoga-basics', 'hiit-cardio'],
      completedPrograms: ['beginner-yoga'],
      achievements: []
    }
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@ana-fitness.com',
    subscription: 'standard',
    createdAt: '2024-01-15T00:00:00Z',
    progress: {
      totalWorkouts: 12,
      totalMinutes: 360,
      currentStreak: 3,
      longestStreak: 5,
      favoritePrograms: ['pilates-core'],
      completedPrograms: [],
      achievements: []
    }
  }
];

// Mock authentication functions
export const mockLogin = async (email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo credentials
  if (email === 'demo@ana-fitness.com' && password === 'demo123') {
    const user = mockUsers[0];
    const token = 'mock-jwt-token-' + Date.now();
    return { success: true, user, token };
  }
  
  if (email === 'test@ana-fitness.com' && password === 'test123') {
    const user = mockUsers[1];
    const token = 'mock-jwt-token-' + Date.now();
    return { success: true, user, token };
  }
  
  return { success: false, error: 'Invalid credentials. Try demo@ana-fitness.com / demo123' };
};

export const mockRegister = async (name: string, email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'User already exists' };
  }
  
  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    subscription: 'free',
    createdAt: new Date().toISOString(),
    progress: {
      totalWorkouts: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      favoritePrograms: [],
      completedPrograms: [],
      achievements: []
    }
  };
  
  mockUsers.push(newUser);
  const token = 'mock-jwt-token-' + Date.now();
  
  return { success: true, user: newUser, token };
};

export const mockVerifyToken = async (token: string): Promise<{ valid: boolean; user?: User }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple token validation (in real app, this would verify JWT)
  if (token && token.startsWith('mock-jwt-token-')) {
    // Return demo user for any valid mock token
    return { valid: true, user: mockUsers[0] };
  }
  
  return { valid: false };
};