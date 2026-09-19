import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import URLAnalyzer from './pages/URLAnalyzer';
import MessageAnalyzer from './pages/MessageAnalyzer';
import PhoneAnalyzer from './pages/PhoneAnalyzer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze/url" element={<URLAnalyzer />} />
              <Route path="/analyze/message" element={<MessageAnalyzer />} />
              <Route path="/analyze/phone" element={<PhoneAnalyzer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              {/* Other routes can be added here as needed for a complete system */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="bg-slate-800 text-white text-center py-6">
            <p className="text-lg">&copy; {new Date().getFullYear()} ScamSafe System. Built for protection.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
