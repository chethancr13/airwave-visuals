
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from '@/types';
import { 
  Sun, Cloud, CloudSun, CloudDrizzle, CloudRain, 
  CloudLightning, CloudSnow, CloudFog, Wind 
} from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="text-amber-500" size={40} />;
      case 'cloud':
        return <Cloud className="text-gray-400" size={40} />;
      case 'cloud-sun':
        return <CloudSun className="text-amber-400" size={40} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className="text-blue-400" size={40} />;
      case 'cloud-rain':
        return <CloudRain className="text-blue-500" size={40} />;
      case 'cloud-lightning':
        return <CloudLightning className="text-purple-500" size={40} />;
      case 'cloud-snow':
        return <CloudSnow className="text-blue-200" size={40} />;
      case 'cloud-fog':
        return <CloudFog className="text-gray-300" size={40} />;
      case 'wind':
        return <Wind className="text-gray-500" size={40} />;
      default:
        return <Sun className="text-amber-500" size={40} />;
    }
  };

  return (
    <Card className="shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl">
          <span>Weather</span>
          <span className="text-sm font-normal text-gray-500">
            {new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          {getWeatherIcon(data.icon)}
          <div className="ml-4">
            <div className="text-4xl font-bold">{data.temperature}°C</div>
            <div className="text-gray-500">{data.conditions}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="text-sm">
            <div className="text-gray-500">Humidity</div>
            <div className="font-medium">{data.humidity}%</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Wind</div>
            <div className="font-medium">{data.windSpeed} km/h {data.windDirection}</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Precipitation</div>
            <div className="font-medium">{data.precipitation} mm</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Pressure</div>
            <div className="font-medium">{data.pressure} hPa</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
