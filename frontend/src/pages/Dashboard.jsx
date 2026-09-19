import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaLink, FaEnvelope, FaPhoneAlt, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20 text-2xl">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome, {user.full_name || user.username}!</h1>
        <p className="text-xl text-gray-600">What would you like to check today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/analyze/url" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-6 flex flex-col items-center text-center transition-colors">
          <FaLink className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-900">Check Link</h3>
        </Link>
        
        <Link to="/analyze/message" className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-6 flex flex-col items-center text-center transition-colors">
          <FaEnvelope className="text-4xl text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-900">Check Message</h3>
        </Link>
        
        <Link to="/analyze/phone" className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-6 flex flex-col items-center text-center transition-colors">
          <FaPhoneAlt className="text-4xl text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-900">Check Phone</h3>
        </Link>
        
        <Link to="/history" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center transition-colors">
          <FaHistory className="text-4xl text-slate-600 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900">View History</h3>
        </Link>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <h3 className="text-2xl font-bold text-yellow-800 mb-2">Safety Tip of the Day</h3>
        <p className="text-lg text-yellow-900">
          Never share your OTP (One Time Password) with anyone. Bank officials will never ask for your OTP over a call or message.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
