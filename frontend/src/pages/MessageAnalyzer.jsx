import React, { useState } from 'react';
import api from '../services/api';
import ResultCard from '../components/ResultCard';
import { useAuth } from '../hooks/useAuth';

const MessageAnalyzer = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!message) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await api.post('/analysis/message', { message_text: message });
      setResult(response.data.data);
    } catch (err) {
      setError('An error occurred while analyzing the message. Please try again.');
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
        analysis_type: 'MESSAGE',
        input_data: message,
        risk_score: Math.max(result.spam_score, result.phishing_score),
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
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">Check a SMS or Message</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <p className="text-xl mb-6 text-gray-700">Paste the text of a suspicious message below.</p>
        
        <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. URGENT! Your bank account has been blocked. Click here to verify: http://bit.ly/123" 
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-xl focus:border-primary focus:outline-none min-h-[150px]"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-xl transition-colors disabled:opacity-70"
          >
            {loading ? 'Checking...' : 'Check Message'}
          </button>
        </form>
        
        {error && <p className="text-red-500 mt-4 text-lg font-semibold">{error}</p>}
      </div>

      {result && (
        <ResultCard 
          verdict={result.verdict}
          riskScore={Math.max(result.spam_score, result.phishing_score)}
          details={result.details}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MessageAnalyzer;
