import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import JobBrowser from './pages/JobBrowser';
import ResumeManager from './pages/ResumeManager';
import MatchDetails from './pages/MatchDetails';
import Settings from './pages/Settings';
import MyApplications from './pages/MyApplications';
import SavedJobs from './pages/SavedJobs';
import InterviewSchedule from './pages/InterviewSchedule';
import InterviewRoom from './pages/InterviewRoom';
import MessageCenter from './pages/MessageCenter';
import OnboardingPage from './pages/Onboarding';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/onboarding" replace />} />
      <Route path="/" element={<HomePage />} />
      
      {/* Protected routes */}
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <OnboardingPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/jobs" element={
        <ProtectedRoute>
          <JobBrowser />
        </ProtectedRoute>
      } />
      <Route path="/resume" element={
        <ProtectedRoute>
          <ResumeManager />
        </ProtectedRoute>
      } />
      <Route path="/match/:id" element={
        <ProtectedRoute>
          <MatchDetails />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute>
          <MyApplications />
        </ProtectedRoute>
      } />
      <Route path="/saved-jobs" element={
        <ProtectedRoute>
          <SavedJobs />
        </ProtectedRoute>
      } />
      <Route path="/interviews" element={
        <ProtectedRoute>
          <InterviewSchedule />
        </ProtectedRoute>
      } />
      <Route path="/interview/:id" element={
        <ProtectedRoute>
          <InterviewRoom />
        </ProtectedRoute>
      } />
      <Route path="/interview" element={
        <ProtectedRoute>
          <InterviewRoom />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <MessageCenter />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <AppRoutes />
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;