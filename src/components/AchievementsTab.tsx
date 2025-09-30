import React from 'react';
import { Trophy, Star, Target, Zap, Crown, Gift, Award, Flame } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  maxProgress: number;
  reward: string;
  completed: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsTabProps {
  userStats: any;
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ userStats }) => {
  const achievements: Achievement[] = [
    {
      id: 'first-spin',
      title: 'First Spin',
      description: 'Complete your first spin',
      icon: Zap,
      progress: userStats.totalSpins > 0 ? 1 : 0,
      maxProgress: 1,
      reward: '+50 XP',
      completed: userStats.totalSpins > 0,
      rarity: 'common'
    },
    {
      id: 'spin-master',
      title: 'Spin Master',
      description: 'Complete 100 spins',
      icon: Target,
      progress: Math.min(userStats.totalSpins, 100),
      maxProgress: 100,
      reward: '+500 XP, Exclusive Badge',
      completed: userStats.totalSpins >= 100,
      rarity: 'rare'
    },
    {
      id: 'streak-warrior',
      title: 'Streak Warrior',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      progress: Math.min(userStats.streak, 7),
      maxProgress: 7,
      reward: '+200 XP, 5 Bonus Spins',
      completed: userStats.streak >= 7,
      rarity: 'epic'
    },
    {
      id: 'big-earner',
      title: 'Big Earner',
      description: 'Earn $100 in total',
      icon: Crown,
      progress: Math.min(userStats.totalEarnings, 100),
      maxProgress: 100,
      reward: '+1000 XP, Premium Features',
      completed: userStats.totalEarnings >= 100,
      rarity: 'legendary'
    },
    {
      id: 'level-up',
      title: 'Level Up',
      description: 'Reach level 10',
      icon: Star,
      progress: Math.min(userStats.level, 10),
      maxProgress: 10,
      reward: '+300 XP, Special Wheel',
      completed: userStats.level >= 10,
      rarity: 'epic'
    },
    {
      id: 'ad-watcher',
      title: 'Ad Enthusiast',
      description: 'Watch 50 ads',
      icon: Gift,
      progress: 23, // Mock progress
      maxProgress: 50,
      reward: '+100 XP, Ad-Free Hour',
      completed: false,
      rarity: 'rare'
    }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const rarityGlow = {
    common: 'shadow-gray-500/20',
    rare: 'shadow-blue-500/30',
    epic: 'shadow-purple-500/40',
    legendary: 'shadow-yellow-500/50'
  };

  const completedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">🏆 Achievements</h2>
        <p className="text-gray-300">
          {completedAchievements.length}/{achievements.length} completed
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{completedAchievements.length}</p>
            <p className="text-gray-300 text-sm">Completed</p>
          </div>
          <div className="text-center">
            <Award className="text-purple-400 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{achievements.length - completedAchievements.length}</p>
            <p className="text-gray-300 text-sm">In Progress</p>
          </div>
        </div>
      </div>

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="text-blue-400" size={20} />
            In Progress
          </h3>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const progressPercent = (achievement.progress / achievement.maxProgress) * 100;
              
              return (
                <div
                  key={achievement.id}
                  className={`bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 ${rarityGlow[achievement.rarity]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-green-400 text-sm font-semibold">Reward: {achievement.reward}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Achievements */}
      {completedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-400" size={20} />
            Completed
          </h3>
          <div className="space-y-3">
            {completedAchievements.map((achievement) => {
              const Icon = achievement.icon;
              
              return (
                <div
                  key={achievement.id}
                  className={`bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-4 border-2 border-green-400/30 ${rarityGlow[achievement.rarity]} relative overflow-hidden`}
                >
                  {/* Completion Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-xl flex items-center justify-center flex-shrink-0 relative`}>
                      <Icon className="text-white" size={20} />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-400 text-white">
                          COMPLETED
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                      <p className="text-green-400 text-sm font-semibold">✓ Reward Claimed: {achievement.reward}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsTab;