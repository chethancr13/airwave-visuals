
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from '@/types';
import { getAqiColor, getAqiTextColor, getAqiAdvice } from '@/utils/airQualityUtils';

interface AirQualityCardProps {
  data: AirQualityData;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ data }) => {
  const aqiColorClass = getAqiColor(data.aqi);
  const aqiTextColorClass = getAqiTextColor(data.aqi);
  const advice = getAqiAdvice(data.category);

  return (
    <Card className="overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl">
          <span>Air Quality Index</span>
          <span className={`text-sm font-normal ${aqiTextColorClass}`}>
            {new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end mb-4">
          <div className={`text-5xl font-bold ${aqiTextColorClass}`}>{data.aqi}</div>
          <div className="ml-3 mb-1">
            <span className="text-xs uppercase tracking-wider text-gray-500">AQI</span>
            <div className={`text-lg font-semibold ${aqiTextColorClass}`}>{data.category}</div>
          </div>
        </div>
        
        <div className="aqi-indicator mb-4">
          <div 
            className={`aqi-indicator-bar ${aqiColorClass}`}
            style={{ width: `${Math.min(100, (data.aqi / 300) * 100)}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-600">{advice}</div>

        <div className="mt-4">
          <div className="text-sm font-medium mb-1">Dominant Pollutant</div>
          <div className="px-3 py-1 inline-block rounded-full bg-secondary text-sm">
            {data.dominantPollutant === 'pm25' ? 'PM2.5' : 
             data.dominantPollutant === 'pm10' ? 'PM10' : 
             data.dominantPollutant === 'o3' ? 'O₃' : 
             data.dominantPollutant === 'no2' ? 'NO₂' : 
             data.dominantPollutant === 'so2' ? 'SO₂' : 'CO'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
