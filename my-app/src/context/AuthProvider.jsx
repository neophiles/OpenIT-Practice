import { createContext, useContext, useState, useEffect } from 'react';
import { useBoolean, useColorMode } from '@chakra-ui/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setLogged] = useBoolean(localStorage.getItem("logged") === "true");

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (!isLogged && colorMode === "dark") toggleColorMode();
  }, [isLogged, colorMode, toggleColorMode]);

  const handleLogin = (userData) => {
    localStorage.setItem("logged", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setLogged.on();
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("currentUser");
    setLogged.off();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, currentUser, setCurrentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
