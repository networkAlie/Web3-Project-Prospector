
import React from 'react';

const loadingMessages = [
    "Initializing AI Bot...",
    "Analyzing target URL...",
    "Scanning for potential projects...",
    "Extracting project websites...",
    "Scraping detailed information...",
    "Compiling social media links...",
    "Searching for contact details...",
    "Formatting data for presentation...",
    "Almost there, finalizing results...",
];

export const Loader: React.FC = () => {
    const [message, setMessage] = React.useState(loadingMessages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setMessage(loadingMessages[index]);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
            <svg className="animate-spin h-8 w-8 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-gray-200">AI is at work...</p>
            <p className="text-gray-400 transition-opacity duration-500">{message}</p>
        </div>
    );
};
