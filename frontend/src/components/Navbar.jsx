import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaShieldAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold gap-2">
              <FaShieldAlt className="text-2xl" />
              <span>ScamSafe</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Home</Link>
              {user && <Link to="/dashboard" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Dashboard</Link>}
              {user && <Link to="/history" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">History</Link>}
              
              {!user ? (
                <>
                  <Link to="/login" className="hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Login</Link>
                  <Link to="/register" className="bg-secondary hover:bg-purple-500 px-4 py-2 rounded-md text-lg font-bold shadow-sm">Sign Up</Link>
                </>
              ) : (
                <button onClick={logout} className="hover:bg-red-500 px-3 py-2 rounded-md text-lg font-medium">Logout</button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300">
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link to="/" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Home</Link>
            {user && <Link to="/dashboard" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Dashboard</Link>}
            {user && <Link to="/history" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">History</Link>}
            
            {!user ? (
              <>
                <Link to="/login" className="block hover:bg-blue-600 px-3 py-2 rounded-md text-lg font-medium">Login</Link>
                <Link to="/register" className="block bg-secondary hover:bg-purple-500 px-4 py-2 rounded-md text-lg font-bold">Sign Up</Link>
              </>
            ) : (
              <button onClick={logout} className="block w-full text-center hover:bg-red-500 px-3 py-2 rounded-md text-lg font-medium">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
