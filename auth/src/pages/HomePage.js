import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAuth } = useContext(AuthContext);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary">Home Page</h1>
      {isAuth && user ? (
        <p>Welcome back, {user.username}!</p>
      ) : (
        <p>Welcome to the home page! Please log in or register.</p>
      )}
    </div>
  );
};

export default HomePage;
