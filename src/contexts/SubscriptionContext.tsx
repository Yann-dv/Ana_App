'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  limits: {
    programs: number | 'unlimited';
    liveClasses: number | 'unlimited';
    downloads: number | 'unlimited';
    support: 'basic' | 'priority' | '24/7';
  };
}

interface UserSubscription {
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  subscription: UserSubscription | null;
  availablePlans: SubscriptionPlan[];
  isLoading: boolean;
  subscribeToPlan: (planId: string, billingCycle: 'monthly' | 'yearly') => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  updateSubscription: (planId: string) => Promise<boolean>;
  checkAccess: (feature: string) => boolean;
  getRemainingUsage: (feature: string) => number | 'unlimited';
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Access to 5 basic workout programs',
      'Limited progress tracking',
      'Community access',
      'Basic nutrition tips',
      'Standard video quality'
    ],
    limits: {
      programs: 5,
      liveClasses: 0,
      downloads: 0,
      support: 'basic'
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 19.99,
    features: [
      'Access to 50+ workout programs',
      'Full progress tracking & analytics',
      'Live classes (5 per month)',
      'Personalized meal plans',
      'HD video quality',
      'Priority customer support',
      'Offline video downloads'
    ],
    limits: {
      programs: 50,
      liveClasses: 5,
      downloads: 10,
      support: 'priority'
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39.99,
    features: [
      'Unlimited access to all programs',
      'Advanced analytics & insights',
      'Unlimited live classes',
      'Personal trainer consultations',
      '4K video quality',
      '24/7 priority support',
      'Exclusive premium content',
      'Custom workout creation',
      'Nutrition coaching',
      'Achievement badges & rewards'
    ],
    limits: {
      programs: 'unlimited',
      liveClasses: 'unlimited',
      downloads: 'unlimited',
      support: '24/7'
    }
  }
];

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usage, setUsage] = useState({
    programsAccessed: 0,
    liveClassesAttended: 0,
    downloadsUsed: 0
  });

  useEffect(() => {
    // Initialize with free plan for demo
    const initializeSubscription = () => {
      const freePlan = subscriptionPlans.find(plan => plan.id === 'free');
      if (freePlan) {
        setCurrentPlan(freePlan);
        setSubscription({
          planId: 'free',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          autoRenew: false
        });
      }
      setIsLoading(false);
    };

    initializeSubscription();
  }, []);

  const subscribeToPlan = async (planId: string, billingCycle: 'monthly' | 'yearly'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const plan = subscriptionPlans.find(p => p.id === planId);
      if (!plan) return false;

      const endDate = new Date();
      if (billingCycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      setCurrentPlan(plan);
      setSubscription({
        planId,
        status: 'active',
        startDate: new Date(),
        endDate,
        autoRenew: true
      });

      // Reset usage for new plan
      setUsage({
        programsAccessed: 0,
        liveClassesAttended: 0,
        downloadsUsed: 0
      });

      return true;
    } catch (error) {
      console.error('Subscription error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'cancelled',
          autoRenew: false
        });
      }
      
      return true;
    } catch (error) {
      console.error('Cancellation error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (planId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const plan = subscriptionPlans.find(p => p.id === planId);
      if (!plan || !subscription) return false;

      setCurrentPlan(plan);
      setSubscription({
        ...subscription,
        planId
      });
      
      return true;
    } catch (error) {
      console.error('Update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkAccess = (feature: string): boolean => {
    if (!currentPlan) return false;

    switch (feature) {
      case 'programs':
        if (currentPlan.limits.programs === 'unlimited') return true;
        return usage.programsAccessed < currentPlan.limits.programs;
      
      case 'liveClasses':
        if (currentPlan.limits.liveClasses === 'unlimited') return true;
        return usage.liveClassesAttended < currentPlan.limits.liveClasses;
      
      case 'downloads':
        if (currentPlan.limits.downloads === 'unlimited') return true;
        return usage.downloadsUsed < currentPlan.limits.downloads;
      
      case 'premiumContent':
        return currentPlan.id === 'premium';
      
      case 'personalTrainer':
        return currentPlan.id === 'premium';
      
      case 'customWorkouts':
        return currentPlan.id === 'premium';
      
      default:
        return true;
    }
  };

  const getRemainingUsage = (feature: string): number | 'unlimited' => {
    if (!currentPlan) return 0;

    switch (feature) {
      case 'programs':
        if (currentPlan.limits.programs === 'unlimited') return 'unlimited';
        return Math.max(0, currentPlan.limits.programs - usage.programsAccessed);
      
      case 'liveClasses':
        if (currentPlan.limits.liveClasses === 'unlimited') return 'unlimited';
        return Math.max(0, currentPlan.limits.liveClasses - usage.liveClassesAttended);
      
      case 'downloads':
        if (currentPlan.limits.downloads === 'unlimited') return 'unlimited';
        return Math.max(0, currentPlan.limits.downloads - usage.downloadsUsed);
      
      default:
        return 0;
    }
  };

  const value: SubscriptionContextType = {
    currentPlan,
    subscription,
    availablePlans: subscriptionPlans,
    isLoading,
    subscribeToPlan,
    cancelSubscription,
    updateSubscription,
    checkAccess,
    getRemainingUsage
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export type { SubscriptionPlan, UserSubscription };