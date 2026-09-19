import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // OAuth2 expects 'username'
      formData.append('password', password);
      
      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      
      if (response.data.success) {
        login(response.data.data.user, response.data.data.access_token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Welcome Back</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-primary focus:outline-none"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-xl transition-colors disabled:opacity-70"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-lg">
        Don't have an account? <Link to="/register" className="text-primary hover:underline font-bold">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
