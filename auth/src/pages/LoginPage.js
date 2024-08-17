import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('login'); // login, forgotPassword, resetPassword
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        { email, password },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      login(data);
      navigate('/profile');
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Login failed. Please check your credentials.'
      );
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/forgotpassword`,
        { email },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      setMessage(data.message);
      setError(null);
      setView('resetPassword');
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to send OTP.'
      );
      setMessage(null);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/resetpassword`,
        {
          otp,
          newPassword,
        },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      setMessage(data.message);
      setError(null);
      setTimeout(() => {
        setView('login'); // Redirect back to the login view
      }, 3000);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to reset password.'
      );
      setMessage(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">
        {view === 'login' ? 'Login' : view === 'forgotPassword' ? 'Forgot Password' : 'Reset Password'}
      </h2>
      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {view === 'login' && (
        <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Login
          </button>
          <p className="text-center mt-3">
            <a href="#" onClick={() => setView('forgotPassword')}>Forgot Password?</a>
          </p>
        </form>
      )}
      {view === 'forgotPassword' && (
        <form onSubmit={handleForgotPassword} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Send OTP
          </button>
          <p className="text-center mt-3">
            <a href="#" onClick={() => setView('login')}>Back to Login</a>
          </p>
        </form>
      )}
      {view === 'resetPassword' && (
        <form onSubmit={handleResetPassword} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Reset Password
          </button>
          <p className="text-center mt-3">
            <a href="#" onClick={() => setView('login')}>Back to Login</a>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
