// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation, Location } from "react-router-dom"; // Import Location
import { useAuth } from "@/contexts/AuthContext"; // Adjust path if needed

// Define props for ProtectedRoute
interface ProtectedRouteProps {
  children: JSX.Element; // Type children more specifically if needed (e.g., JSX.Element for a single element)
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { currentUser } = useAuth();
  const location: Location = useLocation(); // useLocation provides Location type

  if (!currentUser) {
    // Redirect them to the /login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the children (the protected component)
}

export default ProtectedRoute;
