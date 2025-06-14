import React from "react";
import { type Task } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskDetailsModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  onClose,
}) => {
  if (!task) return null;

  // Agrupa las sesiones por fecha para el gráfico
  const data = task.sessions.reduce((acc, session) => {
    const date = new Date(session.date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
    });
    const existing = acc.find((item) => item.name === date);
    if (existing) {
      existing.minutos += session.duration;
    } else {
      acc.push({ name: date, minutos: session.duration });
    }
    return acc;
  }, [] as { name: string; minutos: number }[]);

  const formatTotalTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{task.text}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tiempo Total
            </p>
            <p className="text-2xl font-bold">
              {formatTotalTime(task.totalTime)}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pomodoros
            </p>
            <p className="text-2xl font-bold">{task.pomodoros}</p>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2">Actividad de Estudio</h3>
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutos" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
