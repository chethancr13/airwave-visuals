
import React, { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { AirQualityData } from '@/types';

interface AqiAlertSystemProps {
  data: AirQualityData;
}

const AQI_THRESHOLD = 150; // Threshold for unhealthy AQI

const AqiAlertSystem: React.FC<AqiAlertSystemProps> = ({ data }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (data.aqi >= AQI_THRESHOLD) {
      toast({
        title: "⚠️ High AQI Alert",
        description: `Current AQI level (${data.aqi}) is unhealthy. Consider staying indoors and using air purifiers.`,
        variant: "destructive",
        duration: 10000,
      });
    }
  }, [data.aqi, toast]);

  return null;
};

export default AqiAlertSystem;
