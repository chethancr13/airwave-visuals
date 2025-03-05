
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from '@/types';
import { getPollutantName } from '@/utils/airQualityUtils';

interface PollutantsCardProps {
  data: AirQualityData;
}

const PollutantsCard: React.FC<PollutantsCardProps> = ({ data }) => {
  const { pollutants } = data;
  
  const pollutantList = [
    { id: 'pm25', value: pollutants.pm25, unit: 'μg/m³' },
    { id: 'pm10', value: pollutants.pm10, unit: 'μg/m³' },
    { id: 'o3', value: pollutants.o3, unit: 'ppb' },
    { id: 'no2', value: pollutants.no2, unit: 'ppb' },
    { id: 'so2', value: pollutants.so2, unit: 'ppb' },
    { id: 'co', value: pollutants.co, unit: 'ppm' },
  ];

  return (
    <Card className="shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Pollutants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {pollutantList.map((pollutant) => (
            <div key={pollutant.id} className="transition-all duration-300 hover:bg-gray-50 p-2 rounded-md">
              <div className="text-sm text-gray-500">{getPollutantName(pollutant.id)}</div>
              <div className="text-xl font-semibold">
                {pollutant.value} <span className="text-sm font-normal">{pollutant.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PollutantsCard;
