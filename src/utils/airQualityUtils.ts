
import { AirQualityData } from "../types";

export const getAqiCategory = (aqi: number): AirQualityData['category'] => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getAqiColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-aqi-good';
  if (aqi <= 100) return 'bg-aqi-moderate';
  if (aqi <= 150) return 'bg-yellow-500';
  if (aqi <= 200) return 'bg-aqi-unhealthy';
  if (aqi <= 300) return 'bg-aqi-very-unhealthy';
  return 'bg-aqi-hazardous';
};

export const getAqiTextColor = (aqi: number): string => {
  if (aqi <= 50) return 'text-aqi-good';
  if (aqi <= 100) return 'text-aqi-moderate';
  if (aqi <= 150) return 'text-yellow-500';
  if (aqi <= 200) return 'text-aqi-unhealthy';
  if (aqi <= 300) return 'text-aqi-very-unhealthy';
  return 'text-aqi-hazardous';
};

export const getAqiAdvice = (category: AirQualityData['category']): string => {
  switch (category) {
    case 'Good':
      return 'Air quality is satisfactory and poses little or no risk.';
    case 'Moderate':
      return 'Air quality is acceptable but may cause moderate health concerns for a small number of sensitive individuals.';
    case 'Unhealthy for Sensitive Groups':
      return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    case 'Unhealthy':
      return 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
    case 'Very Unhealthy':
      return 'Health alert: The risk of health effects is increased for everyone.';
    case 'Hazardous':
      return 'Health warning of emergency conditions: everyone is more likely to be affected.';
    default:
      return 'No data available.';
  }
};

export const getPollutantName = (pollutant: string): string => {
  switch (pollutant) {
    case 'pm25':
      return 'PM2.5';
    case 'pm10':
      return 'PM10';
    case 'o3':
      return 'Ozone (O₃)';
    case 'no2':
      return 'Nitrogen Dioxide (NO₂)';
    case 'so2':
      return 'Sulfur Dioxide (SO₂)';
    case 'co':
      return 'Carbon Monoxide (CO)';
    default:
      return pollutant;
  }
};

export const getPollutantDescription = (pollutant: string): string => {
  switch (pollutant) {
    case 'pm25':
      return 'Fine particulate matter that can penetrate deep into the lungs and bloodstream.';
    case 'pm10':
      return 'Inhalable particles, with diameters 10 micrometers and smaller.';
    case 'o3':
      return 'A reactive gas formed by the reaction of sunlight with pollutants from vehicle emissions.';
    case 'no2':
      return 'A reddish-brown gas that comes from burning of fossil fuels.';
    case 'so2':
      return 'A colorless gas with a sharp odor, produced from burning fossil fuels.';
    case 'co':
      return 'An odorless, colorless gas formed by incomplete combustion.';
    default:
      return 'No description available.';
  }
};
