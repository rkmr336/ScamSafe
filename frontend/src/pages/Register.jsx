import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    full_name: '',
    is_elderly: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/register', formData);
      if (response.data.success) {
        alert("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Create an Account</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Full Name</label>
          <input 
            type="text" 
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Username</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-3 mt-4 mb-6">
          <input 
            type="checkbox" 
            name="is_elderly"
            id="is_elderly"
            checked={formData.is_elderly}
            onChange={handleChange}
            className="w-6 h-6 text-primary"
          />
          <label htmlFor="is_elderly" className="text-gray-700 text-lg">I am 60 years or older</label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-secondary hover:bg-purple-500 text-white font-bold py-3 rounded-lg text-xl transition-colors disabled:opacity-70"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-lg">
        Already have an account? <Link to="/login" className="text-primary hover:underline font-bold">Log In</Link>
      </p>
    </div>
  );
};

export default Register;
