import React from 'react';
import { Difficulty } from '../types';

interface SelectDifficultyScreenProps {
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultyCard: React.FC<{
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  onClick: () => void;
}> = ({ title, description, bgColor, textColor, borderColor, onClick }) => (
  <div
    onClick={onClick}
    className={`p-6 ${bgColor} rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 border-4 ${borderColor}`}
  >
    <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
    <p className={`mt-2 ${textColor} opacity-80`}>{description}</p>
  </div>
);

const SelectDifficultyScreen: React.FC<SelectDifficultyScreenProps> = ({ onSelect }) => {
  return (
    <div className="h-[600px] flex flex-col items-center justify-center p-8 text-center bg-pink-100">
      <h2 className="text-4xl font-bold text-pink-800 mb-8">Choose Your Vibe</h2>
      <div className="space-y-6 w-full max-w-xs mx-auto">
        <DifficultyCard
          title="Easy Peasy"
          description="A chill run in the park."
          bgColor="bg-green-200"
          textColor="text-green-800"
          borderColor="border-green-300"
          onClick={() => onSelect(Difficulty.Easy)}
        />
        <DifficultyCard
          title="Getting Spicy"
          description="The classic chase experience."
          bgColor="bg-orange-200"
          textColor="text-orange-800"
          borderColor="border-orange-300"
          onClick={() => onSelect(Difficulty.Moderate)}
        />
        <DifficultyCard
          title="Ultra Instinct"
          description="Maximum chaos. Good luck."
          bgColor="bg-red-300"
          textColor="text-red-900"
          borderColor="border-red-400"
          onClick={() => onSelect(Difficulty.Hard)}
        />
      </div>
    </div>
  );
};

export default SelectDifficultyScreen;