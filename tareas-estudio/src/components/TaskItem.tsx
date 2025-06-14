import React from "react";
import { type Task } from "../types"; // Importa la definición del tipo Task.

// Define la interfaz para las props del componente.
// Recibe el objeto 'task' y las funciones para alternar su estado y eliminarla.
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    // Elemento de lista con estilos de Tailwind.
    <li className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
      {/* El texto de la tarea. Es clickable para cambiar el estado de completado. */}
      <span
        onClick={() => onToggle(task.id)}
        // Clases condicionales: si la tarea está completa, se le aplica 'line-through' (tachado).
        className={`flex-grow cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>

      {/* Botón para eliminar la tarea. */}
      <button
        onClick={() => onDelete(task.id)}
        // Estilos de Tailwind para el botón de eliminar.
        className="ml-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200"
      >
        X
      </button>
    </li>
  );
};

export default TaskItem;
