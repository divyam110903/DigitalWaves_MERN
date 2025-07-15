import React from 'react';
import useContact from '../../hooks/useContact';

const Location = () => {
  const { contact, loading } = useContact();

  if (loading) return <p className="mt-10 text-xl text-center">Loading...</p>;
  if (!contact || contact.length === 0)
    return <p className="mt-10 text-xl text-center">No data found.</p>;

  const info = contact[0];

  return (
    <div className="flex justify-center">
      <div className="p-10 text-white bg-primary rounded-3xl">
        <div className="flex items-center gap-12">
          <div className="space-y-10">
            <h1 className="text-3xl font-semibold">Get In Touch</h1>
            <p>Digital Waves is a digital marketing agency, we provide marketing and development services.</p>

            <div className="flex items-center space-x-5">
              <div className="h-12 w-12 bg-[#affase] p-2 rounded">
                <i className="text-3xl ri-map-pin-line text-secondary"></i>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Visit Us</h1>
                <p>{info.Location}</p>
                <p>{info.City}</p>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="h-12 w-12 bg-[#affase] p-2 rounded">
                <i className="text-3xl text-secondary ri-instagram-line"></i>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Dm us!</h1>
                <p>{info.Insta}</p>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="h-12 w-12 bg-[#affase] p-2 rounded">
                <i className="text-3xl ri-phone-fill text-secondary"></i>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Phone us</h1>
                <p>{info.Phone}</p>
              </div>
            </div>
          </div>

          <div className="w-full h-full animate__animated animate__fadeInRight">
            <dotlottie-player
              src="https://lottie.host/5b4ebc86-1fa9-4751-b3c2-f97d5b16a95f/8Oc8Mek13u.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;