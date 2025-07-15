import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();

  const menuItems = [
    { title: "Home", path: "/", icon: "ri-home-9-line" },
    { title: "Clients", path: "/clients", icon: "ri-group-line" },
    { title: "About", path: "/about", icon: "ri-information-line" },
    { title: "Contact", path: "/contact", icon: "ri-chat-3-line" },
  ];

  return (
    <div>
      {/* Content */}
      <div className="overflow-x-hidden pb-44">
        {children}
      </div>

      {/* Footer */}
      <div className="fixed left-0 right-0 bottom-10">
        <div className="flex justify-center w-full">
          {menuItems.map((x) => (
            <div key={x.title} className="flex flex-col items-center justify-end">
              {location.pathname === x.path && (
                <div className="w-full h-2 mt-2 bg-secondary"></div>
              )}

              <div
                className={`px-20 py-5 bg-primary ${
                  x.path === "/" ? "rounded-l" : ""
                } ${
                  x.path === "/contact" ? "rounded-r" : ""
                } flex items-center justify-center space-x-2`}
              >
                <i className={`${x.icon} text-secondary text-xl`}></i>
                <Link to={x.path} className="ml-2 text-xl text-secondary">
                  {x.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Layout;