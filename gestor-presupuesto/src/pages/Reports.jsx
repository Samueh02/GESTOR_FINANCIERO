import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const updateChartData = () => {
      const budgets = JSON.parse(localStorage.getItem("budgets")) || [];

      // Agrupar por mes y calcular total de gastos e ingresos
      const monthlyData = budgets.reduce((acc, budget) => {
        const date = new Date(budget.id);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Formato "2024-2"

        if (!acc[monthKey]) {
          acc[monthKey] = {
            month: new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date),
            gasto: 0,
            ingreso: 0,
          };
        }

        // Clasificar correctamente según el tipo de presupuesto
        if (budget.type === "Gasto") {
          acc[monthKey].gasto += budget.amount;
        } else {
          acc[monthKey].ingreso += budget.amount;
        }

        return acc;
      }, {});

      // Convertir en array y ordenar correctamente por fecha
      const formattedData = Object.keys(monthlyData)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((key) => monthlyData[key]);

      setData(formattedData);
    };

    updateChartData();
    window.addEventListener("storage", updateChartData);

    return () => {
      window.removeEventListener("storage", updateChartData);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-lg font-bold">📊 Reportes Financieros</header>
      <main className="p-5 flex-1">
        <p className="text-gray-600 mb-4">Visualiza tus ingresos y gastos en el tiempo.</p>

        {/* Gráfico Dinámico */}
        <div className="bg-white p-5 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Tendencia de Ingresos y Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="gasto" stroke="#ff4444" strokeWidth={2} />
              <Line type="monotone" dataKey="ingreso" stroke="#44ff44" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Reports;
