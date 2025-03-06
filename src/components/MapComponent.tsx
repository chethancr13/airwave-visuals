
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Home, Wind, Activity, Heart, Thermometer } from 'lucide-react';
import { bangaloreHospitals } from '@/utils/karnatakaData';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Hospital {
  id: number;
  name: string;
  distance: string;
  specialty: string;
  position: { x: number; y: number };
  healthServices: string[];
}

interface HealthProfile {
  age: number;
  hasAsthma: boolean;
  hasHeartCondition: boolean;
  hasDiabetes: boolean;
}

const MapComponent: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [healthProfile, setHealthProfile] = useState<HealthProfile>({
    age: 35,
    hasAsthma: false,
    hasHeartCondition: false,
    hasDiabetes: false
  });
  const [showHealthRisk, setShowHealthRisk] = useState(false);
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

  const getHealthRiskAssessment = () => {
    const { age, hasAsthma, hasHeartCondition } = healthProfile;
    let riskLevel = 'Low';
    let advice = 'Air quality is generally safe for you.';
    
    // Determine risk level based on health profile
    if (hasAsthma && hasHeartCondition) {
      riskLevel = 'High';
      advice = 'Avoid outdoor activities when AQI is above 50. Use air purifiers indoors.';
    } else if (hasAsthma || hasHeartCondition || age > 65) {
      riskLevel = 'Moderate';
      advice = 'Limit prolonged outdoor exertion when AQI is above 100.';
    } else if (age > 50) {
      riskLevel = 'Low-Moderate';
      advice = 'Monitor symptoms when AQI is above 150.';
    }
    
    // Best time recommendations based on AQI forecast
    const bestTimeAdvice = 'Best time for outdoor activities: 6AM-8AM (lowest daily AQI)';
    const maskAdvice = riskLevel === 'High' ? 'Recommended to use N95 masks when AQI > 100' : 'Consider wearing masks when AQI > 150';
    
    return { riskLevel, advice, bestTimeAdvice, maskAdvice };
  };

  const handleHealthProfileChange = (field: keyof HealthProfile, value: any) => {
    setHealthProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
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
            Your Location (Bangalore)
          </div>
        </div>
        
        {/* Hospital markers */}
        {bangaloreHospitals.map((hospital) => (
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
              <div className="absolute w-max -bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-xs py-2 px-3 rounded-lg shadow-md text-gray-800 z-20">
                <div className="font-bold">{hospital.name}</div>
                <div className="text-xs text-gray-600">Distance: {hospital.distance}</div>
                <div className="text-xs text-gray-600">Specialty: {hospital.specialty}</div>
                <div className="text-xs text-gray-600 mt-1">
                  <span className="font-semibold">Services:</span> {hospital.healthServices.join(", ")}
                </div>
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
        <h3 className="font-bold text-lg text-gray-800">Bangalore Medical Facilities</h3>
        <p className="text-sm text-gray-600 mt-1 mb-2">
          Showing hospitals specializing in respiratory & cardiac care
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

      {/* Health Profile Panel */}
      <div className="absolute top-4 right-4 max-w-xs">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-white/80 backdrop-blur-md hover:bg-white/90">
              <Activity className="h-4 w-4 mr-2" />
              Health Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Your Health Profile</h4>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Age</label>
                <input 
                  type="number" 
                  className="w-full p-1 text-sm border rounded"
                  value={healthProfile.age}
                  onChange={(e) => handleHealthProfileChange('age', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="asthma"
                  checked={healthProfile.hasAsthma}
                  onChange={(e) => handleHealthProfileChange('hasAsthma', e.target.checked)}
                />
                <label htmlFor="asthma" className="text-xs">Asthma</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="heartCondition"
                  checked={healthProfile.hasHeartCondition}
                  onChange={(e) => handleHealthProfileChange('hasHeartCondition', e.target.checked)}
                />
                <label htmlFor="heartCondition" className="text-xs">Heart Condition</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="diabetes"
                  checked={healthProfile.hasDiabetes}
                  onChange={(e) => handleHealthProfileChange('hasDiabetes', e.target.checked)}
                />
                <label htmlFor="diabetes" className="text-xs">Diabetes</label>
              </div>
              
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => setShowHealthRisk(true)}
              >
                Get Health Risk Assessment
              </Button>

              {showHealthRisk && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <h5 className="font-medium text-sm flex items-center">
                    <Activity className="h-4 w-4 mr-1 text-blue-500" />
                    Risk Assessment
                  </h5>
                  <div className="mt-2 space-y-2 text-xs">
                    <p><span className="font-medium">Risk Level:</span> {getHealthRiskAssessment().riskLevel}</p>
                    <p><span className="font-medium">Advice:</span> {getHealthRiskAssessment().advice}</p>
                    <p className="flex items-center">
                      <Thermometer className="h-3 w-3 mr-1 text-blue-500" />
                      {getHealthRiskAssessment().bestTimeAdvice}
                    </p>
                    <p className="flex items-center">
                      <Heart className="h-3 w-3 mr-1 text-blue-500" />
                      {getHealthRiskAssessment().maskAdvice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
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
