
import { useState } from 'react';
import { HealthCenter } from '../utils/healthCenters';
import { 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Navigation, 
  Star, 
  MapPin, 
  Calendar, 
  Check,
  Heart 
} from 'lucide-react';

const CenterDetails = ({ center }: { center: HealthCenter }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const getDirections = () => {
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
    <div className="max-w-4xl mx-auto">
      <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
        <div className={`h-64 bg-gray-200 animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`}></div>
        <img 
          src={center.image} 
          alt={center.name} 
          className={`w-full h-64 object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
          <div className="flex gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(center.type)}`}>
              {center.type}
            </span>
            {center.emergency && (
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700 flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                Emergency Care
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{center.name}</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="glass-panel rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            
            <div className="flex items-center text-foreground/70 mb-4">
              <div className={`w-3 h-3 rounded-full mr-2 ${isOpen() ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">{isOpen() ? 'Open now' : 'Closed'}</span>
              
              {center.rating && (
                <div className="flex items-center ml-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(center.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1">{center.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>{center.address}</span>
              </div>
              
              <div className="flex">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>{center.contact.phone}</span>
              </div>
              
              <div className="flex">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>{center.contact.email}</span>
              </div>
              
              {center.contact.website && (
                <div className="flex">
                  <Globe className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <a 
                    href={center.contact.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {center.contact.website}
                  </a>
                </div>
              )}
            </div>
            
            <button 
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={getDirections}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </button>
          </div>
          
          <div className="glass-panel rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {center.services.map((service, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="glass-panel rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Opening Hours
            </h2>
            
            <div className="space-y-2">
              {Object.entries(center.hours).map(([day, hours]) => {
                const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                const isToday = day.toLowerCase() === today;
                
                return (
                  <div 
                    key={day} 
                    className={`flex justify-between py-2 ${isToday ? 'font-medium' : ''} ${day === 'sunday' ? 'border-b-0' : 'border-b border-border/50'}`}
                  >
                    <span className="capitalize">{day}</span>
                    <span className={hours === 'Closed' ? 'text-red-500' : ''}>{hours}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Location
            </h2>
            
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-4 bg-[#e8f0f7]">
              <img 
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+1e88e5(${center.location.lng},${center.location.lat})/${center.location.lng},${center.location.lat},15,0/300x300?access_token=pk.dummy`}
                alt="Map location" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <button 
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
              onClick={getDirections}
            >
              <Navigation className="w-4 h-4 mr-2" />
              View on Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
