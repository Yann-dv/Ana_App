'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  Settings, 
  Download, 
  Users, 
  Video, 
  Crown, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const ManageSubscriptionPage: React.FC = () => {
  const { user } = useAuth();
  const {
    currentPlan,
    subscription,
    availablePlans,
    isLoading,
    cancelSubscription,
    updateSubscription,
    checkAccess,
    getRemainingUsage
  } = useSubscription();
  
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    const success = await cancelSubscription();
    if (success) {
      setShowCancelModal(false);
    }
    setIsProcessing(false);
  };

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true);
    await updateSubscription(planId);
    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      case 'trial': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'trial': return <Star className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentPlan || !subscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Subscription Found</h1>
          <Link href="/subscription" className="text-blue-600 hover:text-blue-800">
            Choose a subscription plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <BackButton href="/dashboard" label="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Subscription</h1>
          <p className="text-gray-600">View and manage your Ana Fitness subscription</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                  {getStatusIcon(subscription.status)}
                  <span className="ml-1 capitalize">{subscription.status}</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg mr-4">
                  {currentPlan.id === 'premium' ? (
                    <Crown className="w-8 h-8 text-white" />
                  ) : currentPlan.id === 'standard' ? (
                    <Star className="w-8 h-8 text-white" />
                  ) : (
                    <Users className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                  <p className="text-gray-600">
                    {currentPlan.price === 0 ? 'Free forever' : `$${currentPlan.price}/month`}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Started: {formatDate(subscription.startDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Renews: {formatDate(subscription.endDate)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Plan Features</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage This Month</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {getRemainingUsage('programs') === 'unlimited' ? '∞' : getRemainingUsage('programs')}
                  </div>
                  <div className="text-sm text-gray-600">Programs Remaining</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {getRemainingUsage('liveClasses') === 'unlimited' ? '∞' : getRemainingUsage('liveClasses')}
                  </div>
                  <div className="text-sm text-gray-600">Live Classes Left</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {getRemainingUsage('downloads') === 'unlimited' ? '∞' : getRemainingUsage('downloads')}
                  </div>
                  <div className="text-sm text-gray-600">Downloads Left</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href="/subscription"
                  className="flex items-center justify-between w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-900">Change Plan</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </Link>
                
                <button className="flex items-center justify-between w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-900">Update Payment</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>
                
                {subscription.status === 'active' && currentPlan.price > 0 && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex items-center justify-between w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <XCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-red-900">Cancel Subscription</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Upgrade Options */}
            {currentPlan.id !== 'premium' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Options</h3>
                
                {availablePlans
                  .filter(plan => plan.price > currentPlan.price)
                  .map(plan => (
                    <div key={plan.id} className="border rounded-lg p-4 mb-3 last:mb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <span className="text-lg font-bold text-gray-900">${plan.price}/mo</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {plan.features.slice(0, 2).join(', ')}...
                      </p>
                      <button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isProcessing}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : `Upgrade to ${plan.name}`}
                      </button>
                    </div>
                  ))
                }
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cancel Subscription</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={isProcessing}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageSubscriptionPage;