import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      <h1>Cargo Container</h1>
      <div className="header-buttons">
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </header>
  );
};

const Card = ({ title, id, onClick }) => {
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
      // Ease toward the current mouse position
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
    <div
      className="card-item"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="block" ref={blockRef}>
        <span className="circleLight"></span>
        <div className="text">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const cards = [
    { id: 1, title: 'Factory Destuffing Cycle' },
    { id: 2, title: 'Warehouse Destuffing Cycle (FCL)' },
    { id: 3, title: 'Warehouse Destuffing Cycle (LCL)' },
    { id: 4, title: 'Direct Destuffing Cycle' },
    { id: 5, title: 'CFS Destuffing' },
    { id: 6, title: 'Bonding Destuffing' },
  ];

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            id={card.id}
            onClick={() => navigate(`/dashboard/${card.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const Import = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="cards-page-wrapper">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Cards />
      <style>{`
        /* Base resets */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Open Sans', sans-serif;
          /* Single background image for the entire body */
          background: url('https://cdn.pixabay.com/photo/2021/12/06/10/55/hamburg-6849995_1280.jpg') no-repeat center center fixed;
          background-size: cover;
          color: #333;
        }
        body.dark {
          color: #ccc;
        }
        .cards-page-wrapper {
          min-height: 100vh;
          padding: 20px;
          background: transparent;
        }
        /* Transparent, blurred header */
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
        .header-buttons button {
          background: transparent;
          border: 1px solid currentColor;
          color: inherit;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 10px;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .header-buttons button:hover {
          background: rgba(0,0,0,0.1);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        /* Cards grid */
        .cards-container {
          padding-top: 100px; /* Space for fixed header */
          display: flex;
          justify-content: center;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 boxes per row */
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
          height: 300px; /* Increased card height */
          border-radius: 16px;
          overflow: hidden;
          /* Glassmorphism effect: semi-transparent background with blur */
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: background 0.5s, backdrop-filter 0.5s, box-shadow 0.5s, transform 0.5s;
          box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
        }
        /* On hover, remove the glass effect to unhide the background image */
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
        .text {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
          z-index: 1;
        }
        .text h2 {
          margin: 0;
          font-size: 22px;
          font-family: 'Oswald', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Import;
