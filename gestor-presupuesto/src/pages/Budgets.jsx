import { useState, useEffect } from "react";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Cargar presupuestos desde localStorage solo en la primera carga
  useEffect(() => {
    try {
      const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
      setBudgets(savedBudgets);
    } catch (error) {
      console.error("Error al cargar desde localStorage:", error);
      setBudgets([]);
    }
  }, []);

  // Guardar en localStorage cuando budgets cambie (evita la primera renderización)
  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }
  }, [budgets]);

  const addBudget = () => {
    if (!name.trim() || amount <= 0 || isNaN(amount)) {
      alert("Por favor, introduce un nombre y una cantidad válida.");
      return;
    }

    const newBudget = {
      id: crypto.randomUUID(), // Más seguro que Date.now()
      name,
      amount: parseFloat(amount),
    };

    setBudgets((prev) => [...prev, newBudget]);
    setName("");
    setAmount("");
  };

  const deleteBudget = (id) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(updatedBudgets);

    // Si se eliminan todos, limpiar `localStorage` para evitar errores
    if (updatedBudgets.length === 0) {
      localStorage.removeItem("budgets");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Presupuestos</h2>
      <p className="mb-4">Aquí puedes establecer y gestionar tus presupuestos.</p>

      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <label className="block font-semibold">Nombre del presupuesto</label>
        <input
          type="text"
          placeholder="Ej. Alimentación"
          className="w-full p-2 border rounded mb-2 text-white bg-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block font-semibold">Cantidad</label>
        <input
          type="number"
          placeholder="Ej. 500"
          className="w-full p-2 border rounded mb-2 text-white bg-black"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={addBudget}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Guardar Presupuesto
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Tus Presupuestos</h3>
      {budgets.length === 0 ? (
        <p className="text-gray-500">No hay presupuestos guardados.</p>
      ) : (
        <ul className="bg-white p-4 shadow-md rounded-lg">
          {budgets.map((budget) => (
            <li
              key={budget.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span className="text-lg">
                {budget.name}:{" "}
                <strong className="text-green-600">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                  }).format(budget.amount)}
                </strong>
              </span>
              <button
                onClick={() => deleteBudget(budget.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-700 transition"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Budgets;
