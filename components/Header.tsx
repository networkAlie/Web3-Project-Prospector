
import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <BotIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl font-bold text-white">
            Web3 Project Prospector
          </h1>
        </div>
      </div>
    </header>
  );
};
