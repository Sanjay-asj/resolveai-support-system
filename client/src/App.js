import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Features from './components/layout/Features';
import Contact from './components/layout/Contact';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SubmitTicket from './components/tickets/SubmitTicket';
import MyTickets from './components/tickets/MyTickets';
import TicketView from './components/tickets/TicketView';
import Dashboard from './components/dashboard/Dashboard';
import StatsPage from './components/dashboard/StatsPage'; // UPDATED IMPORT
import ProtectedRoute from './components/routing/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto p-8 flex-grow pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/submit"
              element={
                <ProtectedRoute role="customer">
                  <SubmitTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mytickets"
              element={
                <ProtectedRoute role="customer">
                  <MyTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="agent">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
             <Route
              path="/analytics" // UPDATED ROUTE
              element={
                <ProtectedRoute role="agent">
                  <StatsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets/:id"
              element={
                <ProtectedRoute>
                  <TicketView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;