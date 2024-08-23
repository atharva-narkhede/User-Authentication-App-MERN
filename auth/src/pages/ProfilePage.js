// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AuthContext } from '../context/AuthContext';

// const ProfilePage = () => {
//   const { user, login } = useContext(AuthContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [selectedFields, setSelectedFields] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   const handleFieldSelection = (field) => {
//     setSelectedFields((prevFields) =>
//       prevFields.includes(field)
//         ? prevFields.filter((f) => f !== field)
//         : [...prevFields, field]
//     );
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     const updatedData = {};
//     if (selectedFields.includes('username') && username !== user.username) {
//       updatedData.username = username;
//     }
//     if (selectedFields.includes('password') && password.length >= 6) {
//       updatedData.password = password;
//     }

//     if (Object.keys(updatedData).length === 0) {
//       setMessage('No changes to update.');
//       return;
//     }

//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_API_URL}/api/users/profile`,
//         updatedData,
//         {
//           headers: {
//             'x-api-key': process.env.REACT_APP_API_KEY,
//           },
//           withCredentials: true,
//         }
//       );

//       login({
//         _id: data._id,
//         username: data.username,
//         email: data.email,
//         token: Cookies.get('token'),
//       });
//       setMessage('Profile updated successfully!');
//       setError(null);
//     } catch (error) {
//       setMessage(null);
//       setError(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : 'Failed to update profile.'
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center text-primary">Profile</h2>
//       {message && <div className="alert alert-success text-center">{message}</div>}
//       {error && <div className="alert alert-danger text-center">{error}</div>}
//       <form onSubmit={submitHandler} className="mx-auto" style={{ maxWidth: '400px' }}>
//         <div className="form-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={selectedFields.includes('username')}
//               onChange={() => handleFieldSelection('username')}
//             />
//             Update Username
//           </label>
//           {selectedFields.includes('username') && (
//             <input
//               type="text"
//               className="form-control mt-2"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           )}
//         </div>
//         <div className="form-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={selectedFields.includes('password')}
//               onChange={() => handleFieldSelection('password')}
//             />
//             Update Password
//           </label>
//           {selectedFields.includes('password') && (
//             <>
//               <input
//                 type="password"
//                 className="form-control mt-2"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter new password"
//               />
//               <input
//                 type="password"
//                 className="form-control mt-2"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm new password"
//               />
//               <small className="form-text text-muted">
//                 Password must be at least 6 characters long.
//               </small>
//             </>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary d-block mx-auto">
//           Update Profile
//         </button>
//       </form>
//       <div className="mt-3 text-center">
//         <h3>Profile Details</h3>
//         <p>Username: {user && user.username}</p>
//         <p>Email: {user && user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleFieldSelection = (field) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const updatedData = {};
    if (selectedFields.includes('username') && username !== user.username) {
      updatedData.username = username;
    }
    if (selectedFields.includes('password') && password.length >= 6) {
      updatedData.password = password;
    }

    if (Object.keys(updatedData).length === 0) {
      setMessage('No changes to update.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/profile`,
        updatedData,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );

      login({
        _id: data._id,
        username: data.username,
        email: data.email,
        token: Cookies.get('token'),
      });

      setMessage('Profile updated successfully!');
      setError(null);

      // Clear fields and uncheck checkboxes
      setSelectedFields([]);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(null);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to update profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Profile</h2>
      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={submitHandler} className="mx-auto shadow p-4 rounded bg-light" style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selectedFields.includes('username')}
              onChange={() => handleFieldSelection('username')}
            />
            Update Username
          </label>
          {selectedFields.includes('username') && (
            <input
              type="text"
              className="form-control mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selectedFields.includes('password')}
              onChange={() => handleFieldSelection('password')}
            />
            Update Password
          </label>
          {selectedFields.includes('password') && (
            <>
              <input
                type="password"
                className="form-control mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <input
                type="password"
                className="form-control mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              <small className="form-text text-muted">
                Password must be at least 6 characters long.
              </small>
            </>
          )}
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto">
          {loading ? <Spinner animation="border" size="sm" /> : 'Update Profile'}
        </button>
      </form>
      <div className="mt-5 text-center">
        <h3>Profile Details</h3>
        <p><strong>Username:</strong> {user && user.username}</p>
        <p><strong>Email:</strong> {user && user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
