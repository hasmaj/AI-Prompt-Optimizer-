import React, { useState } from 'react';
import { Loader } from './Loader';

interface OptimizedPromptDisplayProps {
  originalPrompt: string;
  optimizedPrompt: string;
  onGenerateImage: () => void;
  isGeneratingImage: boolean;
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ImageIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);


export const OptimizedPromptDisplay: React.FC<OptimizedPromptDisplayProps> = ({ originalPrompt, optimizedPrompt, onGenerateImage, isGeneratingImage }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <PromptCard title="Original Prompt" content={originalPrompt} />
      <PromptCard 
        title="Optimized Prompt" 
        content={optimizedPrompt} 
        onCopy={handleCopy} 
        copyState={copied}
        onGenerateImage={onGenerateImage}
        isGeneratingImage={isGeneratingImage}
      />
    </div>
  );
};

interface PromptCardProps {
    title: string;
    content: string;
    onCopy?: () => void;
    copyState?: boolean;
    onGenerateImage?: () => void;
    isGeneratingImage?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, content, onCopy, copyState, onGenerateImage, isGeneratingImage }) => {
    return (
        <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
              <div className="flex items-center space-x-2">
                {onGenerateImage && (
                  <button 
                    onClick={onGenerateImage}
                    disabled={isGeneratingImage}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-interactive text-text-primary rounded-md transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
                    aria-label="Generate image from prompt"
                  >
                    {isGeneratingImage ? <Loader /> : <ImageIcon className="w-4 h-4"/>}
                    <span>{isGeneratingImage ? 'Generating...' : 'Generate Image'}</span>
                  </button>
                )}
                {onCopy && (
                  <button 
                    onClick={onCopy}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-interactive text-text-primary rounded-md transition-colors text-sm"
                  >
                    {copyState ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                    <span>{copyState ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
            <p className="whitespace-pre-wrap text-text-primary bg-bg-primary/70 p-4 rounded-md font-mono text-sm leading-relaxed">
              {content}
            </p>
        </div>
    );
}