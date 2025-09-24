import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ModelSelector } from './components/ModelSelector';
import { OptimizedPromptDisplay } from './components/OptimizedPromptDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { Model, GeneratedImageData, FewShotExample, Theme } from './types';
import { optimizePrompt, generateImage, analyzeImage } from './services/geminiService';
import { PromptTemplates } from './components/PromptTemplates';
import { TodoList } from './components/TodoList';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { ImageGallery } from './components/ImageGallery';
import { FewShotManager } from './components/FewShotManager';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const GALLERY_STORAGE_KEY = 'image-gallery-items';
const FEW_SHOT_STORAGE_KEY = 'few-shot-examples';
const THEME_STORAGE_KEY = 'app-theme';

const App: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);

  const [directGeneratedImage, setDirectGeneratedImage] = useState<string | null>(null);
  const [isGeneratingDirectImage, setIsGeneratingDirectImage] = useState<boolean>(false);
  const [directImageError, setDirectImageError] = useState<string | null>(null);

  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<GeneratedImageData[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  const [fewShotExamples, setFewShotExamples] = useState<FewShotExample[]>([]);
  
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }

        const storedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
        if (storedImages) {
            setGalleryImages(JSON.parse(storedImages));
        }
        const storedExamples = localStorage.getItem(FEW_SHOT_STORAGE_KEY);
        if (storedExamples) {
            setFewShotExamples(JSON.parse(storedExamples));
        }
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
    }
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-gray');
    root.classList.add(`theme-${theme}`);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(FEW_SHOT_STORAGE_KEY, JSON.stringify(fewShotExamples));
  }, [fewShotExamples]);

  const handleAddFewShotExample = () => {
    const newExample: FewShotExample = {
      id: crypto.randomUUID(),
      input: '',
      output: '',
    };
    setFewShotExamples(prev => [...prev, newExample]);
  };

  const handleUpdateFewShotExample = (id: string, input: string, output: string) => {
    setFewShotExamples(prev => 
      prev.map(ex => ex.id === id ? { ...ex, input, output } : ex)
    );
  };

  const handleDeleteFewShotExample = (id: string) => {
    setFewShotExamples(prev => prev.filter(ex => ex.id !== id));
  };


  const handleAddToGallery = (imageData: string, prompt: string, aspectRatio: string) => {
    const newImage: GeneratedImageData = {
        id: crypto.randomUUID(),
        imageData,
        prompt,
        aspectRatio,
        timestamp: Date.now(),
    };

    setGalleryImages(prevImages => {
        const updatedImages = [newImage, ...prevImages];
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
        return updatedImages;
    });
  };

  const handleClearGallery = () => {
      setGalleryImages([]);
      localStorage.removeItem(GALLERY_STORAGE_KEY);
  };

  const handleUpdateGalleryItemPrompt = (id: string, newPrompt: string) => {
    setGalleryImages(prevImages => {
      const updatedImages = prevImages.map(img =>
        img.id === id ? { ...img, prompt: newPrompt } : img
      );
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const handleOptimizeClick = useCallback(async () => {
    if (!originalPrompt || selectedModels.length === 0) {
      setError('Please enter a prompt and select at least one model.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setOptimizedPrompt('');
    setGeneratedImage(null);
    setImageGenerationError(null);

    try {
      const result = await optimizePrompt(originalPrompt, selectedModels, fewShotExamples);
      setOptimizedPrompt(result);
    } catch (err) {
      setError(err instanceof Error ? `An error occurred: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalPrompt, selectedModels, fewShotExamples]);

  const handleGenerateImage = useCallback(async () => {
    if (!optimizedPrompt) return;

    setIsGeneratingImage(true);
    setImageGenerationError(null);
    setGeneratedImage(null);

    try {
      const imageData = await generateImage(optimizedPrompt);
      setGeneratedImage(imageData);
      handleAddToGallery(imageData, optimizedPrompt, '1:1');
    } catch (err) {
      setImageGenerationError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsGeneratingImage(false);
    }
  }, [optimizedPrompt]);

  const handleDirectGenerateImage = useCallback(async (prompt: string, aspectRatio: string) => {
    setIsGeneratingDirectImage(true);
    setDirectImageError(null);
    setDirectGeneratedImage(null);

    try {
      const imageData = await generateImage(prompt, aspectRatio);
      setDirectGeneratedImage(imageData);
      handleAddToGallery(imageData, prompt, aspectRatio);
    } catch (err) {
      setDirectImageError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsGeneratingDirectImage(false);
    }
  }, []);

  const handleImageAnalysis = useCallback(async (file: File, prompt: string) => {
    setIsAnalyzingImage(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        const mimeType = file.type;
        
        const result = await analyzeImage(base64Data, mimeType, prompt);
        setAnalysisResult(result);
      } catch (err) {
        setAnalysisError(err instanceof Error ? err.message : 'An unknown error occurred during image analysis.');
      } finally {
        setIsAnalyzingImage(false);
      }
    };
    reader.onerror = () => {
      setIsAnalyzingImage(false);
      setAnalysisError('Failed to read the image file.');
    }
  }, []);

  const handleModelToggle = (model: Model) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleTemplateSelect = (prompt: string) => {
    setOriginalPrompt(prompt);
    document.getElementById('prompt-input')?.focus();
  };

  const isButtonDisabled = !originalPrompt || selectedModels.length === 0 || isLoading;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-bg-primary text-text-primary font-sans transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto relative">
        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
        <Header onOpenGallery={() => setIsGalleryOpen(true)} />
        <main className="mt-8 space-y-8">
          <PromptTemplates onSelect={handleTemplateSelect} />

          <FewShotManager 
            examples={fewShotExamples}
            onAdd={handleAddFewShotExample}
            onUpdate={handleUpdateFewShotExample}
            onDelete={handleDeleteFewShotExample}
          />

          <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary backdrop-blur-sm">
            <PromptInput value={originalPrompt} onChange={e => setOriginalPrompt(e.target.value)} />
            <ModelSelector selectedModels={selectedModels} onToggle={handleModelToggle} />
            <div className="mt-6 text-center">
              <button
                onClick={handleOptimizeClick}
                disabled={isButtonDisabled}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent-primary text-text-inverted font-semibold rounded-lg shadow-md hover:bg-accent-primary-hover disabled:bg-bg-interactive disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary"
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
             <OptimizedPromptDisplay 
                originalPrompt={originalPrompt} 
                optimizedPrompt={optimizedPrompt}
                onGenerateImage={handleGenerateImage}
                isGeneratingImage={isGeneratingImage}
              />
          )}

          {(isGeneratingImage || generatedImage || imageGenerationError) && (
            <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-secondary mb-4">Image from Optimized Prompt</h3>
              {isGeneratingImage && (
                <div className="flex flex-col items-center justify-center h-80 bg-bg-primary/70 rounded-md animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-text-secondary">Generating your image... this can take a moment.</p>
                </div>
              )}
              {imageGenerationError && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                  <p>{imageGenerationError}</p>
                </div>
              )}
              {generatedImage && !isGeneratingImage && (
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
          
          <ImageGenerator 
            onGenerate={handleDirectGenerateImage}
            isLoading={isGeneratingDirectImage}
            generatedImage={directGeneratedImage}
            error={directImageError}
          />
          
          <ImageAnalyzer 
            onAnalyze={handleImageAnalysis}
            isLoading={isAnalyzingImage}
            result={analysisResult}
            error={analysisError}
          />

          <TodoList />

        </main>
      </div>
      <Footer />
      {isGalleryOpen && (
        <ImageGallery 
            images={galleryImages}
            onClear={handleClearGallery}
            onClose={() => setIsGalleryOpen(false)}
            onUpdatePrompt={handleUpdateGalleryItemPrompt}
        />
      )}
    </div>
  );
};

export default App;