
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import CandidateDashboardPage from './pages/candidate/CandidateDashboardPage';
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';
import JobListPage from './pages/jobs/JobListPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import CandidateProfilePage from './pages/candidate/CandidateProfilePage';
import MyApplicationsPage from './pages/candidate/MyApplicationsPage';
import EmployerProfilePage from './pages/employer/EmployerProfilePage';
import JobManagementPage from './pages/employer/JobManagementPage';
import CreateEditJobPage from './pages/employer/CreateEditJobPage';
import ApplicationReviewPage from './pages/employer/ApplicationReviewPage';
import MessagesPage from './pages/messages/MessagesPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';
import { UserRole } from './types';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const getHomeRoute = () => {
    if (!isAuthenticated) return '/signin';
    return user?.role === UserRole.CANDIDATE ? '/candidate/dashboard' : '/employer/dashboard';
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to={getHomeRoute()} replace />} />
          
          {/* Candidate Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.CANDIDATE]} />}>
            <Route path="/candidate/dashboard" element={<CandidateDashboardPage />} />
            <Route path="/candidate/profile" element={<CandidateProfilePage />} />
            <Route path="/candidate/applications" element={<MyApplicationsPage />} />
          </Route>

          {/* Employer Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.EMPLOYER]} />}>
            <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
            <Route path="/employer/profile" element={<EmployerProfilePage />} />
            <Route path="/employer/jobs" element={<JobManagementPage />} />
            <Route path="/employer/jobs/new" element={<CreateEditJobPage />} />
            <Route path="/employer/jobs/:jobId/edit" element={<CreateEditJobPage />} />
            <Route path="/employer/jobs/:jobId/applications" element={<ApplicationReviewPage />} />
          </Route>

          {/* Shared Authenticated Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.CANDIDATE, UserRole.EMPLOYER]} />}>
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
