import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Position, ObstacleType, Difficulty } from '../types';
import Player from './Player';
import Obstacle from './Obstacle';
import { useGameLoop } from '../hooks/useGameLoop';
import { 
  GAME_WIDTH, 
  GAME_HEIGHT,
  PLAYER_WIDTH, 
  PLAYER_HEIGHT,
  PLAYER_INITIAL_Y,
  PLAYER_SPEED,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  DIFFICULTY_SETTINGS
} from '../constants';

interface GameStateObject {
  playerPosition: Position;
  obstacles: ObstacleType[];
  score: number;
  obstacleSpeed: number;
  isGameOver: boolean;
}

interface GameScreenProps {
  onGameOver: (score: number) => void;
  difficulty: Difficulty;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver, difficulty }) => {
  const gameSettings = DIFFICULTY_SETTINGS[difficulty];

  const [game, setGame] = useState<GameStateObject>({
    playerPosition: { 
      x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, 
      y: PLAYER_INITIAL_Y 
    },
    obstacles: [],
    score: 0,
    obstacleSpeed: gameSettings.OBSTACLE_SPEED_INITIAL,
    isGameOver: false,
  });

  const keysPressed = useRef<Record<string, boolean>>({});

  const handleControlStart = useCallback((key: string) => {
    keysPressed.current[key] = true;
  }, []);

  const handleControlEnd = useCallback((key: string) => {
    keysPressed.current[key] = false;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleControlStart(e.key);
    const handleKeyUp = (e: KeyboardEvent) => handleControlEnd(e.key);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleControlStart, handleControlEnd]);
  
  const spawnObstacle = useCallback(() => {
    setGame(prev => {
      if (prev.isGameOver) return prev;
      const newObstacle: ObstacleType = {
        id: Date.now(),
        position: {
          x: Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH),
          y: -OBSTACLE_HEIGHT,
        },
      };
      return { ...prev, obstacles: [...prev.obstacles, newObstacle] };
    });
  }, []);
  
  useEffect(() => {
    const speedInterval = setInterval(() => {
      setGame(prev => prev.isGameOver ? prev : { ...prev, obstacleSpeed: prev.obstacleSpeed + gameSettings.OBSTACLE_SPEED_INCREMENT });
    }, 3000);
    
    return () => {
      clearInterval(speedInterval);
    };
  }, [gameSettings]);
  
  useEffect(() => {
    const spawnInterval = setInterval(spawnObstacle, gameSettings.OBSTACLE_SPAWN_INTERVAL);
    return () => clearInterval(spawnInterval);
  }, [spawnObstacle, gameSettings.OBSTACLE_SPAWN_INTERVAL]);

  const updateGame = useCallback((deltaTime: number) => {
    setGame(prev => {
      if (prev.isGameOver) {
        return prev;
      }

      let newPlayerX = prev.playerPosition.x;
      if (keysPressed.current['ArrowLeft']) {
          newPlayerX -= PLAYER_SPEED;
      }
      if (keysPressed.current['ArrowRight']) {
          newPlayerX += PLAYER_SPEED;
      }
      newPlayerX = Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newPlayerX));
      const newPlayerPosition = { ...prev.playerPosition, x: newPlayerX };
      
      const updatedObstacles: ObstacleType[] = [];
      let collisionOccurred = false;

      for (const obstacle of prev.obstacles) {
        const newObsPosition = { ...obstacle.position, y: obstacle.position.y + prev.obstacleSpeed };

        const playerRect = { x: newPlayerX, y: prev.playerPosition.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
        const obstacleRect = { x: newObsPosition.x, y: newObsPosition.y, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT };
        
        const collisionBuffer = 5;
        if (
          !collisionOccurred &&
          playerRect.x < obstacleRect.x + obstacleRect.width - collisionBuffer &&
          playerRect.x + playerRect.width > obstacleRect.x + collisionBuffer &&
          playerRect.y < obstacleRect.y + obstacleRect.height - collisionBuffer &&
          playerRect.y + playerRect.height > obstacleRect.y + collisionBuffer
        ) {
          collisionOccurred = true;
        }
        
        if (newObsPosition.y < GAME_HEIGHT) {
          updatedObstacles.push({ ...obstacle, position: newObsPosition });
        }
      }

      const newScore = prev.score + (deltaTime / 1000) * 10;

      if (collisionOccurred) {
        onGameOver(newScore);
        return { ...prev, isGameOver: true };
      }
      
      return {
        ...prev,
        playerPosition: newPlayerPosition,
        obstacles: updatedObstacles,
        score: newScore,
      };
    });
  }, [onGameOver, gameSettings.OBSTACLE_SPEED_INCREMENT]);

  useGameLoop(updateGame);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-200 via-pink-100 to-sky-200" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      <div className="absolute top-2 left-2 bg-black/30 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg z-20">
        Score: {Math.floor(game.score)}
      </div>
      <Player position={game.playerPosition} />
      {game.obstacles.map(obs => (
        <Obstacle key={obs.id} obstacle={obs} />
      ))}
      
      <div 
        className="absolute bottom-5 left-5 w-20 h-20 bg-black/25 rounded-full z-30 flex items-center justify-center select-none cursor-pointer"
        onTouchStart={() => handleControlStart('ArrowLeft')}
        onTouchEnd={() => handleControlEnd('ArrowLeft')}
        onMouseDown={() => handleControlStart('ArrowLeft')}
        onMouseUp={() => handleControlEnd('ArrowLeft')}
        onMouseLeave={() => handleControlEnd('ArrowLeft')}
      >
        <span className="text-white text-5xl font-mono">‹</span>
      </div>
      <div 
        className="absolute bottom-5 right-5 w-20 h-20 bg-black/25 rounded-full z-30 flex items-center justify-center select-none cursor-pointer"
        onTouchStart={() => handleControlStart('ArrowRight')}
        onTouchEnd={() => handleControlEnd('ArrowRight')}
        onMouseDown={() => handleControlStart('ArrowRight')}
        onMouseUp={() => handleControlEnd('ArrowRight')}
        onMouseLeave={() => handleControlEnd('ArrowRight')}
      >
        <span className="text-white text-5xl font-mono">›</span>
      </div>
    </div>
  );
};

export default GameScreen;