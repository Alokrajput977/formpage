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

// Import page
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

// Export page
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

// Edit Profile page (you can expand this with actual profile-editing functionality)
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

// Header component with dark mode toggle, back button, and profile dropdown
const Header = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  // Logout handler: remove token and redirect to login page (assumed at "/")
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header
      className="header"
      style={{
        background: 'linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)',
        padding: '15px 30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div
        className="header-content"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Back button shown when not on home */}
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
            className="header-back-button"
            style={{ background: 'linear-gradient(90deg, rgb(131, 58, 180) 0%, rgb(253, 29, 29) 50%, rgb(252, 176, 69) 100%);', border: '1px solid black', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}
          >
            Back
          </button>
        )}
        <h1
          className="site-title"
          style={{ margin: 0, fontSize: '1.8rem', fontWeight: '600', color: '#fff' }}
        >
          Cargo Container
        </h1>
        <div
          className="header-actions"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <button
            onClick={toggleDarkMode}
            className="toggle-button"
            style={{
              background: 'linear-gradient(90deg, rgb(131, 58, 180) 0%, rgb(253, 29, 29) 50%, rgb(252, 176, 69) 100%);',
              border: '1px solid #000',
              color: '#fff',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div
            className="profile-container"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button
              onClick={() => setShowProfileOptions(!showProfileOptions)}
              className="profile-button"
              style={{
                background: 'none',
                border: '1px solid #000',
                color: '#fff',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              Profile
            </button>
            {showProfileOptions && (
              <div
                className="profile-dropdown"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  zIndex: 1000,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                <button
                  onClick={() => {
                    setShowProfileOptions(false);
                    navigate('/edit-profile');
                  }}
                  className="dropdown-item"
                  style={{
                    display: 'block',
                    padding: '10px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setShowProfileOptions(false);
                    handleLogout();
                  }}
                  className="dropdown-item"
                  style={{
                    display: 'block',
                    padding: '10px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
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

// Main App component
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by updating a class on the body element
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