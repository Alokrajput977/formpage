import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
const Header = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-content">
        {/* Show back button when not on home */}
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} className="header-back-button ">Back</button>
        )}
        <h1 className="site-title">Cargo Container</h1>
        <button onClick={toggleDarkMode} className="toggle-button">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by adding a class to the body element
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
        <Route path="/" element={<Home />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </div>
  );
}

export default App;
