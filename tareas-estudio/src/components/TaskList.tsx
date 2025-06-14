import React from "react";
import TaskItem from "./TaskItem"; // Importa el componente para cada tarea individual.
import { Task } from "../types"; // Importa la definición del tipo Task.

// Define la interfaz para las props del componente.
interface TaskListProps {
  tasks: Task[]; // Un array de objetos Task.
  onToggleTask: (id: number) => void; // Función para marcar una tarea como completa/incompleta.
  onDeleteTask: (id: number) => void; // Función para eliminar una tarea.
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  return (
    // Contenedor principal para la lista de tareas con estilos de Tailwind.
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Renderizado condicional: comprueba si hay tareas en la lista. */}
      {tasks.length > 0 ? (
        // Si hay tareas, se renderiza una lista desordenada.
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Mapea cada tarea a un componente TaskItem. */}
          {tasks.map((task) => (
            <TaskItem
              key={task.id} // La key es crucial para que React identifique cada elemento.
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </ul>
      ) : (
        // Si no hay tareas, se muestra un mensaje.
        <p className="p-4 text-center text-gray-500">
          Aún no hay tareas. ¡Añade una!
        </p>
      )}
    </div>
  );
};

export default TaskList;
