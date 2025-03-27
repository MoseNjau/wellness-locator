
import { useState } from 'react';
import { Filter, Heart, X } from 'lucide-react';

interface FilterProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  emergencyOnly: boolean;
  setEmergencyOnly: (value: boolean) => void;
}

const FilterBar = ({ 
  selectedType, 
  setSelectedType, 
  emergencyOnly, 
  setEmergencyOnly 
}: FilterProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const types = ['All', 'Hospital', 'Clinic', 'Maternity', 'Dental', 'Specialized'];
  
  return (
    <div className="mt-4 mb-6">
      {/* Desktop filters */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3">
        <span className="text-sm text-foreground/70 mr-1">Filter by:</span>
        {types.map((type) => (
          <button
            key={type}
            className={`filter-button ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
        
        <button
          className={`filter-button ml-auto ${emergencyOnly ? 'active' : ''}`}
          onClick={() => setEmergencyOnly(!emergencyOnly)}
        >
          <Heart className={`w-4 h-4 mr-1 ${emergencyOnly ? '' : 'text-red-500'}`} />
          Emergency Care
        </button>
      </div>
      
      {/* Mobile filter button */}
      <div className="flex md:hidden justify-between items-center">
        <button 
          className="filter-button flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters {(selectedType !== 'All' || emergencyOnly) && '(Active)'}
        </button>
        
        {(selectedType !== 'All' || emergencyOnly) && (
          <button 
            className="text-sm text-primary font-medium"
            onClick={() => {
              setSelectedType('All');
              setEmergencyOnly(false);
            }}
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Mobile filters panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 md:hidden animate-fade-in">
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button 
                className="p-2 hover:bg-secondary rounded-full"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm text-foreground/70 mb-2">Health Center Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    className={`filter-button ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm text-foreground/70 mb-2">Services</h4>
              <button
                className={`filter-button ${emergencyOnly ? 'active' : ''}`}
                onClick={() => setEmergencyOnly(!emergencyOnly)}
              >
                <Heart className={`w-4 h-4 mr-1 ${emergencyOnly ? '' : 'text-red-500'}`} />
                Emergency Care
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="flex-1 py-3 rounded-lg bg-secondary text-foreground font-medium"
                onClick={() => {
                  setSelectedType('All');
                  setEmergencyOnly(false);
                }}
              >
                Clear All
              </button>
              <button 
                className="flex-1 py-3 rounded-lg bg-primary text-white font-medium"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
