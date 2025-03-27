
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';
import healthCenters, { HealthCenter } from '../utils/healthCenters';

// Mock Google Maps integration - in a real app, you would use the actual Google Maps API
const MapComponent = ({ 
  selectedCenter,
  filteredCenters = healthCenters
}: {
  selectedCenter?: HealthCenter;
  filteredCenters?: HealthCenter[];
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          // Default to Kiambu County central coordinates if geolocation is denied
          setUserLocation({ lat: -1.1711, lng: 36.8304 });
          setLoading(false);
        }
      );
    } else {
      // Default to Kiambu County central coordinates if geolocation is not supported
      setUserLocation({ lat: -1.1711, lng: 36.8304 });
      setLoading(false);
    }
  }, []);
  
  // Open Google Maps for directions
  const openDirections = (center: HealthCenter, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.location.lat},${center.location.lng}`;
    window.open(url, '_blank');
  };
  
  // Navigate to center detail page
  const navigateToCenter = (centerId: string) => {
    navigate(`/center/${centerId}`);
  };
  
  // Calculate distance from user to health center (simplified version)
  const calculateDistance = (center: HealthCenter): number | null => {
    if (!userLocation) return null;
    
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    
    const lat1 = toRadians(userLocation.lat);
    const lon1 = toRadians(userLocation.lng);
    const lat2 = toRadians(center.location.lat);
    const lon2 = toRadians(center.location.lng);
    
    const R = 6371; // Earth's radius in km
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  };
  
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-foreground/70">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#e8f0f7]">
          {/* Fake map rendering - in a real app, this would be replaced with Google Maps */}
          <div 
            ref={mapRef} 
            className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/36.83,-1.17,9,0/1200x800?access_token=pk.dummy')] bg-cover bg-center"
          ></div>
          
          {/* User location marker */}
          {userLocation && (
            <div 
              className="absolute w-6 h-6 rounded-full bg-blue-500 border-2 border-white animate-pulse-soft z-10"
              style={{ 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <span className="sr-only">Your location</span>
            </div>
          )}
          
          {/* Health center markers */}
          {filteredCenters.map(center => {
            // Calculate relative position on the fake map based on latitude and longitude difference from center
            // This is a simplification for demo purposes
            const baseLat = -1.17;
            const baseLng = 36.83;
            const latDiff = (center.location.lat - baseLat) * 800; // Scale factor
            const lngDiff = (center.location.lng - baseLng) * 800; // Scale factor
            
            const isSelected = selectedCenter?.id === center.id;
            
            return (
              <div
                key={center.id}
                className={`absolute flex flex-col items-center group cursor-pointer z-20 transition-all duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                style={{ 
                  left: `calc(50% + ${lngDiff}px)`, 
                  top: `calc(50% - ${latDiff}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => navigateToCenter(center.id)}
              >
                <div 
                  className={`center-pin ${
                    isSelected 
                      ? 'bg-primary shadow-lg scale-110' 
                      : center.type === 'Hospital' 
                        ? 'bg-red-500' 
                        : center.type === 'Clinic' 
                          ? 'bg-green-500' 
                          : center.type === 'Maternity' 
                            ? 'bg-purple-500' 
                            : center.type === 'Dental' 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                
                {/* Popup details */}
                <div className={`absolute bottom-6 -translate-y-1 opacity-0 transition-all duration-300 pointer-events-none ${
                  isSelected ? 'opacity-100 translate-y-0 pointer-events-auto' : 'group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}>
                  <div className="glass-panel rounded-lg shadow-lg p-3 min-w-[200px] max-w-[250px]">
                    <h4 className="font-semibold text-sm truncate">{center.name}</h4>
                    <p className="text-xs text-foreground/70 mb-2">{center.type}</p>
                    
                    {userLocation && (
                      <p className="text-xs text-foreground/70 flex items-center mb-2">
                        <span className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center mr-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        </span>
                        {calculateDistance(center)?.toFixed(1)} km away
                      </p>
                    )}
                    
                    <button 
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-md hover:bg-primary transition-colors"
                      onClick={(e) => openDirections(center, e)}
                    >
                      <Navigation className="w-3 h-3 mr-1" /> Directions
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>
          
          {/* Map attribution */}
          <div className="absolute bottom-1 right-1 text-[10px] text-foreground/50 bg-white/80 px-1 rounded">
            Map data © Example Maps
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
