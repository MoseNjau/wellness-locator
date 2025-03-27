
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CenterCard from '../components/CenterCard';
import healthCenters, { HealthCenter } from '../utils/healthCenters';
import { filterCenters, getUserLocation, sortByDistance } from '../utils/mapUtils';

const Directory = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || 'All';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [filteredCenters, setFilteredCenters] = useState<HealthCenter[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize filters and get user location
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user location
        const location = await getUserLocation();
        setUserLocation(location);
        
        // Apply initial filters
        const filtered = filterCenters(healthCenters, {
          searchTerm: initialSearch,
          type: initialType !== 'All' ? initialType : undefined,
          emergency: false
        });
        
        // Sort by distance if we have user location
        const sorted = sortByDistance(filtered, location.lat, location.lng);
        setFilteredCenters(sorted);
      } catch (error) {
        console.error('Error:', error);
        setFilteredCenters(healthCenters);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [initialSearch, initialType]);
  
  // Apply filters when they change
  useEffect(() => {
    let filtered = filterCenters(healthCenters, {
      searchTerm,
      type: selectedType !== 'All' ? selectedType : undefined,
      emergency: emergencyOnly || null
    });
    
    // Sort by distance if we have user location
    if (userLocation) {
      filtered = sortByDistance(filtered, userLocation.lat, userLocation.lng);
    }
    
    setFilteredCenters(filtered);
  }, [searchTerm, selectedType, emergencyOnly, userLocation]);
  
  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="page-container pt-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Health Center Directory</h1>
        <p className="text-foreground/70 mb-8 animate-fade-in animation-delay-100">
          Browse and filter healthcare facilities in Kiambu County
        </p>
        
        <div className="animate-fade-in animation-delay-200">
          <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
        </div>
        
        <div className="animate-fade-in animation-delay-300">
          <FilterBar 
            selectedType={selectedType} 
            setSelectedType={setSelectedType}
            emergencyOnly={emergencyOnly}
            setEmergencyOnly={setEmergencyOnly}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-400">
            {filteredCenters.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No health centers found</h3>
            <p className="text-foreground/70">
              Try adjusting your filters or search term
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('All');
                setEmergencyOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-primary text-3xl mr-2">●</span>
              <span className="font-bold text-lg">Wellness Locator</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="/" className="text-foreground/70 hover:text-primary">Home</a>
              <a href="/directory" className="text-foreground/70 hover:text-primary">Directory</a>
              <a href="/about" className="text-foreground/70 hover:text-primary">About</a>
              <a href="/contact" className="text-foreground/70 hover:text-primary">Contact</a>
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

export default Directory;
