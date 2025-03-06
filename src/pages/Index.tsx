
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ParticlesBackground from '@/components/ParticlesBackground';
import WaveBackground from '@/components/WaveBackground';

const Index = () => {
  // Add animation class to body when component mounts
  useEffect(() => {
    document.body.classList.add('animated-gradient');
    
    return () => {
      document.body.classList.remove('animated-gradient');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <ParticlesBackground />
      <WaveBackground />
      <Navbar />
      <main className="flex-grow">
        <Dashboard />
      </main>
      <footer className="relative z-10 py-4 text-center text-sm text-gray-500 bg-white/60 backdrop-blur-md mt-10">
        <div className="container mx-auto">
          <p>Real-Time AQI Monitor &copy; {new Date().getFullYear()} | Live Air Quality Data</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
