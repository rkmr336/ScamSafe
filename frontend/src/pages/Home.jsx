import React from 'react';
import { Link } from 'react-router-dom';
import { FaLink, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Stay Safe from Scams</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          We help you identify whether calls, links, and messages are genuine or fraudulent. Easy to use for everyone.
        </p>
        <Link to="/register" className="bg-secondary hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full text-2xl shadow-lg transition-transform transform hover:scale-105">
          Get Started for Free
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">What do you want to check today?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Link to="/analyze/url" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border-t-4 border-blue-500">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <FaLink className="text-5xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Website Link</h3>
            <p className="text-lg text-gray-600">Check if a website is safe before you click or enter your details.</p>
          </Link>

          {/* Feature 2 */}
          <Link to="/analyze/message" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border-t-4 border-purple-500">
            <div className="bg-purple-100 p-4 rounded-full mb-6">
              <FaEnvelope className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">SMS / Message</h3>
            <p className="text-lg text-gray-600">Got a strange message? Paste it here to see if it's a scam.</p>
          </Link>

          {/* Feature 3 */}
          <Link to="/analyze/phone" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border-t-4 border-green-500">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <FaPhoneAlt className="text-5xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Phone Number</h3>
            <p className="text-lg text-gray-600">Verify who is calling you and check if they are reported as spam.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
