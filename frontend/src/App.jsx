import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportProblem from './pages/ReportProblem';
import MyReports from './pages/MyReports';
import ProblemListAdmin from './pages/ProblemListAdmin';
import DevelopmentTracker from './pages/DevelopmentTracker';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'student') {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/student" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/report-problem" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ReportProblem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-reports" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyReports />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/problems" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProblemListAdmin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/developments" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DevelopmentTracker />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;