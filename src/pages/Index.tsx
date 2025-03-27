
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hospital, Scissors, Baby, Building, MapPin, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import healthCenters, { filterHealthCenters } from '../utils/healthCenters';
import { sortByDistance, getUserLocation } from '../utils/mapUtils';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(healthCenters);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestCenters, setNearestCenters] = useState(healthCenters.slice(0, 3));
  const [loadingLocation, setLoadingLocation] = useState(true);
  
  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredCenters(filterHealthCenters(value));
  };
  
  // Get user location and sort centers by distance
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        
        // Sort centers by distance
        const sorted = sortByDistance(healthCenters, location.lat, location.lng);
        setNearestCenters(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error getting user location:', error);
      } finally {
        setLoadingLocation(false);
      }
    };
    
    fetchLocation();
  }, []);
  
  // Filter types
  const handleFilterType = (type: string) => {
    setFilteredCenters(filterHealthCenters(searchTerm, type));
  };
  
  // Get icon for each health center type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Hospital className="w-5 h-5" />;
      case 'Dental':
        return <Scissors className="w-5 h-5" />;
      case 'Maternity':
        return <Baby className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };
  
  // Calculate distance from user to a center
  const calculateDistanceDisplay = (center: any) => {
    if (!userLocation) return '';
    
    const sortedCenter = sortByDistance([center], userLocation.lat, userLocation.lng)[0];
    if (!sortedCenter) return '';
    
    const distance = calculateDistance(center, userLocation);
    return `${distance.toFixed(1)} km away`;
  };
  
  // Helper function to calculate distance
  const calculateDistance = (center: any, userLoc: {lat: number, lng: number}) => {
    if (!center || !userLoc) return 0;
    
    const R = 6371; // Earth's radius in km
    const lat1 = userLoc.lat;
    const lon1 = userLoc.lng;
    const lat2 = center.location.lat;
    const lon2 = center.location.lng;
    
    // Simple distance calculation
    return Math.sqrt(
      Math.pow((lat2 - lat1) * 111, 2) + 
      Math.pow((lon2 - lon1) * 111 * Math.cos(lat1 * (Math.PI / 180)), 2)
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground/90 tracking-tight animate-fade-in">
            Find Healthcare Facilities in Kiambu County
          </h1>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Locate hospitals, clinics, and specialized healthcare centers near you with real-time information and directions.
          </p>
          
          <div className="animate-fade-in animation-delay-300">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in animation-delay-400">
            <button 
              className="filter-button"
              onClick={() => handleFilterType('Hospital')}
            >
              <Hospital className="w-4 h-4 mr-1" />
              Hospitals
            </button>
            <button 
              className="filter-button"
              onClick={() => handleFilterType('Clinic')}
            >
              <Building className="w-4 h-4 mr-1" />
              Clinics
            </button>
            <button 
              className="filter-button"
              onClick={() => handleFilterType('Maternity')}
            >
              <Baby className="w-4 h-4 mr-1" />
              Maternity
            </button>
            <button 
              className="filter-button"
              onClick={() => handleFilterType('Dental')}
            >
              <Scissors className="w-4 h-4 mr-1" />
              Dental
            </button>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="map-container animate-scale-in">
            <Map filteredCenters={filteredCenters} />
          </div>
        </div>
      </section>
      
      {/* Nearest Health Centers Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Nearest Health Centers</h2>
            <Link 
              to="/directory" 
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {loadingLocation ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearestCenters.map((center) => (
                <Link 
                  key={center.id} 
                  to={`/center/${center.id}`}
                  className="glass-card hover:glass-card-hover rounded-xl p-4 transition-all duration-300 hover:translate-y-[-4px]"
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-white ${
                      center.type === 'Hospital' ? 'bg-red-500' :
                      center.type === 'Clinic' ? 'bg-green-500' :
                      center.type === 'Maternity' ? 'bg-purple-500' :
                      center.type === 'Dental' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      {getTypeIcon(center.type)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight">{center.name}</h3>
                      
                      <div className="flex items-center text-sm text-foreground/70 my-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{center.address}</span>
                      </div>
                      
                      {center.rating && (
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(center.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-1 text-xs">{center.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border/30 flex justify-between items-center">
                    <div className="text-xs text-foreground/70">
                      {userLocation && calculateDistanceDisplay(center)}
                    </div>
                    
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {center.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 px-4 bg-gradient-to-t from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Hospitals', type: 'Hospital', icon: <Hospital className="w-6 h-6" />, color: 'bg-red-500' },
              { name: 'Clinics', type: 'Clinic', icon: <Building className="w-6 h-6" />, color: 'bg-green-500' },
              { name: 'Maternity', type: 'Maternity', icon: <Baby className="w-6 h-6" />, color: 'bg-purple-500' },
              { name: 'Dental', type: 'Dental', icon: <Scissors className="w-6 h-6" />, color: 'bg-yellow-500' },
            ].map((category) => (
              <Link 
                key={category.type}
                to={`/directory?type=${category.type}`}
                className="glass-card hover:glass-card-hover rounded-xl p-6 text-center transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className={`${category.color} w-14 h-14 mx-auto rounded-full flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm text-foreground/70 mt-2">
                  {healthCenters.filter(c => c.type === category.type).length} facilities
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-primary text-3xl mr-2">●</span>
              <span className="font-bold text-lg">Wellness Locator</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-foreground/70 hover:text-primary">Home</Link>
              <Link to="/directory" className="text-foreground/70 hover:text-primary">Directory</Link>
              <Link to="/about" className="text-foreground/70 hover:text-primary">About</Link>
              <Link to="/contact" className="text-foreground/70 hover:text-primary">Contact</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
            <p>© {new Date().getFullYear()} Wellness Locator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
