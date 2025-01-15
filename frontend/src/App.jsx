// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import evalexpertLogo from './assets/evalexpert_logo.png';
import Admin from './components/Admin';
import Evaluation from './components/Evaluation';
import Login from './components/Login';
import Mappings from './components/Mappings';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState({ ins_name: '', username: '', ins_id: 0 });
    const [isAdmin, setIsAdmin] = useState(false);

    const setLogin = (status, userData) => {
        setIsLoggedIn(status);
        setFullName({ ins_name: userData.ins_name, username: userData.username, ins_id: userData.ins_id });
        setIsAdmin(userData.is_admin === 'Y'); // Store admin status
        console.log('Login status updated', userData.username);
    };

  const handleEvaluationClick = () => {
    document.getElementById('eval').scrollIntoView({ behavior: 'smooth' });
  }
  
  const handleMappingsClick = () => {
    document.getElementById('mappings').scrollIntoView({ behavior: 'smooth' });
    console.log(fullName);
  }

  const handleAdminClick = () => {
    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFullName({ ins_name: '', username: '' }); // Reset user data
    setIsAdmin(false); // Reset admin status
  };

  return (
    <Router>
        {!isLoggedIn ? (
            <div className='login'>
                <Login setIsLoggedIn={setLogin} /> {/* Pass setLogin as a prop */}
            </div>
        ) : (
            <>
                <div className='navbar'>
                    <img src={evalexpertLogo} width={50} alt="EvalExpert Logo"/>
                    <span className='title'>EvalExpert</span>
                    <button onClick={() => document.getElementById('eval').scrollIntoView({ behavior: 'smooth' })} className='link-button'>Evaluation</button>
                    <button onClick={() => document.getElementById('mappings').scrollIntoView({ behavior: 'smooth' })} className='link-button'>Mappings</button>
                    {isAdmin && <button onClick={() => document.getElementById('admin').scrollIntoView({ behavior: 'smooth' })} className='link-button'>Admin Controls</button>}
                    <button onClick={() => { setIsLoggedIn(false); setFullName({ ins_name: '', username: '' }); setIsAdmin(false); }} className='link-button'>Logout</button>
                </div>
                <br />
                <div>Hey {fullName.ins_name}. Welcome to the EvalExperts website.</div>
                <br />
                <div id='eval'><Evaluation username={fullName.username} insId={fullName.ins_id}/></div>
                <br />
                <hr />
                <div><h3 id='mappings'>Mappings</h3></div>
                <hr />
                <div><Mappings /></div>
                <br />
                <hr />
                {isAdmin && (
                    <>
                        <div><h3 id='admin'>Admin Controls</h3></div>
                        <hr />
                        <div><Admin /></div>
                    </>
                )}
            </>
        )}
    </Router>
);
}

export default App;
