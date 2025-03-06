import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './Protected';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "./style.css";


const Card = ({ label, path }) => (
  <Link to={path} className="card-link">
    <div className="card">
      <div className="card-content">
        <h2 className="card-label">{label}</h2>
      </div>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="home">
      <div className="card-container">
        <Card label="Import" path="/import" />
        <Card label="Export" path="/export" />
      </div>
    </div>
  );
};

const ImportPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Import Page</h1>
      <p>This is the Import page content.</p>
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
    </div>
  );
};

const ExportPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Export Page</h1>
      <p>This is the Export page content.</p>
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
    </div>
  );
};

const EditProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Edit Profile</h1>
      <p>This is the Edit Profile page content.</p>
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
    </div>
  );
};

const Header = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} className="header-back-button">
            Back
          </button>
        )}
        <h1 className="site-title">Cargo Container</h1>
        <div className="header-actions">
          <button onClick={toggleDarkMode} className="toggle-button">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="profile-container">
            <button
              onClick={() => setShowProfileOptions(!showProfileOptions)}
              className="profile-button"
            >
              <FontAwesomeIcon icon={faUser} />
              Profile
            </button>
            {showProfileOptions && (
              <div className="profile-dropdown">
                <button
                  onClick={() => {
                    setShowProfileOptions(false);
                    navigate('/edit-profile');
                  }}
                  className="dropdown-item"
                >
                  Edit_Profile
                </button>
                <button
                  onClick={() => {
                    setShowProfileOptions(false);
                    handleLogout();
                  }}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="app">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/import" element={
          <ProtectedRoute>
            <ImportPage />
          </ProtectedRoute>
        } />
        <Route path="/export" element={
          <ProtectedRoute>
            <ExportPage />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;