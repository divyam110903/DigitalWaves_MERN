import React, { useState } from "react";
import useClient from "../../hooks/useClient";

function Cl() {
  const { clients, loading } = useClient();   
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);

  const safeIndex = Math.min(selectedClientIndex, Math.max(0, clients.length - 2));
  const clientsToShow = clients.slice(safeIndex, safeIndex + 2);

  if (loading) return <p className="mt-10 text-xl text-center">Loading...</p>;
  if (!clients || clients.length === 0)
    return <p className="mt-10 text-xl text-center">No data found.</p>;

  const next = () => {
    if (selectedClientIndex + 2 < clients.length) {
      setSelectedClientIndex(selectedClientIndex + 2);
    }
  };

  const previous = () => {
    if (selectedClientIndex - 2 >= 0) {
      setSelectedClientIndex(selectedClientIndex - 2);
    }
  };

  const totalPages = Math.ceil(clients.length / 2);

  return (
    <div>
      <div className="rounded-b-full bg-primary h-44"></div>

      <div className="flex items-end justify-center space-x-10 overflow-x-hidden -mt-44">
        {selectedClientIndex > 0 && (
          <i className="text-4xl text-gray-600 cursor-pointer ri-arrow-left-line" onClick={previous}></i>
        )}

        <div className="flex space-x-10">
          {clientsToShow.map((client) => (
            <div key={client._id} className="bg-white shadow p-5 w-[500px] border h-[300px]">
              <div className="flex items-center justify-between space-x-10">
                <h1 className="text-2xl font-semibold text-primary">{client.name}</h1>
                <img src={client.logo} alt={`${client.name} logo`} className="w-32 h-32" />
              </div>
              <p className="mt-10 font-semibold text-gray-600 text-md">{client.description}</p>
              <p>
                <span className="text-gray-600 text-md">
                  Rating: <span className="text-primary">{client.rating}</span>
                </span>
              </p>
            </div>
          ))}
        </div>

        {selectedClientIndex + 2 < clients.length && (
          <i className="text-4xl text-gray-600 cursor-pointer ri-arrow-right-line" onClick={next}></i>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            className={`w-4 h-4 rounded-full cursor-pointer ${selectedClientIndex / 2 === pageIndex ? "bg-primary" : "bg-gray-400"}`}
            onClick={() => setSelectedClientIndex(pageIndex * 2)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Cl;