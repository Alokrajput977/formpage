import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const boxColumns = {
  1: {
    heading: "Factory Destuffing Cycle",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "ITV No Used",
      "IWH Placement  Dt & Tm",
      "IWH Stack Loc",
      "GPC No",
      "GPC Date",
      "Ctr Loading Date & Time",
      "Trlr No",
      "Gate Departure Date & Time",
      "Gate Arrival Date & Time",
    ],
  },
  2: {
    heading: "Warehouse Destuffing Cycle (FCL)",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "ITV No Used",
      "IWH Placement  Dt & Tm",
      "IWH Stack Loc",
      "Destuffing Dt & Time",
      "Space Occupied",
      "WH Slot Id",
      "Destuffing Cargo Count",
      "Destuffing tally sheet",
      "Last GPM",
      "Delivery Cargo count",
      "Space Freed",
      "Last Cargo Delivery Tally sheet",
      "Last Truck Nos",
      "Last XPM",
      "Last Cargo Gate Out",
    ],
  },
  3: {
    heading: "Warehouse Destuffing Cycle (LCL)",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "ITV No Used",
      "IWH Placement  Dt & Tm",
      "IWH Stack Loc",
      "Destuffing Dt & Time",
      "Space Occupied",
      "WH Slot Id",
      "Destuffing Cargo Count",
      "Destuffing tally sheet",
      "Last GPM",
      "Delivery Cargo count",
      "Space Freed",
      "Last Cargo Delivery Tally sheet",
      "Last Truck Nos",
      "Last XPM",
      "Last Cargo Gate Out",
    ],
  },
  4: {
    heading: "Direct Destuffing Cycle",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "ITV No Used",
      "IWH Placement  Dt & Tm",
      "IWH Stack Loc",
      "Loading tally sheet",
      "Loading Cargo count",
      "GPM",
      "Last XPM",
      "Last Truck Nos",
      "Last Cargo Gate Out",
    ],
  },
  5: {
    heading: "CFS Destuffing",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "Loading Dt & TM",
      "PMD No",
      "PMD Date",
      "Trlr No",
      "Gate Out",
    ],
  },
  6: {
    heading: "Bonding Destuffing",
    columns: [
      "S.No",
      "Container number",
      "Size",
      "Ctr Status",
      "Rake/ Train No",
      "Seal No",
      "Container Condition Status",
      "Equipment used on offloading",
      "Wgn No",
      "Offloading Dt & Time from Wagon",
      "ITV No Used",
      "CGI Dt & time",
      "CHE used",
      "Offloading Yard Location",
      "Offloading Yard Dt & Time",
      "Equipment ID used",
      "ITV No Used",
      "IWH Placement  Dt & Tm",
      "IWH Stack Loc",
      "Destuffing Dt & Time",
      "Space Occupied",
      "WH Slot Id",
      "Destuffing Cargo count",
      "Destuffing tally sheet",
      "Last GPB",
      "Delivery cargo count",
      "Space Freed",
      "Last Cargo Delivery Tally sheet",
      "Last Truck Nos",
      "Last XPM",
      "Last Cargo Gate Out",
    ],
  },
};

const Dashboard = () => {
  const { boxId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState("all"); // "all", "day", "week", "month"

  const selectedBox = boxColumns[boxId];

  useEffect(() => {
    if (selectedBox) {
      // Sample data with a new "date" property added.
      const today = new Date();
      const getISODate = (offsetDays) => {
        const d = new Date(today);
        d.setDate(d.getDate() - offsetDays);
        return d.toISOString();
      };

      setData([
        {
          "S.No": 1,
          "Container number": "C123456",
          "Size": "40ft",
          "Ctr Status": "Full",
          // ... other fields as needed,
          // For demonstration, this row is from yesterday.
          date: getISODate(1),
        },
        {
          "S.No": 2,
          "Container number": "C654321",
          "Size": "20ft",
          "Ctr Status": "Empty",
          // This row is from 3 days ago.
          date: getISODate(3),
        },
        {
          "S.No": 3,
          "Container number": "C789012",
          "Size": "40ft",
          "Ctr Status": "Full",
          // This row is from 10 days ago.
          date: getISODate(10),
        },
      ]);
      setLoading(false);
    }
  }, [boxId, selectedBox]);

  // Filter the data based on the selected filter type.
  const getFilteredData = () => {
    if (filterType === "all") return data;

    const now = new Date();
    return data.filter((row) => {
      if (!row.date) return false;
      const rowDate = new Date(row.date);
      const diffTime = now.getTime() - rowDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (filterType === "day") {
        // Only rows from exactly yesterday.
        return Math.floor(diffDays) === 1;
      } else if (filterType === "week") {
        // Rows from the last 7 days (including today).
        return diffDays >= 0 && diffDays < 7;
      } else if (filterType === "month") {
        // Rows from the last 30 days.
        return diffDays >= 0 && diffDays < 30;
      }
      return true;
    });
  };

  const exportToExcel = () => {
    const filteredData = getFilteredData();
    // Create a worksheet from the filtered data
    const ws = XLSX.utils.json_to_sheet(filteredData);
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Generate a file name based on the selected box heading
    const fileName = `${selectedBox.heading}.xlsx`;
    // Trigger the file download
    XLSX.writeFile(wb, fileName);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
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

      {/* Filter buttons placed above the table on the left side */}
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
                  onClick={() => navigate(`/dashboard/${boxId}/row/${rowIndex}`, { state: row })}
                  style={{ cursor: 'pointer' }}
                >
                  {selectedBox.columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
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
