
import React from 'react';
import { 
  BookOpen, 
  AlertCircle, 
  Map,
  MapPin,
  Settings, 
  History,
  Info
} from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <AlertCircle size={18} />
          </div>
          <span className="text-xl font-bold">AirVision</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="px-2 py-1 font-medium text-primary flex items-center">
            <AlertCircle className="mr-1 h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="px-2 py-1 text-gray-600 hover:text-primary transition-colors flex items-center">
            <Map className="mr-1 h-4 w-4" />
            <span>Map View</span>
          </a>
          <a href="#" className="px-2 py-1 text-gray-600 hover:text-primary transition-colors flex items-center">
            <History className="mr-1 h-4 w-4" />
            <span>History</span>
          </a>
          <a href="#" className="px-2 py-1 text-gray-600 hover:text-primary transition-colors flex items-center">
            <Info className="mr-1 h-4 w-4" />
            <span>About</span>
          </a>
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
