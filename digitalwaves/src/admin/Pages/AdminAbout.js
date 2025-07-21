import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

const AdminAbout = () => {
  const [work, setWork] = useState([]);
  const [why, setWhy] = useState([]);

  const [newWork, setNewWork] = useState({ Image: "", title: "", description: "" });
  const [newWhy, setNewWhy] = useState({ Image: "", title: "", description: "" });

  const [editWork, setEditWork] = useState(null);
  const [editWhy, setEditWhy] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/about");
      setWork(res.data.work || []);
      setWhy(res.data.why || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const adminKey = localStorage.getItem("adminKey");

  const handleAdd = async (type) => {
    try {
      const payload = type === "work" ? newWork : newWhy;
      const res = await axiosInstance.post(`/api/about/${type === "work" ? "" : "why"}`, payload, {
        headers: { "x-admin-key": adminKey },
      });
      if (type === "work") {
        setWork((prev) => [...prev, res.data]);
        setNewWork({ Image: "", title: "", description: "" });
      } else {
        setWhy((prev) => [...prev, res.data]);
        setNewWhy({ Image: "", title: "", description: "" });
      }
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axiosInstance.delete(`/api/about/${type}/${id}`, {
        headers: { "x-admin-key": adminKey },
      });
      if (type === "work") setWork((prev) => prev.filter((item) => item._id !== id));
      else setWhy((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (type, id, updatedItem) => {
    try {
      const res = await axiosInstance.put(`/api/about/${type}/${id}`, updatedItem, {
        headers: { "x-admin-key": adminKey },
      });
      if (type === "work") {
        setWork((prev) => prev.map((item) => (item._id === id ? res.data : item)));
        setEditWork(null);
      } else {
        setWhy((prev) => prev.map((item) => (item._id === id ? res.data : item)));
        setEditWhy(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-6 lg:flex-row">
      {/* Work Section */}
      <div className="flex-1">
        <h2 className="mb-4 text-xl font-bold">Work Section</h2>
        <div className="p-4 mb-6 bg-white rounded shadow">
          <input
            placeholder="Image URL"
            value={newWork.Image}
            onChange={(e) => setNewWork({ ...newWork, Image: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            placeholder="Title"
            value={newWork.title}
            onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newWork.description}
            onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <button
            onClick={() => handleAdd("work")}
            className="w-full p-2 text-white bg-orange-600 rounded"
          >
            Add Work
          </button>
        </div>

        {work.map((item) => (
          <div key={item._id} className="p-4 mb-4 bg-gray-100 rounded shadow">
            {editWork === item._id ? (
              <>
                <input
                  value={item.Image}
                  onChange={(e) =>
                    setWork((prev) =>
                      prev.map((w) => (w._id === item._id ? { ...w, Image: e.target.value } : w))
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  value={item.title}
                  onChange={(e) =>
                    setWork((prev) =>
                      prev.map((w) => (w._id === item._id ? { ...w, title: e.target.value } : w))
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setWork((prev) =>
                      prev.map((w) =>
                        w._id === item._id ? { ...w, description: e.target.value } : w
                      )
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate("work", item._id, item)}
                    className="px-4 py-1 text-white bg-green-600 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditWork(null)}
                    className="px-4 py-1 text-white bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={item.Image} className="object-contain w-full h-32 mb-2" />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditWork(item._id)}
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("work", item._id)}
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

      {/* Why Section */}
      <div className="flex-1">
        <h2 className="mb-4 text-xl font-bold">Why Section</h2>
        <div className="p-4 mb-6 bg-white rounded shadow">
          <input
            placeholder="Image URL"
            value={newWhy.Image}
            onChange={(e) => setNewWhy({ ...newWhy, Image: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            placeholder="Title"
            value={newWhy.title}
            onChange={(e) => setNewWhy({ ...newWhy, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newWhy.description}
            onChange={(e) => setNewWhy({ ...newWhy, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <button
            onClick={() => handleAdd("why")}
            className="w-full p-2 text-white bg-orange-600 rounded"
          >
            Add Why
          </button>
        </div>

        {why.map((item) => (
          <div key={item._id} className="p-4 mb-4 bg-gray-100 rounded shadow">
            {editWhy === item._id ? (
              <>
                <input
                  value={item.Image}
                  onChange={(e) =>
                    setWhy((prev) =>
                      prev.map((w) => (w._id === item._id ? { ...w, Image: e.target.value } : w))
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  value={item.title}
                  onChange={(e) =>
                    setWhy((prev) =>
                      prev.map((w) => (w._id === item._id ? { ...w, title: e.target.value } : w))
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setWhy((prev) =>
                      prev.map((w) =>
                        w._id === item._id ? { ...w, description: e.target.value } : w
                      )
                    )
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate("why", item._id, item)}
                    className="px-4 py-1 text-white bg-green-600 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditWhy(null)}
                    className="px-4 py-1 text-white bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={item.Image} className="object-contain w-full h-32 mb-2" />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditWhy(item._id)}
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("why", item._id)}
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

export default AdminAbout;