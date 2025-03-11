
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User,
  Heart, 
  ShoppingCart,
  Menu
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-gray-300";
  };
  
  return (
    <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md shadow-sm animate-fade-in border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">STYLEX</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`px-2 py-1 font-medium hover:text-primary transition-colors flex items-center ${isActive('/')}`}>
            <span>HOME</span>
          </Link>
          <Link to="/men" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/men')}`}>
            <span>MEN</span>
          </Link>
          <Link to="/women" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/women')}`}>
            <span>WOMEN</span>
          </Link>
          <Link to="/shoes" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/shoes')}`}>
            <span>SHOES</span>
          </Link>
          <Link to="/collections" className={`px-2 py-1 hover:text-primary transition-colors flex items-center ${isActive('/collections')}`}>
            <span>COLLECTIONS</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <User className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </button>
          <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
