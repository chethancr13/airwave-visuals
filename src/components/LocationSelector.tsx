
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LocationData } from '@/types';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  locations: LocationData[];
  currentLocation: LocationData;
  onLocationChange: (location: LocationData) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  locations, 
  currentLocation, 
  onLocationChange 
}) => {
  // Combine current location with other locations
  const allLocations = [currentLocation, ...locations];
  
  const handleLocationChange = (value: string) => {
    const location = allLocations.find(loc => loc.name === value);
    if (location) {
      onLocationChange(location);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-6 animate-fade-in">
      <MapPin className="text-primary h-5 w-5" />
      <Select 
        defaultValue={currentLocation.name}
        onValueChange={handleLocationChange}
      >
        <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0 pl-0">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {allLocations.map((location) => (
            <SelectItem key={location.name} value={location.name}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationSelector;
