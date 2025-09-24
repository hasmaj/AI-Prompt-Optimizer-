import React from 'react';

interface HeaderProps {
    onOpenGallery: () => void;
}

const GalleryIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ onOpenGallery }) => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          HASMAJ
        </h1>
        <button 
            onClick={onOpenGallery} 
            className="p-2 rounded-full text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary"
            aria-label="Open image gallery"
        >
            <GalleryIcon className="w-6 h-6" />
        </button>
      </div>
      <p className="mt-2 text-lg text-text-secondary">
        Refine your prompts for ChatGPT, Claude, Gemini & Perplexity.
      </p>
    </header>
  );
};