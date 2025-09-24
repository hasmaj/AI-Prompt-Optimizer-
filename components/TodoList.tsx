import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

const STORAGE_KEY = 'todo-list-tasks';

export const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem(STORAGE_KEY);
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Failed to parse tasks from localStorage", error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            text: newTaskText.trim(),
            completed: false,
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setNewTaskText('');
    };
    
    const handleToggleComplete = (id: string) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleUpdateTask = (id: string, newText: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    return (
        <div className="bg-bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border-primary backdrop-blur-sm">
            <h2 className="text-xl font-bold text-text-primary mb-4">My Tasks</h2>
            <form onSubmit={handleAddTask} className="flex gap-3 mb-4">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={e => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow p-3 bg-bg-input border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-accent-primary text-text-inverted font-semibold rounded-lg shadow-md hover:bg-accent-primary-hover disabled:bg-bg-interactive disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary"
                    disabled={!newTaskText.trim()}
                >
                    Add
                </button>
            </form>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggleComplete}
                            onDelete={handleDeleteTask}
                            onUpdate={handleUpdateTask}
                        />
                    ))
                ) : (
                    <p className="text-center text-text-muted py-4">No tasks yet. Add one above!</p>
                )}
            </div>
        </div>
    );
};