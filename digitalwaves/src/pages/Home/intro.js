import React from 'react';

function Intro() {
    return (
        <div className='grid items-center h-screen grid-cols-2 '>
            <div className='flex flex-col space-y-10'>
                <h1 className='font-semibold text-7xl text-primary'>The best
                    <br/> <b className='text-secondary'>marketing</b></h1> 
                <h1 className='text-4xl font-semibold text-primary'>Doesn't feel like marketing</h1>
                <button className='px-16 py-5 text-xl text-white bg-secondary max-w-max hover:bg-orange-600'> GET STARTED</button>
            </div>
            <div className='p-10'>
                <dotlottie-player 
                    src="https://lottie.host/fdb3fac2-1ac2-4355-b810-b6a6f5fa4c24/gAiarGaxIM.json" 
                    background="transparent" 
                    speed="1" 
                    loop 
                    autoplay>
                </dotlottie-player>
            </div>
        </div>
    );
}

export default Intro;