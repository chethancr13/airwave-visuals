
import React from 'react';
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  TrendingUp, 
  Star, 
  ChevronRight, 
  ShoppingBag 
} from 'lucide-react';
import { Card, CardContent, ProductCard } from '@/components/ui/card';
import ShoeAnimated from '@/components/ShoeAnimated';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
        <video 
          className="absolute inset-0 object-cover w-full h-full opacity-50"
          src="https://static.videezy.com/system/resources/previews/000/046/204/original/201017_04_FTG_Garments-1080p.mp4"
          autoPlay 
          muted 
          loop
        ></video>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Redefining <span className="text-primary">Style</span> For The Modern Era
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Discover our exclusive collection of premium fashion and footwear that combines innovation with timeless elegance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                Shop Collection <ShoppingBag className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 border border-gray-700 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors">
                Explore Shoes <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <a href="#" className="text-primary flex items-center mt-4 md:mt-0">View All Categories <ChevronRight className="h-4 w-4 ml-1" /></a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/men" className="relative h-80 rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
              alt="Men's Fashion" 
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold">Men's Collection</h3>
              <p className="text-gray-300 mt-2">Discover the latest trends</p>
            </div>
          </a>
          
          <a href="/women" className="relative h-80 rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80" 
              alt="Women's Fashion" 
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold">Women's Collection</h3>
              <p className="text-gray-300 mt-2">Elegance redefined</p>
            </div>
          </a>
          
          <a href="/shoes" className="relative h-80 rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80" 
              alt="Footwear" 
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold">Premium Footwear</h3>
              <p className="text-gray-300 mt-2">Step into innovation</p>
            </div>
          </a>
        </div>
      </section>

      {/* Featured Shoes with 3D */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Shoes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-4xl font-bold mb-4">Experience Shoes in 3D</h3>
              <p className="text-gray-300 mb-6">
                Explore our shoes from every angle with our interactive 3D models. See the detailed craftsmanship and premium materials that go into each pair.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span>Premium materials for ultimate comfort</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span>Handcrafted by skilled artisans</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span>Innovative design for modern lifestyle</span>
                </li>
              </ul>
              <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg inline-flex items-center hover:bg-primary/90 transition-colors md:self-start">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-black rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <ShoeAnimated />
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <div className="flex items-center mt-4 md:mt-0">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            <span className="text-gray-300">Based on current fashion trends</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            imageSrc="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80"
            name="Urban Leather Jacket"
            price="$299.00"
            category="Men's Fashion"
            badge="New"
          />
          <ProductCard 
            imageSrc="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
            name="Avant-Garde Dress"
            price="$189.00"
            category="Women's Fashion"
          />
          <ProductCard 
            imageSrc="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
            name="Retro Running Sneakers"
            price="$129.00"
            category="Footwear"
            badge="Sale"
          />
          <ProductCard 
            imageSrc="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
            name="Classic Denim Jacket"
            price="$149.00"
            category="Women's Fashion"
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
