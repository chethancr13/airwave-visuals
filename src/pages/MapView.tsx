
import React from 'react';
import Navbar from '@/components/Navbar';
import MapComponent from '@/components/MapComponent';
import { Card, CardDescription } from '@/components/ui/card';

const MapView: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
              Air Quality & Medical Facilities Map
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View real-time air quality data across the city and find nearby medical facilities 
              specializing in respiratory care and asthma treatment.
            </p>
          </div>
          
          <Card className="p-1 bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg">
            <MapComponent />
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-sm">
              <h3 className="font-semibold text-lg">How to Use This Map</h3>
              <CardDescription>
                Click on any hospital icon to view details about the facility, including distance and specialties.
                The map also shows air quality indicators in different areas to help you plan your activities.
              </CardDescription>
            </Card>
            
            <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-sm">
              <h3 className="font-semibold text-lg">Respiratory Health Advice</h3>
              <CardDescription>
                For areas with AQI above 100, individuals with asthma or other respiratory conditions
                should consider limiting outdoor activities or wearing appropriate masks.
              </CardDescription>
            </Card>
            
            <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-sm">
              <h3 className="font-semibold text-lg">Emergency Information</h3>
              <CardDescription>
                In case of severe respiratory distress, call emergency services at 911 immediately.
                For non-emergency situations, contact the nearest facility shown on the map.
              </CardDescription>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
