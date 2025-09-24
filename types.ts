export enum Model {
  ChatGPT = 'ChatGPT',
  Claude = 'Claude',
  Gemini = 'Gemini',
  Perplexity = 'Perplexity',
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface GeneratedImageData {
  id: string;
  imageData: string; // base64 string
  prompt: string;
  aspectRatio: string;
  timestamp: number;
}

export interface FewShotExample {
  id: string;
  input: string;
  output: string;
}

export type Theme = 'dark' | 'light' | 'gray';
