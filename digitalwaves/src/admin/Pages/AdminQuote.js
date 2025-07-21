import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchQuotes = async () => {
    try {
      const res = await axiosInstance.get("/api/quote");
      setQuotes(res.data);
    } catch (err) {
      console.error("Failed to fetch quotes:", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter((q) =>
    (q.firstName?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (q.lastName?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (q.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-center">User Quotations</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2 mb-6 border rounded"
      />

      {filteredQuotes.length === 0 ? (
        <p className="text-center text-gray-600">No quotes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q) => (
                <tr key={q._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    {q.firstName} {q.lastName}
                  </td>
                  <td className="p-2 border">{q.email}</td>
                  <td className="p-2 border">{q.phoneNumber}</td>
                  <td className="p-2 text-sm text-gray-700 break-words border">
                    {q.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;