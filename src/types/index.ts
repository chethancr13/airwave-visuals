
export interface AirQualityData {
  aqi: number;
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  dominantPollutant: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  time: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  pressure: number;
  conditions: string;
  icon: string;
  time: string;
}

export interface ForecastData {
  day: string;
  aqi: number;
  temperature: {
    min: number;
    max: number;
  };
  conditions: string;
  icon: string;
}

export interface LocationData {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type TimeRange = '1h' | '24h' | '7d' | '30d';
