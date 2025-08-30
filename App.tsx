import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ResultsTable } from './components/ResultsTable';
import { Loader } from './components/Loader';
import { fetchProjectDataFromUrl } from './services/geminiService';
import { Project } from './types';
import { Welcome } from './components/Welcome';
import { KeyIcon, SearchIcon } from './components/icons';

interface Source {
  name: string;
  url: string;
}

// Tier 1 & 2 sources as defined by the user for strategic importance
const strategicSources: Source[] = [
  { name: 'DeFiLlama / Base', url: 'https://defillama.com/chain/Base' },
  { name: 'ICO Drops / Upcoming', url: 'https://icodrops.com/upcoming-ico/' },
  { name: 'CryptoRank / Upcoming ICOs', url: 'https://cryptorank.io/upcoming-ico' },
  { name: 'DappRadar / New dApps', url: 'https://dappradar.com/rankings/dapps/new' },
  { name: 'CoinGecko / New Coins', url: 'https://www.coingecko.com/en/new-cryptocurrencies' },
  { name: 'DAO Maker / Launchpad', url: 'https://daomaker.com/' },
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string>(strategicSources[0].url);
  const [currentSourceUrl, setCurrentSourceUrl] = useState<string>('');
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

  const handleProspect = useCallback(async () => {
    if (!apiKey) {
      setError('Please enter your Gemini LLM API Key to begin.');
      return;
    }
     if (!selectedUrl) {
      setError('Please select a valid data source.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProjects([]);
    setCurrentSourceUrl(selectedUrl);

    try {
      const data = await fetchProjectDataFromUrl(selectedUrl, apiKey);
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch project data. The AI might be having trouble scraping the selected source or the source might be blocking automated access. Please try a different source.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, selectedUrl]);

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

          <h2 className="text-2xl font-bold text-center text-gray-200 mb-2">Live Web Scraper Bot</h2>
          <p className="text-center text-gray-400 mb-8">
            Select a strategic data source. The AI will scrape it in real-time to collect live project data.
          </p>
          
          <div className="flex items-center w-full relative max-w-4xl mx-auto">
            <select
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
              disabled={isLoading || !apiKey}
              className="w-full appearance-none pl-4 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {strategicSources.map(source => (
                <option key={source.url} value={source.url}>
                  {source.name}
                </option>
              ))}
            </select>
             <button
              onClick={handleProspect}
              disabled={isLoading || !apiKey}
              className="flex-shrink-0 flex items-center justify-center px-4 py-3 bg-cyan-600 text-white font-semibold rounded-r-lg hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              {isLoading ? 'Scraping...' : 'Prospect'}
            </button>
          </div>

          {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
          
          <div className="mt-12">
            {isLoading && <Loader />}
            {!isLoading && projects.length === 0 && !error && <Welcome />}
            {!isLoading && projects.length > 0 && (
              <ResultsTable projects={projects} sourceUrl={currentSourceUrl} />
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