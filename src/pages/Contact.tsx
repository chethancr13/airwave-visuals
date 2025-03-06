
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneCall, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
              Contact & Support
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for assistance with respiratory health concerns, 
              air quality information, or technical support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md card-hover-effect overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Help & Emergency</CardTitle>
                <CardDescription>
                  Contact information for immediate assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <PhoneCall className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Emergency Hotline</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      For respiratory emergencies: <span className="font-medium">911</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Air Quality Helpline: <span className="font-medium">(555) 123-4567</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Respiratory Care Centers</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      View our <a href="/map" className="text-primary hover:underline">interactive map</a> to find 
                      respiratory care centers in your area.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Hours</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Monday to Friday: 8:00 AM - 8:00 PM
                    </p>
                    <p className="text-sm text-gray-600">
                      Saturday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-sm text-gray-600">
                      Sunday: Closed (Emergency line available 24/7)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md card-hover-effect overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Have questions or feedback? Reach out to us
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      General Inquiries: <span className="font-medium">info@airvision.com</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Technical Support: <span className="font-medium">support@airvision.com</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Chat with our support team for immediate assistance with air quality concerns.
                    </p>
                    <button className="mt-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">
                      Start Chat
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Medical Disclaimer</h3>
                  <p className="text-xs text-gray-600">
                    The information provided by AirVision is for general informational purposes only. All information 
                    is provided in good faith, however, we make no representation or warranty of any kind regarding 
                    the accuracy or completeness of any information. Always seek the advice of a qualified health provider 
                    with any questions you may have regarding your condition.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">Air Quality Alerts & Notifications</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sign up to receive air quality alerts for your area, helping you make informed decisions 
                about outdoor activities, especially for those with respiratory sensitivities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;
