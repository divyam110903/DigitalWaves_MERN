import React from 'react'


function Introstart() {
    return (
        <div className='grid items-center h-screen grid-cols-2 bg-primary'>
            <div className='h-[900px] '>


                <dotlottie-player src="https://lottie.host/b3056fc9-2c5a-4476-bdb3-08475ced617f/bfESBskZz7.json" background="transparent" speed="1"   loop autoplay ></dotlottie-player>

            </div>

            <div>
                <h1 className='font-semibold text-white text-7xl' > We <b className='text-secondary'> work </b> together with our <b className='text-green-500'>clients</b></h1>

            </div>

        </div>
    )
}

export default Introstart
