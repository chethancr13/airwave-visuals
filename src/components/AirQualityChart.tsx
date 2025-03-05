
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData, TimeRange } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAqiColor } from '@/utils/airQualityUtils';

interface AirQualityChartProps {
  data: AirQualityData[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ 
  data, 
  timeRange, 
  onTimeRangeChange 
}) => {
  const formatTime = (time: string) => {
    const date = new Date(time);
    
    switch (timeRange) {
      case '1h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
      case '30d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleTimeString();
    }
  };

  const chartData = data.map(item => ({
    time: formatTime(item.time),
    aqi: item.aqi,
    originalTime: item.time,
  }));

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.originalTime);
      const formattedDate = date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-xs text-gray-500">{formattedDate}</p>
          <p className="font-medium">AQI: {data.aqi}</p>
        </div>
      );
    }
    return null;
  };

  // Get gradient colors for the chart
  const getGradientColors = () => {
    const avg = Math.round(data.reduce((sum, item) => sum + item.aqi, 0) / data.length);
    if (avg <= 50) return { stop1: '#4CAF50', stop2: '#A5D6A7' };
    if (avg <= 100) return { stop1: '#FFC107', stop2: '#FFE082' };
    if (avg <= 150) return { stop1: '#FF9800', stop2: '#FFCC80' };
    if (avg <= 200) return { stop1: '#F44336', stop2: '#EF9A9A' };
    if (avg <= 300) return { stop1: '#9C27B0', stop2: '#CE93D8' };
    return { stop1: '#7B1FA2', stop2: '#BA68C8' };
  };

  const gradientColors = getGradientColors();

  return (
    <Card className="shadow-sm col-span-2 transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">AQI Trend</CardTitle>
          <div className="flex space-x-1">
            <button 
              onClick={() => onTimeRangeChange('1h')}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === '1h' ? 'bg-primary text-white' : 'bg-secondary hover:bg-gray-200'
              }`}
            >
              1H
            </button>
            <button 
              onClick={() => onTimeRangeChange('24h')}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === '24h' ? 'bg-primary text-white' : 'bg-secondary hover:bg-gray-200'
              }`}
            >
              24H
            </button>
            <button 
              onClick={() => onTimeRangeChange('7d')}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === '7d' ? 'bg-primary text-white' : 'bg-secondary hover:bg-gray-200'
              }`}
            >
              7D
            </button>
            <button 
              onClick={() => onTimeRangeChange('30d')}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === '30d' ? 'bg-primary text-white' : 'bg-secondary hover:bg-gray-200'
              }`}
            >
              30D
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColors.stop1} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={gradientColors.stop2} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
              tickMargin={5}
            />
            <YAxis 
              domain={[0, 'dataMax + 20']}
              tick={{ fontSize: 10 }}
              tickMargin={5}
            />
            <Tooltip content={customTooltip} />
            <Area 
              type="monotone" 
              dataKey="aqi" 
              stroke={gradientColors.stop1}
              fillOpacity={1} 
              fill="url(#aqiGradient)"
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
