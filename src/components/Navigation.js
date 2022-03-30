import React from "react";
import { NavLink } from "react-router-dom";


// TODO - this is not a responsive navbar - need to make it responsive. 

const Navigation = () => {
  return (
    <div>
      <nav class="container flex justify-between px-4 py-8 mx-auto bg-white">
        <div>
          <h3 class="text-xl font-medium text-blue-500">Logo Goes Here</h3>
        </div>
        <div class="hidden space-x-8 lg:flex">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/protected">Protected Page</NavLink>
        </div>
        <div class="flex lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
