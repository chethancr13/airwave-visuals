
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Home, Wind } from 'lucide-react';

interface Hospital {
  id: number;
  name: string;
  distance: string;
  specialty: string;
  position: { x: number; y: number };
}

const hospitals: Hospital[] = [
  { 
    id: 1, 
    name: "City General Hospital", 
    distance: "1.2 miles", 
    specialty: "Pulmonology", 
    position: { x: 25, y: 30 }
  },
  { 
    id: 2, 
    name: "Memorial Medical Center", 
    distance: "2.5 miles", 
    specialty: "Respiratory Care", 
    position: { x: 65, y: 20 }
  },
  { 
    id: 3, 
    name: "St. Mary's Hospital", 
    distance: "3.7 miles", 
    specialty: "Allergy & Asthma", 
    position: { x: 45, y: 70 }
  },
  { 
    id: 4, 
    name: "County Healthcare Clinic", 
    distance: "1.9 miles", 
    specialty: "Emergency Care", 
    position: { x: 80, y: 55 }
  },
  { 
    id: 5, 
    name: "Children's Respiratory Center", 
    distance: "4.2 miles", 
    specialty: "Pediatric Pulmonology", 
    position: { x: 20, y: 65 }
  },
];

const MapComponent: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      particlesRef.current.innerHTML = '';
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('map-particle');
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesRef.current.appendChild(particle);
      }
    };
    
    createParticles();
    
    const resizeObserver = new ResizeObserver(() => {
      createParticles();
    });
    
    if (mapRef.current) {
      resizeObserver.observe(mapRef.current);
    }
    
    return () => {
      if (mapRef.current) {
        resizeObserver.unobserve(mapRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50" ref={mapRef}>
      {/* Map background with particles */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm">
        <div className="absolute inset-0 map-particles" ref={particlesRef}></div>
        
        {/* Map grid lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="col-span-1 h-full border-r border-blue-500/30" />
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={`h-${i}`} className="w-full row-span-1 border-b border-blue-500/30" />
          ))}
        </div>
        
        {/* City outlines */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 Q40,10 60,30 T90,40" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" fill="none" />
            <path d="M10,50 Q30,40 50,60 T80,70" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" fill="none" />
            <path d="M30,80 Q40,60 70,50 T90,60" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="0.5" fill="rgba(219, 234, 254, 0.1)" />
          </svg>
        </div>
        
        {/* User current location */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="relative z-10 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <Home size={14} />
            </div>
          </div>
          <div className="absolute w-max -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-xs font-semibold py-1 px-2 rounded-full shadow-sm text-blue-800">
            Your Location
          </div>
        </div>
        
        {/* Hospital markers */}
        {hospitals.map((hospital) => (
          <div 
            key={hospital.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
            style={{ left: `${hospital.position.x}%`, top: `${hospital.position.y}%` }}
            onClick={() => setSelectedHospital(hospital)}
          >
            <div className={`relative z-10 w-6 h-6 rounded-full ${selectedHospital?.id === hospital.id ? 'bg-purple-600' : 'bg-red-500'} flex items-center justify-center text-white`}>
              <MapPin size={14} />
            </div>
            {selectedHospital?.id === hospital.id && (
              <div className="absolute w-max -bottom-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-xs py-2 px-3 rounded-lg shadow-md text-gray-800 z-20">
                <div className="font-bold">{hospital.name}</div>
                <div className="text-xs text-gray-600">Distance: {hospital.distance}</div>
                <div className="text-xs text-gray-600">Specialty: {hospital.specialty}</div>
              </div>
            )}
          </div>
        ))}
        
        {/* AQI indicators across the map */}
        <div className="absolute left-[15%] top-[25%]">
          <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg text-xs font-medium">
            <div className="flex items-center gap-1">
              <Wind size={10} className="text-green-700" />
              <span className="text-green-800">AQI: 45</span>
            </div>
          </div>
        </div>
        
        <div className="absolute left-[75%] top-[40%]">
          <div className="p-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg text-xs font-medium">
            <div className="flex items-center gap-1">
              <Wind size={10} className="text-yellow-700" />
              <span className="text-yellow-800">AQI: 89</span>
            </div>
          </div>
        </div>
        
        <div className="absolute left-[35%] top-[70%]">
          <div className="p-2 bg-orange-500/20 backdrop-blur-sm rounded-lg text-xs font-medium">
            <div className="flex items-center gap-1">
              <Wind size={10} className="text-orange-700" />
              <span className="text-orange-800">AQI: 112</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map info panel */}
      <div className="absolute top-4 left-4 p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md max-w-xs">
        <h3 className="font-bold text-lg text-gray-800">Nearby Medical Facilities</h3>
        <p className="text-sm text-gray-600 mt-1 mb-2">
          Showing hospitals and clinics specializing in respiratory care
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Hospitals & Clinics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Good Air Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate Air Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Poor Air Quality</span>
          </div>
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <button className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
