// src/components/ChangePassword.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully! Please log in again.');
        navigate('/login');
      } else {
        setMessage(data.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="change-password-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <div className="input-box">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;