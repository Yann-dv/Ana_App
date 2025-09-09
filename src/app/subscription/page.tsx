'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap, Users, Video, Trophy, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import BackButton from '@/components/ui/BackButton';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with basic fitness routines',
    features: [
      'Access to 5 basic workout programs',
      'Limited progress tracking',
      'Community access',
      'Basic nutrition tips',
      'Standard video quality'
    ],
    icon: <Users className="w-8 h-8" />,
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 19.99,
    period: 'month',
    description: 'Ideal for dedicated fitness enthusiasts',
    features: [
      'Access to 50+ workout programs',
      'Full progress tracking & analytics',
      'Live classes (5 per month)',
      'Personalized meal plans',
      'HD video quality',
      'Priority customer support',
      'Offline video downloads'
    ],
    icon: <Star className="w-8 h-8" />,
    popular: true,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39.99,
    period: 'month',
    description: 'Complete fitness transformation experience',
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
    icon: <Crown className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500'
  }
];

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();
  const { subscribeToPlan, currentPlan, isLoading } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (tierId: string) => {
    setIsProcessing(true);
    
    try {
      const success = await subscribeToPlan(tierId, billingCycle);
      if (success) {
        // Redirect to dashboard or show success message
        window.location.href = '/dashboard';
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPrice = (tier: SubscriptionTier) => {
    if (tier.price === 0) return 'Free';
    const price = billingCycle === 'yearly' ? tier.price * 10 : tier.price; // 2 months free on yearly
    return `$${price.toFixed(2)}`;
  };

  const getPeriod = (tier: SubscriptionTier) => {
    if (tier.price === 0) return tier.period;
    return billingCycle === 'yearly' ? 'year' : tier.period;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-6">
            <BackButton href="/dashboard" label="Back to Dashboard" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Fitness Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock your potential with our comprehensive fitness programs designed for every level
            </p>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Subscription Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {subscriptionTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                tier.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`bg-gradient-to-br ${tier.color} p-6 text-white ${tier.popular ? 'pt-12' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  {tier.icon}
                  <div className="text-right">
                    <div className="text-3xl font-bold">{getPrice(tier)}</div>
                    {tier.price > 0 && (
                      <div className="text-sm opacity-90">per {getPeriod(tier)}</div>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm opacity-90">{tier.description}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={isProcessing || (currentPlan?.id === tier.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentPlan?.id === tier.id
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : tier.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {currentPlan?.id === tier.id
                    ? 'Current Plan'
                    : isProcessing
                    ? 'Processing...'
                    : tier.price === 0
                    ? 'Get Started Free'
                    : `Choose ${tier.name}`
                  }
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Why Choose Ana Fitness?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Expert-Led Classes</h3>
              <p className="text-gray-600 text-sm">Professional trainers guide you through every workout</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">Monitor your fitness journey with detailed analytics</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">Work out anytime, anywhere with our on-demand content</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your data and payments are protected with enterprise security</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you choose the perfect plan for your fitness goals.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPage;