
export interface HealthCenter {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Maternity' | 'Dental' | 'Specialized';
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  rating?: number;
  emergency: boolean;
  image: string;
}

// Using Kiambu County, Kenya coordinates for this mock data
const healthCenters: HealthCenter[] = [
  {
    id: '1',
    name: 'Kiambu County Referral Hospital',
    type: 'Hospital',
    address: 'Hospital Road, Kiambu Town, Kiambu County',
    location: {
      lat: -1.1761,
      lng: 36.8304
    },
    contact: {
      phone: '+254 700 123 456',
      email: 'info@kiambureferral.co.ke',
      website: 'https://kiambureferral.co.ke'
    },
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    services: ['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Outpatient', 'Laboratory', 'Radiology'],
    rating: 4.2,
    emergency: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Thika Level 5 Hospital',
    type: 'Hospital',
    address: 'Hospital Road, Thika, Kiambu County',
    location: {
      lat: -1.0382,
      lng: 37.0834
    },
    contact: {
      phone: '+254 700 234 567',
      email: 'info@thikalevel5.co.ke'
    },
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    services: ['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Outpatient', 'Laboratory', 'Radiology', 'Dental'],
    rating: 4.0,
    emergency: true,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Gatundu South Hospital',
    type: 'Hospital',
    address: 'Gatundu South, Kiambu County',
    location: {
      lat: -1.0016,
      lng: 36.9061
    },
    contact: {
      phone: '+254 700 345 678',
      email: 'info@gatunduhospital.co.ke'
    },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    services: ['Outpatient', 'Maternity', 'Pediatrics', 'Laboratory'],
    rating: 3.8,
    emergency: false,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Kiambu Dental Specialists',
    type: 'Dental',
    address: 'Kiambu Town, Kiambu County',
    location: {
      lat: -1.1711,
      lng: 36.8354
    },
    contact: {
      phone: '+254 700 456 789',
      email: 'info@kiambudental.co.ke',
      website: 'https://kiambudental.co.ke'
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    services: ['General Dentistry', 'Orthodontics', 'Dental Surgery', 'Pediatric Dentistry'],
    rating: 4.5,
    emergency: false,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Ruiru Maternity Clinic',
    type: 'Maternity',
    address: 'Ruiru Town, Kiambu County',
    location: {
      lat: -1.1458,
      lng: 36.9606
    },
    contact: {
      phone: '+254 700 567 890',
      email: 'info@ruirumaternity.co.ke'
    },
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    services: ['Antenatal Care', 'Delivery', 'Postnatal Care', 'Gynecology', 'Newborn Care'],
    rating: 4.3,
    emergency: true,
    image: 'https://images.unsplash.com/photo-1526570038907-9b7305e4959b?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Limuru Health Center',
    type: 'Clinic',
    address: 'Limuru, Kiambu County',
    location: {
      lat: -1.1132,
      lng: 36.6414
    },
    contact: {
      phone: '+254 700 678 901',
      email: 'info@limuruhealth.co.ke'
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    services: ['Outpatient', 'Minor Procedures', 'Immunization', 'HIV Testing', 'Tuberculosis Treatment'],
    rating: 4.0,
    emergency: false,
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Kikuyu Eye Hospital',
    type: 'Specialized',
    address: 'Kikuyu Town, Kiambu County',
    location: {
      lat: -1.2479,
      lng: 36.6753
    },
    contact: {
      phone: '+254 700 789 012',
      email: 'info@kikuyueye.co.ke',
      website: 'https://kikuyueye.co.ke'
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    services: ['Eye Examinations', 'Cataract Surgery', 'Glaucoma Treatment', 'Pediatric Ophthalmology'],
    rating: 4.7,
    emergency: false,
    image: 'https://images.unsplash.com/photo-1542441471-f48884c0ce8e?q=80&w=2024&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Kiambu Women\'s Health Clinic',
    type: 'Specialized',
    address: 'Kiambu Town, Kiambu County',
    location: {
      lat: -1.1701,
      lng: 36.8284
    },
    contact: {
      phone: '+254 700 890 123',
      email: 'info@kiambuwomen.co.ke'
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    services: ['Gynecology', 'Breast Health', 'Family Planning', 'Menopause Management', 'Cancer Screening'],
    rating: 4.4,
    emergency: false,
    image: 'https://images.unsplash.com/photo-1563233269-7e86880fd28f?q=80&w=2069&auto=format&fit=crop'
  }
];

export default healthCenters;

export const getHealthCenterById = (id: string): HealthCenter | undefined => {
  return healthCenters.find(center => center.id === id);
};

export const filterHealthCenters = (
  searchTerm: string = '',
  type: string = 'All',
  emergency: boolean | null = null
): HealthCenter[] => {
  return healthCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = type === 'All' || center.type === type;
    
    const matchesEmergency = emergency === null || center.emergency === emergency;
    
    return matchesSearch && matchesType && matchesEmergency;
  });
};
