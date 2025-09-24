import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-4.95-4.95l-1.591 1.591M5.25 12H3m4.95-4.95l-1.591-1.591M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
);

const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const GrayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043.025a15.998 15.998 0 01-3.388-1.621m7.702 7.702a15.998 15.998 0 003.388 1.622m-5.043-.025a15.998 15.998 0 01-1.622 3.385m-5.043-.025a15.998 15.998 0 00-1.622 3.385m-3.388-1.622a15.998 15.998 0 001.622 3.385" />
    </svg>
);


const themes: { name: Theme, icon: React.FC<{className?: string}> }[] = [
    { name: 'light', icon: SunIcon },
    { name: 'dark', icon: MoonIcon },
    { name: 'gray', icon: GrayIcon },
];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="absolute top-4 right-4 z-50">
            <div className="flex items-center p-1 bg-bg-secondary border border-border-primary rounded-full shadow-md">
                {themes.map(({ name, icon: Icon }) => (
                    <button
                        key={name}
                        onClick={() => onThemeChange(name)}
                        className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus ${
                            currentTheme === name ? 'bg-accent-primary text-text-inverted' : 'text-text-secondary hover:text-text-primary'
                        }`}
                        aria-label={`Switch to ${name} theme`}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                ))}
            </div>
        </div>
    );
};
