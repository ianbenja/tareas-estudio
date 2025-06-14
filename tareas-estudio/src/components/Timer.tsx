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
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  // Ref para el elemento de audio HTML.
  const audioRef = useRef<HTMLAudioElement>(null);

  // Actualiza el tiempo si la configuración cambia mientras el timer está pausado.
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
    }
  }, [workTime, breakTime, isWorkSession, isActive]);

  // useEffect principal que maneja la lógica del temporizador.
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playNotificationSound(); // Llama a nuestra función de reproducción.
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

  // Función para reproducir el sonido desde el elemento de audio.
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio al principio.
      audioRef.current.play().catch((error) => {
        // Este catch es importante para manejar errores si el navegador aún bloquea el audio.
        console.error("Error al reproducir el sonido:", error);
      });
    }
  };

  // Inicia o pausa el temporizador. La primera interacción del usuario es clave.
  const toggleTimer = () => {
    // La primera vez que el usuario hace clic en "Iniciar",
    // el navegador considera que ha habido una "interacción".
    // Esto es fundamental para que las llamadas posteriores a .play() funcionen.
    if (audioRef.current && audioRef.current.paused) {
      // No es necesario reproducir y pausar, la primera interacción es suficiente
      // para habilitar futuras reproducciones automáticas.
    }
    setIsActive(!isActive);
  };

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
      {/* Volvemos a añadir el elemento <audio> y lo enlazamos con la ref. */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/button-16.mp3"
        preload="auto"
      />
    </div>
  );
};

export default Timer;
