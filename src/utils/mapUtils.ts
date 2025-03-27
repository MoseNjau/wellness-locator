
import { HealthCenter } from './healthCenters';

// Calculate distance between two coordinate points using the Haversine formula
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

// Sort centers by distance from a given point
export const sortByDistance = (
  centers: HealthCenter[],
  latitude: number,
  longitude: number
): HealthCenter[] => {
  return [...centers].sort((a, b) => {
    const distanceA = calculateDistance(latitude, longitude, a.location.lat, a.location.lng);
    const distanceB = calculateDistance(latitude, longitude, b.location.lat, b.location.lng);
    return distanceA - distanceB;
  });
};

// Get user's current location
export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Default to Kiambu County central coordinates if geolocation is denied
        resolve({ lat: -1.1711, lng: 36.8304 });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// Filter centers by type, emergency status, and search term
export const filterCenters = (
  centers: HealthCenter[],
  filters: {
    searchTerm?: string;
    type?: string;
    emergency?: boolean | null;
  }
) => {
  const { searchTerm = '', type = 'All', emergency = null } = filters;
  
  return centers.filter(center => {
    const matchesSearch = searchTerm === '' || 
                         center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = type === 'All' || center.type === type;
    
    const matchesEmergency = emergency === null || center.emergency === emergency;
    
    return matchesSearch && matchesType && matchesEmergency;
  });
};

// Format open status of a health center
export const getOpenStatus = (center: HealthCenter): { isOpen: boolean; status: string } => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[new Date().getDay()];
  const hours = center.hours[today as keyof typeof center.hours];
  
  if (hours === 'Closed') {
    return { isOpen: false, status: 'Closed today' };
  }
  
  if (hours === '24 hours') {
    return { isOpen: true, status: 'Open 24 hours' };
  }
  
  // Parse hours like "8:00 AM - 5:00 PM"
  try {
    const [openTime, closeTime] = hours.split(' - ');
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Parse open time
    const openTimeParts = openTime.match(/(\d+):(\d+) (\w+)/);
    if (!openTimeParts) return { isOpen: false, status: 'Hours unknown' };
    
    let openHour = parseInt(openTimeParts[1]);
    const openMinute = parseInt(openTimeParts[2]);
    const openAmPm = openTimeParts[3];
    
    if (openAmPm.toUpperCase() === 'PM' && openHour < 12) openHour += 12;
    if (openAmPm.toUpperCase() === 'AM' && openHour === 12) openHour = 0;
    
    // Parse close time
    const closeTimeParts = closeTime.match(/(\d+):(\d+) (\w+)/);
    if (!closeTimeParts) return { isOpen: false, status: 'Hours unknown' };
    
    let closeHour = parseInt(closeTimeParts[1]);
    const closeMinute = parseInt(closeTimeParts[2]);
    const closeAmPm = closeTimeParts[3];
    
    if (closeAmPm.toUpperCase() === 'PM' && closeHour < 12) closeHour += 12;
    if (closeAmPm.toUpperCase() === 'AM' && closeHour === 12) closeHour = 0;
    
    // Check if currently open
    const isBeforeClosing = currentHours < closeHour || (currentHours === closeHour && currentMinutes < closeMinute);
    const isAfterOpening = currentHours > openHour || (currentHours === openHour && currentMinutes >= openMinute);
    
    const isOpen = isAfterOpening && isBeforeClosing;
    
    if (isOpen) {
      return { isOpen: true, status: `Open until ${closeTime}` };
    } else {
      if (currentHours < openHour || (currentHours === openHour && currentMinutes < openMinute)) {
        return { isOpen: false, status: `Opens at ${openTime}` };
      } else {
        return { isOpen: false, status: 'Closed now' };
      }
    }
  } catch (error) {
    return { isOpen: false, status: 'Hours unknown' };
  }
};
