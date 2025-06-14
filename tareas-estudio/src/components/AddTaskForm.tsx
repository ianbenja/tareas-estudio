import React, { useState } from "react";

// Define la interfaz para las props del componente.
// Espera una función onAddTask que recibe un string y no devuelve nada.
interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  // Estado para almacenar el valor del campo de texto.
  const [text, setText] = useState("");

  // Maneja el envío del formulario.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue.

    // Si el texto no está vacío (después de quitar espacios en blanco),
    // llama a la función onAddTask.
    if (text.trim()) {
      onAddTask(text);
      setText(""); // Limpia el campo de texto después de añadir la tarea.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Añadir una nueva tarea..."
        // Clases de Tailwind CSS para el estilo del input.
        className="flex-grow p-3 border-2 border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
      />
      <button
        type="submit"
        // Clases de Tailwind CSS para el estilo del botón.
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
      >
        Añadir
      </button>
    </form>
  );
};

export default AddTaskForm;
