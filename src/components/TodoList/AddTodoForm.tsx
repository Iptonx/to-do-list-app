'use client';

import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddTodoFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddTodoForm({ inputValue, onInputChange, onSubmit }: AddTodoFormProps) {
  return (
    <form onSubmit={onSubmit} className="relative flex items-center w-full">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Añade una nueva tarea..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="h-13 w-full pl-4 pr-12 bg-white hover:bg-neutral-50/50 dark:bg-muted/10 dark:hover:bg-muted/20 border border-neutral-300 dark:border-border/50 rounded-xl focus-visible:ring-2 focus-visible:ring-foreground/15 focus-visible:border-foreground transition-all duration-300 placeholder:text-muted-foreground/40 text-base"
          autoFocus
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9.5 w-9.5 rounded-lg bg-foreground hover:bg-foreground/90 hover:scale-105 active:scale-95 text-background shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Agregar tarea"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}