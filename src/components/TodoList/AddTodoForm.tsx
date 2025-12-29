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
    <form onSubmit={onSubmit} className="relative group">
      <Input
        type="text"
        placeholder="Nueva tarea..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        className="h-14 px-4 bg-transparent border-0 border-b border-muted focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/50 text-lg rounded-none"
        autoFocus
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-focus-within:opacity-100 hover:opacity-100 transition-opacity"
        aria-label="Agregar tarea"
      >
        <Plus className="w-5 h-5" />
      </Button>
    </form>
  );
}