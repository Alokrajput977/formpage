import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const boxColumns = {
  1: {
    heading: "Factory Stuffing (Container sent from ICD)",
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
      "Loading Yard Location", // Changed from duplicate "Yard Location"
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
    heading: "Factory Stuffing (Directly Loaded arrived at ICD)",
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
    heading: "Empty Export (Either Containers arrived at ICD)",
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState("all"); // Options: "all", "day", "week", "month"

  const selectedBox = boxColumns[boxId];

  useEffect(() => {
    if (selectedBox) {
      // For filtering, add a "date" property to each row.
      // getISODate returns an ISO string offset by a given number of days.
      const today = new Date();
      const getISODate = (offsetDays) => {
        const d = new Date(today);
        d.setDate(d.getDate() - offsetDays);
        return d.toISOString();
      };

      // Create dummy data matching the exact column names of the selected box.
      // For box 1, we have 20 columns.
      const dummyData = [
        {
          "S.No": 1,
          "Container number": "C123456",
          "Size": "40ft",
          "Yard Location": "Yard A",
          "Empty Permit No": "EP001",
          "Trailer No": "T001",
          "Empty Container Gate Out": "08:00 AM",
          "Loaded Permit": "LP001",
          "Loaded Gated In": "08:30 AM",
          "Loading Yard Location": "Yard B",
          "Loading Container from Yard To ITV": "09:00 AM",
          "CGO Date & Time": "2025-04-06T09:00:00Z",
          "Seal No": "S001",
          "Container Status": "Full",
          "Loading on wagon Dt & time": "09:30 AM",
          "Equipment used": "Crane",
          "Wagon No": "WGN001",
          "Rake No": "R001",
          "Train No": "TN001",
          "Train Dep Dt & Time": "10:00 AM",
          date: getISODate(1),
        },
        {
          "S.No": 2,
          "Container number": "C654321",
          "Size": "20ft",
          "Yard Location": "Yard C",
          "Empty Permit No": "EP002",
          "Trailer No": "T002",
          "Empty Container Gate Out": "09:00 AM",
          "Loaded Permit": "LP002",
          "Loaded Gated In": "09:30 AM",
          "Loading Yard Location": "Yard D",
          "Loading Container from Yard To ITV": "10:00 AM",
          "CGO Date & Time": "2025-04-04T09:00:00Z",
          "Seal No": "S002",
          "Container Status": "Empty",
          "Loading on wagon Dt & time": "10:30 AM",
          "Equipment used": "Forklift",
          "Wagon No": "WGN002",
          "Rake No": "R002",
          "Train No": "TN002",
          "Train Dep Dt & Time": "11:00 AM",
          date: getISODate(3),
        },
        {
          "S.No": 3,
          "Container number": "C789012",
          "Size": "40ft",
          "Yard Location": "Yard E",
          "Empty Permit No": "EP003",
          "Trailer No": "T003",
          "Empty Container Gate Out": "10:00 AM",
          "Loaded Permit": "LP003",
          "Loaded Gated In": "10:30 AM",
          "Loading Yard Location": "Yard F",
          "Loading Container from Yard To ITV": "11:00 AM",
          "CGO Date & Time": "2025-03-27T09:00:00Z",
          "Seal No": "S003",
          "Container Status": "Full",
          "Loading on wagon Dt & time": "11:30 AM",
          "Equipment used": "Loader",
          "Wagon No": "WGN003",
          "Rake No": "R003",
          "Train No": "TN003",
          "Train Dep Dt & Time": "12:00 PM",
          date: getISODate(10),
        },
      ];

      setData(dummyData);
      setLoading(false);
    }
  }, [boxId, selectedBox]);

  // Filter the data using the "date" property.
  const getFilteredData = () => {
    if (filterType === "all") return data;
    const now = new Date();
    return data.filter((row) => {
      if (!row.date) return false;
      const rowDate = new Date(row.date);
      const diffTime = now.getTime() - rowDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      if (filterType === "day") return Math.floor(diffDays) === 1;
      if (filterType === "week") return diffDays >= 0 && diffDays < 7;
      if (filterType === "month") return diffDays >= 0 && diffDays < 30;
      return true;
    });
  };

  const exportToExcel = () => {
    const filteredData = getFilteredData();
    // Format the filtered data in the same order as the header.
    const formattedData = filteredData.map((row) =>
      selectedBox.columns.map((col) => row[col] || '')
    );
    // Prepend the header row.
    const worksheetData = [selectedBox.columns, ...formattedData];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${selectedBox.heading}.xlsx`);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  if (!selectedBox) {
    return <div>No data for this box. Please select a valid box.</div>;
  }

  const filteredData = getFilteredData();

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="dashboard-header">
        <h1>{selectedBox.heading}</h1>
        <div className="header-btns">
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={exportToExcel} className="export-btn">
            Download Excel
          </button>
        </div>
      </header>

      <div className="filter-btns">
        <button
          className={`filter-btn ${filterType === "day" ? "active" : ""}`}
          onClick={() => setFilterType("day")}
        >
          1 Day
        </button>
        <button
          className={`filter-btn ${filterType === "week" ? "active" : ""}`}
          onClick={() => setFilterType("week")}
        >
          1 Week
        </button>
        <button
          className={`filter-btn ${filterType === "month" ? "active" : ""}`}
          onClick={() => setFilterType("month")}
        >
          1 Month
        </button>
        <button
          className={`filter-btn ${filterType === "all" ? "active" : ""}`}
          onClick={() => setFilterType("all")}
        >
          Show All
        </button>
      </div>

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
                  Loading data...
                </td>
              </tr>
            ) : filteredData && filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() =>
                    navigate(`/dashboard/${boxId}/row/${rowIndex}`, { state: row })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {selectedBox.columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col] || '-'}</td>
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
        .dashboard-container {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: background-color 0.3s, color 0.3s;
          margin: 0;
          padding: 0;
          background: url('https://cdn.pixabay.com/photo/2019/05/08/11/10/port-4188383_1280.jpg') no-repeat center center fixed;
          background-size: cover;
        }
        .dashboard-container.light {
          background-color: #f5f5f5;
          color: #333;
        }
        .dashboard-container.dark {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: ${darkMode ? '#222' : 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .dashboard-header h1 {
          margin: 0;
          font-size: 1.8rem;
          text-align: center;
          flex: 1;
        }
        .header-btns {
          display: flex;
          gap: 10px;
        }
        .toggle-btn,
        .export-btn {
          background: transparent;
          border: 2px solid ${darkMode ? '#f5f5f5' : '#fff'};
          color: ${darkMode ? '#f5f5f5' : '#fff'};
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, color 0.3s;
        }
        .toggle-btn:hover,
        .export-btn:hover {
          background: ${darkMode ? '#f5f5f5' : '#fff'};
          color: ${darkMode ? '#222' : '#333'};
        }
        .filter-btns {
          display: flex;
          gap: 10px;
          padding: 1rem 2rem;
          align-items: center;
        }
        .filter-btn {
          background: transparent;
          border: 2px solid ${darkMode ? '#f5f5f5' : '#333'};
          color: ${darkMode ? '#f5f5f5' : '#333'};
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, color 0.3s;
        }
        .filter-btn.active,
        .filter-btn:hover {
          background: ${darkMode ? '#f5f5f5' : '#333'};
          color: ${darkMode ? '#222' : '#fff'};
        }
        .table-wrapper {
          padding: 2rem 3rem;
          overflow-x: auto;
        }
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

export default Dashboard;
