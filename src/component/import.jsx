import React, { useState, useEffect } from 'react';
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
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="e-card playing"
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => navigate(`/dashboard/${card.id}`)}
          >
            <div className="image" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="infotop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="icon"
              >
                <path
                  fill="currentColor"
                  d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
                ></path>
              </svg>
              <br />
              {card.title}
              <br />
              <div className="name"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Import = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

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
        .cards-page-wrapper {
          background-color: rgb(230, 213, 208);
          color: #333;
          min-height: 100vh;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        body.dark .cards-page-wrapper {
          background-color: #121212;
          color: #ccc;
        }
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: background 0.3s ease;
        }
        body.dark .app-header {
          background: linear-gradient(90deg, #2c3e50 0%, rgb(0, 0, 0) 50%, #2c3e50 100%);
        }
        .app-header h1 {
          color: #fff;
          margin: 0;
          font-size: 2rem;
        }
        .header-buttons {
          display: flex;
          gap: 10px;
        }
        .header-buttons button {
          background: transparent;
          color: #fff;
          border: 1px solid white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.4s ease-in-out;
          letter-spacing: 1px;
          font-weight: bold;
          position: relative;
          overflow: hidden;
        }
        .header-buttons button:hover {
          background: black;
          color: #fff;
          border: 1px solid #000;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        }
        .header-buttons button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: white;
          transition: all 0.4s ease-in-out;
          z-index: -1;
        }
        .header-buttons button:hover::before {
          left: 0;
        }
        .cards-container {
          text-align: center;
          padding: 2rem;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          justify-items: center;
        }
        .e-card {
          margin: 0 auto;
          background: transparent;
          box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
          position: relative;
          width: 240px;
          height: 330px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          animation: fadeIn 0.8s ease forwards;
          opacity: 0;
        }
        .e-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 8px 16px rgba(0,0,0,0.5);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .image {
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .wave {
          position: absolute;
          width: 540px;
          height: 700px;
          opacity: 0.6;
          left: 0;
          top: 0;
          margin-left: -50%;
          margin-top: -70%;
          background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
          border-radius: 40%;
          animation: wave 55s infinite linear;
        }
        .wave:nth-child(2),
        .wave:nth-child(3) {
          top: 210px;
        }
        .playing .wave {
          border-radius: 40%;
          animation: wave 3000ms infinite linear;
        }
        .playing .wave:nth-child(2) {
          animation-duration: 4000ms;
        }
        .wave:nth-child(2) {
          animation-duration: 50s;
        }
        .playing .wave:nth-child(3) {
          animation-duration: 5000ms;
        }
        .wave:nth-child(3) {
          animation-duration: 45s;
        }
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .icon {
          width: 3em;
          margin-top: -1em;
          padding-bottom: 1em;
        }
        .infotop {
          text-align: center;
          font-size: 20px;
          position: absolute;
          top: 5.6em;
          left: 0;
          right: 0;
          color: #fff;
          font-weight: 600;
        }
        .name {
          font-size: 14px;
          font-weight: 100;
          position: relative;
          top: 1em;
          text-transform: lowercase;
        }
        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .e-card {
            width: 250px;
            height: 350px;
          }
          .app-header h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Import;
