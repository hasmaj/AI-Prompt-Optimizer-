import React, { useState, useRef, useEffect } from 'react';
import { GeneratedImageData } from '../types';

interface ImageGalleryProps {
    images: GeneratedImageData[];
    onClear: () => void;
    onClose: () => void;
    onUpdatePrompt: (id: string, newPrompt: string) => void;
}

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const EmptyStateIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
    </svg>
);

interface GalleryItemProps {
    image: GeneratedImageData;
    onUpdatePrompt: (id: string, newPrompt: string) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onUpdatePrompt }) => {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPrompt, setEditedPrompt] = useState(image.prompt);
    const [showSaved, setShowSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleCopy = () => {
        navigator.clipboard.writeText(image.prompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleSave = () => {
        const trimmedPrompt = editedPrompt.trim();
        if (trimmedPrompt && trimmedPrompt !== image.prompt) {
            onUpdatePrompt(image.id, trimmedPrompt);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedPrompt(image.prompt);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
        }
    };
    
    return (
        <div className="relative group aspect-square bg-bg-secondary rounded-lg overflow-hidden shadow-lg border border-border-primary">
            <img src={`data:image/png;base64,${image.imageData}`} alt={image.prompt} className="w-full h-full object-cover" loading="lazy" />
            <div className={`absolute inset-0 bg-black/80 transition-opacity duration-300 flex flex-col p-3 text-white ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {isEditing ? (
                    <>
                        <textarea
                            ref={textareaRef}
                            value={editedPrompt}
                            onChange={(e) => setEditedPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-grow text-xs font-mono bg-zinc-950 border border-zinc-700 rounded-md p-2 w-full resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
                            aria-label="Edit prompt"
                        />
                        <div className="mt-2 flex-shrink-0 flex items-center gap-2">
                            <button
                                onClick={handleSave}
                                className="flex-grow flex items-center justify-center gap-2 text-xs px-2 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-grow flex items-center justify-center gap-2 text-xs px-2 py-1.5 bg-zinc-700 hover:bg-zinc-800 text-white rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="flex-grow text-xs overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 pr-1">{image.prompt}</p>
                        <div className="mt-2 flex-shrink-0 flex items-center gap-2">
                             <button 
                                onClick={() => setIsEditing(true)} 
                                className={`w-1/2 flex items-center justify-center gap-2 text-xs px-2 py-1.5 rounded-md transition-all duration-300 ${
                                    showSaved
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                                disabled={showSaved}
                            >
                                {showSaved ? <CheckIcon className="w-3 h-3"/> : <EditIcon className="w-3 h-3"/>}
                                <span>{showSaved ? 'Saved!' : 'Edit'}</span>
                            </button>
                            <button 
                                onClick={handleCopy} 
                                className="w-1/2 flex items-center justify-center gap-2 text-xs px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                            >
                                {copied ? <CheckIcon className="w-3 h-3 text-green-400"/> : <CopyIcon className="w-3 h-3"/>}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClear, onClose, onUpdatePrompt }) => {

    const handleClear = () => {
        if (window.confirm('Are you sure you want to delete all images in the gallery? This action cannot be undone.')) {
            onClear();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
        >
            <div className="bg-bg-primary border border-border-primary rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-border-primary">
                    <h2 id="gallery-title" className="text-xl font-bold text-text-primary">Image Gallery</h2>
                    <div className="flex items-center gap-4">
                        {images.length > 0 && (
                            <button 
                                onClick={handleClear} 
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-800/50 hover:bg-red-800/80 text-red-300 rounded-md transition-colors text-sm"
                                aria-label="Clear all images from gallery"
                            >
                                <TrashIcon className="w-4 h-4" />
                                <span>Clear All</span>
                            </button>
                        )}
                        <button 
                            onClick={onClose} 
                            className="p-2 rounded-full text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
                            aria-label="Close gallery"
                        >
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {images.map(image => <GalleryItem key={image.id} image={image} onUpdatePrompt={onUpdatePrompt} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-text-muted text-center">
                            <EmptyStateIcon className="w-16 h-16 mb-4" />
                            <h3 className="text-lg font-semibold text-text-secondary">Your Gallery is Empty</h3>
                            <p className="mt-1 max-w-sm">Images you generate from the 'Optimized Prompt' or the 'Image Generator' will appear here automatically.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};