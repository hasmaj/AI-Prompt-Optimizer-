
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-300 mb-2">
        Enter Your Prompt
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={onChange}
        rows={6}
        placeholder="e.g., Explain quantum computing to a 5-year-old..."
        className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
      />
    </div>
  );
};
