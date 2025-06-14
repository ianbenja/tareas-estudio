import React from "react";
import { type Task } from "../types";

interface TaskItemProps {
  task: Task;
  isCurrent: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSetCurrent: (id: number) => void;
  onViewDetails: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isCurrent,
  onToggle,
  onDelete,
  onSetCurrent,
  onViewDetails,
}) => {
  // Clases condicionales para resaltar la tarea actual
  const itemClasses = `
    flex items-center justify-between p-3 transition duration-200 group
    ${
      isCurrent
        ? "bg-blue-100 dark:bg-blue-900/50"
        : "hover:bg-gray-50 dark:hover:bg-gray-700"
    }
  `;

  return (
    <li className={itemClasses}>
      <div className="flex items-center flex-grow">
        {/* Checkbox para marcar la tarea como completada */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
        />
        {/* Texto de la tarea */}
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {/* Botón para ver detalles y estadísticas */}
        <button
          onClick={() => onViewDetails(task)}
          className="p-1 text-gray-400 hover:text-blue-500"
          aria-label="Ver detalles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Botón para eliminar la tarea */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-gray-400 hover:text-red-500"
          aria-label="Eliminar tarea"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* NUEVO: Botón para enfocar esta tarea en el Pomodoro */}
        <button
          onClick={() => onSetCurrent(task.id)}
          className={`p-1 rounded-full transition-colors duration-200 ${
            isCurrent
              ? "text-blue-500 bg-blue-100 dark:bg-blue-900"
              : "text-gray-400 hover:text-green-500"
          }`}
          aria-label="Enfocar tarea"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
