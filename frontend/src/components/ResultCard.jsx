import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ResultCard = ({ verdict, riskScore, details, onSave }) => {
  let bgColor = "bg-green-100 border-green-400";
  let textColor = "text-green-800";
  let Icon = FaCheckCircle;

  if (verdict === "SUSPICIOUS") {
    bgColor = "bg-yellow-100 border-yellow-400";
    textColor = "text-yellow-800";
    Icon = FaExclamationTriangle;
  } else if (verdict === "DANGEROUS") {
    bgColor = "bg-red-100 border-red-400";
    textColor = "text-red-800";
    Icon = FaTimesCircle;
  }

  return (
    <div className={`mt-6 p-6 border-l-4 rounded-lg shadow-md ${bgColor}`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`text-5xl ${textColor}`} />
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>Verdict: {verdict}</h2>
          <p className="text-xl">Risk Score: <span className="font-bold">{riskScore.toFixed(0)}/100</span></p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow-sm mb-4">
        <h3 className="text-lg font-bold mb-2">Analysis Details:</h3>
        <ul className="list-disc pl-5 space-y-1 text-lg">
          {Object.entries(details).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {String(value)}
            </li>
          ))}
        </ul>
      </div>
      
      {onSave && (
        <button 
          onClick={onSave}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-lg w-full sm:w-auto transition-colors"
        >
          Save to History
        </button>
      )}
    </div>
  );
};

ResultCard.propTypes = {
  verdict: PropTypes.string.isRequired,
  riskScore: PropTypes.number.isRequired,
  details: PropTypes.object.isRequired,
  onSave: PropTypes.func
};

export default ResultCard;
