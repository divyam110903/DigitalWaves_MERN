import React from 'react'
import useAbout from "../../hooks/useAbout";
function Whychooseus() {
    const { why: items, loading } = useAbout();
     if (loading) return <p className="mt-10 text-xl text-center">Loading...</p>;
  if (!items || items.length === 0)
    return <p className="mt-10 text-xl text-center">No data found.</p>;

    return (
        <div className="mx-32 mt-20 border shadow">
          <div className="flex items-center justify-center w-full bg-primary h-72">
            <h1 className="font-semibold text-white text-7xl">Why Choose Us</h1>
          </div>
          <div className="grid grid-cols-3 gap-5 p-5">
            {items.map((item) => (
              <div className="flex flex-col items-center p-5 space-y-5 duration-300 transform bg-white border shadow hover:scale-105" key={item.title}>
                <img src={item.Image} className="w-20 h-20" alt={item.title} />
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="text-gray-600 text-md">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Whychooseus
