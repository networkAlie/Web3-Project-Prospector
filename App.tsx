import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ProspectingForm } from './components/ProspectingForm';
import { ResultsTable } from './components/ResultsTable';
import { Loader } from './components/Loader';
import { fetchProjectData } from './services/geminiService';
import { Project } from './types';
import { Welcome } from './components/Welcome';
import { KeyIcon } from './components/icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };

  const handleProspect = useCallback(async (theme: string) => {
    if (!apiKey) {
      setError('Please enter your Gemini LLM API Key to begin.');
      return;
    }
    if (!theme) {
      setError('Please enter a valid theme or query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProjects([]);
    setCurrentTheme(theme);

    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const data = await fetchProjectData(theme, apiKey, today);
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch project data. The AI might be having trouble with the query or finding relevant sources. Please try a different theme.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
           <div className="mb-8 p-4 bg-gray-800 border border-gray-700 rounded-lg max-w-4xl mx-auto">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                Enter Your Gemini LLM API Key
              </label>
              <div className="relative flex items-center">
                <KeyIcon className="absolute left-3 h-5 w-5 text-gray-500" />
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Paste your API key here to enable prospecting"
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

          <h2 className="text-2xl font-bold text-center text-gray-200 mb-2">Strategic Prospecting Bot</h2>
          <p className="text-center text-gray-400 mb-8">
            Enter a theme (e.g., "Upcoming Base GameFi projects") to find launch-ready Web3 projects and their strategic data.
          </p>
          <ProspectingForm onProspect={handleProspect} isLoading={isLoading} disabled={!apiKey} />
          {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
          
          <div className="mt-12">
            {isLoading && <Loader />}
            {!isLoading && projects.length === 0 && !error && <Welcome />}
            {!isLoading && projects.length > 0 && (
              <ResultsTable projects={projects} sourceTheme={currentTheme} />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Built for Alie Network's "HUBS" Initiative</p>
      </footer>
    </div>
  );
};

export default App;