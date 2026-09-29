import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  const isChecking = isLoading || loading;

  if (isChecking) {
    return <LoadingSpinner message="Verifying secure credentials..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = (user?.role || '').toUpperCase();
  const allowed = allowedRoles?.map((r) => r.toUpperCase());

  const hasAccess = !allowed || allowed.some(
    (ar) => ar === role || ar === `ROLE_${role}` || `ROLE_${ar}` === role
  );

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
