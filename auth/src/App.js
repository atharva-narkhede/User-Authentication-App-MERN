import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuth ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/register" element={isAuth ? <Navigate to="/profile" /> : <RegisterPage />} />
          <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
