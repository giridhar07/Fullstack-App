/* eslint-disable react-refresh/only-export-components */
// UserContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Context create karo
export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);

  // API se user profile 
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading,fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

 
export const useAuth = () => {
  return useContext(UserContext);
};


