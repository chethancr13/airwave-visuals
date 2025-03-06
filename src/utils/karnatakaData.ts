
import { LocationData } from "@/types";

// Karnataka's 29 districts 
export const karnatakaDistricts: LocationData[] = [
  { name: "Bangalore Urban", coordinates: { latitude: 12.9716, longitude: 77.5946 } },
  { name: "Bangalore Rural", coordinates: { latitude: 13.2846, longitude: 77.7947 } },
  { name: "Mysore", coordinates: { latitude: 12.2958, longitude: 76.6394 } },
  { name: "Mangalore", coordinates: { latitude: 12.9141, longitude: 74.8560 } },
  { name: "Hubli-Dharwad", coordinates: { latitude: 15.3647, longitude: 75.1240 } },
  { name: "Belgaum", coordinates: { latitude: 15.8497, longitude: 74.4977 } },
  { name: "Davanagere", coordinates: { latitude: 14.4644, longitude: 75.9218 } },
  { name: "Bellary", coordinates: { latitude: 15.1394, longitude: 76.9214 } },
  { name: "Shimoga", coordinates: { latitude: 13.9299, longitude: 75.5681 } },
  { name: "Tumkur", coordinates: { latitude: 13.3409, longitude: 77.1014 } },
  { name: "Raichur", coordinates: { latitude: 16.2120, longitude: 77.3439 } },
  { name: "Bidar", coordinates: { latitude: 17.9104, longitude: 77.5199 } },
  { name: "Gulbarga", coordinates: { latitude: 17.3297, longitude: 76.8343 } },
  { name: "Hassan", coordinates: { latitude: 13.0068, longitude: 76.1003 } },
  { name: "Chitradurga", coordinates: { latitude: 14.2256, longitude: 76.3997 } },
  { name: "Udupi", coordinates: { latitude: 13.3409, longitude: 74.7421 } },
  { name: "Chikmagalur", coordinates: { latitude: 13.3161, longitude: 75.7720 } },
  { name: "Kolar", coordinates: { latitude: 13.1357, longitude: 78.1407 } },
  { name: "Koppal", coordinates: { latitude: 15.3547, longitude: 76.1565 } },
  { name: "Mandya", coordinates: { latitude: 12.5221, longitude: 76.8952 } },
  { name: "Chamarajanagar", coordinates: { latitude: 11.9214, longitude: 76.9408 } },
  { name: "Uttara Kannada", coordinates: { latitude: 14.8005, longitude: 74.1304 } },
  { name: "Bagalkot", coordinates: { latitude: 16.1691, longitude: 75.6615 } },
  { name: "Gadag", coordinates: { latitude: 15.4316, longitude: 75.6368 } },
  { name: "Haveri", coordinates: { latitude: 14.7965, longitude: 75.4043 } },
  { name: "Bijapur", coordinates: { latitude: 16.8302, longitude: 75.7100 } },
  { name: "Chikkaballapur", coordinates: { latitude: 13.4323, longitude: 77.7271 } },
  { name: "Kodagu", coordinates: { latitude: 12.3375, longitude: 75.8069 } },
  { name: "Yadgir", coordinates: { latitude: 16.7689, longitude: 77.1390 } },
];

// Bangalore hospitals with coordinates
export const bangaloreHospitals = [
  { 
    id: 1, 
    name: "Narayana Health City", 
    distance: "9.2 km", 
    specialty: "Cardiology & Pulmonology", 
    position: { x: 25, y: 30 },
    healthServices: ["Asthma Care", "COPD Management", "Pulmonary Function Tests"]
  },
  { 
    id: 2, 
    name: "Manipal Hospital", 
    distance: "5.5 km", 
    specialty: "Multi-Specialty Care", 
    position: { x: 65, y: 20 },
    healthServices: ["Respiratory Care", "Allergy Testing", "Sleep Apnea Treatment"]
  },
  { 
    id: 3, 
    name: "Fortis Hospital", 
    distance: "7.3 km", 
    specialty: "Respiratory & Critical Care", 
    position: { x: 45, y: 70 },
    healthServices: ["Asthma & Allergy", "Lung Cancer Treatment", "Pulmonary Rehabilitation"]
  },
  { 
    id: 4, 
    name: "Columbia Asia Hospital", 
    distance: "3.9 km", 
    specialty: "Emergency & Acute Care", 
    position: { x: 80, y: 55 },
    healthServices: ["24/7 Emergency Care", "Respiratory Emergencies", "Ventilator Support"]
  },
  { 
    id: 5, 
    name: "St. John's Medical College Hospital", 
    distance: "8.2 km", 
    specialty: "Pediatric Pulmonology", 
    position: { x: 20, y: 65 },
    healthServices: ["Child Asthma Care", "Pediatric Allergy", "Cystic Fibrosis Management"]
  },
  { 
    id: 6, 
    name: "Aster CMI Hospital", 
    distance: "11.5 km", 
    specialty: "Interventional Pulmonology", 
    position: { x: 35, y: 40 },
    healthServices: ["Bronchoscopy", "Thoracoscopy", "Advanced Respiratory Diagnostics"]
  },
  { 
    id: 7, 
    name: "Apollo Hospitals", 
    distance: "6.8 km", 
    specialty: "Cardiopulmonary Care", 
    position: { x: 55, y: 30 },
    healthServices: ["Cardiac Asthma Treatment", "Pulmonary Hypertension", "Respiratory Rehabilitation"]
  },
];
