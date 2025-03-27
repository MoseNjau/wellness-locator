
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import CenterDetails from '../components/CenterDetails';
import Map from '../components/Map';
import { getHealthCenterById } from '../utils/healthCenters';

const CenterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const center = id ? getHealthCenterById(id) : undefined;
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      
      if (!center) {
        setError('Health center not found');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [center]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-foreground/70">Loading health center details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !center) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        
        <div className="page-container pt-24 text-center">
          <div className="glass-panel rounded-xl p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Health Center Not Found</h1>
            <p className="text-foreground/70 mb-6">
              Sorry, we couldn't find the health center you're looking for.
            </p>
            <Link 
              to="/directory"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="mb-6 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>
        
        <div className="animate-fade-in">
          <CenterDetails center={center} />
        </div>
        
        <div className="mt-12 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="map-container h-[50vh]">
            <Map selectedCenter={center} filteredCenters={[center]} />
          </div>
        </div>
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

export default CenterDetail;
