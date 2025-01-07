import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../appwrite"; // Import your Appwrite setup

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Track login state

  useEffect(() => {
    const validateSession = async () => {
      const session = localStorage.getItem("session");

      if (session) {
        try {
          // Verify session with Appwrite
          await account.get();
          setIsLoggedIn(true); // Valid session
        } catch (err) {
          console.error("Invalid session:", err);
          localStorage.removeItem("session");
          setIsLoggedIn(false); // Invalid session
        }
      } else {
        setIsLoggedIn(false); // No session
      }
    };

    validateSession();
  }, []);

  // Show a loading state while validating the session
  if (isLoggedIn === null) {
    return <p>Loading...</p>;
  }

  // Redirect to login if not logged in
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
