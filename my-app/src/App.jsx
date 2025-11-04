import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useBoolean, useColorMode } from '@chakra-ui/react';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [isLogged, setLogged] = useBoolean(localStorage.getItem("logged") === "true");
  const [currentUser, setCurrentUser] = useState(null);
  const {colorMode, toggleColorMode} = useColorMode();

  useEffect(() => {
    if (!isLogged && colorMode === "dark") toggleColorMode();
  }, [isLogged, colorMode, toggleColorMode]);

  const handleLogin = () => {
    localStorage.setItem("logged", "true");
    setLogged.on();
  };

  const handleLogout = () => {
    localStorage.removeItem("logged");
    setLogged.off();
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLogged ? (
          <>
            <Route path="/login" element={<Login handleLogin={handleLogin} setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<RootLayout handleLogout={handleLogout} currentUser={currentUser} />}>
              <Route index element={<Dashboard currentUser={currentUser} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<Create />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
