import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface SpinWheelProps {
  rotation: number;
  isSpinning: boolean;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ rotation, isSpinning }) => {
  const getWheelSegments = () => {
    const segments = [
      { label: 'Tech', color: 'from-blue-500 to-blue-700', icon: '💻' },
      { label: 'Beauty', color: 'from-pink-500 to-pink-700', icon: '💄' },
      { label: 'Fitness', color: 'from-green-500 to-green-700', icon: '💪' },
      { label: 'Food', color: 'from-yellow-500 to-yellow-700', icon: '🍕' },
      { label: 'Gaming', color: 'from-purple-500 to-purple-700', icon: '🎮' },
      { label: 'Home', color: 'from-red-500 to-red-700', icon: '🏠' },
      { label: 'Fashion', color: 'from-indigo-500 to-indigo-700', icon: '👗' },
      { label: 'Travel', color: 'from-teal-500 to-teal-700', icon: '✈️' }
    ];
    
    return segments.map((segment, index) => {
      const angle = (360 / segments.length) * index;
      const nextAngle = (360 / segments.length) * (index + 1);
      
      return (
        <div
          key={segment.label}
          className={`absolute w-full h-full bg-gradient-to-r ${segment.color} flex items-center justify-center text-white font-bold text-sm transform-gpu`}
          style={{
            clipPath: `polygon(50% 50%, 
              ${50 + 45 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 45 * Math.sin((angle - 90) * Math.PI / 180)}%, 
              ${50 + 45 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 45 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
          }}
        >
          <div className="absolute top-6 flex flex-col items-center">
            <span className="text-xl mb-1">{segment.icon}</span>
            <span className="text-xs">{segment.label}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer Glow Ring */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 animate-pulse blur-lg"></div>
      
      {/* Main Wheel */}
      <div className="relative w-full h-full rounded-full border-8 border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
        <div 
          className="w-full h-full relative transition-transform ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '4000ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)'
          }}
        >
          {getWheelSegments()}
        </div>
      </div>
      
      {/* Enhanced Pointer */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent border-b-white drop-shadow-lg"></div>
        <div className="w-4 h-4 bg-white rounded-full mx-auto -mt-1 shadow-lg"></div>
      </div>
      
      {/* Enhanced Center Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-full border-4 border-gray-800 z-10 flex items-center justify-center shadow-2xl">
        {isSpinning ? (
          <RotateCcw className="text-gray-800 animate-spin" size={24} />
        ) : (
          <div className="relative">
            <Sparkles className="text-gray-800 animate-pulse" size={24} />
            <div className="absolute inset-0 text-gray-800 animate-ping opacity-50">
              <Sparkles size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;