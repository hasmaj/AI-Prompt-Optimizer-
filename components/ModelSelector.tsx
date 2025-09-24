import React from 'react';
import { Model } from '../types';

interface ModelSelectorProps {
  selectedModels: Model[];
  onToggle: (model: Model) => void;
}

const modelOptions = [Model.ChatGPT, Model.Claude, Model.Gemini, Model.Perplexity];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModels, onToggle }) => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-text-primary mb-3">
        Optimize For
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {modelOptions.map(model => {
          const isSelected = selectedModels.includes(model);
          return (
            <button
              key={model}
              onClick={() => onToggle(model)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary ${
                isSelected
                  ? 'bg-accent-primary border-accent-primary text-text-inverted'
                  : 'bg-bg-tertiary border-border-secondary text-text-primary hover:bg-bg-interactive hover:border-border-secondary'
              }`}
            >
              {model}
            </button>
          );
        })}
      </div>
    </div>
  );
};