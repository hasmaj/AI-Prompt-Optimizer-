import React, { useState } from 'react';

// Icons
const CreativeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);

const CodeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

const DataIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

const MarketingIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

const BookIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const TechnicalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

const BusinessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.505-2.287 2.697l-7.5 1.125c-.96.143-1.92.143-2.88 0l-7.5-1.125a2.625 2.625 0 01-2.287-2.697V14.15M12 21v-8.25M12 12.75V3M12 3L9 6m3-3l3 6" />
    </svg>
);

const AltTextIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
    </svg>
);

const ChevronIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const examples = [
  {
    title: 'Creative Writing',
    description: 'Write a short story in a specific style.',
    prompt: `Write a short story in the style of Edgar Allan Poe about a haunted lighthouse. The story should be around 500 words and focus on the lighthouse keeper's descent into madness as he witnesses strange, spectral lights over the sea.`,
    icon: CreativeIcon,
    iconBg: 'bg-purple-500/10 text-purple-400'
  },
  {
    title: 'Coding Assistance',
    description: 'Generate a Python function for a common task.',
    prompt: `Write a Python function that takes a list of URLs and returns a list of their HTTP status codes. The function should use the 'asyncio' and 'aiohttp' libraries to perform the requests concurrently for better performance. Include error handling for invalid URLs or network issues.`,
    icon: CodeIcon,
    iconBg: 'bg-sky-500/10 text-sky-400'
  },
  {
    title: 'Data Analysis',
    description: 'Get insights from a sample dataset.',
    prompt: `I have a CSV dataset of customer purchase history with the following columns: 'CustomerID', 'ProductName', 'PurchaseDate', 'Price', 'Category'. 
Your task is to act as a data analyst. Based on this structure, provide a list of 3 insightful questions that can be answered from this data. For each question, describe the analysis that would be needed.`,
    icon: DataIcon,
    iconBg: 'bg-emerald-500/10 text-emerald-400'
  },
  {
    title: 'Marketing Copy',
    description: 'Draft a promotional email for a new product.',
    prompt: `Draft a promotional email for a new product launch. The product is a smart coffee mug called 'EmberFlow' that keeps your drink at the perfect temperature for hours. The target audience is tech-savvy professionals and coffee lovers. The email should have a catchy subject line, a brief introduction, highlight 3 key features, and include a clear call-to-action with a limited-time 15% discount code 'LAUNCH15'.`,
    icon: MarketingIcon,
    iconBg: 'bg-orange-500/10 text-orange-400'
  },
  {
    title: 'Educational Explanation',
    description: 'Simplify a complex topic for an audience.',
    prompt: `Explain the concept of blockchain technology to a high school student. Use an analogy to make it easier to understand. Cover the key components like blocks, chains, decentralization, and cryptography. The explanation should be no more than 300 words.`,
    icon: BookIcon,
    iconBg: 'bg-yellow-500/10 text-yellow-400'
  },
  {
    title: 'Technical Architecture',
    description: 'Design a REST API for a web service.',
    prompt: `Act as a senior software architect. Design a REST API for a URL shortening service.
    
The API should include the following functionalities:
1.  Create a new short URL for a given long URL.
2.  Retrieve the original long URL from a short URL code.
3.  Get basic analytics for a short URL (e.g., click count).

Define the following:
-   API Endpoints (e.g., POST /api/v1/urls)
-   Request/Response JSON data models for each endpoint.
-   HTTP status codes for success and error cases.
-   Suggested technology stack (e.g., Node.js, Express, Redis for caching, PostgreSQL for storage).`,
    icon: TechnicalIcon,
    iconBg: 'bg-teal-500/10 text-teal-400'
  },
  {
    title: 'Executive Strategy',
    description: 'Draft a CEO\'s address for an upcoming board meeting.',
    prompt: `Act as the CEO of a mid-sized SaaS company, 'InnovateSphere', that just completed Q3.
    
Draft a concise and impactful opening statement for the upcoming Board of Directors meeting.
    
The statement should:
1.  Acknowledge the challenging market conditions this quarter.
2.  Highlight two major wins: exceeding user acquisition targets by 15% and successfully launching a new enterprise feature.
3.  Briefly touch upon the primary challenge: a 5% dip in customer retention.
4.  Set a confident and forward-looking tone, outlining the key strategic priority for Q4, which is to launch a new customer success initiative to address retention.
5.  The entire statement should be under 250 words.`,
    icon: BusinessIcon,
    iconBg: 'bg-zinc-500/10 text-zinc-400'
  },
  {
    title: 'Image Alt Text',
    description: 'Generate descriptive alt text for accessibility.',
    prompt: `Act as an SEO and accessibility expert. Your task is to generate concise and descriptive alt text for an image. The alt text should be under 125 characters. Do not include phrases like "An image of" or "A picture of". Based on the following context, generate the alt text: [Describe the image here, e.g., "A golden retriever puppy playing in a field of yellow flowers during a sunny day."]`,
    icon: AltTextIcon,
    iconBg: 'bg-rose-500/10 text-rose-400'
  },
];

interface PromptTemplatesProps {
  onSelect: (prompt: string) => void;
}

export const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 bg-bg-secondary/50 border border-border-primary rounded-xl overflow-hidden transition-all duration-300">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg"
            aria-expanded={isOpen}
            aria-controls="example-prompts-content"
        >
            <div>
                <h2 className="text-lg font-semibold text-text-primary">Need inspiration?</h2>
                <p className="text-sm text-text-secondary">See example prompts for different use cases.</p>
            </div>
            <ChevronIcon className={`w-6 h-6 text-text-secondary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div 
            id="example-prompts-content"
            className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {examples.map((example) => (
                        <button
                            key={example.title}
                            onClick={() => onSelect(example.prompt)}
                            className="group bg-bg-secondary border border-border-secondary rounded-xl p-6 text-left hover:bg-bg-tertiary hover:border-border-focus/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${example.iconBg}`}>
                                <example.icon className="w-6 h-6" />
                            </div>
                            <h3 className="mt-4 text-md font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                                {example.title}
                            </h3>
                            <p className="mt-1 text-sm text-text-secondary">
                                {example.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};