
import { AirQualityData, WeatherData, ForecastData, LocationData, TimeRange } from "../types";
import { getAqiCategory } from "./airQualityUtils";

// Helper to generate random number within a range
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate historical data points
export const generateHistoricalData = (
  timeRange: TimeRange,
  baseAqi: number = 50
): AirQualityData[] => {
  const now = new Date();
  const points: AirQualityData[] = [];
  let dataPoints = 24;
  let intervalHours = 1;
  
  switch (timeRange) {
    case '1h':
      dataPoints = 60;
      intervalHours = 1/60; // 1 minute intervals
      break;
    case '24h':
      dataPoints = 24;
      intervalHours = 1; // 1 hour intervals
      break;
    case '7d':
      dataPoints = 7;
      intervalHours = 24; // 1 day intervals
      break;
    case '30d':
      dataPoints = 30;
      intervalHours = 24; // 1 day intervals
      break;
  }

  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(now);
    date.setHours(date.getHours() - (dataPoints - i - 1) * intervalHours);
    
    // Add some variation to AQI
    const variation = random(-10, 10);
    const aqi = Math.max(0, Math.min(500, baseAqi + variation));

    const pm25 = random(5, 35);
    const pm10 = random(10, 50);
    const o3 = random(30, 90);
    const no2 = random(10, 60);
    const so2 = random(5, 30);
    const co = random(300, 1000) / 100;

    points.push({
      aqi,
      category: getAqiCategory(aqi),
      dominantPollutant: ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'][random(0, 5)],
      pollutants: {
        pm25,
        pm10,
        o3,
        no2,
        so2,
        co
      },
      time: date.toISOString()
    });
  }

  return points;
};

// Generate current air quality data
export const getCurrentAirQuality = (): AirQualityData => {
  const aqi = random(20, 180);
  const pm25 = random(5, 35);
  const pm10 = random(10, 50);
  const o3 = random(30, 90);
  const no2 = random(10, 60);
  const so2 = random(5, 30);
  const co = random(300, 1000) / 100;

  return {
    aqi,
    category: getAqiCategory(aqi),
    dominantPollutant: ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'][random(0, 5)],
    pollutants: {
      pm25,
      pm10,
      o3,
      no2,
      so2,
      co
    },
    time: new Date().toISOString()
  };
};

// Generate current weather data
export const getCurrentWeather = (): WeatherData => {
  const conditions = [
    'Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 
    'Thunderstorm', 'Snow', 'Foggy', 'Windy'
  ];
  const icons = [
    'sun', 'cloud-sun', 'cloud', 'cloud-drizzle', 'cloud-rain', 
    'cloud-lightning', 'cloud-snow', 'cloud-fog', 'wind'
  ];
  
  const conditionIndex = random(0, conditions.length - 1);
  
  return {
    temperature: random(5, 35),
    humidity: random(20, 90),
    windSpeed: random(0, 30),
    windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][random(0, 7)],
    precipitation: random(0, 100) / 10,
    pressure: random(980, 1040),
    conditions: conditions[conditionIndex],
    icon: icons[conditionIndex],
    time: new Date().toISOString()
  };
};

// Generate forecast data
export const getForecast = (days: number = 7): ForecastData[] => {
  const forecast: ForecastData[] = [];
  const now = new Date();
  const conditions = [
    'Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 
    'Thunderstorm', 'Snow', 'Foggy', 'Windy'
  ];
  const icons = [
    'sun', 'cloud-sun', 'cloud', 'cloud-drizzle', 'cloud-rain', 
    'cloud-lightning', 'cloud-snow', 'cloud-fog', 'wind'
  ];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    const conditionIndex = random(0, conditions.length - 1);
    
    forecast.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      aqi: random(20, 180),
      temperature: {
        min: random(5, 20),
        max: random(20, 35)
      },
      conditions: conditions[conditionIndex],
      icon: icons[conditionIndex]
    });
  }
  
  return forecast;
};

// Get location data
export const getLocations = (): LocationData[] => {
  return [
    {
      name: 'New York',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    {
      name: 'Los Angeles',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    {
      name: 'Chicago',
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298
      }
    },
    {
      name: 'Houston',
      coordinates: {
        latitude: 29.7604,
        longitude: -95.3698
      }
    },
    {
      name: 'London',
      coordinates: {
        latitude: 51.5074,
        longitude: -0.1278
      }
    }
  ];
};

export const getCurrentLocation = (): LocationData => {
  return {
    name: 'Current Location',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  };
};
