import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface ProspectingFormProps {
  onProspect: (theme: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ProspectingForm: React.FC<ProspectingFormProps> = ({ onProspect, isLoading, disabled }) => {
  const [theme, setTheme] = useState('Upcoming GameFi projects on Base');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProspect(theme);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative max-w-4xl mx-auto">
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Enter a theme, e.g., 'Upcoming Solana IDOs'"
        className="w-full pl-4 pr-36 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || disabled}
      />
      <button
        type="submit"
        disabled={isLoading || disabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <SearchIcon className="h-5 w-5 mr-2" />
        {isLoading ? 'Prospecting...' : 'Prospect'}
      </button>
    </form>
  );
};