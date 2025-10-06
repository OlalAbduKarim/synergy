
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to a relevant dashboard or an unauthorized page
    const homeRoute = user.role === UserRole.CANDIDATE ? '/candidate/dashboard' : '/employer/dashboard';
    return <Navigate to={homeRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
