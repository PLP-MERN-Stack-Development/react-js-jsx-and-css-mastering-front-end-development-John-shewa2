import { useState, useEffect } from 'react';

export default function useLocalStorageTasks(key = 'tasks') {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch {}
  }, [key, tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now().toString(), text, completed: false, createdAt: Date.now() };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask, setTasks };
}