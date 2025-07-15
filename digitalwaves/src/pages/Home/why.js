import React from 'react';

function Why() {
  return (
    <div className='px-4 mt-20 sm:px-10'>
      <h1 className='font-semibold text-center text-8xl text-primary'>
        Why <span className='font-bold text-secondary'>Marketing</span>?
      </h1>

      <div className='h-[500px] flex justify-center items-center'>
        <dotlottie-player
          src="https://lottie.host/6ba54e29-8b61-43ca-ae9b-01af5e744b44/FlogWNv5z0.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
      </div>

      <p className='mt-10 text-xl text-gray-700'>
        Do you know what your customers want? Do you think your customers trust your products? When was the last time you saw a customer tweeting about your product or service? Was it a complaint or compliment?
      </p>

      <p className='mt-10 text-5xl font-semibold text-primary'>
        The answers to all these questions lie in marketing.
      </p>

      <p className='mt-10 text-xl text-gray-700'>
        How you market your business determines if the enterprise will be successful or not. Marketing is a tool used to create and maintain demand, relevance, reputation, competition and more. Without it, your business is likely to close down due to lack of sales.
      </p>
    </div>
  );
}

export default Why;