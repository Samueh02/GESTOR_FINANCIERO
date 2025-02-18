import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Íconos de menú

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú en móviles */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 bg-gray-900 text-white h-screen w-64 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6 p-4">Menú</h1>
        <nav className="flex flex-col gap-4 p-4">
          <NavLink to="/" className="hover:text-blue-400">Dashboard</NavLink>
          <NavLink to="/presupuestos" className="hover:text-blue-400">Presupuestos</NavLink>
          <NavLink to="/reportes" className="hover:text-blue-400">Reportes</NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
