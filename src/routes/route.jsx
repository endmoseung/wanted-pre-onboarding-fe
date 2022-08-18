import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import pages from "./pages";
import ProtectedRoute from "./protectedRoute";

const RootRoute = () => {
  // const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((r) => {
          const isAuthenticated = r.isPublic;
          return (
            <Route
              key={r.pathname}
              path={r.pathname}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {r.element}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoute;
