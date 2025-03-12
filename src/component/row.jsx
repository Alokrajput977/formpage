import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const RowDetails = () => {
  const { boxId, rowId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state; 
  const [darkMode, setDarkMode] = useState(false);
  console.log(rowId);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleDownload = () => {
    const cardElement = document.querySelector('.details-card');
    if (cardElement) {
      // Create a temporary container with two copies of the card
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.gap = '20px';
      
      // Clone the details card twice
      const clone1 = cardElement.cloneNode(true);
      const clone2 = cardElement.cloneNode(true);
      
      container.appendChild(clone1);
      container.appendChild(clone2);
      
      // Position container off-screen so it doesn't affect layout
      container.style.position = 'absolute';
      container.style.top = '-10000px';
      document.body.appendChild(container);
      
      html2canvas(container).then(canvas => {
        const link = document.createElement('a');
        link.download = `row-details-${boxId}-${rowId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(container);
      });
    }
  };

  if (!rowData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: darkMode ? '#fff' : '#000' }}>
        <h2>No row data available.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={`row-details-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="details-header">
        <h1>Row Details - {boxId}</h1>
        <div className="header-buttons">
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </header>
      <div className="details-container">
        <div className="details-card">
          <h2>Detail Information</h2>
          <table className="details-table">
            <tbody>
              {Object.entries(rowData).map(([key, value], index) => (
                <tr key={index}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .row-details-page {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url('https://cdn.pixabay.com/photo/2019/05/08/11/10/port-4188383_1280.jpg') no-repeat center center fixed;
          background-size: cover;
          transition: background-color 0.3s, color 0.3s;
        }
        .row-details-page.light {
          background-color: #f5f5f5;
          color: #333;
        }
        .row-details-page.dark {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }
        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: ${darkMode ? '#222' : 'rgba(255,255,255,0.8)'};
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .details-header h1 {
          margin: 0;
          font-size: 1.8rem;
        }
        .header-buttons button {
          margin-left: 10px;
          padding: 0.5rem 1rem;
          border: 2px solid ${darkMode ? '#f5f5f5' : '#333'};
          background: transparent;
          color: ${darkMode ? '#f5f5f5' : '#333'};
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .header-buttons button:hover {
          background: ${darkMode ? '#f5f5f5' : '#333'};
          color: ${darkMode ? '#222' : '#fff'};
        }
        .details-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
        }
        .details-card {
          background: rgba(255, 255, 255, 0.8);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          width: 80%;
          max-width: 800px;
        }
        .row-details-page.dark .details-card {
          background: rgba(0, 0, 0, 0.8);
        }
        .details-card h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
        }
        .details-table th,
        .details-table td {
          padding: 10px;
          border: 1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : '#ddd'};
          text-align: left;
        }
        .details-table th {
          background: ${darkMode ? '#333' : '#7b2ff7'};
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default RowDetails;
