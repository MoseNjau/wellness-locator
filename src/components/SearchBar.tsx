
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import healthCenters from '../utils/healthCenters';

const SearchBar = ({ 
  initialValue = '',
  onSearch
}: { 
  initialValue?: string;
  onSearch: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Generate suggestions based on health center data
    if (value.length > 0) {
      const healthCenterSuggestions = healthCenters
        .filter(center => 
          center.name.toLowerCase().includes(value.toLowerCase()) || 
          center.type.toLowerCase().includes(value.toLowerCase()) ||
          center.services.some(service => service.toLowerCase().includes(value.toLowerCase()))
        )
        .map(center => center.name)
        .slice(0, 5);
      
      const serviceSuggestions = Array.from(
        new Set(
          healthCenters
            .flatMap(center => center.services)
            .filter(service => service.toLowerCase().includes(value.toLowerCase()))
        )
      ).slice(0, 3);
      
      setSuggestions([...healthCenterSuggestions, ...serviceSuggestions]);
    } else {
      setSuggestions([]);
    }
  };
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSuggestions([]);
    
    // Navigate to directory with search query if on home page
    if (window.location.pathname === '/') {
      navigate(`/directory?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  // Handle clicking outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus input on mount
  useEffect(() => {
    if (initialValue) {
      setSearchTerm(initialValue);
    }
  }, [initialValue]);
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Apply search suggestion
  const applySuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setIsActive(true)}
            onBlur={() => setTimeout(() => setIsActive(false), 200)}
            placeholder="Search for hospitals, clinics, or health services..."
            className={`search-input pl-12 pr-10 transition-all duration-300 ${isActive ? 'ring-2 ring-primary/50' : ''}`}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
            <Search className="w-6 h-6" />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute mt-2 w-full bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-border/50 py-2 z-30 animate-scale-in"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-primary/5 transition-colors text-sm"
              onClick={() => applySuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
