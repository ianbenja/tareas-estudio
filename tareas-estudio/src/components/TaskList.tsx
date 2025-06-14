import React from "react";
import TaskItem from "./TaskItem";
import { type Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  currentTaskId: number | null;
  onSetCurrentTask: (id: number) => void;
  onViewDetails: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  currentTaskId,
  onSetCurrentTask,
  onViewDetails,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              // Comprueba si esta tarea es la que está seleccionada actualmente.
              isCurrent={task.id === currentTaskId}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              // Pasa la función para establecer esta tarea como la actual.
              onSetCurrent={onSetCurrentTask}
              onViewDetails={onViewDetails}
            />
          ))}
        </ul>
      ) : (
        <p className="p-4 text-center text-gray-500">
          Aún no hay tareas. ¡Añade una!
        </p>
      )}
    </div>
  );
};

export default TaskList;
