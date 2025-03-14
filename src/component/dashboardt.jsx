import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const boxColumns = {
  1: {
    heading: "Factory Stuffing (Container sent from ICD )",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Yard Location",
      "Empty Permit No",
      "Trailer No",
      "Empty Container Gate Out",
      "Loaded Permit",
      "Loaded Gated In",
      "Yard Location",
      "Loading Container from Yard To ITV",
      "CGO Date & Time",
      "Seal No",
      "Container Status",
      "Loading on wagon Dt & time",
      "Equipment used",
      "Wagon No",
      "Rake No",
      "Train No",
      "Train Dep Dt & Time",
    ],
  },
  2: {
    heading: "Factory Stuffing (Directly Loaded arrived at ICD )",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Loaded Permit No",
      "Loaded Gated In",
      "Trailer No",
      "Yard Location",
      "Loading Container from Yard To ITV",
      "CGO Date & Time",
      "Seal No",
      "Container Status",
      "Loading on wagon Dt & time",
      "Equipment used",
      "Wagon No",
      "Rake No",
      "Train No",
      "Train Dep Dt & Time",
    ],
  },
  3: {
    heading: "Empty Export (Either Containers arrived at ICD by Road or Rail)",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Empty Permit No",
      "Empty Gated In",
      "Trailer No",
      "Yard Location",
      "Loading Container from Yard To ITV",
      "CGO Date & Time",
      "Container Status",
      "Loading on wagon Dt & time",
      "Equipment used",
      "Wagon No",
      "Rake No",
      "Train No",
      "Train Dep Dt & Time",
    ],
  },
  4: {
    heading: "Warehouse Stuffing (FCL & LCL)",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "First Loaded Truck Permit",
      "First Truck Gate In",
      "First Truck No",
      "First CRN No",
      "First Unloading tally sheet",
      "Wh Slot ID",
      "Space Used",
      "No. of packages",
      "Yard Location",
      "Empty Container Placement",
      "Stuffing Tally Sheet",
      "WH SLOT ID",
      "SPACE FREE",
      "Container Sealing",
      "Offloading into Yard",
      "CGO Date & Time",
      "Seal No",
      "Container Status",
      "Loading on wagon",
      "Equipment used",
      "Wagon No",
      "Rake No",
      "Train No",
      "Train Dep Dt & Time",
    ],
  },
  5: {
    heading: "Direct Stuffing (FCL)",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "First Loaded Truck Permit",
      "First Truck Gate In",
      "First Truck No",
      "First CRN No",
      "Yard Location",
      "Empty Container Placement",
      "Stuffing Tally Sheet",
      "Container Sealing",
      "Offloading into Yard",
      "CGO Date & Time",
      "Seal No",
      "Container Status",
      "Loading on wagon",
      "Equipment used",
      "Wagon No",
      "Rake No",
      "Train No",
      "Train Dep Dt & Time",
    ],
  },
};

const Dashboard = () => {
  const { boxId } = useParams();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const selectedBox = boxColumns[boxId];

  useEffect(() => {
    if (selectedBox) {
      setLoading(true);
      fetch(`http://localhost:5000/api/dashboard/${boxId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setApiData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [boxId, selectedBox]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (!selectedBox) {
    return <div>No data for this box. Please select a valid box.</div>;
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="dashboard-header">
        <h1>{selectedBox.heading}</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <div className="table-wrapper">
        <table className="api-table">
          <thead>
            <tr>
              {selectedBox.columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={selectedBox.columns.length} style={{ textAlign: 'center' }}>
                  Loading API data...
                </td>
              </tr>
            ) : apiData && apiData.length > 0 ? (
              apiData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {selectedBox.columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col] || ""}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={selectedBox.columns.length} style={{ textAlign: 'center' }}>
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Inline styles that depend on darkMode for dynamic styling */}
      <style>{`
        /* Dashboard Container with Background Image */
        .dashboard-container {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: background-color 0.3s, color 0.3s;
          background: url('https://cdn.pixabay.com/photo/2019/05/08/11/10/port-4188383_1280.jpg') no-repeat center center fixed;
          background-size: cover;
          padding: 0;
          margin: 0;
        }
        /* Overlay for readability */
        .dashboard-container.light {
          background-color: rgba(245,245,245,0.85);
          color: #333;
        }
        .dashboard-container.dark {
          background-color: rgba(30,30,30,0.85);
          color: #f5f5f5;
        }
        /* Header Styling */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: ${darkMode ? '#222' : 'rgba(0, 0, 0, 0.6)'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .dashboard-header h1 {
          margin: 0;
          font-size: 1.8rem;
          flex: 1;
          text-align: center;
          color: #fff;
        }
        .toggle-btn {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, color 0.3s;
        }
        .toggle-btn:hover {
          background: #fff;
          color: ${darkMode ? '#222' : '#333'};
        }
        /* Table Wrapper */
        .table-wrapper {
          padding: 2rem 3rem;
          overflow-x: auto;
        }
        /* Attractive Table Styling */
        .api-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          background-color: rgba(255,255,255,0.9);
          border-radius: 8px;
          overflow: hidden;
        }
        .api-table th,
        .api-table td {
          padding: 1rem;
          border: 1px solid #ddd;
          text-align: center;
          white-space: nowrap;
          transition: background 0.3s;
        }
        .api-table thead th {
          background: ${darkMode ? '#333' : '#7b2ff7'};
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
        }
        .api-table tbody tr {
          background: ${darkMode ? 'rgba(50,50,50,0.8)' : '#fff'};
        }
        .api-table tbody tr:nth-child(even) {
          background: ${darkMode ? 'rgba(45,45,45,0.8)' : '#f9f9f9'};
        }
        .api-table tbody tr:hover {
          background: ${darkMode ? 'rgba(60,60,60,0.8)' : '#f3e5ff'};
        }
      `}</style>
    </div>
  );
};

export default Dashboard;