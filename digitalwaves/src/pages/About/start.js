import React from 'react';

function Introstart() {
  return (
    <>
    
      <div className="about-intro">
        <div className="flex items-center justify-center min-h-[50vh] transform -skew-y-5">
          <div className="flex flex-col items-center space-x-6 transform md:flex-row skew-y-5">
          
      <img src={`${process.env.PUBLIC_URL}/images/logo1.svg`} alt="Logo" className="h-[200px] w-[200px] md:h-[250px] md:w-[250px]" />

            <div className="flex flex-col items-center space-y-2 md:items-start">
              <h1 className="font-semibold text-white text-8xl">DIGITAL WAVES</h1>
              <hr className="w-2/3 border-t border-gray-500 md:w-full" />
              <h2 className="text-base text-3xl tracking-wide text-white">OLDER | STRONGER | WISER</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Introstart;