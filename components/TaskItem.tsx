import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newText: string) => void;
}

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
    </svg>
);

const DeleteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleUpdate = () => {
        if (editText.trim()) {
            onUpdate(task.id, editText.trim());
        }
        setIsEditing(false);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-bg-primary/70 p-3 rounded-lg border border-border-primary">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="h-5 w-5 rounded border-border-secondary bg-bg-secondary text-accent-primary focus:ring-accent-primary cursor-pointer"
            />
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-bg-tertiary border border-border-secondary rounded-md px-2 py-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
                />
            ) : (
                <span
                    className={`flex-grow cursor-pointer ${
                        task.completed ? 'line-through text-text-muted' : 'text-text-primary'
                    }`}
                    onClick={() => onToggle(task.id)}
                >
                    {task.text}
                </span>
            )}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-text-muted hover:text-accent-primary p-1 rounded-full transition-colors"
                    aria-label="Edit task"
                >
                    <EditIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-text-muted hover:text-red-400 p-1 rounded-full transition-colors"
                    aria-label="Delete task"
                >
                    <DeleteIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};