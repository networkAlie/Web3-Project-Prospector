
import React from 'react';
import { TargetIcon, DatabaseIcon, MailIcon } from './icons';

export const Welcome: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
      <h3 className="text-xl font-bold text-white mb-4">Welcome to the HUBS Strategic Data Collector</h3>
      <p className="text-gray-400 max-w-3xl mx-auto mb-8">
        This tool automates the core of the "Weekly Application and Growth System". It uses AI to find strategically-aligned projects based on your theme, gathers enriched data, and prepares it for outreach.
      </p>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <TargetIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">1. Define a Theme</h4>
            <p className="text-sm text-gray-400">Enter a strategic query, like "Upcoming Solana IDOs" or "Base GameFi projects". The AI will begin its multi-source search.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <DatabaseIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">2. Enrich Data</h4>
            <p className="text-sm text-gray-400">The AI bot gathers crucial data, including social links, contacts, and vital "Launch Signals" indicating TGE or IDO plans.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-900/50 rounded-lg border border-cyan-700">
            <MailIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">3. Export & Outreach</h4>
            <p className="text-sm text-gray-400">Export the strategically-sorted data as a CSV, perfectly formatted for the Mail Assistant AI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
