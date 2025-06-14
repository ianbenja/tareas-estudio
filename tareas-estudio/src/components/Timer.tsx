import React, { useState, useEffect, useRef } from "react";

// Define la interfaz para las props que el componente Timer recibirá.
interface TimerProps {
  workTime: number; // Duración de la sesión de trabajo en minutos.
  breakTime: number; // Duración del descanso en minutos.
  onTimerComplete: () => void; // Función que se ejecuta cuando termina una sesión de trabajo.
  onBreakComplete: () => void; // Función que se ejecuta cuando termina un descanso.
}

const Timer: React.FC<TimerProps> = ({
  workTime,
  breakTime,
  onTimerComplete,
  onBreakComplete,
}) => {
  // Estado para saber si estamos en una sesión de trabajo (true) o descanso (false).
  const [isWorkSession, setIsWorkSession] = useState(true);
  // Estado para el tiempo restante en segundos. Se inicializa con el tiempo de trabajo.
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  // Estado para saber si el temporizador está activo (corriendo) o pausado.
  const [isActive, setIsActive] = useState(false);

  // Referencia al elemento de audio para poder controlarlo (ej. play()).
  const audioRef = useRef<HTMLAudioElement>(null);

  // Este useEffect se ejecuta cuando cambian los tiempos de trabajo/descanso
  // o el tipo de sesión, pero solo si el temporizador está pausado.
  // Asegura que el tiempo mostrado se actualice si el usuario cambia la configuración.
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
    }
  }, [workTime, breakTime, isWorkSession, isActive]);

  // El useEffect principal que maneja la lógica del intervalo del temporizador.
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Si el temporizador está activo y queda tiempo, crea un intervalo que resta 1 segundo.
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Si el tiempo llega a 0...
      audioRef.current?.play(); // ...reproduce el sonido de notificación.

      // Cambia de sesión de trabajo a descanso o viceversa.
      if (isWorkSession) {
        onTimerComplete(); // Llama a la función del padre.
        setIsWorkSession(false); // Cambia a modo descanso.
        setTimeLeft(breakTime * 60); // Establece el tiempo de descanso.
      } else {
        onBreakComplete(); // Llama a la función del padre.
        setIsWorkSession(true); // Vuelve a modo trabajo.
        setTimeLeft(workTime * 60); // Establece el tiempo de trabajo.
      }
      setIsActive(false); // Pausa el temporizador automáticamente.
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta o las dependencias cambian.
    // Es crucial para evitar fugas de memoria y bugs.
    return () => {
      if (interval) {
        clearInterval(interval);
      }
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

  // Inicia o pausa el temporizador.
  const toggleTimer = () => setIsActive(!isActive);

  // Reinicia el temporizador a su estado inicial (sesión de trabajo).
  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setTimeLeft(workTime * 60);
  };

  // Formatea los segundos a un string MM:SS.
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 text-center">
      {/* Muestra el tiempo restante. El color cambia según la sesión. */}
      <div
        className={`text-6xl font-bold mb-4 ${
          isWorkSession ? "text-blue-500" : "text-green-500"
        }`}
      >
        {formatTime(timeLeft)}
      </div>
      {/* Muestra el tipo de sesión actual. */}
      <h3 className="text-xl text-gray-500 dark:text-gray-400 mb-6">
        {isWorkSession ? "Sesión de Trabajo" : "Descanso"}
      </h3>
      {/* Controles del temporizador. */}
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
      {/* Elemento de audio oculto para las notificaciones. */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/button-16.mp3"
        preload="auto"
      />
    </div>
  );
};

export default Timer;
