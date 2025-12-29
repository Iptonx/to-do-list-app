'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';

// Función para generar IDs únicos compatibles
const generateId = (): string => {
  // Primero intentamos con crypto.randomUUID si está disponible
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback para navegadores que no soportan randomUUID
  return 'todo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
};

export const useTodos = () => {
  // Inicializar estado
  const [isMounted, setIsMounted] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Efecto para montaje
  useEffect(() => {
    setIsMounted(true);
    
    // Cargar desde localStorage usando requestAnimationFrame
    const loadTodos = () => {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('todos');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              requestAnimationFrame(() => {
                setTodos(parsed);
              });
            }
          }
        } catch (error) {
          console.error('Error parsing todos from localStorage:', error);
        }
      }
    };
    
    const timer = setTimeout(loadTodos, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Efecto para guardar en localStorage
  useEffect(() => {
    if (isMounted && todos.length >= 0) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isMounted]);

  const addTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: generateId(), // Usamos la función segura
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  }, [inputValue]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text: newText.trim(), updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);

  return {
    todos,
    inputValue,
    setInputValue,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    getStats,
    isMounted,
  };
};
