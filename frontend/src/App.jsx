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
