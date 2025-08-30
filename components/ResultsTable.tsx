
import React from 'react';
import { Project } from '../types';
import { TwitterIcon, TelegramIcon, DiscordIcon, GithubIcon, DocsIcon, ExternalLinkIcon, DownloadIcon, RocketIcon } from './icons';

interface ResultsTableProps {
  projects: Project[];
  sourceUrl: string;
}

const downloadCSV = (projects: Project[], sourceUrl: string) => {
    const headers = [
        "Proje Adı", "Website URL", "Kısa Açıklama", "Ekosistem", "Twitter URL", "Telegram URL", "Discord URL", 
        "GitHub URL", "Son GitHub Aktivitesi", "Whitepaper/Docs URL", "İletişim E-postaları", 
        "Lansman Sinyali", "Veri Toplama Tarihi", "Kaynak", "Durum"
    ];

    const today = new Date().toISOString().split('T')[0];
    
    // Helper to format strings for CSV
    const csvFormat = (str: string | null | undefined): string => {
        if (str === null || str === undefined) return '""';
        const s = String(str);
        // Escape double quotes by doubling them and wrap the whole string in double quotes.
        return `"${s.replace(/"/g, '""')}"`;
    };

    const rows = projects.map(p => [
        csvFormat(p.projectName),
        csvFormat(p.websiteUrl),
        csvFormat(p.shortDescription),
        csvFormat(p.ecosystem),
        csvFormat(p.twitterUrl),
        csvFormat(p.telegramUrl),
        csvFormat(p.discordUrl),
        csvFormat(p.githubUrl),
        csvFormat(p.lastGithubActivity),
        csvFormat(p.docsUrl),
        csvFormat(p.contactEmails),
        csvFormat(p.launchSignal),
        `"${today}"`,
        csvFormat(p.source),
        '""' // Durum (Status) column is left empty
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    // Create a safe filename from the source URL
    const safeSourceName = sourceUrl.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute("download", `prospects_${safeSourceName}_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ projects, sourceUrl }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <div>
              <h3 className="text-lg font-semibold text-white">Scraping Results</h3>
              <p className="text-sm text-gray-400 truncate max-w-md">Found {projects.length} projects from: "{sourceUrl}"</p>
          </div>
          <button 
            onClick={() => downloadCSV(projects, sourceUrl)}
            className="flex items-center px-4 py-2 bg-gray-600 text-white font-medium text-sm rounded-md hover:bg-gray-500 transition-colors"
          >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export CSV
          </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[200px]">Project Name</th>
              <th scope="col" className="px-6 py-3 min-w-[120px]">Ecosystem</th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">Launch Signal</th>
              <th scope="col" className="px-6 py-3 min-w-[250px]">Description</th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">Links</th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">Contacts</th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">Source</th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">GitHub Activity</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="bg-gray-800/30 border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-400 group">
                    {project.projectName}
                    <ExternalLinkIcon className="h-3 w-3 ml-1.5 opacity-70 group-hover:opacity-100"/>
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.ecosystem}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {project.launchSignal ? (
                        <span className="inline-flex items-center bg-green-900/80 text-green-300 text-xs font-bold px-2.5 py-1 rounded-full border border-green-700">
                           <RocketIcon className="h-4 w-4 mr-1.5"/>
                           {project.launchSignal}
                        </span>
                    ) : (
                        <span className="text-gray-500">N/A</span>
                    )}
                </td>
                <td className="px-6 py-4 text-gray-400 max-w-sm truncate" title={project.shortDescription}>
                  {project.shortDescription}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {project.twitterUrl && <a href={project.twitterUrl} target="_blank" rel="noopener noreferrer" title="Twitter"><TwitterIcon className="h-5 w-5 hover:text-cyan-400" /></a>}
                    {project.telegramUrl && <a href={project.telegramUrl} target="_blank" rel="noopener noreferrer" title="Telegram"><TelegramIcon className="h-5 w-5 hover:text-cyan-400" /></a>}
                    {project.discordUrl && <a href={project.discordUrl} target="_blank" rel="noopener noreferrer" title="Discord"><DiscordIcon className="h-5 w-5 hover:text-cyan-400" /></a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon className="h-5 w-5 hover:text-cyan-400" /></a>}
                    {project.docsUrl && <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" title="Docs/Whitepaper"><DocsIcon className="h-5 w-5 hover:text-cyan-400" /></a>}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs truncate max-w-sm" title={project.contactEmails || 'N/A'}>
                  {project.contactEmails || 'N/A'}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-400 truncate max-w-xs" title={project.source}>{project.source}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-400">{project.lastGithubActivity || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};