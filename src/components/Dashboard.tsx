
import React, { useState, useEffect } from 'react';
import AirQualityCard from './AirQualityCard';
import PollutantsCard from './PollutantsCard';
import WeatherCard from './WeatherCard';
import AirQualityChart from './AirQualityChart';
import ForecastCard from './ForecastCard';
import LocationSelector from './LocationSelector';
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

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentAirQuality(getCurrentAirQuality());
      setCurrentWeather(getCurrentWeather());
      setForecast(getForecast(7));
      setHistoricalData(generateHistoricalData(timeRange));
      
      setLoading(false);
    };
    
    fetchData();
    
    // Set up interval to refresh data
    const interval = setInterval(() => {
      setCurrentAirQuality(getCurrentAirQuality());
      setCurrentWeather(getCurrentWeather());
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);

  // Handle time range changes for the chart
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setHistoricalData(generateHistoricalData(timeRange));
      setLoading(false);
    }, 500);
  }, [timeRange]);

  // Handle location changes
  const handleLocationChange = (location: LocationData) => {
    setCurrentLocation(location);
    setLoading(true);
    
    // Simulate API delay
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
