import React, { useState } from 'react';
import { Play, Clock, Coins, Zap, Gift, Star, Award } from 'lucide-react';

interface WatchAdsTabProps {
  onWatchAd: (adType: string, reward: any) => void;
  userStats: any;
}

const WatchAdsTab: React.FC<WatchAdsTabProps> = ({ onWatchAd, userStats }) => {
  const [watchingAd, setWatchingAd] = useState<string | null>(null);
  const [adProgress, setAdProgress] = useState(0);

  const adOffers = [
    {
      id: 'bonus-spins',
      title: '🎰 Bonus Spins',
      description: 'Watch a 15-second ad to get 3 extra spins',
      duration: 15,
      reward: { type: 'spins', amount: 3 },
      color: 'from-blue-500 to-purple-500',
      icon: Zap,
      available: true
    },
    {
      id: 'double-xp',
      title: '⚡ Double XP',
      description: 'Next 5 spins give 2x XP for 30 minutes',
      duration: 20,
      reward: { type: 'multiplier', multiplier: 2, duration: 30 },
      color: 'from-yellow-500 to-orange-500',
      icon: Star,
      available: true
    },
    {
      id: 'instant-cash',
      title: '💰 Instant Cash',
      description: 'Earn $0.25 instantly + bonus XP',
      duration: 30,
      reward: { type: 'cash', amount: 0.25, xp: 100 },
      color: 'from-green-500 to-emerald-500',
      icon: Coins,
      available: userStats.level >= 3
    },
    {
      id: 'premium-spin',
      title: '🌟 Premium Spin',
      description: 'Guaranteed rare or better product',
      duration: 25,
      reward: { type: 'premium-spin', rarity: 'rare' },
      color: 'from-purple-500 to-pink-500',
      icon: Award,
      available: userStats.level >= 5
    }
  ];

  const handleWatchAd = async (offer: any) => {
    setWatchingAd(offer.id);
    setAdProgress(0);

    // Simulate ad watching with progress
    const interval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWatchingAd(null);
          onWatchAd(offer.id, offer.reward);
          return 100;
        }
        return prev + (100 / (offer.duration * 10)); // Update every 100ms
      });
    }, 100);
  };

  if (watchingAd) {
    const currentOffer = adOffers.find(offer => offer.id === watchingAd);
    return (
      <div className="text-center space-y-6">
        <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="text-white animate-pulse" size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Watching Ad...</h3>
          <p className="text-gray-300 mb-6">{currentOffer?.title}</p>
          
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-100 relative"
              style={{ width: `${adProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Clock size={16} />
            <span>{Math.round((100 - adProgress) * (currentOffer?.duration || 15) / 100)}s remaining</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🎬 Watch & Earn</h2>
        <p className="text-gray-300">Watch ads to unlock amazing rewards!</p>
      </div>

      <div className="grid gap-4">
        {adOffers.map((offer) => {
          const Icon = offer.icon;
          
          return (
            <div
              key={offer.id}
              className={`bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 ${
                offer.available ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${offer.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white" size={20} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">{offer.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{offer.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock size={14} />
                      <span>{offer.duration}s ad</span>
                    </div>
                    
                    <button
                      onClick={() => handleWatchAd(offer)}
                      disabled={!offer.available}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        offer.available
                          ? `bg-gradient-to-r ${offer.color} text-white hover:scale-105 shadow-lg`
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {offer.available ? (
                        <div className="flex items-center gap-2">
                          <Play size={14} />
                          Watch
                        </div>
                      ) : (
                        `Level ${offer.id === 'instant-cash' ? '3' : '5'} Required`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Ad Bonus */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30">
        <div className="text-center">
          <Gift className="text-yellow-400 mx-auto mb-2" size={24} />
          <h3 className="font-bold text-white mb-2">Daily Ad Bonus</h3>
          <p className="text-gray-300 text-sm mb-3">
            Watch 5 ads today to unlock a mystery reward!
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-yellow-400 text-sm mt-2 font-semibold">3/5 ads watched</p>
        </div>
      </div>
    </div>
  );
};

export default WatchAdsTab;