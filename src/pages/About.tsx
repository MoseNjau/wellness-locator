
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Search, Navigation, Info, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">About Wellness Locator</h1>
          <p className="text-foreground/70 mb-8 text-lg animate-fade-in animation-delay-100">
            Making healthcare accessible to everyone in Kiambu County
          </p>
          
          <div className="glass-panel rounded-xl p-8 mb-12 animate-fade-in animation-delay-200">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Wellness Locator aims to simplify access to healthcare by providing a comprehensive 
              directory of healthcare facilities in Kiambu County. Our platform helps residents and 
              visitors quickly find the most suitable healthcare providers based on their location, 
              specific needs, and service requirements.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We believe that everyone deserves easy access to quality healthcare. By bridging the 
              information gap between healthcare providers and patients, we contribute to improving 
              overall health outcomes in the community.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 animate-fade-in animation-delay-300">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-400">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Locate Healthcare Facilities</h3>
              <p className="text-foreground/70">
                Use our interactive map to discover healthcare facilities near you. 
                The map displays all types of facilities including hospitals, clinics, 
                maternity centers, and specialized care providers.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-500">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Search & Filter</h3>
              <p className="text-foreground/70">
                Find exactly what you need with our powerful search and filtering options. 
                Search by facility name, location, or services, and filter by facility type, 
                services offered, or emergency care availability.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-600">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Detailed Information</h3>
              <p className="text-foreground/70">
                Access comprehensive information about each facility, including services offered, 
                operating hours, contact details, and location information to make informed healthcare decisions.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-700">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Navigate with Ease</h3>
              <p className="text-foreground/70">
                Get directions to your chosen healthcare facility with a single click. 
                Our platform integrates with map services to provide turn-by-turn directions 
                to help you reach your destination quickly.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 animate-fade-in animation-delay-800">Our Commitment</h2>
          
          <div className="glass-panel rounded-xl p-8 mb-12 animate-fade-in animation-delay-900">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 mx-auto md:mx-0">
                <Heart className="w-8 h-8" />
              </div>
              
              <div>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  We are committed to maintaining accurate and up-to-date information about healthcare 
                  facilities in Kiambu County. Our team regularly verifies facility details to ensure that 
                  users can rely on our platform for their healthcare needs.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Wellness Locator is designed to be accessible to everyone, regardless of technical expertise. 
                  We continuously improve our platform based on user feedback to enhance the experience and 
                  make healthcare more accessible to all residents.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12 animate-fade-in animation-delay-1000">
            <h2 className="text-2xl font-semibold mb-4">Ready to find healthcare near you?</h2>
            <Link 
              to="/directory"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Healthcare Facilities <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
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

export default About;
