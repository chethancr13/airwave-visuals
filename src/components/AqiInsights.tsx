
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const predictedData = [
  { year: 2024, aqi: 95 },
  { year: 2025, aqi: 92 },
  { year: 2026, aqi: 88 },
  { year: 2027, aqi: 85 },
  { year: 2028, aqi: 82 },
  { year: 2029, aqi: 78 },
  { year: 2030, aqi: 75 },
  { year: 2031, aqi: 72 },
  { year: 2032, aqi: 68 },
  { year: 2033, aqi: 65 },
];

const AqiInsights = () => {
  return (
    <Card className="shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">10-Year AQI Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictedData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Improvement Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Increase adoption of electric vehicles</li>
              <li>Enhance public transportation infrastructure</li>
              <li>Implement stricter industrial emission controls</li>
              <li>Expand urban green spaces and tree cover</li>
              <li>Promote renewable energy sources</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AqiInsights;
