import React, { useState, useEffect, useRef } from "react";
import { type Task } from "../types";

interface TimerProps {
  workTime: number;
  breakTime: number;
  onTimerComplete: () => void;
  onBreakComplete: () => void;
  currentTask: Task | null; // Prop para recibir la tarea actual
}

const Timer: React.FC<TimerProps> = ({
  workTime,
  breakTime,
  onTimerComplete,
  onBreakComplete,
  currentTask,
}) => {
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Efecto para actualizar el tiempo si cambia la configuración
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
    }
  }, [workTime, breakTime, isWorkSession, isActive]);

  // Efecto principal del temporizador
  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      playNotificationSound();
      setIsFinishing(true);
      if (isWorkSession) {
        onTimerComplete();
        setIsWorkSession(false);
        setTimeLeft(breakTime * 60);
      } else {
        onBreakComplete();
        setIsWorkSession(true);
        setTimeLeft(workTime * 60);
      }
      setTimeout(() => setIsFinishing(false), 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isActive,
    timeLeft,
    isWorkSession,
    breakTime,
    workTime,
    onTimerComplete,
    onBreakComplete,
  ]);

  // Función para reproducir el sonido de notificación
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Error al reproducir sonido:", e));
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setTimeLeft(workTime * 60);
    setIsFinishing(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const timerContainerClasses = `bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 text-center transition-all duration-300 ${
    isFinishing ? "animate-pulse ring-4 ring-green-400" : "ring-0"
  }`;

  return (
    <div className={timerContainerClasses}>
      {/* Contenedor para mostrar la tarea actual */}
      <div className="h-6 mb-2 text-center">
        {currentTask ? (
          <p
            className="text-sm text-gray-500 dark:text-gray-400 truncate"
            title={currentTask.text}
          >
            Enfocado en: <span className="font-bold">{currentTask.text}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Selecciona una tarea para enfocar
          </p>
        )}
      </div>

      <div
        className={`text-6xl font-bold mb-4 ${
          isWorkSession ? "text-blue-500" : "text-green-500"
        }`}
      >
        {formatTime(timeLeft)}
      </div>
      <h3 className="text-xl text-gray-500 dark:text-gray-400 mb-6">
        {isWorkSession ? "Sesión de Trabajo" : "Descanso"}
      </h3>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          {isActive ? "Pausa" : "Iniciar"}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
        >
          Reiniciar
        </button>
      </div>
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />
    </div>
  );
};

export default Timer;
