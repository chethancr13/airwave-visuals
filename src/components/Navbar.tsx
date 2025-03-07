
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  AlertCircle, 
  Map,
  MapPin,
  Settings, 
  History,
  Info,
  PhoneCall
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-gray-600";
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
              <Map size={18} />
            </div>
            <span className="text-xl font-bold">Code Crew</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`px-2 py-1 font-medium hover:text-primary transition-colors flex items-center ${isActive('/')}`}>
            <AlertCircle className="mr-1 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/map" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/map')}`}>
            <Map className="mr-1 h-4 w-4" />
            <span>Map View</span>
          </Link>
          <Link to="/history" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/history')}`}>
            <History className="mr-1 h-4 w-4" />
            <span>History</span>
          </Link>
          <Link to="/contact" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/contact')}`}>
            <PhoneCall className="mr-1 h-4 w-4" />
            <span>Contact</span>
          </Link>
          <Link to="/about" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/about')}`}>
            <Info className="mr-1 h-4 w-4" />
            <span>About</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
