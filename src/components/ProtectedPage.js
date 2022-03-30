import React from "react";
import { useNavigate } from "react-router-dom";

import { trackAuth } from "../services/trackAuth";

const ProtectedPage = ({ x }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl uppercase font-black">Protected Page</h1>
      <p>This is the Protected page. You are logged in. </p>
      <p>By the way, the value passed to this page at creation was: {x}</p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          trackAuth.logout(() =>
            navigate("/login", { state: { from: { pathname: "/protected" } } })
          );
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProtectedPage;
