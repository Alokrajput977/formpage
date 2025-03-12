import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './component/First';
import Second from './component/Second';
import ProtectedRoute from "./component/Protected";
import Import from "./component/import"
import Export from './component/Export';
import Dashboard from './component/dashboard';
import Table from './component/dashboardt';
import RowDetails from './component/row';
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Sunic Copyright © All Rights Reserved.</p>
    </footer>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<First />} />

          {/* Protected Routes */}
          <Route
            path="/second"
            element={
              <ProtectedRoute>
                <Second />
              </ProtectedRoute>
            }
          />
          <Route
            path="/import"
            element={
              <ProtectedRoute>
                <Import />
              </ProtectedRoute>
            }
          />
          <Route
            path="/export"
            element={
              <ProtectedRoute>
                <Export />
              </ProtectedRoute>
            }
          />


          <Route
            path="/dashboard/:boxId"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/table/:boxId"
            element={
              <ProtectedRoute>
                <Table />
              </ProtectedRoute>
            }
          />

          <Route
            path="//dashboard/:boxId/row/:rowId"
            element={
              <ProtectedRoute>
                <RowDetails />
              </ProtectedRoute>
            }
          />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;