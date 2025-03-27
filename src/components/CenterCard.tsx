
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Globe, Clock, Navigation, Star } from 'lucide-react';
import type { HealthCenter } from '../utils/healthCenters';

const CenterCard = ({ center }: { center: HealthCenter }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(`/center/${center.id}`);
  };
  
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.location.lat},${center.location.lng}`;
    window.open(url, '_blank');
  };
  
  const isOpen = () => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const hours = center.hours[currentDay as keyof typeof center.hours];
    return hours !== 'Closed';
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hospital':
        return 'bg-red-100 text-red-700';
      case 'Clinic':
        return 'bg-green-100 text-green-700';
      case 'Maternity':
        return 'bg-purple-100 text-purple-700';
      case 'Dental':
        return 'bg-yellow-100 text-yellow-700';
      case 'Specialized':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col"
      onClick={handleNavigate}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`}></div>
        <img 
          src={center.image} 
          alt={center.name} 
          className={`object-cover w-full h-full transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(center.type)}`}>
            {center.type}
          </span>
          {center.emergency && (
            <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">
              Emergency
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-1">{center.name}</h3>
        
        <div className="flex items-center text-xs text-foreground/70 mb-3">
          <div className={`w-2 h-2 rounded-full mr-2 ${isOpen() ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{isOpen() ? 'Open now' : 'Closed'}</span>
          
          {center.rating && (
            <div className="flex items-center ml-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(center.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-1 text-xs">{center.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-foreground/70 mb-4">{center.address}</p>
        
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-primary" />
            <span>{center.contact.phone}</span>
          </div>
          
          {center.contact.website && (
            <div className="flex items-center text-sm">
              <Globe className="w-4 h-4 mr-2 text-primary" />
              <a 
                href={center.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website
              </a>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <div className="truncate">{center.hours.monday === '24 hours' ? '24/7' : 'Varies'}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <button 
            className="flex-1 bg-primary text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
            onClick={handleNavigate}
          >
            View Details
          </button>
          <button
            className="bg-secondary rounded-md p-2 hover:bg-secondary/80 transition-colors"
            onClick={handleDirections}
            aria-label="Get directions"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
