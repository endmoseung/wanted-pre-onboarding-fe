import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, pathname, token }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (pathname === "/" && token) {
    return <Navigate to="/todo" />;
  }
  return children;
};

export default ProtectedRoute;
