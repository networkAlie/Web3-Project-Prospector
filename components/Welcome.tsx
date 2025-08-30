
import React from 'react';
import { TargetIcon, DatabaseIcon, MailIcon } from './icons';

export const Welcome: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
      <h3 className="text-xl font-bold text-white mb-4">Welcome to the HUBS Live Data Scraper</h3>
      <p className="text-gray-400 max-w-3xl mx-auto mb-8">
        This tool uses AI to perform live web scraping on strategic sources. It finds real-time project data, enriches it, and prepares it for your outreach campaigns, eliminating manual data entry.
      </p>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <TargetIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">1. Select a Source</h4>
            <p className="text-sm text-gray-400">Choose a high-value target from the dropdown list, such as an ICO calendar or an ecosystem directory like DeFiLlama.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <DatabaseIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">2. Scrape & Enrich Data</h4>
            <p className="text-sm text-gray-400">The AI bot will visit the selected URL in real-time and extract project details, social links, contacts, and launch signals.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <MailIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">3. Export & Outreach</h4>
            <p className="text-sm text-gray-400">Export the live, freshly collected data as a CSV, perfectly formatted for the Mail Assistant AI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};