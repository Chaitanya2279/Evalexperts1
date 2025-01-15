import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false); // New state for change password
    const [defaultPassword, setDefaultPassword] = useState(''); // New state for default password
    const [newPassword, setNewPassword] = useState(''); // New state for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            

            if (response.ok) {
                setIsLoggedIn(true, {
                    ins_name: data.ins_name,
                    username: data.username,
                    is_admin: data.is_admin, // Store is_admin status
                    ins_id: data.ins_id
                });
                setMessage(''); // Clear any previous messages
                setIsSuccess(true); // Indicate success
            } else {
                setIsLoggedIn(false);
                // Check for specific error messages from the server
                if (data.error) {
                    setMessage(data.error); // Use the specific error message from the server
                }
                else {
                    setMessage('Sorry! Login Incorrect'); // Fallback message
                }
                setIsSuccess(false); // Indicate failure
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Please Change your password'); // Set a general error message
            setIsSuccess(false); // Indicate failure
            setIsLoggedIn(false);
        }
    };
 
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch('http://localhost:3001/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, defaultPassword, newPassword }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setMessage('Changes Submitted');
                console.log(newPassword); // Log the new password
                setIsSuccess(true);
                // Update is_first_login to true after successful password change
                await fetch(`http://localhost:3001/api/update-first-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });
                setTimeout(() => {
                    setIsChangePassword(false);
                    setMessage('');
                }, 2000); // Reset after 2 seconds
            } else {
                setMessage('Change Password Failed');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('An error occurred. Please try again.');
            setIsSuccess(false);
        }
    };
const handleBack = () => {
        setIsChangePassword(false); // Reset to show the login form
        setUsername(''); // Clear username
        setPassword(''); // Clear password
        setMessage(''); // Clear any messages
    };

    return (
        <div className="wrapper">
            <div className="form-box">
                {isChangePassword ? (
                    <div>
                        <div className="change-password-header">
                            <h1>Change Password</h1>
                            <button onClick={handleBack} className="back-button">Back</button>
                        </div>
                        <form onSubmit={handleChangePassword}>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Default Password"
                                    value={defaultPassword}
                                    onChange={(e) => setDefaultPassword(e.target.value)}
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
                            {newPassword !== confirmPassword && (
                                <div className="error-message">Please check the password entered, they seem to be different</div>
                            )}
                            <button type="submit" disabled={newPassword !== confirmPassword}>Change Password</button>
                        </form>
                        {message && <div className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</div>}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        {message && <div className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</div>}
                        <p onClick={() => setIsChangePassword(true)} className="change-password-text">Change Password?</p>
                    </form>
                )}
                <div className="need-assistance">
                    <p>Need assistance? Please contact the RIT Service Center at </p>
                    <p>
                        <a href="tel:585-475-5000">585-475-5000</a> or visit <a href="https://help.rit.edu" target="_blank" rel="noopener noreferrer">help.rit.edu</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;