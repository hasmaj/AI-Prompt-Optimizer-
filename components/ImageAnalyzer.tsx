import React, { useState, useRef } from 'react';
import { Loader } from './Loader';

interface ImageAnalyzerProps {
  onAnalyze: (file: File, prompt: string) => void;
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21 21H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5" />
    </svg>
);

const AnalyzeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
    </svg>
);


export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onAnalyze, isLoading, result, error }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && prompt.trim()) {
      onAnalyze(file, prompt.trim());
    }
  };

  return (
    <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary backdrop-blur-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Image Analysis Task</h2>
        <p className="text-text-secondary mb-4 text-sm">Upload an image and ask a question about it. Useful for generating descriptions, alt text, or creative ideas.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />

          <div 
            className="w-full h-48 border-2 border-dashed border-border-secondary rounded-lg flex flex-col items-center justify-center text-text-secondary hover:border-border-focus hover:text-border-focus transition-colors cursor-pointer"
            onClick={handleUploadClick}
          >
            {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md"/>
            ) : (
                <>
                    <UploadIcon className="w-10 h-10 mb-2" />
                    <p>Click to upload an image</p>
                    <p className="text-xs text-text-muted">PNG, JPG, WEBP</p>
                </>
            )}
          </div>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            placeholder="e.g., Describe this image for a visually impaired user."
            className="w-full p-4 bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
            aria-label="Image analysis prompt"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || !file || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent-secondary text-text-inverted font-semibold rounded-lg shadow-md hover:bg-accent-secondary-hover disabled:bg-bg-interactive disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary"
          >
            {isLoading ? (
              <>
                <Loader />
                Analyzing...
              </>
            ) : (
                <>
                <AnalyzeIcon className="w-5 h-5 -ml-1 mr-2"/>
                Analyze Image
                </>
            )}
          </button>
        </form>
      </div>

      {(isLoading || result || error) && (
        <div className="border-t border-border-primary pt-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Analysis Result</h3>
          {isLoading && (
            <div className="flex items-center space-x-3 bg-bg-primary/70 p-4 rounded-md animate-pulse">
                <div className="w-2.5 h-2.5 bg-bg-interactive rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-bg-interactive rounded-full animation-delay-200"></div>
                <div className="w-2.5 h-2.5 bg-bg-interactive rounded-full animation-delay-400"></div>
                <span className="text-text-secondary">AI is analyzing the image...</span>
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}
          {result && !isLoading && (
            <p className="whitespace-pre-wrap text-text-primary bg-bg-primary/70 p-4 rounded-md font-mono text-sm leading-relaxed">
              {result}
            </p>
          )}
        </div>
      )}
    </div>
  );
};