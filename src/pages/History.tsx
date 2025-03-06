
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Legend
} from 'recharts';
import { Clock, Calendar, FileClock, Filter } from 'lucide-react';

// Simulated historical data
const dailyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  aqi: Math.floor(Math.random() * 50) + 50,
  pm25: Math.floor(Math.random() * 30) + 10,
  pm10: Math.floor(Math.random() * 40) + 20,
  timestamp: new Date(new Date().setHours(i, 0, 0, 0)).toISOString(),
}));

const weeklyData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 6 + i);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    aqi: Math.floor(Math.random() * 70) + 40,
    pm25: Math.floor(Math.random() * 40) + 15,
    pm10: Math.floor(Math.random() * 50) + 25,
    timestamp: date.toISOString(),
  };
});

const monthlyData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 29 + i);
  return {
    day: date.getDate(),
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    aqi: Math.floor(Math.random() * 80) + 30,
    pm25: Math.floor(Math.random() * 50) + 10,
    pm10: Math.floor(Math.random() * 60) + 20,
    timestamp: date.toISOString(),
  };
});

// Simulated health data correlated with AQI
const healthImpactData = weeklyData.map(item => ({
  ...item,
  asthmaReports: Math.floor(item.aqi / 10) + Math.floor(Math.random() * 5),
  hospitalVisits: Math.floor(item.aqi / 20) + Math.floor(Math.random() * 3),
}));

// Correlation with weather factors
const correlationData = [
  { factor: 'Temperature', correlation: 0.65 },
  { factor: 'Humidity', correlation: 0.72 },
  { factor: 'Wind Speed', correlation: -0.58 },
  { factor: 'Rainfall', correlation: -0.81 },
  { factor: 'Traffic Density', correlation: 0.89 },
  { factor: 'Industrial Activity', correlation: 0.76 }
];

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
              Historical AQI Data for Bangalore
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track air quality trends over time and analyze patterns to better understand local pollution factors
            </p>
          </div>
          
          <Tabs defaultValue="daily" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="daily" className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>24 Hours</span>
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>7 Days</span>
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center gap-1">
                  <FileClock size={14} />
                  <span>30 Days</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-1">
                  <Filter size={14} />
                  <span>Analysis</span>
                </TabsTrigger>
              </TabsList>
              <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
            </div>
            
            <TabsContent value="daily" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>24-Hour AQI Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <defs>
                          <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [value, name === 'aqi' ? 'AQI' : name]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="aqi" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#aqiGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>PM2.5 Levels (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="pm25" stroke="#ff7300" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>PM10 Levels (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="pm10" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>7-Day AQI Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <defs>
                          <linearGradient id="aqiGradientWeekly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [value, name === 'aqi' ? 'AQI' : name]}
                          labelFormatter={(label) => `Day: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="aqi" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#aqiGradientWeekly)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Particulate Matter Comparison (Weekly)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pm25" name="PM2.5" fill="#8884d8" />
                        <Bar dataKey="pm10" name="PM10" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>30-Day AQI Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number, name: string) => [value, name === 'aqi' ? 'AQI' : name]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="aqi" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={{ r: 0 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly PM2.5 Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="pm25" stroke="#ff7300" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly PM10 Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="pm10" stroke="#82ca9d" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Impact Correlation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthImpactData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="aqi" name="AQI" stroke="#8884d8" />
                          <Line yAxisId="right" type="monotone" dataKey="asthmaReports" name="Asthma Reports" stroke="#82ca9d" />
                          <Line yAxisId="right" type="monotone" dataKey="hospitalVisits" name="Hospital Visits" stroke="#ff7300" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AQI Correlation Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={correlationData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[-1, 1]} />
                          <YAxis dataKey="factor" type="category" />
                          <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Correlation']} />
                          <Bar 
                            dataKey="correlation" 
                            fill={(datum) => datum.correlation > 0 ? "#8884d8" : "#ff7300"}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI-Driven AQI Predictions & Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h3 className="font-medium mb-2">Key Findings</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Traffic congestion shows strongest correlation with AQI spikes (89%)</li>
                        <li>Hospital visits for respiratory issues increase 23% when AQI exceeds 150</li>
                        <li>AQI levels are typically lowest between 3-6 AM and highest between 5-8 PM</li>
                        <li>Rainfall events consistently reduce AQI levels by 30-40% within 24 hours</li>
                        <li>Weekend AQI levels are 18% lower than weekday levels on average</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 className="font-medium mb-2">Personalized Recommendations</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>For asthma patients: Schedule outdoor activities before 9 AM when AQI is lowest</li>
                        <li>Use air purifiers during evening hours (5-9 PM) when pollution peaks</li>
                        <li>Consider N95 masks when AQI exceeds 100 for sensitive individuals</li>
                        <li>Monitor weather forecasts for rainfall, which improves air quality</li>
                        <li>Plan longer outdoor activities for weekends when pollution levels are lower</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default History;
