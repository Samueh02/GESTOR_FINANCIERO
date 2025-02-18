import { useState, useEffect } from "react";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Gasto");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("Gasto");

  // Cargar presupuestos desde localStorage SOLO UNA VEZ
  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
    setBudgets(savedBudgets);
  }, []);

  // Guardar en localStorage cada vez que budgets cambie
  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }
  }, [budgets]);

  const addBudget = () => {
    if (name.trim() === "" || amount <= 0) {
      alert("Por favor, introduce un nombre y una cantidad válida.");
      return;
    }

    const newBudget = { id: Date.now(), name, amount: parseFloat(amount), type };
    const updatedBudgets = [...budgets, newBudget];

    setBudgets(updatedBudgets);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets)); // Guardar inmediatamente
    setName("");
    setAmount("");
    setType("Gasto");
  };

  const deleteBudget = (id) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(updatedBudgets);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets)); // Guardar cambios
  };

  const startEditing = (budget) => {
    setEditingId(budget.id);
    setEditName(budget.name);
    setEditAmount(budget.amount);
    setEditType(budget.type);
  };

  const saveEdit = () => {
    const updatedBudgets = budgets.map((budget) =>
      budget.id === editingId
        ? { ...budget, name: editName, amount: parseFloat(editAmount), type: editType }
        : budget
    );

    setBudgets(updatedBudgets);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets)); // Guardar cambios
    setEditingId(null);
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

        <label className="block font-semibold">Tipo</label>
        <select
          className="w-full p-2 border rounded mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Gasto">Gasto</option>
          <option value="Ingreso">Ingreso</option>
        </select>

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
            <li key={budget.id} className="flex justify-between items-center border-b py-3">
              <span className="text-lg">
                {budget.name}:{" "}
                <strong className={budget.type === "Gasto" ? "text-red-600" : "text-green-600"}>
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                  }).format(budget.amount)}
                </strong>
              </span>
              <span className="text-sm text-gray-500">({budget.type})</span>
              <div className="flex gap-2">
                <button onClick={() => startEditing(budget)} className="bg-yellow-500 text-white px-3 py-2 rounded-full hover:bg-yellow-700 transition">
                  ✏️
                </button>
                <button onClick={() => deleteBudget(budget.id)} className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-700 transition">
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Formulario de edición */}
      {editingId !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Editar Presupuesto</h3>
            <label className="block font-semibold">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <label className="block font-semibold">Cantidad</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-2"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
            <label className="block font-semibold">Tipo</label>
            <select
              className="w-full p-2 border rounded mb-2"
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
            >
              <option value="Gasto">Gasto</option>
              <option value="Ingreso">Ingreso</option>
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
