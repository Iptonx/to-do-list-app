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
    onDelete(todo.id);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between group animate-in fade-in duration-200">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-5 h-5" />
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="flex-1 px-0 border-0 border-b border-muted focus-visible:ring-0 focus-visible:border-foreground text-lg rounded-none"
            autoFocus
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-8 w-8 hover:bg-transparent hover:text-green-600"
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditText(todo.text);
              setIsEditing(false);
            }}
            className="h-8 w-8 hover:bg-transparent hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <li 
        className="flex items-center justify-between group animate-in fade-in slide-in-from-bottom-2 duration-300"
        onTouchStart={() => setShowActions(true)}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div 
          className="flex items-center gap-4 cursor-pointer flex-1" 
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
          )}
          <span
            className={cn(
              "text-lg font-light transition-all duration-300 text-pretty flex-1",
              todo.completed ? "text-muted-foreground line-through" : "text-foreground"
            )}
          >
            {todo.text}
          </span>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 transition-opacity duration-200",
          showActions ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="h-8 w-8 hover:bg-transparent hover:text-blue-600"
            aria-label="Editar tarea"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="h-8 w-8 hover:bg-transparent hover:text-destructive"
            aria-label="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4" />
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