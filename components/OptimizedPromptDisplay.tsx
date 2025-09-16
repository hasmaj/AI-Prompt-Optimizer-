
import React, { useState } from 'react';

interface OptimizedPromptDisplayProps {
  originalPrompt: string;
  optimizedPrompt: string;
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


export const OptimizedPromptDisplay: React.FC<OptimizedPromptDisplayProps> = ({ originalPrompt, optimizedPrompt }) => {
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
      <PromptCard title="Optimized Prompt" content={optimizedPrompt} onCopy={handleCopy} copyState={copied}/>
    </div>
  );
};

interface PromptCardProps {
    title: string;
    content: string;
    onCopy?: () => void;
    copyState?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, content, onCopy, copyState }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
              {onCopy && (
                 <button 
                 onClick={onCopy}
                 className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors text-sm"
               >
                 {copyState ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                 <span>{copyState ? 'Copied!' : 'Copy'}</span>
               </button>
              )}
            </div>
            <p className="whitespace-pre-wrap text-slate-200 bg-slate-900/70 p-4 rounded-md font-mono text-sm leading-relaxed">
              {content}
            </p>
        </div>
    );
}
