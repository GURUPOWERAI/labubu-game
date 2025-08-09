import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="h-[600px] flex flex-col items-center justify-center p-8 text-center bg-indigo-100 overflow-hidden">
      <h2 className="text-5xl font-bold text-indigo-800 mb-4 animate-bounce">Game Over!</h2>
      
      <div className="relative my-6 animate-[scale-in_0.5s_ease-out]">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-1 shadow-2xl flex items-center justify-center">
           <div className="w-full h-full bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white">
                <h3 className="text-2xl font-black text-indigo-800 tracking-tighter transform -rotate-12 select-none" style={{ textShadow: '1px 1px 2px rgba(107, 33, 168, 0.2)' }}>GURUPOWER</h3>
           </div>
        </div>
      </div>
      
      <div className="my-2 w-full max-w-sm">
        <p className="text-xl text-purple-800 font-semibold">
          "Oh! I know your Labubu can't win..."
        </p>
         <p className="mt-1 text-lg text-indigo-600">
          "Try again and prove me wrong!"
        </p>
      </div>

       <div className="text-2xl text-indigo-600 mt-4 mb-6 text-center">
        <p>Your Score: <span className="font-bold text-pink-500">{score}</span></p>
        <p className="text-lg mt-1">High Score: <span className="font-bold text-purple-600">{highScore}</span></p>
      </div>
      
      <button
        onClick={onRestart}
        className="mt-2 px-8 py-4 bg-purple-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Play Again
      </button>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GameOverScreen;