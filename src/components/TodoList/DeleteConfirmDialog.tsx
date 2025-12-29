'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'delete' | 'clear';
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  variant = 'delete',
}: DeleteConfirmDialogProps) {
  const getDefaultTitle = () => {
    switch (variant) {
      case 'clear':
        return 'Eliminar tareas completadas';
      case 'delete':
      default:
        return 'Eliminar tarea';
    }
  };

  const getDefaultDescription = () => {
    switch (variant) {
      case 'clear':
        return '¿Estás seguro de que quieres eliminar todas las tareas completadas?';
      case 'delete':
      default:
        return '¿Estás seguro de que quieres eliminar esta tarea?';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold">
                {title || getDefaultTitle()}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                {description || getDefaultDescription()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto text-base"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto text-base"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}