'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { FilterType } from '@/types/todo';

interface TodoStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export function TodoStats({ 
  stats, 
  currentFilter, 
  onFilterChange,
  onClearCompleted 
}: TodoStatsProps) {
  const [showClearDialog, setShowClearDialog] = useState(false);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'active', label: 'Activas' },
    { id: 'completed', label: 'Completadas' },
  ];

  const handleClearCompleted = () => {
    onClearCompleted();
    setShowClearDialog(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-muted">
        <div className="text-sm text-muted-foreground">
          {stats.active} {stats.active === 1 ? 'tarea pendiente' : 'tareas pendientes'}
        </div>
        
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={currentFilter === filter.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className="h-8 px-3 text-sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {stats.completed > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowClearDialog(true)}
            className="h-8 text-sm text-muted-foreground hover:text-destructive"
          >
            Limpiar completadas
          </Button>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClearCompleted}
        variant="clear"
        confirmText="Eliminar completadas"
        title={`Eliminar ${stats.completed} tarea${stats.completed === 1 ? '' : 's'} completada${stats.completed === 1 ? '' : 's'}`}
        description={`Se eliminarán ${stats.completed} tarea${stats.completed === 1 ? '' : 's'} marcada${stats.completed === 1 ? '' : 's'} como completada${stats.completed === 1 ? '' : 's'}. Esta acción no se puede deshacer.`}
      />
    </>
  );
}