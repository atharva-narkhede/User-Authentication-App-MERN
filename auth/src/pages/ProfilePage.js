import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length > 0 && password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile`, { username, email, password }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        withCredentials: true
      });
      login(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Profile</h2>
      <form onSubmit={submitHandler} className="mx-auto" style={{ maxWidth: '400px' }}>
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
          <label>Password (optional):</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto">Update Profile</button>
      </form>
      <div className="mt-3 text-center">
        <h3>Profile Details</h3>
        <p>Username: {user && user.username}</p>
        <p>Email: {user && user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
