import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ResidentsPage from './pages/ResidentsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ResidentProfilePage from './pages/ResidentProfilePage';
import PaymentTypesPage from './pages/PaymentTypesPage';
import ResidentPaymentsPage from './pages/ResidentPaymentsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {currentUser?.role === 'admin' ? (
          <>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="residents" element={<ResidentsPage />} />
            <Route path="payment-types" element={<PaymentTypesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route index element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="profile" element={<ResidentProfilePage />} />
            <Route path="payments" element={<ResidentPaymentsPage />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;