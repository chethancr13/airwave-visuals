import React, { useState, useEffect } from 'react';
import AirQualityCard from './AirQualityCard';
import PollutantsCard from './PollutantsCard';
import WeatherCard from './WeatherCard';
import AirQualityChart from './AirQualityChart';
import ForecastCard from './ForecastCard';
import LocationSelector from './LocationSelector';
import AqiAlertSystem from './AqiAlertSystem';
import AqiInsights from './AqiInsights';
import { AirQualityData, WeatherData, ForecastData, LocationData, TimeRange } from '@/types';
import { 
  getCurrentAirQuality, 
  getCurrentWeather, 
  getForecast, 
  getLocations, 
  getCurrentLocation,
  generateHistoricalData
} from '@/utils/mockData';

const Dashboard: React.FC = () => {
  const [currentAirQuality, setCurrentAirQuality] = useState<AirQualityData>(getCurrentAirQuality());
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(getCurrentWeather());
  const [forecast, setForecast] = useState<ForecastData[]>(getForecast(7));
  const [locations, setLocations] = useState<LocationData[]>(getLocations());
  const [currentLocation, setCurrentLocation] = useState<LocationData>(getCurrentLocation());
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [historicalData, setHistoricalData] = useState<AirQualityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentAirQuality(getCurrentAirQuality());
      setCurrentWeather(getCurrentWeather());
      setForecast(getForecast(7));
      setHistoricalData(generateHistoricalData(timeRange));
      
      setLoading(false);
    };
    
    fetchData();
    
    const interval = setInterval(() => {
      setCurrentAirQuality(getCurrentAirQuality());
      setCurrentWeather(getCurrentWeather());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setHistoricalData(generateHistoricalData(timeRange));
      setLoading(false);
    }, 500);
  }, [timeRange]);

  const handleLocationChange = (location: LocationData) => {
    setCurrentLocation(location);
    setLoading(true);
    
    setTimeout(() => {
      setCurrentAirQuality(getCurrentAirQuality());
      setCurrentWeather(getCurrentWeather());
      setForecast(getForecast(7));
      setHistoricalData(generateHistoricalData(timeRange));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-6 relative z-10">
      <AqiAlertSystem data={currentAirQuality} />
      
      <div className="mb-2 flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
          Real-Time Air Quality Monitor
        </h1>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 shadow-sm">
          Data updates every 10 seconds
          <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>

      <LocationSelector 
        locations={locations}
        currentLocation={currentLocation}
        onLocationChange={handleLocationChange}
      />
      
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse-slow text-primary opacity-75">
            <svg 
              className="animate-rotate"
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="dashboard-grid">
          <AirQualityCard data={currentAirQuality} />
          <WeatherCard data={currentWeather} />
          <AirQualityChart 
            data={historicalData} 
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <PollutantsCard data={currentAirQuality} />
          <ForecastCard data={forecast} />
          <AqiInsights />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
