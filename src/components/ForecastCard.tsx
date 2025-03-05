
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastData } from '@/types';
import { getAqiTextColor } from '@/utils/airQualityUtils';
import { 
  Sun, Cloud, CloudSun, CloudDrizzle, CloudRain, 
  CloudLightning, CloudSnow, CloudFog, Wind 
} from 'lucide-react';

interface ForecastCardProps {
  data: ForecastData[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const getWeatherIcon = (icon: string, size: number = 24) => {
    switch (icon) {
      case 'sun':
        return <Sun className="text-amber-500" size={size} />;
      case 'cloud':
        return <Cloud className="text-gray-400" size={size} />;
      case 'cloud-sun':
        return <CloudSun className="text-amber-400" size={size} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className="text-blue-400" size={size} />;
      case 'cloud-rain':
        return <CloudRain className="text-blue-500" size={size} />;
      case 'cloud-lightning':
        return <CloudLightning className="text-purple-500" size={size} />;
      case 'cloud-snow':
        return <CloudSnow className="text-blue-200" size={size} />;
      case 'cloud-fog':
        return <CloudFog className="text-gray-300" size={size} />;
      case 'wind':
        return <Wind className="text-gray-500" size={size} />;
      default:
        return <Sun className="text-amber-500" size={size} />;
    }
  };

  return (
    <Card className="shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((day, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="font-medium w-12">{day.day}</div>
              <div className="flex items-center">
                {getWeatherIcon(day.icon)}
              </div>
              <div className="text-sm">
                <span className="font-semibold">{day.temperature.max}°</span>
                <span className="text-gray-500 ml-1">{day.temperature.min}°</span>
              </div>
              <div className={`text-sm font-medium ${getAqiTextColor(day.aqi)}`}>
                AQI {day.aqi}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
