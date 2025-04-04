// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Dashboard = () => {
  const { boxId } = useParams();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState("all"); // "all", "day", "week", "month"

  // Define column headers for each box id
  console.log(data)
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

  const selectedBox = boxColumns[boxId];

  useEffect(() => {
    if (selectedBox) {
      setLoading(true);
      fetch(`http://localhost:5000/api/Table/${boxId}`)
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
  

  // Function to download the table data as an Excel file
  const downloadExcel = () => {
    if (apiData && apiData.length > 0) {
      // Prepare data: header row followed by the API data rows
      const worksheetData = [selectedBox.columns, ...apiData];
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // Create a buffer and trigger the download
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(dataBlob, "data.xlsx");
    } else {
      alert("No data available to export.");
    }
  };

  

  // Filtering function assumes that each data row has a date property.
  // For this example, we use the "CGO Date & Time" field as the date.
  const getFilteredData = () => {
    if (filterType === "all") return apiData;

    const now = new Date();
    return apiData.filter((row) => {
      const dateString = row["CGO Date & Time"];
      if (!dateString) return false;
      const rowDate = new Date(dateString);
      const diffTime = now.getTime() - rowDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (filterType === "day") {
        // Exactly 1 day old (yesterday)
        return Math.floor(diffDays) === 1;
      } else if (filterType === "week") {
        // Within the last 7 days
        return diffDays >= 0 && diffDays < 7;
      } else if (filterType === "month") {
        // Within the last 30 days
        return diffDays >= 0 && diffDays < 30;
      }
      return true;
    });
  };

  // Get the data to display based on filter
  const filteredData = getFilteredData();

  if (!selectedBox) {
    return <div>No data for this box. Please select a valid box.</div>;
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="dashboard-header">
        <h1>{selectedBox.heading}</h1>
        <div className="header-btns">
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={downloadExcel} className="toggle-btn">
            Download Excel
          </button>
        </div>
      </header>

      {/* Filter buttons added above the table */}
      <div className="filter-btns">
        <button
          className={`filter-btn ${filterType === 'day' ? 'active' : ''}`}
          onClick={() => setFilterType('day')}
        >
          1 Day
        </button>
        <button
          className={`filter-btn ${filterType === 'week' ? 'active' : ''}`}
          onClick={() => setFilterType('week')}
        >
          1 Week
        </button>
        <button
          className={`filter-btn ${filterType === 'month' ? 'active' : ''}`}
          onClick={() => setFilterType('month')}
        >
          1 Month
        </button>
        <button
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
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
                  Loading API data...
                </td>
              </tr>
            ) : filteredData && filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {selectedBox.columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col] || ''}</td>
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
          background: url('https://cdn.pixabay.com/photo/2019/05/08/11/10/port-4188383_1280.jpg') no-repeat center center fixed;
          background-size: cover;
          padding: 0;
          margin: 0;
        }
        .dashboard-container.light {
          background-color: rgba(245,245,245,0.85);
          color: #333;
        }
        .dashboard-container.dark {
          background-color: rgba(30,30,30,0.85);
          color: #f5f5f5;
        }
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
        .header-btns button {
          margin-left: 0.5rem;
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
        .filter-btns {
          display: flex;
          gap: 10px;
          padding: 1rem 2rem;
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
