import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

const AdminHome = () => {
  const [solutions, setSolutions] = useState([]);
  const [newSol, setNewSol] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchSolutions = async () => {
    try {
      const res = await axiosInstance.get("/api/home");
      setSolutions(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleAdd = async () => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      const res = await axiosInstance.post("/api/home", newSol, {
        headers: { "x-admin-key": adminKey },
      });
      setSolutions([...solutions, res.data]);
      setNewSol({ title: "", description: "", image: "" });
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      await axiosInstance.delete(`/api/home/${id}`, {
        headers: { "x-admin-key": adminKey },
      });
      setSolutions(solutions.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      const res = await axiosInstance.put(`/api/home/${id}`, updated, {
        headers: { "x-admin-key": adminKey },
      });
      setSolutions((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Solutions Management Home Page</h2>

      {/* Add Form */}
      <div className="w-full max-w-2xl p-4 mb-8 bg-white rounded shadow">
        <h3 className="mb-3 text-lg font-semibold">Add New Solution</h3>
        <input
          placeholder="Title"
          value={newSol.title}
          onChange={(e) => setNewSol({ ...newSol, title: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          placeholder="Description"
          value={newSol.description}
          onChange={(e) => setNewSol({ ...newSol, description: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          placeholder="Image URL"
          value={newSol.image}
          onChange={(e) => setNewSol({ ...newSol, image: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          className="w-full p-2 text-white rounded"
          style={{ backgroundColor: "rgb(223,107,41)" }}
          onClick={handleAdd}
        >
          Add Solution
        </button>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((sol) => (
          <div key={sol._id} className="p-4 bg-gray-100 rounded shadow">
            {editingId === sol._id ? (
              <>
                <input
                  value={sol.title}
                  onChange={(e) =>
                    setSolutions((prev) =>
                      prev.map((s) =>
                        s._id === sol._id ? { ...s, title: e.target.value } : s
                      )
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  value={sol.description}
                  onChange={(e) =>
                    setSolutions((prev) =>
                      prev.map((s) =>
                        s._id === sol._id ? { ...s, description: e.target.value } : s
                      )
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  value={sol.image}
                  onChange={(e) =>
                    setSolutions((prev) =>
                      prev.map((s) =>
                        s._id === sol._id ? { ...s, image: e.target.value } : s
                      )
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(sol._id, sol)}
                    className="px-3 py-1 text-white bg-green-600 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-white bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-orange-600">{sol.title}</h3>
                <p className="mb-2 text-sm">{sol.description}</p>
                <div className="flex items-center justify-center h-40 overflow-hidden bg-white border rounded">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="object-contain h-full max-w-full"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingId(sol._id)}
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sol._id)}
                    className="px-3 py-1 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;