'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showActions, setShowActions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 280);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-foreground/30 bg-white dark:bg-card shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-5.5 h-5.5 rounded-full border border-foreground/30 shrink-0 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          </div>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="flex-1 h-9 px-2 bg-transparent border-0 border-b border-neutral-300 dark:border-border/60 focus-visible:ring-0 focus-visible:border-foreground text-base rounded-none py-1 focus:outline-none"
            autoFocus
          />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            onMouseDown={(e) => e.preventDefault()}
            className="h-8.5 w-8.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors group/btn"
            aria-label="Guardar cambios"
          >
            <Check className="w-4.5 h-4.5 group-hover/btn:scale-115 transition-transform duration-200" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditText(todo.text);
              setIsEditing(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
            className="h-8.5 w-8.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors group/btn"
            aria-label="Cancelar edición"
          >
            <X className="w-4.5 h-4.5 group-hover/btn:scale-115 group-hover/btn:rotate-90 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <li 
        className={cn(
          "flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300 ease-out group",
          "hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99]",
          isExiting 
            ? "animate-out fade-out slide-out-to-top-2 duration-280 fill-mode-forwards"
            : "animate-in fade-in slide-in-from-top-4 duration-300 ease-out",
          todo.completed 
            ? "bg-muted/10 border-border/30 dark:bg-muted/5 opacity-75" 
            : "bg-white hover:bg-neutral-50/50 dark:bg-card hover:border-foreground/20 border-border/50 shadow-sm hover:shadow-md dark:hover:bg-muted/10"
        )}
        onTouchStart={() => setShowActions(true)}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div 
          className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0" 
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <span className="relative flex items-center justify-center w-5.5 h-5.5 rounded-full border border-foreground bg-foreground text-background shrink-0 shadow-sm transition-all duration-300 animate-in zoom-in-75">
              <Check className="w-3.5 h-3.5 stroke-3" />
            </span>
          ) : (
            <span className="w-5.5 h-5.5 rounded-full border border-muted-foreground/30 group-hover:border-foreground shrink-0 transition-all duration-300 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground opacity-0 group-hover:opacity-30 transition-all duration-300" />
            </span>
          )}
          <span
            className={cn(
              "text-base font-medium transition-all duration-300 text-pretty flex-1 wrap-break-word select-none",
              todo.completed ? "text-muted-foreground/50 line-through decoration-1" : "text-foreground"
            )}
          >
            {todo.text}
          </span>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 shrink-0 transition-all duration-200",
          showActions ? "opacity-100 transform translate-x-0" : "opacity-90 sm:opacity-0 sm:translate-x-1"
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="h-8.5 w-8.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all cursor-pointer group/btn"
            aria-label="Editar tarea"
          >
            <Edit2 className="w-4 h-4 group-hover/btn:scale-115 group-hover/btn:rotate-6 transition-transform duration-200" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="h-8.5 w-8.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive focus-visible:ring-1 focus-visible:ring-destructive/30 transition-all cursor-pointer group/btn"
            aria-label="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4 group-hover/btn:scale-115 group-hover/btn:-rotate-6 transition-transform duration-200" />
          </Button>
        </div>
      </li>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        variant="delete"
      />
    </>
  );
}