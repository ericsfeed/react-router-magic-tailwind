import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { trackAuth } from "../services/trackAuth";

// This wrapper checks if the user is authenticated
// If authenticated, renders the passed element
// If not authenticated, redirects the user to login page.

const PrivateElement = ({ children }) => {
  let location = useLocation();  
  return trackAuth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateElement;
