import React, { useState, useCallback } from 'react';
import { GameState, Difficulty } from './types';
import SelectDifficultyScreen from './components/SelectDifficultyScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import StartScreen from './components/StartScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Moderate);
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleStart = useCallback(() => {
    setGameState(GameState.SelectDifficulty);
  }, []);

  const handleDifficultySelect = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState(GameState.Playing);
  }, []);
  
  const handleGameOver = useCallback((score: number) => {
    const finalIntScore = Math.floor(score);
    setFinalScore(finalIntScore);
    if (finalIntScore > highScore) {
      setHighScore(finalIntScore);
    }
    setGameState(GameState.GameOver);
  }, [highScore]);

  const handleRestart = useCallback(() => {
    setGameState(GameState.SelectDifficulty);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={handleStart} />;
      case GameState.Playing:
        return <GameScreen onGameOver={handleGameOver} difficulty={difficulty} />;
      case GameState.GameOver:
        return <GameOverScreen score={finalScore} highScore={highScore} onRestart={handleRestart} />;
      case GameState.SelectDifficulty:
      default:
        return <SelectDifficultyScreen onSelect={handleDifficultySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-white/30">
        {renderContent()}
      </div>
      <footer className="text-center mt-6 text-gray-600">
        <p>Use arrow keys or on-screen buttons to move.</p>
      </footer>
    </div>
  );
};

export default App;