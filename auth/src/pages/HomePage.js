import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAuth } = useContext(AuthContext);

  return (
    <div className="card p-4" style={{ maxWidth: '700px', margin: 'auto', marginTop: '2rem' }}>
      
      {isAuth && user ? (
        <h3 className="gradientText text-center">
          Welcome <strong>{user.username}</strong>!
        </h3>
      ) : (
        <h2 className="gradientText text-center" >
          Welcome!
        </h2>
      )}
      <div className="infoText mt-4" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
        <p>
          <strong>AuthApp</strong> is a secure and user-friendly authentication system offering features like user registration, login, profile management, cookies, and form validations.
        </p>
        <p>
          With <strong>AuthApp</strong>, you can easily manage your account, ensure data security, and benefit from features like cookie handling, input validations, and much more.
        </p>
      </div>
      <div className="text-center mt-4">
        <a
          href="https://github.com/atharva-narkhede"
          className="btn btn-outline-primary"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '5px 20px', fontSize: '0.875rem', borderRadius: '20px' }}
        >
          Visit GitHub
        </a>
      </div>
      <footer className="text-center mt-5">
        <p style={{ color: 'white', fontSize: '1rem' }}>
          Created by Atharva Narkhede 🌟
        </p>

      </footer>
    </div>
  );
};

export default HomePage;
