import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - in a real app, this would come from an API
const generateHistoricalData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      aqi: Math.floor(Math.random() * 150) + 20,
      pm25: Math.floor(Math.random() * 100) + 10,
      pm10: Math.floor(Math.random() * 120) + 15,
      o3: Math.floor(Math.random() * 80) + 5,
      no2: Math.floor(Math.random() * 60) + 10,
    });
  }
  
  return data;
};

const History = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState("30days");
  const [data, setData] = useState(generateHistoricalData());
  const [pollutant, setPollutant] = useState("aqi");
  
  useEffect(() => {
    // In a real app, this would fetch data based on the selected period
    const days = period === "7days" ? 7 : period === "30days" ? 30 : 90;
    setData(generateHistoricalData(days));
  }, [period]);
  
  const getColorForValue = (value: number) => {
    if (value <= 50) return "#4CAF50"; // Good
    if (value <= 100) return "#FFC107"; // Moderate
    if (value <= 150) return "#FF9800"; // Unhealthy for sensitive groups
    if (value <= 200) return "#F44336"; // Unhealthy
    if (value <= 300) return "#9C27B0"; // Very unhealthy
    return "#7D1128"; // Hazardous
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Historical Air Quality Data</h1>
          <p className="text-gray-600">View and analyze past air quality measurements</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Time Period</CardTitle>
              <CardDescription>Select the time range for data</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pollutant</CardTitle>
              <CardDescription>Select pollutant to display</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={pollutant} onValueChange={setPollutant}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pollutant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aqi">Air Quality Index (AQI)</SelectItem>
                  <SelectItem value="pm25">PM2.5</SelectItem>
                  <SelectItem value="pm10">PM10</SelectItem>
                  <SelectItem value="o3">Ozone (O₃)</SelectItem>
                  <SelectItem value="no2">Nitrogen Dioxide (NO₂)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a specific date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              {pollutant.toUpperCase()} Levels - {period === "7days" ? "Last 7 Days" : period === "30days" ? "Last 30 Days" : "Last 90 Days"}
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={pollutant} 
                    name={pollutant.toUpperCase()} 
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="line" className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              {pollutant.toUpperCase()} Trend - {period === "7days" ? "Last 7 Days" : period === "30days" ? "Last 30 Days" : "Last 90 Days"}
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={pollutant} 
                    name={pollutant.toUpperCase()} 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Data Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AQI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM2.5</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM10</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O₃</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO₂</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.aqi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pm25}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pm10}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.o3}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.no2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500 bg-white/60 backdrop-blur-md mt-10">
        <div className="container mx-auto">
          <p>Air Quality History Monitor &copy; {new Date().getFullYear()} | Historical Air Quality Data</p>
        </div>
      </footer>
    </div>
  );
};

export default History;
