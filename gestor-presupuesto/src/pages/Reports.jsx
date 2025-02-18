import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { month: "Ene", gasto: 300, ingreso: 1000 },
      { month: "Feb", gasto: 400, ingreso: 1200 },
      { month: "Mar", gasto: 350, ingreso: 1100 },
      { month: "Abr", gasto: 500, ingreso: 1400 },
      { month: "May", gasto: 450, ingreso: 1300 },
    ]);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold flex items-center">
        <span role="img" aria-label="chart" className="mr-2">📊</span>
        Reportes Financieros
      </h2>
      <p className="text-gray-600">Visualiza tus ingresos y gastos en el tiempo.</p>

      <div className="mt-5 bg-white p-5 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold">Tendencia de Ingresos y Gastos</h3>
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
    </div>
  );
};

export default Reports;
