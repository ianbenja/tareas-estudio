import { useState, useEffect } from "react";
import { type Task, type StudySession } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      pomodoros: 0,
      sessions: [],
      totalTime: 0,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const logPomodoro = (taskId: number, duration: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newSession: StudySession = {
            date: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
            duration: duration,
          };
          return {
            ...task,
            pomodoros: task.pomodoros + 1,
            sessions: [...task.sessions, newSession],
            totalTime: task.totalTime + duration,
          };
        }
        return task;
      })
    );
  };

  return { tasks, addTask, toggleTask, deleteTask, logPomodoro };
};
