import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <h1>Cargo Containor</h1>
      <div className="header-buttons">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </header>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const cards = [
    { id: 1, title: 'Factory Stuffing (Container sent from ICD)' },
    { id: 2, title: 'Factory Stuffing (Directly Loaded arrived at ICD)' },
    { id: 3, title: 'Empty Export (Either Containers arrived at ICD)' },
    { id: 4, title: 'Warehouse Stuffing (FCL & LCL)' },
    { id: 5, title: 'Direct Stuffing (FCL)' },
  ];
  return (
    <div className="cards-container">
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="e-card playing"
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => navigate(`/table/${card.id}`)}
          >
            <div className="image"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="infotop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="icon"
              >
                <path
                  fill="currentColor"
                  d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862ZM4.10784 14.7235V9.2763C4.10784 8.20928 4.6955 7.21559 5.64066 6.68166L10.4676 3.95848C10.9398 3.69152 11.4701 3.55804 11.9996 3.55804C12.5291 3.55804 13.0594 3.69152 13.5324 3.95848L18.3593 6.68166C19.3045 7.21476 19.8922 8.20928 19.8922 9.2763V9.75997C19.1426 9.60836 18.377 9.53091 17.6022 9.53091C14.7929 9.53091 12.1041 10.5501 10.0309 12.3999C8.36735 13.8847 7.21142 15.8012 6.68783 17.9081L5.63981 17.3165C4.69466 16.7834 4.10699 15.7897 4.10699 14.7235H4.10784ZM10.4676 20.0413L8.60933 18.9924C8.94996 17.0479 9.94402 15.2665 11.4515 13.921C13.1353 12.4181 15.3198 11.5908 17.6022 11.5908C18.3804 11.5908 19.1477 11.6864 19.8922 11.8742V14.7235C19.8922 15.2278 19.7589 15.7254 19.5119 16.1662C18.7615 15.3596 17.6806 14.8528 16.4783 14.8528C14.2136 14.8528 12.3781 16.6466 12.3781 18.8598C12.3781 19.3937 12.4861 19.9021 12.68 20.3676C11.9347 20.5316 11.1396 20.4203 10.4684 20.0413H10.4676Z"
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

// Optional detail page if you navigate inside /export/cards/:id 
// (Currently, we navigate to /dashboard/cards/:id, so you may not use this)
const CardDetail = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setApiData({ message: `Here is your API data for card ${id}!` });
    }, 1000);
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="detail-card">
        <h2>Detail for Card {id}</h2>
        {apiData ? (
          <p>{apiData.message}</p>
        ) : (
          <p>Loading API data...</p>
        )}
      </div>
    </div>
  );
};

const Export = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`cards-page-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Routes>
        {/* Main Cards listing at /export */}
        <Route path="/" element={<Cards />} />
        {/* Optional detail route at /export/cards/:id */}
        <Route path="cards/:id" element={<CardDetail />} />
      </Routes>

      <style>{`
        /* Global page styling */
        .cards-page-wrapper {
          background-color: #f5f5f5;
          color: #333;
          min-height: 100vh;
          position: relative;
        }
        /* Header styling with gradient background */
        .app-header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          position: relative;
        }
        .app-header h1 {
          color: white;
          margin: 0;
          font-size: 2rem;
        }
        /* Header buttons */
        .header-buttons {
          position: absolute;
          right: 1rem;
          display: flex;
          gap: 1rem;
        }
      .header-buttons button {
  background: transparent;
  color: #fff;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s ease-in-out; /* Smooth transition */
  letter-spacing: 1px; /* Slight spacing for modern look */
  font-weight: bold;
  position: relative;
  overflow: hidden; /* For hover background effect */
}

.header-buttons button:hover {
  background: black; /* Background color on hover */
  color: #fff; /* Text color on hover */
  border: 1px solid #000; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); /* Attractive shadow */
}

.header-buttons button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: white; 
  transition: all 0.4s ease-in-out; /* Sliding background effect */
  z-index: -1; 
}

.header-buttons button:hover::before {
  left: 0; /* Slide the background from left to right */
}

        /* Cards container styling */
        .cards-container {
          text-align: center;
          padding: 2rem;
        }
        /* Grid: 3 columns for the first row and auto-place remaining boxes */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          justify-items: center;
        }
        /* Card styling */
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
        /* Gradient waves styling */
        .wave {
          position: absolute;
          width: 540px;
          height: 700px;
          opacity: 0.6;
          left: 0;
          top: 0;
          margin-left: -50%;
          margin-top: -70%;
          background: linear-gradient(90deg, rgb(8, 86, 189) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
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
        /* Detail page styling */
        .detail-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .detail-card {
          background: #f0f0f0;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .back-btn {
          margin-bottom: 1rem;
          padding: 0.5rem 1rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        /* Dark mode styles */
        .dark-mode {
          background-color: #121212;
          color: #e0e0e0;
        }
        .dark-mode .app-header {
          background: linear-gradient(90deg, #333, #222, #111);
        }
        .dark-mode .header-buttons button {
          background: #444;
          color: #e0e0e0;
        }
        .dark-mode .detail-card {
          background: #333;
          color: #e0e0e0;
        }
        .dark-mode .back-btn {
          background: #444;
          color: #e0e0e0;
        }
        /* Responsive adjustments */
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

export default Export;