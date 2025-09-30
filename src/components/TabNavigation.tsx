import React from 'react';
import { Zap, Play, Trophy, Target, TrendingUp, Gift } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  spinsLeft: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, spinsLeft }) => {
  const tabs = [
    { id: 'spin', label: 'Spin', icon: Zap, color: 'from-blue-500 to-purple-500' },
    { id: 'ads', label: 'Watch Ads', icon: Play, color: 'from-green-500 to-emerald-500', badge: spinsLeft === 0 },
    { id: 'achievements', label: 'Rewards', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Target, color: 'from-pink-500 to-red-500' },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-xl">
      <div className="flex justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105` 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="relative">
                <Icon size={18} />
                {tab.badge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;