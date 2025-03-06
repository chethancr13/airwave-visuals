
import React from 'react';
import Navbar from '@/components/Navbar';
import { Info, Users, Code, Leaf, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Info className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">About AirVision</h1>
          </div>
          
          <div className="space-y-10">
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center mb-4">
                <Leaf className="h-6 w-6 text-primary mr-2" />
                Our Impact on Society
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AirVision empowers communities to make informed decisions about their health and daily activities based on real-time air quality data. By providing accessible information about pollution levels, we help vulnerable populations such as children, elderly, and those with respiratory conditions take necessary precautions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform contributes to public health by raising awareness about air pollution and its effects. Users can track air quality trends over time, enabling them to understand pollution patterns in their area and take collective action when necessary.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By visualizing environmental data, we help bridge the gap between scientific information and public understanding, fostering a greater sense of environmental responsibility and encouraging sustainable practices in communities.
              </p>
            </section>
            
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center mb-4">
                <Code className="h-6 w-6 text-primary mr-2" />
                How AirVision Works
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AirVision collects real-time data from air quality monitoring stations across Karnataka. Our system processes this data using advanced algorithms to calculate the Air Quality Index (AQI) for different pollutants including PM2.5, PM10, NO2, SO2, CO, and O3.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The platform features an interactive map view that displays pollution hotspots, allowing users to visualize air quality variations across different locations. Our historical data tracking provides insights into pollution trends, helping users identify patterns and correlations with weather conditions or human activities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The personalized health assessment feature interprets AQI values in terms of potential health impacts, offering tailored recommendations based on the current air quality and user's health profile. All information is presented through an intuitive, responsive interface designed to be accessible across all devices.
              </p>
            </section>
            
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center mb-4">
                <Users className="h-6 w-6 text-primary mr-2" />
                About Our Team
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AirVision was developed by <span className="font-semibold">Code Crew</span>, a passionate team of students from KS Institute of Technology. Our team came together during a hackathon with a shared vision to address environmental challenges using technology.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Combining expertise in software development, data science, and environmental studies, we created this platform to make air quality information more accessible and actionable for everyone. We believe that informed citizens can make better decisions for their health and collectively contribute to a cleaner environment.
              </p>
              <div className="mt-6 text-center">
                <p className="flex items-center justify-center text-primary">
                  <Heart className="h-5 w-5 mr-2" /> 
                  Made with passion by Code Crew, KS Institute of Technology
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
