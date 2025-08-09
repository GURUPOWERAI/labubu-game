import React from 'react';
import { ObstacleType } from '../types';
import { OBSTACLE_WIDTH, OBSTACLE_HEIGHT } from '../constants';

interface ObstacleProps {
  obstacle: ObstacleType;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${obstacle.position.x}px`,
        top: `${obstacle.position.y}px`,
        width: `${OBSTACLE_WIDTH}px`,
        height: `${OBSTACLE_HEIGHT}px`,
        transform: 'translateZ(0)',
      }}
      aria-label="Chasing doll obstacle"
    >
      <div className="relative w-full h-full flex flex-col items-center">
        {/* Head */}
        <div className="relative w-8 h-8 z-10">
          {/* Face */}
          <div className="w-full h-full bg-orange-100 rounded-full border-2 border-black flex justify-center items-center">
             {/* Eyes */}
             <div className="absolute top-[11px] left-[6px] w-[5px] h-[5px] bg-black rounded-full" />
             <div className="absolute top-[11px] right-[6px] w-[5px] h-[5px] bg-black rounded-full" />
          </div>
          {/* Hair */}
          <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black rounded-t-md" />
          <div className="absolute top-[8px] -left-1 w-3 h-3 bg-black rounded-full" />
          <div className="absolute top-[8px] -right-1 w-3 h-3 bg-black rounded-full" />
        </div>

        {/* Body */}
        <div className="relative w-10 h-12 -mt-2 border-2 border-black rounded-b-lg overflow-hidden">
          {/* Yellow Shirt */}
          <div className="absolute w-full h-full bg-yellow-400" />
          
          {/* Orange Dress */}
          <div className="absolute w-full h-full bg-orange-500" style={{ clipPath: 'polygon(0% 20%, 100% 20%, 100% 100%, 0% 100%)' }} />
          {/* Dress Straps */}
          <div className="absolute top-0 left-[4px] w-2 h-3 bg-orange-500" />
          <div className="absolute top-0 right-[4px] w-2 h-3 bg-orange-500" />
          
          {/* Shirt Collar */}
           <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[18px] h-[6px] bg-yellow-400 rounded-b-full border-b-2 border-l-2 border-r-2 border-black" />
        </div>
      </div>
    </div>
  );
};

export default Obstacle;