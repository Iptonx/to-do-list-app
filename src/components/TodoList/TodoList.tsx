'use client';

import { TodoItem } from './TodoItem';
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground font-light italic text-lg">
          No hay tareas pendientes.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Agrega una tarea para comenzar
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}