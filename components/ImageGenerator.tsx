import React, { useState } from 'react';
import { Loader } from './Loader';

interface ImageGeneratorProps {
  onGenerate: (prompt: string, aspectRatio: string) => void;
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

const ImageIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onGenerate, isLoading, generatedImage, error }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const aspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim(), aspectRatio);
    }
  };

  return (
    <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary backdrop-blur-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Image Generator Task</h2>
        <p className="text-text-secondary mb-4 text-sm">Create an image directly from a prompt. Perfect for quick visual concepts without optimization.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="e.g., A photorealistic image of a majestic lion in the savanna at sunrise..."
            className="w-full p-4 bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
            aria-label="Image generation prompt"
          />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <label htmlFor="aspect-ratio-select" className="block text-sm font-medium text-text-secondary mb-1">
                  Aspect Ratio
                </label>
                <select 
                  id="aspect-ratio-select"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="appearance-none w-full sm:w-auto bg-bg-input border border-border-primary rounded-lg text-text-primary focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300 px-4 py-3"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2371717a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent-tertiary text-text-inverted font-semibold rounded-lg shadow-md hover:bg-accent-tertiary-hover disabled:bg-bg-interactive disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Generating...
                  </>
                ) : (
                    <>
                    <ImageIcon className="w-5 h-5 -ml-1 mr-2"/>
                    Generate Image
                    </>
                )}
              </button>
          </div>
        </form>
      </div>

      {(isLoading || generatedImage || error) && (
        <div className="border-t border-border-primary pt-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Generated Image</h3>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-80 bg-bg-primary/70 rounded-md animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-text-secondary">Generating your image... this can take a moment.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}
          {generatedImage && !isLoading && (
            <div className="flex justify-center bg-bg-primary/50 p-2 rounded-md">
                <img
                  src={`data:image/png;base64,${generatedImage}`}
                  alt="Generated by AI"
                  className="rounded-lg shadow-lg max-w-full h-auto max-h-[512px]"
                />
            </div>
          )}
        </div>
      )}
    </div>
  );
};