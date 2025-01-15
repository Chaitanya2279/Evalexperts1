import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/faculty/:username/courses" element={<Courses />} />
      </Routes>
    </Router> */}
    <App />
  </React.StrictMode>,
);
