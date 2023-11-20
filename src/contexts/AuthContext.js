import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Invoke the checkLoginStatus function on component mount
    checkLoginStatus().then((status) => {
      setIsLoggedIn(status);
    });
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/check-auth");
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        const data = await response.json();
        return data.isLoggedIn;
      }
      return false;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
