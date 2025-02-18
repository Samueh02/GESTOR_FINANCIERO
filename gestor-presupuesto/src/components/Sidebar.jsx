import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Íconos de hamburguesa

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
      style={{ zIndex: 50 }} // Para que el menú esté sobre el contenido
    >
      {/* Botón de cierre solo en móviles */}
      <button
        className="absolute top-4 right-4 md:hidden bg-white text-gray-900 p-2 rounded-full"
        onClick={toggleSidebar}
      >
        <FiX size={20} />
      </button>

      <h1 className="text-xl font-bold mb-6">Menú</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? "text-blue-400 font-bold" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink to="/presupuestos" className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? "text-blue-400 font-bold" : ""}`
          }
        >
          Presupuestos
        </NavLink>
        <NavLink to="/reportes" className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? "text-blue-400 font-bold" : ""}`
          }
        >
          Reportes
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
