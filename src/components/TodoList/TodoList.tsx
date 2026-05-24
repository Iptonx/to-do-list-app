import { TodoItem } from './TodoItem';
import { FilterType, Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    const getEmptyMessage = () => {
      switch (filter) {
        case 'completed':
          return {
            title: "No hay tareas completadas.",
            subtitle: "Completa una tarea para verla aquí."
          };
        case 'active':
          return {
            title: "No hay tareas activas.",
            subtitle: "¡Buen trabajo! Todo está al día."
          };
        default:
          return {
            title: "No hay tareas creadas.",
            subtitle: "Agrega una tarea para comenzar."
          };
      }
    };

    const message = getEmptyMessage();

    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground font-light italic text-lg">
          {message.title}
        </p>
        <p className="text-sm text-muted-foreground/60">
          {message.subtitle}
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