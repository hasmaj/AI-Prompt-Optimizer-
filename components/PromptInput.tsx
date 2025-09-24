import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-sm font-medium text-text-primary mb-2">
        Enter Your Prompt
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={onChange}
        rows={6}
        placeholder="e.g., Explain quantum computing to a 5-year-old..."
        className="w-full p-4 bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
      />
    </div>
  );
};