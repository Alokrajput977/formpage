import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './Protected';
import { 
  FaBoxOpen, FaTruck, FaShippingFast, FaClipboardList, FaCogs, FaTruckMoving, 
  FaUser, FaSun, FaMoon 
} from 'react-icons/fa';


const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} className="back-btn">Back</button>
        )}
      </div>
      <h1>Cargo Container</h1>
      <div className="header-right">
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
        </button>
        <div className="profile-container">
          <button onClick={() => setShowProfileOptions(!showProfileOptions)} className="profile-btn">
            <FaUser /> Profile
          </button>
          {showProfileOptions && (
            <div className="profile-dropdown">
              <button onClick={() => { setShowProfileOptions(false); navigate('/edit-profile'); }}>
                Edit_Profile
              </button>
              <button onClick={() => { setShowProfileOptions(false); handleLogout(); }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* Home Component – displays two card links for Import and Export with similar box sizes, big font icons,
   and hover effects that remove the default background to show an image */
const Home = () => (
  <div className="home">
    <div className="card-container">
      <Link to="/import" className="card-link import-card">
        <div className="card">
          <div className="icon">
            <FaBoxOpen className="card-icon" />
          </div>
          <div className="card-content">
            <h2>Import</h2>
          </div>
        </div>
      </Link>
      <Link to="/export" className="card-link export-card">
        <div className="card">
          <div className="icon">
            <FaTruckMoving className="card-icon" />
          </div>
          <div className="card-content">
            <h2>Export</h2>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

/* Export Page Component */
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

/* Edit Profile Component */
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

/* Animated Card Component – used in the Import page */
const Card = ({ title, id, icon, onClick }) => {
  const blockRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (blockRef.current) {
      const rect = blockRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;
      setMouse({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      offsetRef.current.x += (mouse.x - offsetRef.current.x) / 12;
      offsetRef.current.y += (mouse.y - offsetRef.current.y) / 12;
      if (blockRef.current) {
        blockRef.current.style.transform = `scale(1.03) translate(${offsetRef.current.x * 0.05}px, ${offsetRef.current.y * 0.05}px) rotateX(${offsetRef.current.y * 0.05}deg) rotateY(${offsetRef.current.x * 0.05}deg)`;
        const circleLight = blockRef.current.querySelector('.circleLight');
        if (circleLight) {
          circleLight.style.background = `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.6), transparent)`;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  return (
    <div className="card-item" onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="block" ref={blockRef}>
        <span className="circleLight"></span>
        <div className="icon-container">{icon}</div>
        <div className="text">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

/* Import Page Component – uses the full UI design with animated cards */
const ImportPage = () => {
  const navigate = useNavigate();
  const cards = [
    { id: 1, title: 'Factory Destuffing Cycle', icon: <FaBoxOpen /> },
    { id: 2, title: 'Warehouse Destuffing Cycle (FCL)', icon: <FaTruck /> },
    { id: 3, title: 'Warehouse Destuffing Cycle (LCL)', icon: <FaShippingFast /> },
    { id: 4, title: 'Direct Destuffing Cycle', icon: <FaClipboardList /> },
    { id: 5, title: 'CFS Destuffing', icon: <FaCogs /> },
    { id: 6, title: 'Bonding Destuffing', icon: <FaTruckMoving /> },
  ];

  return (
    <div className="import-page">
      <div className="cards-container">
        <div className="cards-grid">
          {cards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              id={card.id}
              icon={card.icon}
              onClick={() => navigate(`/dashboard/${card.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* Global Styles – includes resets, header/card design, and Home card modifications for hover background images */
const GlobalStyles = () => (
  <style>{`
    /* Base resets */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Open Sans', sans-serif;
      background: url('https://cdn.pixabay.com/photo/2021/12/06/10/55/hamburg-6849995_1280.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #333;
    }
    body.dark {
      color: #ccc;
    }
    .app {
      min-height: 100vh;
      padding: 20px;
      background: transparent;
    }
    /* Header styles */
    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    body.dark .app-header {
      background: rgba(0, 0, 0, 0.3);
    }
    .app-header h1 {
      margin: 0;
      color: inherit;
    }
    .header-left, .header-right {
      display: flex;
      align-items: center;
    }
    .dark-mode-btn, .back-btn, .profile-btn {
      background: transparent;
      border: 1px solid currentColor;
      color: inherit;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      margin-left: 10px;
      transition: background 0.3s, box-shadow 0.3s;
    }
    .dark-mode-btn:hover, .back-btn:hover, .profile-btn:hover {
      background: rgba(0,0,0,0.1);
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    .profile-container {
      position: relative;
    }
    .profile-dropdown {
      position: absolute;
      top: 160%;
      right: 0;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(5px);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .profile-dropdown button {
      display: block;
      width: 100%;
      padding: 1rem 3rem;
      border: none;
      background: transparent;
      text-align: left;
      cursor: pointer;
    }
    .profile-dropdown button:hover {
      background: rgba(0,0,0,0.3);
    }
    /* Home Page Styles */
    .home {
      padding-top: 120px;
      display: flex;
      justify-content: center;
    }
    .card-container {
      display: flex;
      gap: 20px;
    }
    .card-link {
      text-decoration: none;
    }
    /* Updated card styles for similar sized Import/Export boxes with increased width (120% of 300px → 360px) */
    .card {
      position: relative;
      background: rgba(255,255,255,0.3);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 20px;
      color: inherit;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: background 0.3s;
      width: 460px;
      height: 400px;
      overflow: hidden;
    }
    /* Home card icon and text positioning */
    .card .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
    }
    .card .card-icon {
      font-size: 140px;
      color: #fff;
    }
    .card .card-content {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
    }
    .card:hover {
      /* Remove the translucent background on hover and add extra effects */
      background: transparent;
      backdrop-filter: blur(0px);
      box-shadow: 0 0 70px rgba(0,0,0,0.6);
    }
    /* Specific hover backgrounds for each card */
    .import-card .card:hover {
      background: url('https://cdn.pixabay.com/photo/2016/11/29/05/08/ship-1869158_1280.jpg') no-repeat center center;
      background-size: cover;
      backdrop-filter: blur(0px);
      box-shadow: 0 0 70px rgba(0,0,0,0.6);
    }
    .export-card .card:hover {
      background: url('https://cdn.pixabay.com/photo/2017/06/15/14/47/container-2404366_1280.jpg') no-repeat center center;
      background-size: cover;
      backdrop-filter: blur(0px);
      box-shadow: 0 0 70px rgba(0,0,0,0.6);
    }
    /* Page content styles */
    .page {
      padding-top: 120px;
      text-align: center;
    }
    .back-button {
      margin-top: 20px;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background: rgba(0,0,0,0.1);
    }
    /* Import Page animated cards */
    .cards-container {
      padding-top: 100px;
      display: flex;
      justify-content: center;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
      max-width: 1200px;
      margin: auto;
    }
    .card-item {
      cursor: pointer;
      perspective: 1000px;
    }
    .block {
      position: relative;
      width: 100%;
      height: 300px;
      border-radius: 16px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      transition: background 0.5s, backdrop-filter 0.5s, box-shadow 0.5s, transform 0.5s;
      box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
    }
    .block:hover {
      background: transparent;
      backdrop-filter: blur(0px);
      box-shadow: 0 0 70px rgba(0,0,0,0.6);
    }
    .circleLight {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s;
      border-radius: 16px;
    }
    .block:hover .circleLight {
      opacity: 0.4;
    }
    .icon-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 80px;
      pointer-events: none;
      z-index: 2;
    }
    .text {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
      z-index: 3;
    }
    .text h2 {
      margin: 0;
      font-size: 22px;
      font-family: 'Oswald', sans-serif;
    }
  `}</style>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="app">
      <GlobalStyles />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
