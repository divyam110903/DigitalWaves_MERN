import React from 'react';
import useAbout from "../../hooks/useAbout";

function Whatwedo() {
  const { work: items, loading } = useAbout();

  if (loading) return <p className="mt-10 text-xl text-center">Loading...</p>;
  if (!items || items.length === 0)
    return <p className="mt-10 text-xl text-center">No data found.</p>;

  return (
    <div>
      <h1 className='z-20 mt-40 font-semibold text-center text-secondary text-8xl'>What We Do?</h1>
      <div className='flex flex-wrap justify-center gap-4 mt-10'>
        {items.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-4 m-4 text-center transition-transform duration-300 border rounded-lg shadow-lg hover:scale-105"
          >
            <img 
              src={item.Image} 
              alt={item.title} 
              className='object-contain w-32 h-32 mx-auto mb-4' 
            />
            <h2 className='mb-2 text-2xl font-semibold'>{item.title}</h2>
            <p className='text-gray-600'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Whatwedo;