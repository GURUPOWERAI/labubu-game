export enum GameState {
  Start,
  SelectDifficulty,
  Playing,
  GameOver,
}

export enum Difficulty {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Hard = 'Hard',
}

export interface Position {
  x: number;
  y: number;
}

export interface ObstacleType {
  id: number;
  position: Position;
}