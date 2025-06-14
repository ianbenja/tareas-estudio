import { useState } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Settings from "./components/Settings";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const handleTimerComplete = () => {
    console.log("Work session finished! Time for a break.");
    // You can add more complex notification logic here
  };

  const handleBreakComplete = () => {
    console.log("Break is over! Back to work.");
    // You can add more complex notification logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Pomodoro & Tasks
          </h1>
        </header>

        <main>
          <Timer
            workTime={workTime}
            breakTime={breakTime}
            onTimerComplete={handleTimerComplete}
            onBreakComplete={handleBreakComplete}
          />

          <Settings
            workTime={workTime}
            breakTime={breakTime}
            onWorkTimeChange={setWorkTime}
            onBreakTimeChange={setBreakTime}
          />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              My Tasks
            </h2>
            <AddTaskForm onAddTask={addTask} />
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
