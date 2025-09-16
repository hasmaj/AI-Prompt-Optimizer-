
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ModelSelector } from './components/ModelSelector';
import { OptimizedPromptDisplay } from './components/OptimizedPromptDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { Model } from './types';
import { optimizePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimizeClick = useCallback(async () => {
    if (!originalPrompt || selectedModels.length === 0) {
      setError('Please enter a prompt and select at least one model.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setOptimizedPrompt('');

    try {
      const result = await optimizePrompt(originalPrompt, selectedModels);
      setOptimizedPrompt(result);
    } catch (err) {
      setError(err instanceof Error ? `An error occurred: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalPrompt, selectedModels]);

  const handleModelToggle = (model: Model) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const isButtonDisabled = !originalPrompt || selectedModels.length === 0 || isLoading;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-slate-900 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 backdrop-blur-sm">
            <PromptInput value={originalPrompt} onChange={e => setOriginalPrompt(e.target.value)} />
            <ModelSelector selectedModels={selectedModels} onToggle={handleModelToggle} />
            <div className="mt-6 text-center">
              <button
                onClick={handleOptimizeClick}
                disabled={isButtonDisabled}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Optimizing...
                  </>
                ) : (
                  'Optimize Prompt'
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          {optimizedPrompt && !isLoading && (
             <OptimizedPromptDisplay originalPrompt={originalPrompt} optimizedPrompt={optimizedPrompt} />
          )}

        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
