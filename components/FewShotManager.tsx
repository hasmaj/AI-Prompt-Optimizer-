import React, { useState, useEffect } from 'react';
import { FewShotExample } from '../types';

// Icons
const ChevronIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const LightbulbIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.628a6.01 6.01 0 00-1.5-1.128a6.01 6.01 0 00-7.5 0 6.01 6.01 0 00-1.5 1.128a6.01 6.01 0 001.5 11.628v5.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

interface ExampleItemProps {
    example: FewShotExample;
    onUpdate: (id: string, input: string, output: string) => void;
    onDelete: (id: string) => void;
}

const ExampleItem: React.FC<ExampleItemProps> = ({ example, onUpdate, onDelete }) => {
    const [input, setInput] = useState(example.input);
    const [output, setOutput] = useState(example.output);

    const handleSave = () => {
        onUpdate(example.id, input, output);
    };
    
    // Auto-save on blur
    const handleBlur = () => {
        if(input !== example.input || output !== example.output) {
            handleSave();
        }
    };

    return (
        <div className="bg-bg-secondary border border-border-secondary rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-text-primary">Example</h4>
                <button 
                    onClick={() => onDelete(example.id)}
                    className="text-text-muted hover:text-red-400 p-1 rounded-full transition-colors"
                    aria-label="Delete example"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Input (e.g., User Prompt)</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={handleBlur}
                    rows={3}
                    placeholder="A short, simple prompt..."
                    className="w-full p-2 text-sm bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-1 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Output (e.g., Ideal AI Response)</label>
                <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder="The detailed, optimized prompt you want the AI to learn from..."
                    className="w-full p-2 text-sm bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-1 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
                />
            </div>
        </div>
    );
};


interface FewShotManagerProps {
  examples: FewShotExample[];
  onAdd: () => void;
  onUpdate: (id: string, input: string, output: string) => void;
  onDelete: (id: string) => void;
}

export const FewShotManager: React.FC<FewShotManagerProps> = ({ examples, onAdd, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg-secondary/50 border border-border-primary rounded-xl overflow-hidden transition-all duration-300">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg"
            aria-expanded={isOpen}
            aria-controls="few-shot-content"
        >
            <div className="flex items-center gap-3">
                <LightbulbIcon className="w-6 h-6 text-yellow-400"/>
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Few-Shot Examples</h2>
                    <p className="text-sm text-text-secondary">Guide the AI by providing your own input/output examples.</p>
                </div>
            </div>
            <ChevronIcon className={`w-6 h-6 text-text-secondary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div 
            id="few-shot-content"
            className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <div className="p-4 pt-0 space-y-4">
                    {examples.map((example) => (
                        <ExampleItem 
                            key={example.id} 
                            example={example}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                    <button
                        onClick={onAdd}
                        className="w-full px-4 py-2 text-sm font-semibold rounded-lg border-2 border-dashed border-border-secondary text-text-secondary hover:bg-bg-tertiary hover:border-border-secondary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary"
                    >
                        + Add New Example
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};