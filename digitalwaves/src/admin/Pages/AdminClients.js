import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { ChartSpline } from 'lucide-react';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [dataStats, setDataStats] = useState(null);
  const [editModes, setEditModes] = useState({});
  const [newClient, setNewClient] = useState({
    name: "",
    logo: "",
    rating: "",
    description: ""
  });

  const fetchEverything = async () => {
    try {
      const res = await axiosInstance.get("/api/client");
      setClients(Array.isArray(res.data.client) ? res.data.client : []);
      setDataStats(res.data.data); 
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleAdd = async () => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      const res = await axiosInstance.post("/api/client", newClient, {
        headers: { "x-admin-key": adminKey },
      });
      setClients((prev) => [...prev, res.data]);
      setNewClient({ name: "", logo: "", rating: "", description: "" });
    } catch (err) {
      console.error("Add client failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      await axiosInstance.delete(`/api/client/${id}`, {
        headers: { "x-admin-key": adminKey },
      });
      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete client failed:", err);
    }
  };

  const toggleEditMode = (id) => {
    setEditModes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 lg:flex-row">
      {/* Left: Form and Client Cards */}
      <div className="flex-1">
        <h2 className="mb-4 text-xl font-bold">Client Management</h2>
        <div className="w-full max-w-2xl p-4 mb-8 bg-white rounded shadow">
          <h3 className="mb-3 text-lg font-semibold">Add New Client</h3>
          <input
            placeholder="Client Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            placeholder="Logo URL"
            value={newClient.logo}
            onChange={(e) => setNewClient({ ...newClient, logo: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            placeholder="Rating (e.g. 4.5)"
            value={newClient.rating}
            onChange={(e) => setNewClient({ ...newClient, rating: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newClient.description}
            onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <button
            className="w-full p-2 text-white rounded"
            style={{ backgroundColor: "rgb(223,107,41)" }}
            onClick={handleAdd}
          >
            Add Client
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {clients.map((client) => (
            <div key={client._id} className="p-4 bg-gray-100 rounded shadow">
              {editModes[client._id] ? (
                <>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    value={client.name}
                    onChange={(e) =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c._id === client._id ? { ...c, name: e.target.value } : c
                        )
                      )
                    }
                  />
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    value={client.logo}
                    onChange={(e) =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c._id === client._id ? { ...c, logo: e.target.value } : c
                        )
                      )
                    }
                  />
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    value={client.rating}
                    onChange={(e) =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c._id === client._id ? { ...c, rating: e.target.value } : c
                        )
                      )
                    }
                  />
                  <textarea
                    className="w-full p-2 mb-2 border rounded"
                    value={client.description}
                    onChange={(e) =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c._id === client._id ? { ...c, description: e.target.value } : c
                        )
                      )
                    }
                  ></textarea>
                  <button
                    className="w-full p-2 mb-2 text-white bg-green-600 rounded"
                    onClick={async () => {
                      try {
                        const adminKey = localStorage.getItem("adminKey");
                        await axiosInstance.put(`/api/client/${client._id}`, client, {
                          headers: { "x-admin-key": adminKey },
                        });
                        toggleEditMode(client._id);
                      } catch (err) {
                        console.error("Update failed:", err);
                      }
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-orange-600">{client.name}</h3>
                  <div className="flex items-center justify-center h-40 mb-2 overflow-hidden bg-white border rounded">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="object-contain h-full max-w-full"
                    />
                  </div>
                  <p className="mb-1 text-sm"><b>Rating:</b> {client.rating}</p>
                  <p className="text-sm text-gray-700">{client.description}</p>
                  <button
                    className="px-3 py-1 mt-3 mr-2 text-white bg-blue-500 rounded"
                    onClick={() => toggleEditMode(client._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 mt-3 text-white bg-red-500 rounded"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Stats Table */}
      <div className="w-full max-w-md p-4 mt-10 bg-white border-4 border-orange-500 border-double rounded shadow h-fit">
        <h3 className="mb-4 text-lg font-semibold text-center">
          <ChartSpline className="inline-block w-5 h-5 mr-1" /> Stats Overview</h3>
        {dataStats ? (
          <div>
            <div className="mb-4 space-y-2">
              <input
                type="number"
                placeholder="Clients"
                className="w-full p-2 border rounded"
                value={dataStats.Clients_No}
                onChange={(e) =>
                  setDataStats({ ...dataStats, Clients_No: Number(e.target.value) })
                }
              />
              <input
                type="number"
                placeholder="Projects"
                className="w-full p-2 border rounded"
                value={dataStats.projects_No}
                onChange={(e) =>
                  setDataStats({ ...dataStats, projects_No: Number(e.target.value) })
                }
              />
              <input
                type="number"
                placeholder="Locations"
                className="w-full p-2 border rounded"
                value={dataStats.Locations_No}
                onChange={(e) =>
                  setDataStats({ ...dataStats, Locations_No: Number(e.target.value) })
                }
              />
            </div>
            <button
              onClick={async () => {
                try {
                  const adminKey = localStorage.getItem("adminKey");
                  await axiosInstance.put(`/api/client/data/${dataStats._id}`, dataStats, {
                    headers: { "x-admin-key": adminKey },
                  });
                  alert("Data updated");
                } catch (err) {
                  console.error("Failed to update stats", err);
                  alert("Update failed");
                }
              }}
              className="w-full px-4 py-2 text-white bg-orange-600 rounded"
            >
              Save Stats
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading stats...</p>
        )}
      </div>
    </div>
  );
};

export default AdminClients;