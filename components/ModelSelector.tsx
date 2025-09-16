
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
      <h3 className="text-sm font-medium text-slate-300 mb-3">
        Optimize For
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {modelOptions.map(model => {
          const isSelected = selectedModels.includes(model);
          return (
            <button
              key={model}
              onClick={() => onToggle(model)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
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
