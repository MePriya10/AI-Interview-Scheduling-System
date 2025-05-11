// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If user is logged in, render the protected content
};

export default ProtectedRoute;

