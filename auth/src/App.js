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

  const globalStyles = `
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #4e54c8, #8f94fb);
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
    }

    #root {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    main.container {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .card {
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 15px;
      padding: 2rem;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
    }

    .gradientText {
      background: linear-gradient(90deg, #ff7e5f, #feb47b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .infoText {
      margin-top: 2rem;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .gradientText {
        font-size: 2.5rem;
      }
      .infoText {
        font-size: 1rem;
      }
    }

    @media (max-width: 576px) {
      .gradientText {
        font-size: 2rem;
      }
      .infoText {
        font-size: 0.9rem;
      }
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
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
