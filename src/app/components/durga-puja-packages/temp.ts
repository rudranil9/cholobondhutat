import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DurgaPujaPackage {
  id: number;
  name: string;
  location: string;
  duration: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  packageType: string;
  specialFeatures: string[];
}

@Component({
  selector: 'app-durga-puja-packages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        *ngFor="let pkg of durgaPujaPackages" 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
      >
        <!-- Package Image -->
        <div class="relative overflow-hidden">
          <img 
            [src]="pkg.image" 
            [alt]="pkg.name"
            class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          >
          <div class="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Puja Special
          </div>
          <div class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{calculateDiscount(pkg.price, pkg.originalPrice)}}% OFF
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <!-- Package Content -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
              {{pkg.name}}
            </h3>
            <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {{pkg.duration}}
            </span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <span class="text-blue-500 mr-1">📍</span>
            {{pkg.location}}
          </p>
          
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {{pkg.description}}
          </p>

          <!-- Festival Dates -->
          <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
            <p class="text-orange-800 dark:text-orange-200 font-medium flex items-center">
              <span class="mr-2">🗓️</span>
              Package Type: {{pkg.packageType}}
            </p>
          </div>

          <!-- Highlights -->
          <div class="mb-4">
            <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                *ngFor="let highlight of pkg.highlights.slice(0, 3)" 
                class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
              >
                {{highlight}}
              </span>
              <span *ngIf="pkg.highlights.length > 3" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                +{{pkg.highlights.length - 3}} more
              </span>
            </div>
          </div>

          <!-- Special Features -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span 
                *ngFor="let feature of pkg.specialFeatures" 
                class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full"
              >
                ✨ {{feature}}
              </span>
            </div>
          </div>

          <!-- Pricing -->
          <div class="mb-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-2xl font-bold text-green-600 dark:text-green-400">₹{{pkg.price | number}}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">₹{{pkg.originalPrice | number}}</span>
                <p class="text-xs text-gray-500 dark:text-gray-400">per person</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 dark:text-gray-400">Contact:</p>
                <p class="text-sm font-semibold text-blue-600 dark:text-blue-400">+91 8100282665</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              (click)="viewDetails(pkg)"
              class="flex-1 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 text-sm font-medium"
            >
              View Details
            </button>
            <button 
              (click)="bookNow(pkg)"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="mt-12 text-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        🕉️ Celebrate Durga Puja with Cholobondhu Tour And Travels
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Join us for an unforgettable Durga Puja celebration! Book your special package now and experience the divine festivities with comfort and joy.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div class="flex items-center space-x-2 text-lg">
          <span>📱</span>
          <span class="font-semibold text-blue-600 dark:text-blue-400">WhatsApp: +91 8100282665</span>
        </div>
        <div class="flex items-center space-x-2 text-lg">
          <span>🌐</span>
          <span class="font-semibold text-purple-600 dark:text-purple-400">www.cholobondhu.com</span>
        </div>
      </div>
      <div class="mt-6">
        <button 
          (click)="contactForCustomPackage()"
          class="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          📞 Contact for Custom Package
        </button>
      </div>
    </div>

    <!-- Modal for Package Details -->
    <div 
      *ngIf="showModal" 
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      (click)="closeModal()"
    >
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideInUp"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
          <button 
            (click)="closeModal()"
            class="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold transition-all duration-200 hover:scale-110 hover:rotate-90"
          >
            ×
          </button>
          <h2 class="text-2xl font-bold mb-2">{{selectedPackage?.name}}</h2>
          <div class="flex items-center space-x-4 text-sm">
            <span>📍 {{selectedPackage?.location}}</span>
            <span>⏰ {{selectedPackage?.duration}}</span>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Price Section -->
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-3xl font-bold text-green-600 dark:text-green-400">₹{{selectedPackage?.price | number}}</span>
                <span class="text-lg text-gray-500 dark:text-gray-400 line-through ml-3">₹{{selectedPackage?.originalPrice | number}}</span>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">per person</p>
              </div>
              <div class="text-center">
                <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {{calculateDiscount(selectedPackage?.price || 0, selectedPackage?.originalPrice || 0)}}% OFF
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">{{selectedPackage?.packageType}}</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">About This Package</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{selectedPackage?.description}}</p>
          </div>

          <!-- Highlights -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">✨ Package Highlights</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div 
                *ngFor="let highlight of selectedPackage?.highlights" 
                class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span class="text-blue-500">•</span>
                <span>{{highlight}}</span>
              </div>
            </div>
          </div>

          <!-- Inclusions -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">📋 What's Included</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div 
                *ngFor="let inclusion of selectedPackage?.inclusions" 
                class="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400"
              >
                <span>✓</span>
                <span>{{inclusion}}</span>
              </div>
            </div>
          </div>

          <!-- Special Features -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">🌟 Special Features</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                *ngFor="let feature of selectedPackage?.specialFeatures" 
                class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
              >
                {{feature}}
              </span>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">📞 Contact Information</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <span>📱</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">WhatsApp: +91 8100282665</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>🌐</span>
                <span class="font-semibold text-purple-600 dark:text-purple-400">www.cholobondhu.com</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>🏢</span>
                <span class="text-gray-600 dark:text-gray-300">Cholobondhu Tour And Travels</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              (click)="bookNow(selectedPackage!)"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105"
            >
              📞 Book Now
            </button>
            <button 
              (click)="contactForMoreInfo()"
              class="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
            >
              💬 More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .group:hover .group-hover\\:scale-110 {
      transform: scale(1.1);
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
    
    .animate-slideInUp {
      animation: slideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(100px) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export class DurgaPujaPackagesComponent {
  showModal = false;
  selectedPackage: DurgaPujaPackage | null = null;

  constructor(private router: Router) {}

  durgaPujaPackages: DurgaPujaPackage[] = [
    {
      id: 1,
      name: 'Andaman',
      location: 'Andaman Islands',
      duration: '4 Nights / 5 Days',
      price: 35000,
      originalPrice: 45000,
      description: 'Experience the pristine beaches and crystal-clear waters of Andaman during Durga Puja.',
      image: 'assets/destinations/andaman.jpg',
      highlights: ['Port Blair', 'Havelock Island', 'Radhanagar Beach', 'Cellular Jail'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Internal transfers'],
      packageType: 'Extended Holiday Package',
      specialFeatures: ['Kolkata to Kolkata', 'Beach Festival', 'Water Sports']
    },
    {
      id: 2,
      name: 'Bangkok & Pattaya',
      location: 'Thailand',
      duration: '4 Nights / 5 Days',
      price: 40000,
      originalPrice: 55000,
      description: 'Celebrate Durga Puja in the vibrant cities of Bangkok and Pattaya.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Grand Palace', 'Floating Market', 'Pattaya Beach', 'Coral Island'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Airport transfers'],
      packageType: 'International Package',
      specialFeatures: ['2N Bangkok', '2N Pattaya', 'International']
    },
    {
      id: 3,
      name: 'Ladakh',
      location: 'Jammu & Kashmir',
      duration: '8 Nights / 9 Days',
      price: 32000,
      originalPrice: 42000,
      description: 'Witness Durga Puja celebrations in the high-altitude desert of Ladakh.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Leh Palace', 'Pangong Lake', 'Nubra Valley', 'Diskit Monastery'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Permits'],
      packageType: 'Adventure Package',
      specialFeatures: ['Srinagar to Leh', 'Flight excluded', 'High Altitude']
    },
    {
      id: 4,
      name: 'Rajasthan',
      location: 'Royal Rajasthan',
      duration: '8 Nights / 9 Days',
      price: 24000,
      originalPrice: 32000,
      description: 'Royal Durga Puja celebration in the land of kings and palaces.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Amber Fort', 'Lake Palace', 'Thar Desert', 'City Palace'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Cultural programs'],
      packageType: 'Holiday Package',
      specialFeatures: ['Jaipur to Jaipur', 'Royal Experience', 'Multi-city']
    },
    {
      id: 5,
      name: 'Gangtok & North Sikkim',
      location: 'Sikkim',
      duration: '4 Nights / 5 Days',
      price: 11500,
      originalPrice: 15000,
      description: 'Celebrate Durga Puja amidst the Himalayan peaks of Sikkim.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Nathula Pass', 'Changu Lake', 'Yumthang Valley', 'Baba Mandir'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Permits'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', 'Mountain Views', 'Sacred Lakes']
    },
    {
      id: 6,
      name: 'Kerala',
      location: 'Gods Own Country',
      duration: '7 Nights / 8 Days',
      price: 18000,
      originalPrice: 24000,
      description: 'Celebrate Durga Puja in the backwaters and spice gardens of Kerala.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Munnar tea gardens', 'Alleppey backwaters', 'Cochin heritage', 'Thekkady spices'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Houseboat stay'],
      packageType: 'Holiday Package',
      specialFeatures: ['Cochin pickup', 'Trivandrum drop', 'Backwaters']
    },
    {
      id: 7,
      name: 'Shimla Manali & Amritsar',
      location: 'Himachal & Punjab',
      duration: '6 Nights / 7 Days',
      price: 16000,
      originalPrice: 21000,
      description: 'Mountain beauty and spiritual experience during Durga Puja.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Mall Road Shimla', 'Rohtang Pass', 'Golden Temple', 'Solang Valley'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', 'Mountains + Spirituality', 'Train Travel']
    },
    {
      id: 8,
      name: 'Goa',
      location: 'Beach Paradise',
      duration: '4 Nights / 5 Days',
      price: 12000,
      originalPrice: 16000,
      description: 'Beach celebration of Durga Puja in the party capital of India.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Baga Beach', 'Old Goa churches', 'Dudhsagar Falls', 'Cruise party'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['Goa to Goa', 'Beach Festival', 'Water Sports']
    },
    {
      id: 9,
      name: 'Darjeeling',
      location: 'Queen of Hills',
      duration: '3 Nights / 4 Days',
      price: 8000,
      originalPrice: 11000,
      description: 'Experience Durga Puja celebrations with mountain views and tea gardens.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Tiger Hill sunrise', 'Tea gardens', 'Toy train', 'Himalayan views'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', 'Mountain Festival', 'Tea Culture']
    },
    {
      id: 10,
      name: 'Puri',
      location: 'Odisha',
      duration: '3 Nights / 4 Days',
      price: 5000,
      originalPrice: 7000,
      description: 'Spiritual Durga Puja experience at the holy city of Puri.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple', 'Sand art'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', 'Spiritual', 'Beach + Temple']
    },
    {
      id: 11,
      name: 'Sundarban',
      location: 'Mangrove Forest',
      duration: '2 Nights / 3 Days',
      price: 4500,
      originalPrice: 6000,
      description: 'Unique Durga Puja experience in the mangrove forests of Sundarban.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Tiger safari', 'Mangrove cruise', 'Bird watching', 'Local culture'],
      inclusions: ['Fooding', 'Lodging', 'Boat safari', 'Forest permits'],
      packageType: 'Holiday Package',
      specialFeatures: ['Wildlife', 'Eco-tourism', 'Tiger Territory']
    },
    {
      id: 12,
      name: 'Bishnupur',
      location: 'West Bengal',
      duration: '3 Nights / 4 Days',
      price: 5000,
      originalPrice: 7000,
      description: 'Explore terracotta temples and traditional Durga Puja in historic Bishnupur.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Terracotta temples', 'Bankura horses', 'Mukutmanipur lake', 'Folk music'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Cultural programs'],
      packageType: 'Holiday Package',
      specialFeatures: ['Heritage', 'Temple Architecture', 'Traditional Crafts']
    },
    {
      id: 13,
      name: 'Gangtok & North Sikkim (Extended)',
      location: 'Sikkim',
      duration: '5 Nights / 6 Days',
      price: 12500,
      originalPrice: 16500,
      description: 'Extended Sikkim tour with more time to explore the mountains during Durga Puja.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Gurudongmar Lake', 'Lachung', 'Lachen', 'Gangtok local'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Permits'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', '4N Gangtok + 1N North Sikkim', 'Zero Point optional']
    },
    {
      id: 14,
      name: 'Offbeat North Bengal',
      location: 'Dhotrey/Tinchule',
      duration: '4 Nights / 5 Days',
      price: 10500,
      originalPrice: 14000,
      description: 'Discover hidden gems of North Bengal during Durga Puja festival.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Dhotrey views', 'Tinchule monastery', 'Darjeeling tea gardens', 'Tiger Hill'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', '1N Dhotrey + 1N Tinchule + 2N Darjeeling']
    },
    {
      id: 15,
      name: 'Ranchi & Netarhat',
      location: 'Jharkhand',
      duration: '7 Nights / 8 Days',
      price: 10000,
      originalPrice: 13500,
      description: 'Experience tribal culture and natural beauty during Durga Puja.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Netarhat sunset', 'Betla National Park', 'Tribal villages', 'Waterfalls'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', '2N Ranchi + 2N Netarhat + 1N Betla']
    },
    {
      id: 16,
      name: 'Purulia',
      location: 'West Bengal',
      duration: '2 Nights / 3 Days',
      price: 5000,
      originalPrice: 7000,
      description: 'Short getaway to experience tribal culture and Durga Puja in Purulia.',
      image: 'assets/destinations/[DESTINATION].jpg',
      highlights: ['Tribal dances', 'Rock formations', 'Handicrafts', 'Local festivals'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', 'Tribal culture', 'Budget friendly']
    },
    {
      id: 17,
      name: 'Delhi, Agra & Mathura',
      location: 'Northern India',
      duration: '6 Nights / 7 Days',
      price: 10000,
      originalPrice: 14000,
      description: 'Golden Triangle with spiritual Mathura during Durga Puja season.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Taj Mahal', 'Red Fort', 'Krishna Janmabhoomi', 'India Gate'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Train fare'],
      packageType: 'Holiday Package',
      specialFeatures: ['2N Delhi + 2N Agra + 2N Mathura', 'Heritage + Spirituality']
    },
    {
      id: 18,
      name: 'Vaishno Devi & Kashmir',
      location: 'Jammu & Kashmir',
      duration: '12 Nights / 13 Days',
      price: 20000,
      originalPrice: 28000,
      description: 'Spiritual journey combined with Kashmir beauty during Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Vaishno Devi Temple', 'Dal Lake', 'Pahalgam valley', 'Shikara ride'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Kolkata to Kolkata', '2N Katra + 4N Srinagar + 2N Pahalgam']
    },
    {
      id: 19,
      name: 'Vizag & Araku',
      location: 'Andhra Pradesh',
      duration: '4 Nights / 5 Days',
      price: 9500,
      originalPrice: 13000,
      description: 'Beach city and hill station combo during Durga Puja celebrations.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Araku Valley', 'Borra Caves', 'Beach Road', 'Submarine Museum'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', '3N Vizag + 1N Araku Valley']
    },
    {
      id: 20,
      name: 'Dooars',
      location: 'West Bengal',
      duration: '4 Nights / 5 Days',
      price: 9000,
      originalPrice: 12000,
      description: 'Wildlife and tea gardens experience during Durga Puja in Dooars.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Elephant safari', 'Tea gardens', 'Lava monastery', 'Rishop views'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', '2N Dooars + 1N Lava + 1N Rishop']
    },
    {
      id: 21,
      name: 'Gopalpur & Daringbari',
      location: 'Odisha',
      duration: '3 Nights / 4 Days',
      price: 8000,
      originalPrice: 11000,
      description: 'Beach and hill station combination in Odisha during Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Gopalpur beach', 'Daringbari hill station', 'Tribal culture', 'Nature walks'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', 'Beach + Hills combo']
    },
    {
      id: 22,
      name: 'Lava & Rishop (Offbeat)',
      location: 'West Bengal',
      duration: '2 Nights / 3 Days',
      price: 8500,
      originalPrice: 11500,
      description: 'Offbeat hill destinations in North Bengal for a peaceful Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Lava monastery', 'Rishop views', 'Pine forests', 'Peaceful environment'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['NJP to NJP', '1N Lava + 1N Rishop', 'Offbeat destination']
    },
    {
      id: 23,
      name: 'Assam & Meghalaya',
      location: 'Northeast India',
      duration: '6 Nights / 7 Days',
      price: 17000,
      originalPrice: 23000,
      description: 'Northeast India exploration during Durga Puja with unique cultures.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Cherrapunji', 'Living root bridges', 'Kamakhya Temple', 'Tea gardens'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', '2N Meghalaya + 2N Cherrapunji + 2N Guwahati']
    },
    {
      id: 24,
      name: 'Haridwar & Mussoorie',
      location: 'Uttarakhand',
      duration: '5 Nights / 6 Days',
      price: 11000,
      originalPrice: 15000,
      description: 'Spiritual Haridwar and hill station Mussoorie during Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Ganga Aarti', 'Har Ki Pauri', 'Mall Road Mussoorie', 'Cable car'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Train fare'],
      packageType: 'Holiday Package',
      specialFeatures: ['2N Haridwar + 3N Mussoorie', 'Spirituality + Hills']
    },
    {
      id: 25,
      name: 'Pelling & Ravangla',
      location: 'West Sikkim',
      duration: '4 Nights / 5 Days',
      price: 10000,
      originalPrice: 13500,
      description: 'West Sikkim exploration with monastery visits during Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Pelling monastery', 'Ravangla Buddha Park', 'Kanchenjunga views', 'Tea gardens'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Car'],
      packageType: 'Holiday Package',
      specialFeatures: ['Howrah to Howrah', 'West Sikkim circuit', 'Mountain views']
    },
    {
      id: 26,
      name: 'Ghatsila',
      location: 'Jharkhand',
      duration: '3 Nights / 4 Days',
      price: 5000,
      originalPrice: 7500,
      description: 'Peaceful hill station getaway in Jharkhand during Durga Puja.',
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Dharagiri Falls', 'Burudih Lake', 'Hill views', 'Peaceful environment'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      packageType: 'Holiday Package',
      specialFeatures: ['Budget friendly', 'Nature retreat', 'Hill station']
    }
  ];

  calculateDiscount(currentPrice: number, originalPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  bookNow(pkg: DurgaPujaPackage): void {
    // Navigate to contact form with package information
    this.router.navigate(['/contact'], { 
      queryParams: { 
        package: pkg.name,
        location: pkg.location,
        price: pkg.price,
        duration: pkg.duration,
        request: 'booking'
      }
    });
  }

  viewDetails(pkg: DurgaPujaPackage): void {
    this.selectedPackage = pkg;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPackage = null;
  }

  contactForMoreInfo(): void {
    this.router.navigate(['/contact'], { 
      queryParams: { 
        package: this.selectedPackage?.name,
        price: this.selectedPackage?.price,
        duration: this.selectedPackage?.duration,
        request: 'more-info'
      }
    });
    this.closeModal();
  }

  contactForCustomPackage(): void {
    this.router.navigate(['/contact'], { 
      queryParams: { 
        request: 'custom-quote',
        category: 'durga-puja-special'
      }
    });
  }
}
