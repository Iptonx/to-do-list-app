'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { FilterType } from '@/types/todo';
import { cn } from '@/lib/utils';

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

  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <>
      <div className="space-y-5 pt-6 border-t border-border/40">
        {/* Barra de progreso */}
        {stats.total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-semibold">
              <span>Progreso de tareas</span>
              <span>{completionPercentage}% completado</span>
            </div>
            <div className="w-full bg-muted/40 rounded-full h-1.5 overflow-hidden border border-border/10">
              <div 
                className="bg-foreground h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground font-medium order-2 sm:order-1">
            {stats.active} {stats.active === 1 ? 'tarea pendiente' : 'tareas pendientes'}
          </div>
          
          <div className="flex items-center bg-muted/30 dark:bg-muted/10 p-1 rounded-xl border border-border/40 order-1 sm:order-2 w-full sm:w-auto justify-center">
            {filters.map((filter) => {
              const isActive = currentFilter === filter.id;
              return (
                <Button
                  key={filter.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onFilterChange(filter.id)}
                  className={cn(
                    "h-8 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer flex-1 sm:flex-initial",
                    isActive 
                      ? "bg-background text-foreground shadow-sm hover:bg-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                  )}
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>
          
          {stats.completed > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              className="h-8 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer order-3 transition-colors"
            >
              Limpiar completadas
            </Button>
          ) : (
            <div className="w-[120px] hidden sm:block order-3" /> // Espaciador visual
          )}
        </div>
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