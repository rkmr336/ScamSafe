import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/history');
      setHistory(response.data.data.items);
    } catch (err) {
      setError('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/history/${id}`);
        setHistory(history.filter(item => item.id !== id));
      } catch (err) {
        alert('Failed to delete record');
      }
    }
  };

  if (authLoading) return <div className="text-center mt-20 text-2xl">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Your Scan History</h1>
      
      {error && <div className="text-red-500 mb-4 text-xl">{error}</div>}
      
      {loading ? (
        <div className="text-xl">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-2xl text-gray-600">You haven't scanned anything yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-500 uppercase tracking-wider">Data Scanned</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-500 uppercase tracking-wider">Verdict</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-lg">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                    {item.analysis_type}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-900 truncate max-w-xs">
                    {item.input_data}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full 
                      ${item.verdict === 'SAFE' ? 'bg-green-100 text-green-800' : 
                        item.verdict === 'SUSPICIOUS' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {item.verdict}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
