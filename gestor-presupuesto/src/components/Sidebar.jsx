import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6">
      <h1 className="text-xl font-bold mb-6">Menú</h1>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? "text-blue-400 font-bold" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/presupuestos"
          className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? "text-blue-400 font-bold" : ""}`
          }
        >
          Presupuestos
        </NavLink>
        <NavLink
          to="/reportes"
          className={({ isActive }) =>
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
