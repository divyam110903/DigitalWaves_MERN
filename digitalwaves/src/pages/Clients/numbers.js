import React from "react";
import useClient from "../../hooks/useClient";
function Numbers() {
  const { values, loading } = useClient();
  
  if (loading) return <p className="mt-10 text-xl text-center">Loading...</p>;
  if (!values || values.length === 0)
    return <p className="mt-10 text-xl text-center">No data found.</p>;   
   const data = values;
  return (
    
    <div className="mt-20 px-52">
        <h1 className="text-xl font-semibold text-gray-500">Untill today we have...</h1>
        <br/>
      <div className="flex justify-between p-5 space-x-10 rounded bg-secondary">
        <div className="flex flex-col space-y-2">
          <h1 className="text-white text-9xl">{data.Clients_No}</h1>
          <h1 className="text-2xl text-white">Clients</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-white text-9xl">{data.projects_No}</h1>
          <h1 className="text-2xl text-white">Projects</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-white text-9xl">{data.Locations_No}</h1>
          <h1 className="text-2xl text-white">Locations</h1>
        </div>
      </div>
    </div>
  );
}

export default Numbers;