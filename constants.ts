import { Difficulty } from './types';

export const GAME_WIDTH = 448; // Corresponds to max-w-md in App.tsx
export const GAME_HEIGHT = 600;

export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 80; // Increased height for full body
export const PLAYER_INITIAL_Y = GAME_HEIGHT - PLAYER_HEIGHT - 20;
export const PLAYER_SPEED = 15;

export const OBSTACLE_WIDTH = 40;
export const OBSTACLE_HEIGHT = 70; // Increased height for proportion

export const DIFFICULTY_SETTINGS = {
  [Difficulty.Easy]: {
    OBSTACLE_SPEED_INITIAL: 2,
    OBSTACLE_SPEED_INCREMENT: 0.05,
    OBSTACLE_SPAWN_INTERVAL: 1500,
  },
  [Difficulty.Moderate]: {
    OBSTACLE_SPEED_INITIAL: 3,
    OBSTACLE_SPEED_INCREMENT: 0.1,
    OBSTACLE_SPAWN_INTERVAL: 1200,
  },
  [Difficulty.Hard]: {
    OBSTACLE_SPEED_INITIAL: 4,
    OBSTACLE_SPEED_INCREMENT: 0.15,
    OBSTACLE_SPAWN_INTERVAL: 900,
  },
};