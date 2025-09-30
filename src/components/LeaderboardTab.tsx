import React, { useState } from 'react';
import { Crown, Trophy, Medal, TrendingUp, Users, Zap, Target } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  earnings: number;
  spins: number;
  level: number;
  streak: number;
}

interface LeaderboardTabProps {
  userStats: any;
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ userStats }) => {
  const [activeCategory, setActiveCategory] = useState<'earnings' | 'spins' | 'level'>('earnings');

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: 'SpinMaster2024', avatar: '👑', earnings: 1247.50, spins: 2341, level: 15, streak: 45 },
    { rank: 2, username: 'AffiliateKing', avatar: '🚀', earnings: 987.25, spins: 1876, level: 12, streak: 23 },
    { rank: 3, username: 'LuckySpinner', avatar: '🍀', earnings: 756.80, spins: 1654, level: 11, streak: 18 },
    { rank: 4, username: 'CashCrusher', avatar: '💎', earnings: 623.45, spins: 1432, level: 10, streak: 31 },
    { rank: 5, username: 'WheelWarrior', avatar: '⚡', earnings: 534.20, spins: 1298, level: 9, streak: 12 },
    { rank: 6, username: 'ProfitPro', avatar: '🎯', earnings: 445.75, spins: 1156, level: 8, streak: 8 },
    { rank: 7, username: 'SpinGenius', avatar: '🧠', earnings: 387.90, spins: 1034, level: 8, streak: 15 },
    { rank: 8, username: 'You', avatar: '🎮', earnings: userStats.totalEarnings, spins: userStats.totalSpins, level: userStats.level, streak: userStats.streak }
  ];

  const categories = [
    { id: 'earnings', label: 'Earnings', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { id: 'spins', label: 'Total Spins', icon: Zap, color: 'from-blue-500 to-purple-500' },
    { id: 'level', label: 'Level', icon: Target, color: 'from-yellow-500 to-orange-500' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-400" size={20} />;
      case 2: return <Trophy className="text-gray-300" size={20} />;
      case 3: return <Medal className="text-amber-600" size={20} />;
      default: return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400/20 to-orange-400/20 border-yellow-400/30';
      case 2: return 'from-gray-300/20 to-gray-400/20 border-gray-300/30';
      case 3: return 'from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'from-white/10 to-white/5 border-white/20';
    }
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (activeCategory) {
      case 'earnings': return b.earnings - a.earnings;
      case 'spins': return b.spins - a.spins;
      case 'level': return b.level - a.level;
      default: return 0;
    }
  });

  const userRank = sortedData.findIndex(entry => entry.username === 'You') + 1;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">🏆 Leaderboard</h2>
        <p className="text-gray-300">Compete with players worldwide!</p>
      </div>

      {/* User Rank Card */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
        <div className="text-center">
          <div className="text-4xl mb-2">🎮</div>
          <h3 className="font-bold text-white text-lg mb-1">Your Rank</h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">#{userRank}</p>
              <p className="text-gray-300">Global Rank</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">${userStats.totalEarnings.toFixed(2)}</p>
              <p className="text-gray-300">Earnings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{userStats.level}</p>
              <p className="text-gray-300">Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon size={16} />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {sortedData.slice(0, 10).map((entry, index) => {
          const actualRank = index + 1;
          const isUser = entry.username === 'You';
          
          return (
            <div
              key={entry.username}
              className={`bg-gradient-to-r ${getRankColor(actualRank)} backdrop-blur-lg rounded-2xl p-4 border ${
                isUser ? 'ring-2 ring-blue-400/50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
                  {getRankIcon(actualRank)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{entry.avatar}</span>
                    <h4 className={`font-bold ${isUser ? 'text-blue-400' : 'text-white'}`}>
                      {entry.username}
                      {isUser && <span className="text-xs ml-2 text-blue-300">(You)</span>}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-green-400 font-semibold">${entry.earnings.toFixed(2)}</p>
                      <p className="text-gray-400 text-xs">Earnings</p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold">{entry.spins}</p>
                      <p className="text-gray-400 text-xs">Spins</p>
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold">Lv.{entry.level}</p>
                      <p className="text-gray-400 text-xs">Level</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-400">
                    <span className="text-lg">🔥</span>
                    <span className="font-bold">{entry.streak}</span>
                  </div>
                  <p className="text-gray-400 text-xs">Streak</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Tournament Banner */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
        <div className="text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-bold text-white text-lg mb-2">Weekly Tournament</h3>
          <p className="text-gray-300 text-sm mb-4">
            Top 10 players win exclusive rewards!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-yellow-400 font-bold">$500</p>
              <p className="text-gray-400">1st Prize</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 font-bold">$200</p>
              <p className="text-gray-400">2nd Prize</p>
            </div>
            <div className="text-center">
              <p className="text-amber-600 font-bold">$100</p>
              <p className="text-gray-400">3rd Prize</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            Tournament ends in 3 days, 14 hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;