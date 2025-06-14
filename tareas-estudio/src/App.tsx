import { useState } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Settings from "./components/Settings";
import TaskDetailsModal from "./components/TaskDetailsModal";
import { useTasks } from "./hooks/useTasks";
import { type Task } from "./types";

function App() {
  const { tasks, addTask, toggleTask, deleteTask, logPomodoro } = useTasks();
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // Estado para la tarea actual y el modal de detalles
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);

  const handleTimerComplete = () => {
    console.log("Work session finished!");
    // Si hay una tarea seleccionada, registra el pomodoro completado.
    if (currentTaskId) {
      logPomodoro(currentTaskId, workTime);
    }
  };

  const handleBreakComplete = () => {
    console.log("Break is over!");
  };

  // Busca la tarea actual en el array de tareas
  const currentTask = tasks.find((t) => t.id === currentTaskId) || null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          {/* He reincorporado el ícono y el título actualizado aquí */}
          <div className="flex justify-center items-center gap-3 text-4xl font-bold text-gray-800 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-10 h-10"
            >
              <path fill="#D84339" d="M8 22h48v4H8z" />
              <path fill="#F44336" d="M8 8h48v14H8z" />
              <path fill="#3C8E4A" d="M8 40h48v4H8z" />
              <path fill="#4CAF50" d="M8 26h48v14H8z" />
              <path fill="#1E88E5" d="M8 58h48v4H8z" />
              <path fill="#2196F3" d="M8 44h48v14H8z" />
            </svg>
            <h1>Pomodoro & Tareas</h1>
          </div>
        </header>

        <main>
          {/* Pasa la tarea actual al temporizador */}
          <Timer
            workTime={workTime}
            breakTime={breakTime}
            onTimerComplete={handleTimerComplete}
            onBreakComplete={handleBreakComplete}
            currentTask={currentTask}
          />

          <Settings
            workTime={workTime}
            breakTime={breakTime}
            onWorkTimeChange={setWorkTime}
            onBreakTimeChange={setBreakTime}
          />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Mis Tareas
            </h2>
            <AddTaskForm onAddTask={addTask} />
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              currentTaskId={currentTaskId}
              onSetCurrentTask={setCurrentTaskId}
              onViewDetails={setViewingTask}
            />
          </div>
        </main>
      </div>

      {/* Renderiza el modal solo si hay una tarea para ver */}
      {viewingTask && (
        <TaskDetailsModal
          task={viewingTask}
          onClose={() => setViewingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
