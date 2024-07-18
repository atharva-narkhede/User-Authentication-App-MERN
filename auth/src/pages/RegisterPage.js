import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, { username, email, password });
      login(data);
      navigate('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="container mt-5">
      <h2 className="text-center text-primary">Register</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary d-block mx-auto">Register</button>
    </form>
  );
};

export default RegisterPage;
