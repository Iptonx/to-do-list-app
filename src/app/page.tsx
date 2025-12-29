"use client";

import { useState, useMemo } from "react";
import { TodoList, AddTodoForm, TodoStats } from "@/components/TodoList";
import { useTodos } from "@/lib/hooks/useTodos";
import { FilterType } from "@/types/todo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TodoPage() {
  const {
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
  } = useTodos();

  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  // Filtrar todos según el filtro activo - SIEMPRE se calcula
  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const stats = getStats();

  // Renderizado condicional DESPUÉS de todos los hooks
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-20 px-4">
        <div className="w-full max-w-2xl space-y-12">
          {/* Skeleton del header */}
          <header className="space-y-3 text-center">
            <div className="h-12 bg-muted rounded-lg animate-pulse mx-auto w-48"></div>
            <div className="h-6 bg-muted rounded-lg animate-pulse mx-auto w-64"></div>
          </header>

          {/* Skeleton del formulario */}
          <div className="h-14 bg-muted rounded-lg animate-pulse"></div>

          {/* Skeleton de las tareas */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-muted rounded-lg animate-pulse"
              ></div>
            ))}
          </div>

          {/* Skeleton del footer */}
          <div className="h-8 bg-muted rounded-lg animate-pulse w-48 mx-auto"></div>
        </div>
      </main>
    );
  }

  // Renderizado normal cuando está montado
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-20 px-4">
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-2xl space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-pretty">
            Tareas
          </h1>
          <p className="text-muted-foreground font-normal text-lg">
            Simplicidad en cada paso. Organiza tu día.
          </p>
        </header>

        <div className="space-y-8">
          <AddTodoForm
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={addTodo}
          />

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {todos.length > 0 && (
            <TodoStats
              stats={stats}
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-muted">
          <p>
            {stats.total} {stats.total === 1 ? "tarea total" : "tareas totales"}{" "}
            • {stats.completed}{" "}
            {stats.completed === 1 ? "completada" : "completadas"}
          </p>
          <p className="mt-2 text-xs opacity-60">
            Desarrollado por <a href="https://github.com/Iptonx">Ipton</a> - {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
