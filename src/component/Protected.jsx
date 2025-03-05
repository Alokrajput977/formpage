import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for a valid token in localStorage
  const token = localStorage.getItem('token');
  // If token exists, render the children components; otherwise, redirect to login
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
