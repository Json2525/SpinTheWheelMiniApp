import React, { useState } from 'react';
import { TrendingUp, DollarSign, Eye, Share, ExternalLink, Calendar, Target, Zap } from 'lucide-react';

interface EarningEntry {
  id: string;
  date: string;
  product: string;
  clicks: number;
  conversions: number;
  earnings: number;
  status: 'pending' | 'confirmed' | 'paid';
}

interface EarningsTabProps {
  userStats: any;
}

const EarningsTab: React.FC<EarningsTabProps> = ({ userStats }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'withdraw'>('overview');

  // Mock earnings data
  const earningsHistory: EarningEntry[] = [
    {
      id: '1',
      date: '2024-01-15',
      product: 'Wireless Headphones',
      clicks: 45,
      conversions: 3,
      earnings: 25.50,
      status: 'confirmed'
    },
    {
      id: '2',
      date: '2024-01-14',
      product: 'Smart Fitness Tracker',
      clicks: 32,
      conversions: 2,
      earnings: 18.75,
      status: 'confirmed'
    },
    {
      id: '3',
      date: '2024-01-13',
      product: 'Gaming Keyboard',
      clicks: 67,
      conversions: 1,
      earnings: 12.25,
      status: 'pending'
    },
    {
      id: '4',
      date: '2024-01-12',
      product: 'Coffee Subscription',
      clicks: 28,
      conversions: 4,
      earnings: 31.20,
      status: 'paid'
    }
  ];

  const totalPending = earningsHistory
    .filter(entry => entry.status === 'pending')
    .reduce((sum, entry) => sum + entry.earnings, 0);

  const totalConfirmed = earningsHistory
    .filter(entry => entry.status === 'confirmed')
    .reduce((sum, entry) => sum + entry.earnings, 0);

  const totalPaid = earningsHistory
    .filter(entry => entry.status === 'paid')
    .reduce((sum, entry) => sum + entry.earnings, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'paid': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'withdraw', label: 'Withdraw', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">💰 Earnings Dashboard</h2>
        <p className="text-gray-300">Track your affiliate income and performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Earnings Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30">
              <div className="text-center">
                <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
                <p className="text-3xl font-bold text-white">${userStats.totalEarnings.toFixed(2)}</p>
                <p className="text-gray-300 text-sm">Total Earnings</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
              <div className="text-center">
                <Target className="text-blue-400 mx-auto mb-2" size={24} />
                <p className="text-3xl font-bold text-white">7.2%</p>
                <p className="text-gray-300 text-sm">Conversion Rate</p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-400" size={20} />
              Earnings Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pending</span>
                <span className="text-yellow-400 font-bold">${totalPending.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Confirmed</span>
                <span className="text-green-400 font-bold">${totalConfirmed.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Paid Out</span>
                <span className="text-blue-400 font-bold">${totalPaid.toFixed(2)}</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between items-center text-lg">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold">${(totalPending + totalConfirmed + totalPaid).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Eye className="text-blue-400 mx-auto mb-2" size={20} />
              <p className="text-xl font-bold text-white">1,247</p>
              <p className="text-gray-300 text-xs">Total Clicks</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Share className="text-purple-400 mx-auto mb-2" size={20} />
              <p className="text-xl font-bold text-white">89</p>
              <p className="text-gray-300 text-xs">Conversions</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Zap className="text-yellow-400 mx-auto mb-2" size={20} />
              <p className="text-xl font-bold text-white">$2.63</p>
              <p className="text-gray-300 text-xs">Avg. Per Click</p>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h3 className="font-bold text-white text-lg">Recent Earnings</h3>
          
          {earningsHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{entry.product}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                  {entry.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-white font-medium">{entry.date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Clicks</p>
                  <p className="text-blue-400 font-medium">{entry.clicks}</p>
                </div>
                <div>
                  <p className="text-gray-400">Conversions</p>
                  <p className="text-green-400 font-medium">{entry.conversions}</p>
                </div>
                <div>
                  <p className="text-gray-400">Earnings</p>
                  <p className="text-yellow-400 font-bold">${entry.earnings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Withdraw Tab */}
      {activeTab === 'withdraw' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-white text-lg mb-4">Available for Withdrawal</h3>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-green-400 mb-2">${totalConfirmed.toFixed(2)}</p>
              <p className="text-gray-300">Minimum withdrawal: $50.00</p>
            </div>
            
            <button
              disabled={totalConfirmed < 50}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                totalConfirmed >= 50
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white hover:scale-105 shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {totalConfirmed >= 50 ? 'Withdraw Now' : `Need $${(50 - totalConfirmed).toFixed(2)} more`}
            </button>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-white text-lg mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PP</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">PayPal</p>
                  <p className="text-gray-400 text-sm">Instant transfer</p>
                </div>
                <ExternalLink className="text-gray-400" size={16} />
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Bank Transfer</p>
                  <p className="text-gray-400 text-sm">1-3 business days</p>
                </div>
                <ExternalLink className="text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsTab;