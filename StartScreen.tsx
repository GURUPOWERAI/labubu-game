import React from 'react';
import Player from './Player';
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const containerSize = Math.max(PLAYER_WIDTH, PLAYER_HEIGHT) * 1.8;

  return (
    <div className="h-[600px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-pink-100 to-purple-200 overflow-hidden">
      
      <div 
        className="relative mb-8 animate-[scale-in_0.7s_ease-out]" 
        style={{ width: `${containerSize}px`, height: `${containerSize}px`}}
      >
        <Player position={{ 
          x: (containerSize - PLAYER_WIDTH) / 2, 
          y: (containerSize - PLAYER_HEIGHT) / 2
        }} />
      </div>
      
      <h1 className="text-5xl font-bold text-purple-800" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        Labubu's Great Escape
      </h1>

      <p className="text-lg text-purple-700 mt-4 mb-8">
        Let's play! Save your Labubu from getting caught!
      </p>
      
      <button
        onClick={onStart}
        className="px-12 py-5 bg-pink-500 text-white font-bold text-2xl rounded-full shadow-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300 animate-pulse"
      >
        Let's Go!
      </button>
      
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default StartScreen;