import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen"> {/* 🔹 CAMBIO AQUÍ: min-h-screen */}
        {/* Sidebar fijo en la izquierda */}
        <Sidebar />
        
        {/* Contenedor flexible para permitir crecimiento */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Navbar fijo en la parte superior */}
          <Navbar />
          
          {/* Contenido que puede crecer dinámicamente */}
          <main className="p-5 flex-1"> {/* 🔹 flex-1 asegura que el contenido crezca */}
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
