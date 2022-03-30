import React from "react";
import { useNavigate } from "react-router-dom";

import { trackAuth } from "../services/trackAuth";

const ProtectedPage = ({ x }) => {
  const navigate = useNavigate();
  return (
    <div>
      <p>This is the Protected page. You are logged in.  </p>
      <p>By the way, the value passed to this page at creation was: {x}</p>
      <button
        onClick={() => {
          trackAuth.logout(() =>
            navigate("/login", { state: { from: { pathname: "/protected" } } })
          );
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default ProtectedPage;
