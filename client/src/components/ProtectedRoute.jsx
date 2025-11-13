// client/src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // While we're checking the auth status, show a loader
  if (loading) {
    return <Loader />;
  }

  // If the user is authenticated, render the child component (e.g., CreatePost page)
  // The <Outlet /> component is a placeholder for the actual page component.
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If the user is not authenticated, redirect them to the login page
  return <Navigate to="/login" />;
};

export default ProtectedRoute;