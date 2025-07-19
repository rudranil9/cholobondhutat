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
  festivalDates: string;
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
              Festival Dates: {{pkg.festivalDates}}
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Port Blair', 'Havelock Island', 'Radhanagar Beach', 'Cellular Jail'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Internal transfers'],
      festivalDates: 'Oct 20-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Grand Palace', 'Floating Market', 'Pattaya Beach', 'Coral Island'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Airport transfers'],
      festivalDates: 'Oct 20-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Leh Palace', 'Pangong Lake', 'Nubra Valley', 'Diskit Monastery'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Permits'],
      festivalDates: 'Oct 20-28, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Amber Fort', 'Lake Palace', 'Thar Desert', 'City Palace'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Cultural programs'],
      festivalDates: 'Oct 20-28, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Nathula Pass', 'Changu Lake', 'Yumthang Valley', 'Baba Mandir'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Permits'],
      festivalDates: 'Oct 20-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Munnar tea gardens', 'Alleppey backwaters', 'Cochin heritage', 'Thekkady spices'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Houseboat stay'],
      festivalDates: 'Oct 19-26, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Mall Road Shimla', 'Rohtang Pass', 'Golden Temple', 'Solang Valley'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      festivalDates: 'Oct 19-25, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Baga Beach', 'Old Goa churches', 'Dudhsagar Falls', 'Cruise party'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      festivalDates: 'Oct 20-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Tiger Hill sunrise', 'Tea gardens', 'Toy train', 'Himalayan views'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing'],
      festivalDates: 'Oct 21-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple', 'Sand art'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Sleeper train'],
      festivalDates: 'Oct 21-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Tiger safari', 'Mangrove cruise', 'Bird watching', 'Local culture'],
      inclusions: ['Fooding', 'Lodging', 'Boat safari', 'Forest permits'],
      festivalDates: 'Oct 22-24, 2024',
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
      image: 'assets/hero-travel-bg.jpg',
      highlights: ['Terracotta temples', 'Bankura horses', 'Mukutmanipur lake', 'Folk music'],
      inclusions: ['Fooding', 'Lodging', 'Sightseeing', 'Cultural programs'],
      festivalDates: 'Oct 21-24, 2024',
      specialFeatures: ['Heritage', 'Temple Architecture', 'Traditional Crafts']
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
    // Implementation for viewing details
    alert(`${pkg.name} - ${pkg.duration}
    
📍 Location: ${pkg.location}
💰 Price: ₹${pkg.price.toLocaleString()} per person
🗓️ Festival Dates: ${pkg.festivalDates}

📋 Inclusions: ${pkg.inclusions.join(', ')}

🎯 Highlights:
${pkg.highlights.map(h => '• ' + h).join('\n')}

✨ Special Features: ${pkg.specialFeatures.join(', ')}

📞 Contact: +91 8100282665
🌐 Website: www.cholobondhu.com`);
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
