
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from '@/types';
import { getPollutantName } from '@/utils/airQualityUtils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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

  // Convert data for chart
  const chartData = pollutantList.map(pollutant => ({
    name: getPollutantName(pollutant.id).split(' ')[0], // Just get first part of the name to keep it short
    value: pollutant.value,
    id: pollutant.id
  }));

  // Define colors for each pollutant
  const getBarColor = (id: string) => {
    switch(id) {
      case 'pm25': return '#FF5252';
      case 'pm10': return '#FF7B52';
      case 'o3': return '#9C27B0';
      case 'no2': return '#3F51B5';
      case 'so2': return '#FFC107';
      case 'co': return '#4CAF50';
      default: return '#9966FF';
    }
  };

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
        
        {/* Pollutants Bar Chart */}
        <div className="pollutant-chart mt-4 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Value']}
                labelFormatter={(name) => `Pollutant: ${name}`}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.id)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollutantsCard;
