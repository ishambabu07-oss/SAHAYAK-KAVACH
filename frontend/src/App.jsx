import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CheckInProvider } from './context/CheckInContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Dynamic code-splitting for route pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const VictimDashboard = lazy(() => import('./pages/VictimDashboard'));
const CheckInPage = lazy(() => import('./pages/CheckInPage'));
const AuthorityDashboard = lazy(() => import('./pages/AuthorityDashboard'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CommunicationHub = lazy(() => import('./pages/CommunicationHub'));
const FeatureDashboard = lazy(() => import('./pages/FeatureDashboard'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));

function App() {
  return (
    <AuthProvider>
      <CheckInProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner message="Loading Sahayak Kavach..." />}>
              <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route
                path="/victim/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_VICTIM']}>
                    <VictimDashboard />
                  </ProtectedRoute>
                }
              />
              {['checkin', 'trends', 'support', 'settings'].map((view) => (
                <Route
                  key={view}
                  path={`/victim/dashboard/${view}`}
                  element={
                    <ProtectedRoute allowedRoles={['ROLE_VICTIM']}>
                      <VictimDashboard />
                    </ProtectedRoute>
                  }
                />
              ))}
              <Route
                path="/victim/dashboard/profile"
                element={<ProtectedRoute allowedRoles={['ROLE_VICTIM']}><ProfilePage /></ProtectedRoute>}
              />
              <Route
                path="/victim/checkin"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_VICTIM']}>
                    <CheckInPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/authority/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_COUNSELOR', 'ROLE_OFFICER']}>
                    <AuthorityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_COUNSELOR', 'ROLE_OFFICER', 'ROLE_DISTRICT_OFFICER', 'ROLE_STATE_NODAL']}>
                    <AuthorityDashboard />
                  </ProtectedRoute>
                }
              />
              {['cases', 'analytics', 'governance', 'admin'].map((view) => (
                <Route
                  key={view}
                  path={`/admin/dashboard/${view}`}
                  element={
                    <ProtectedRoute allowedRoles={['ROLE_COUNSELOR', 'ROLE_OFFICER', 'ROLE_DISTRICT_OFFICER', 'ROLE_STATE_NODAL']}>
                      <AuthorityDashboard />
                    </ProtectedRoute>
                  }
                />
              ))}
              <Route
                path="/admin/dashboard/profile"
                element={<ProtectedRoute allowedRoles={['ROLE_COUNSELOR', 'ROLE_OFFICER', 'ROLE_DISTRICT_OFFICER', 'ROLE_STATE_NODAL']}><ProfilePage /></ProtectedRoute>}
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
      </CheckInProvider>
    </AuthProvider>
  );
}

export default App;
