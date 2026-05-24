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
      <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-12 sm:py-20 px-4 overflow-hidden">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 -z-10 bg-background overflow-hidden pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        <div className="w-full max-w-2xl space-y-8 z-10">
          {/* Skeleton del header */}
          <header className="space-y-4 text-center">
            <div className="h-6 bg-muted rounded-full animate-pulse mx-auto w-32"></div>
            <div className="h-12 bg-muted rounded-xl animate-pulse mx-auto w-48"></div>
            <div className="h-6 bg-muted rounded-lg animate-pulse mx-auto w-64"></div>
          </header>

          {/* Skeleton del contenedor */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6 sm:space-y-8">
            <div className="h-13 bg-muted rounded-xl animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-muted rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Skeleton del footer */}
          <div className="h-8 bg-muted rounded-lg animate-pulse w-48 mx-auto"></div>
        </div>
      </main>
    );
  }

  // Renderizado normal cuando está montado
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-12 sm:py-20 px-4 overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 -z-10 bg-background overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className="bg-card border border-border/50 p-1 rounded-xl shadow-sm">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-8 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="space-y-3.5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 select-none">
            <span>To-do</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground pb-0.5">
            Tareas
          </h1>
          <p className="text-muted-foreground font-normal text-base sm:text-lg max-w-md mx-auto">
            Simplicidad en cada paso. Organiza tu día a día con tranquilidad.
          </p>
        </header>

        {/* Contenedor principal de la app (Glassmorphic Card) */}
        <div className="bg-card border border-border/70 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6 sm:space-y-8">
          <AddTodoForm
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={addTodo}
          />

          <TodoList
            todos={filteredTodos}
            filter={currentFilter}
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

        <footer className="text-center text-xs sm:text-sm text-muted-foreground pt-4 border-t border-border/20">
          <p className="font-medium">
            {stats.total} {stats.total === 1 ? "tarea total" : "tareas totales"}{" "}
            • {stats.completed}{" "}
            {stats.completed === 1 ? "completada" : "completadas"}
          </p>
          <p className="mt-2 text-[10px] sm:text-xs opacity-60">
            Desarrollado por{" "}
            <a
              href="https://github.com/Iptonx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Ipton
            </a>{" "}
            - {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
