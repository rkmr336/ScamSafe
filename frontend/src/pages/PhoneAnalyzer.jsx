import React, { useState } from 'react';
import api from '../services/api';
import ResultCard from '../components/ResultCard';
import { useAuth } from '../hooks/useAuth';

const PhoneAnalyzer = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await api.post('/analysis/phone', { phone_number: phone });
      setResult(response.data.data);
    } catch (err) {
      setError('An error occurred while analyzing the phone number. Please check the format (e.g. +91...).');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save history.");
      return;
    }
    
    try {
      await api.post('/history/', {
        analysis_type: 'PHONE',
        input_data: result.phone_number,
        risk_score: result.spam_likelihood,
        verdict: result.verdict,
        details: result.details
      });
      alert("Saved to history!");
    } catch (err) {
      alert("Failed to save history.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">Check a Phone Number</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <p className="text-xl mb-6 text-gray-700">Enter a phone number with country code (e.g., +91) to check if it's safe.</p>
        
        <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
          <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 9876543210" 
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-xl focus:border-primary focus:outline-none"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-xl transition-colors disabled:opacity-70"
          >
            {loading ? 'Checking...' : 'Check Number'}
          </button>
        </form>
        
        {error && <p className="text-red-500 mt-4 text-lg font-semibold">{error}</p>}
      </div>

      {result && (
        <ResultCard 
          verdict={result.verdict}
          riskScore={result.spam_likelihood}
          details={result.details}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PhoneAnalyzer;
