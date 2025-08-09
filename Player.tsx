import React from 'react';
import { Position } from '../types';
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants';

interface PlayerProps {
  position: Position;
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${PLAYER_WIDTH}px`,
        height: `${PLAYER_HEIGHT}px`,
        transform: 'translateZ(0)',
      }}
      aria-label="Player character: Labubu doll in a brown suit"
    >
      <div className="relative w-full h-full flex justify-center items-end">
        <div className="relative w-[38px] h-[75px]">
          {/* Left Ear */}
          <div className="absolute top-0 left-[-4px] w-7 h-10 bg-[#8B5E34] rounded-t-full rounded-b-md transform -rotate-[25deg] z-0 border-2 border-black">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-7 bg-[#FBCFE8] rounded-t-full rounded-b-md"></div>
          </div>
          {/* Right Ear */}
          <div className="absolute top-0 right-[-4px] w-7 h-10 bg-[#8B5E34] rounded-t-full rounded-b-md transform rotate-[25deg] z-0 border-2 border-black">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-7 bg-[#FBCFE8] rounded-t-full rounded-b-md"></div>
          </div>

          {/* Body and Head Suit */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[38px] h-[60px] bg-[#8B5E34] rounded-t-full rounded-b-2xl z-5 border-2 border-black"></div>

          {/* Arms */}
          <div className="absolute bottom-5 -left-1 w-4 h-6 bg-[#8B5E34] rounded-full transform -rotate-45 z-0 border-2 border-black"></div>
          <div className="absolute bottom-5 -right-1 w-4 h-6 bg-[#8B5E34] rounded-full transform rotate-45 z-0 border-2 border-black"></div>

          {/* Face */}
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[28px] h-[28px] bg-[#FDF6E3] rounded-full z-20 flex flex-col items-center justify-center border border-black overflow-hidden">
            {/* Eyes */}
            <div className="w-full flex justify-around items-center px-1 mt-1">
              <div className="w-3 h-2.5 bg-black rounded-b-md rounded-t-sm relative">
                <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
              </div>
              <div className="w-3 h-2.5 bg-black rounded-b-md rounded-t-sm relative">
                <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
              </div>
            </div>

            {/* Mouth */}
            <div className="absolute bottom-1 w-[22px] h-3.5 flex justify-center items-end">
              <div 
                className="w-full h-full bg-black" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 85% 30%, 80% 100%, 65% 30%, 60% 100%, 45% 30%, 40% 100%, 25% 30%, 20% 100%, 5% 30%, 0 30%)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;