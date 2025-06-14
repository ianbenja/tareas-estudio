import React from "react";

// Define la interfaz para las props del componente.
// Recibe los valores actuales del tiempo de trabajo y descanso,
// y las funciones para manejar sus cambios.
interface SettingsProps {
  workTime: number;
  breakTime: number;
  onWorkTimeChange: (time: number) => void;
  onBreakTimeChange: (time: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
  workTime,
  breakTime,
  onWorkTimeChange,
  onBreakTimeChange,
}) => {
  return (
    // Contenedor principal con estilos de Tailwind para el fondo, bordes redondeados y sombra.
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4 text-center">Configuración</h3>

      {/* Sección para el tiempo de trabajo */}
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="work-time" className="text-gray-600 dark:text-gray-300">
          Tiempo de Trabajo (min)
        </label>
        <input
          id="work-time"
          type="number"
          min="1" // El valor mínimo es 1 minuto.
          value={workTime}
          onChange={(e) => onWorkTimeChange(Number(e.target.value))}
          // Estilos de Tailwind para el campo de entrada.
          className="w-20 p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-center"
        />
      </div>

      {/* Sección para el tiempo de descanso */}
      <div className="flex justify-between items-center">
        <label
          htmlFor="break-time"
          className="text-gray-600 dark:text-gray-300"
        >
          Tiempo de Descanso (min)
        </label>
        <input
          id="break-time"
          type="number"
          min="1" // El valor mínimo es 1 minuto.
          value={breakTime}
          onChange={(e) => onBreakTimeChange(Number(e.target.value))}
          // Estilos de Tailwind para el campo de entrada.
          className="w-20 p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-center"
        />
      </div>
    </div>
  );
};

export default Settings;
