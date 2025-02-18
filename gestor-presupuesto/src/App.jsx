import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import { FiMenu } from "react-icons/fi";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="flex h-screen relative">
        {/* Botón de menú en pantallas pequeñas */}
        <button
          className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Contenido Principal */}
        <div
          className={`flex-1 flex flex-col bg-gray-100 transition-all duration-300 ${
            isOpen ? "ml-0 md:ml-64" : "ml-0"
          }`}
        >
          <Navbar />
          <main className="p-5 flex-1 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/presupuestos" element={<Budgets />} />
              <Route path="/reportes" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
