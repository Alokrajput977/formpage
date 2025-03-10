import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const boxColumns = {
    1: {
        heading:
            "Factory Stuffing (Container sent from ICD )",
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
        heading:
            "Factory Stuffing (Directly Loaded arrived at ICD )",
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
        heading: "Empty Export(Either Containers arrived at ICD)",
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


const Dashboardt = () => {
    const { boxId } = useParams();
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);


    const selectedBox = boxColumns[boxId];

    useEffect(() => {
        if (selectedBox) {
            setLoading(true);
            fetch(`https://your-api-url.com/data/${boxId}`)
                .then((response) => {
                    if (!response.ok) {
                        console.log(response)
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
                            {selectedBox.columns.map((col) => (
                                <th key={col}>{col}</th>
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
                            apiData.map((row, index) => (
                                <tr key={index}>
                                    {selectedBox.columns.map((col) => (
                                        <td key={col}>{row[col] || ""}</td>
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

            <style>{`
        /* Global Container */
        .dashboard-container {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: background-color 0.3s, color 0.3s;
          margin: 0;
          padding: 0;
        }
        .dashboard-container.light {
          background-color: #f5f5f5;
          color: #333;
        }
        .dashboard-container.dark {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }

        /* Header Styling */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: ${darkMode ? '#222' : 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .dashboard-header h1 {
          margin: 0;
          font-size: 1.8rem;
          text-align: center;
          flex: 1;
        }
        .toggle-btn {
          background: transparent;
          border: 2px solid ${darkMode ? '#f5f5f5' : '#fff'};
          color: ${darkMode ? '#f5f5f5' : '#fff'};
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, color 0.3s;
        }
        .toggle-btn:hover {
          background: ${darkMode ? '#f5f5f5' : '#fff'};
          color: ${darkMode ? '#222' : '#333'};
        }

        /* Table Wrapper */
        .table-wrapper {
          padding: 2rem 3rem;
          overflow-x: auto;
        }

        /* Table Styling */
        .api-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .api-table th,
        .api-table td {
          padding: 1rem;
          border: 1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : '#ddd'};
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
          background: ${darkMode ? '#2e2e2e' : '#fff'};
        }
        .api-table tbody tr:hover {
          background: ${darkMode ? '#3a3a3a' : '#f3e5ff'};
          box-shadow: 0 4px 8px rgba(123, 47, 247, 0.3);
        }
      `}</style>

        </div>
    );
};

export default Dashboardt;
