import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

interface RegionalDestination {
  id: number;
  name: string;
  location: string;
  region: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  highlights: string[];
  isPopular?: boolean;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  bestTime?: string;
}

@Component({
  selector: 'app-explore-by-region',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Professional Hero Section -->
      <section class="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <!-- Subtle Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6); background-size: 80px 80px; background-position: 0 0, 0 0, 40px 40px, 40px 40px;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center">
            <!-- Professional Logo Presentation -->
            <div class="mb-12">
              <div class="inline-block relative">
                <div class="w-28 h-28 mx-auto bg-white rounded-full shadow-2xl overflow-hidden border-4 border-white relative">
                  <img 
                    src="/assets/destinations/cholobondhu-logo.jpg" 
                    alt="Cholo Bondhu Logo" 
                    class="w-full h-full object-contain"
                  />
                  <!-- Professional Glow Effect -->
                  <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            <!-- Professional Typography -->
            <div class="mb-8">
              <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Explore India by 
                <span class="relative inline-block">
                  <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Region
                  </span>
                  <div class="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 animate-scale-x"></div>
                </span>
              </h1>
              
              <!-- Professional Subtitle -->
              <div class="max-w-4xl mx-auto">
                <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-8">
                  Discover the incredible diversity of India through our carefully curated regional experiences. 
                  From the majestic Himalayas in the North to the serene backwaters of the South, 
                  embark on a journey that captures the essence of each unique region.
                </p>
                
                <!-- Professional Call-to-Action -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-medium">21+ unique destinations</span>
                  </div>
                  <div class="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                  <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-sm font-medium">4 distinct regions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- North India Section -->
      <section class="py-16" id="north-india">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white text-2xl mb-4">
              🏔️
            </div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">North India</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Majestic mountains, historical monuments, and rich cultural heritage await you in North India
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              *ngFor="let destination of getNorthIndiaDestinations()" 
              class="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
            >
              <!-- Popular Badge -->
              <div *ngIf="destination.isPopular" class="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ POPULAR
              </div>
              
              <!-- Difficulty Badge -->
              <div *ngIf="destination.difficulty" class="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {{destination.difficulty}}
              </div>

              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img 
                  [src]="destination.image" 
                  [alt]="destination.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-2xl font-bold mb-1">{{destination.name}}</h3>
                  <p class="text-orange-200 text-sm flex items-center">
                    <span class="mr-1">📍</span>{{destination.location}}
                  </p>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {{destination.description}}
                </p>

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      *ngFor="let highlight of destination.highlights.slice(0, 3)" 
                      class="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full"
                    >
                      {{highlight}}
                    </span>
                  </div>
                </div>

                <!-- Best Time -->
                <div *ngIf="destination.bestTime" class="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <p class="text-orange-800 text-sm font-medium">
                    <span class="mr-1">🗓️</span>Best Time: {{destination.bestTime}}
                  </p>
                </div>

                <!-- Price and Duration -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">₹{{destination.price | number}}</span>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{destination.duration}}</div>
                  </div>
                  <button 
                    (click)="getQuote(destination)"
                    class="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- South India Section -->
      <section class="py-16 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900" id="south-india">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full text-white text-2xl mb-4">
              🌴
            </div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">South India</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tropical beauty, ancient temples, serene backwaters, and pristine beaches
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              *ngFor="let destination of getSouthIndiaDestinations()" 
              class="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
            >
              <!-- Popular Badge -->
              <div *ngIf="destination.isPopular" class="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ POPULAR
              </div>

              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img 
                  [src]="destination.image" 
                  [alt]="destination.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-2xl font-bold mb-1">{{destination.name}}</h3>
                  <p class="text-green-200 text-sm flex items-center">
                    <span class="mr-1">📍</span>{{destination.location}}
                  </p>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {{destination.description}}
                </p>

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      *ngFor="let highlight of destination.highlights.slice(0, 3)" 
                      class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full"
                    >
                      {{highlight}}
                    </span>
                  </div>
                </div>

                <!-- Best Time -->
                <div *ngIf="destination.bestTime" class="mb-4 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                  <p class="text-green-800 text-sm font-medium">
                    <span class="mr-1">🗓️</span>Best Time: {{destination.bestTime}}
                  </p>
                </div>

                <!-- Price and Duration -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">₹{{destination.price | number}}</span>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{destination.duration}}</div>
                  </div>
                  <button 
                    (click)="getQuote(destination)"
                    class="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- East India Section -->
      <section class="py-16" id="east-india">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full text-white text-2xl mb-4">
              🏛️
            </div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">East India</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Rich cultural heritage, spiritual destinations, and stunning hill stations
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              *ngFor="let destination of getEastIndiaDestinations()" 
              class="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
            >
              <!-- Popular Badge -->
              <div *ngIf="destination.isPopular" class="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ POPULAR
              </div>

              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img 
                  [src]="destination.image" 
                  [alt]="destination.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-2xl font-bold mb-1">{{destination.name}}</h3>
                  <p class="text-blue-200 text-sm flex items-center">
                    <span class="mr-1">📍</span>{{destination.location}}
                  </p>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {{destination.description}}
                </p>

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      *ngFor="let highlight of destination.highlights.slice(0, 3)" 
                      class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                    >
                      {{highlight}}
                    </span>
                  </div>
                </div>

                <!-- Best Time -->
                <div *ngIf="destination.bestTime" class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <p class="text-blue-800 text-sm font-medium">
                    <span class="mr-1">🗓️</span>Best Time: {{destination.bestTime}}
                  </p>
                </div>

                <!-- Price and Duration -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">₹{{destination.price | number}}</span>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{destination.duration}}</div>
                  </div>
                  <button 
                    (click)="getQuote(destination)"
                    class="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- West India Section -->
      <section class="py-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" id="west-india">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-2xl mb-4">
              🏖️
            </div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">West India</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Royal palaces, golden deserts, bustling cities, and pristine beaches
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              *ngFor="let destination of getWestIndiaDestinations()" 
              class="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
            >
              <!-- Popular Badge -->
              <div *ngIf="destination.isPopular" class="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ POPULAR
              </div>

              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img 
                  [src]="destination.image" 
                  [alt]="destination.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-2xl font-bold mb-1">{{destination.name}}</h3>
                  <p class="text-purple-200 text-sm flex items-center">
                    <span class="mr-1">📍</span>{{destination.location}}
                  </p>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {{destination.description}}
                </p>

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      *ngFor="let highlight of destination.highlights.slice(0, 3)" 
                      class="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full"
                    >
                      {{highlight}}
                    </span>
                  </div>
                </div>

                <!-- Best Time -->
                <div *ngIf="destination.bestTime" class="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p class="text-purple-800 text-sm font-medium">
                    <span class="mr-1">🗓️</span>Best Time: {{destination.bestTime}}
                  </p>
                </div>

                <!-- Price and Duration -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₹{{destination.price | number}}</span>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{destination.duration}}</div>
                  </div>
                  <button 
                    (click)="getQuote(destination)"
                    class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <!-- Company Logo -->
          <div class="flex justify-center mb-8">
            <div class="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <img 
                src="assets/destinations/cholobondhu-logo.jpg" 
                alt="Cholo Bondhu Logo" 
                class="w-16 h-16 object-contain rounded-full"
              />
            </div>
          </div>
          
          <h3 class="text-4xl font-bold text-white mb-6">
            Ready to Explore India?
          </h3>
          <p class="text-indigo-100 mb-10 text-lg leading-relaxed">
            Let our travel experts create a personalized regional tour just for you. 
            Whether you're seeking adventure, culture, or relaxation, we'll craft the perfect journey.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <div class="flex items-center space-x-3 text-lg text-white">
              <span class="text-2xl">📱</span>
              <span class="font-semibold">WhatsApp: +91 8100282665</span>
            </div>
            <div class="flex items-center space-x-3 text-lg text-white">
              <span class="text-2xl">🌐</span>
              <span class="font-semibold">www.cholobondhu.com</span>
            </div>
          </div>
          <div class="space-x-4">
            <button 
              (click)="contactForCustomPackage()"
              class="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              📞 Plan My Journey
            </button>
            <button 
              (click)="exploreAllDestinations()"
              class="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              🗺️ View All Tours
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .bg-clip-text {
      -webkit-background-clip: text;
      background-clip: text;
    }

    @keyframes scale-x {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    .animate-scale-x {
      animation: scale-x 2s ease-out forwards;
    }
  `]
})
export class ExploreByRegionComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute, private layoutService: LayoutService) {}

  ngOnInit(): void {
    // Subscribe to route fragments to handle anchor navigation (temporarily disabled to test scroll fix)
    /*
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToSection(fragment);
        }, 100);
      }
    });
    */
  }

  ngAfterViewInit(): void {
    // Handle any fragment that was present on initial load (temporarily disabled to test scroll fix)
    /*
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => {
        this.scrollToSection(fragment);
      }, 500);
    }
    */
  }

  private scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Scroll with offset to account for any fixed headers
      const yOffset = -80; // Adjust this value as needed
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      });
    }
  }

  // Regional destination data mapped from your existing destinations
  allDestinations: RegionalDestination[] = [
    // North India
    {
      id: 1,
      name: 'Shimla & Manali',
      location: 'Himachal Pradesh',
      region: 'North',
      description: 'Experience the Queen of Hills with colonial charm, snow-capped peaks, and adventure activities in the heart of Himalayas.',
      image: 'assets/destinations/shimla-manali.jpg',
      price: 15999,
      duration: '6D/5N',
      highlights: ['Mall Road Shopping', 'Solang Valley Adventure', 'Snow Activities', 'Apple Orchards'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'March to June, December to February'
    },
    {
      id: 2,
      name: 'Ladakh',
      location: 'Jammu & Kashmir',
      region: 'North',
      description: 'High-altitude desert adventure with pristine lakes, ancient monasteries, and breathtaking mountain landscapes.',
      image: 'assets/destinations/ladakh.jpg',
      price: 22999,
      duration: '7D/6N',
      highlights: ['Pangong Lake', 'Nubra Valley', 'Leh Palace', 'Magnetic Hill'],
      difficulty: 'Challenging',
      bestTime: 'May to September'
    },
    {
      id: 3,
      name: 'Delhi & Agra',
      location: 'Uttar Pradesh',
      region: 'North',
      description: 'Explore India\'s capital and the city of Taj Mahal, experiencing rich Mughal heritage and modern metropolitan culture.',
      image: 'assets/destinations/delhi-agra.jpg',
      price: 11999,
      duration: '4D/3N',
      highlights: ['Taj Mahal', 'Red Fort', 'India Gate', 'Agra Fort'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 4,
      name: 'Rajasthan',
      location: 'Rajasthan',
      region: 'North',
      description: 'Royal palaces, golden deserts, and vibrant culture in the land of kings and maharajas.',
      image: 'assets/destinations/rajasthan.jpg',
      price: 18999,
      duration: '8D/7N',
      highlights: ['Jaipur City Palace', 'Udaipur Lakes', 'Jodhpur Fort', 'Desert Safari'],
      isPopular: true,
      difficulty: 'Moderate',
      bestTime: 'October to March'
    },
    {
      id: 5,
      name: 'Haridwar & Mussoorie',
      location: 'Uttarakhand',
      region: 'North',
      description: 'Spiritual journey to the holy Ganges combined with Queen of Hills\' colonial charm and scenic beauty.',
      image: 'assets/destinations/haridwar-mussoorie.jpg',
      price: 13999,
      duration: '5D/4N',
      highlights: ['Ganga Aarti', 'Kempty Falls', 'Gun Hill', 'Temple Visits'],
      difficulty: 'Easy',
      bestTime: 'March to June, September to November'
    },
    {
      id: 6,
      name: 'Vaishno Devi',
      location: 'Jammu & Kashmir',
      region: 'North',
      description: 'Sacred pilgrimage to the holy shrine of Mata Vaishno Devi in the Trikuta Mountains.',
      image: 'assets/destinations/vaishnodevi.jpg',
      price: 16999,
      duration: '4D/3N',
      highlights: ['Mata Vaishno Devi Temple', 'Helicopter Service', 'Bhawan', 'Ardhkuwari'],
      difficulty: 'Moderate',
      bestTime: 'March to October'
    },

    // South India
    {
      id: 7,
      name: 'Kerala Backwaters',
      location: 'Kerala',
      region: 'South',
      description: 'Serene backwater cruises, lush green landscapes, and traditional houseboat experiences in God\'s Own Country.',
      image: 'assets/destinations/kerala.jpg',
      price: 16999,
      duration: '6D/5N',
      highlights: ['Houseboat Stay', 'Alleppey Backwaters', 'Spice Plantations', 'Ayurvedic Treatments'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 8,
      name: 'Goa Beaches',
      location: 'Goa',
      region: 'West',
      description: 'Golden beaches, Portuguese heritage, vibrant nightlife, and water sports in India\'s beach paradise.',
      image: 'assets/destinations/goa.jpg',
      price: 14999,
      duration: '5D/4N',
      highlights: ['Beach Parties', 'Water Sports', 'Old Goa Churches', 'Spice Plantation'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'November to March'
    },
    {
      id: 9,
      name: 'Ooty',
      location: 'Tamil Nadu',
      region: 'South',
      description: 'Queen of Hill Stations with tea gardens, toy train rides, and pleasant weather perfect for mountain lovers.',
      image: 'assets/destinations/ooty.jpg',
      price: 12999,
      duration: '4D/3N',
      highlights: ['Toy Train Ride', 'Tea Gardens', 'Botanical Gardens', 'Doddabetta Peak'],
      difficulty: 'Easy',
      bestTime: 'April to June, September to November'
    },

    // East India
    {
      id: 10,
      name: 'Darjeeling',
      location: 'West Bengal',
      region: 'East',
      description: 'Famous tea gardens, heritage toy train, and stunning Himalayan views with Kanchenjunga peak.',
      image: 'assets/destinations/darjeeling.jpg',
      price: 12999,
      duration: '4D/3N',
      highlights: ['Tiger Hill Sunrise', 'Tea Garden Tours', 'Toy Train Ride', 'Himalayan Views'],
      isPopular: true,
      difficulty: 'Moderate',
      bestTime: 'March to May, September to November'
    },
    {
      id: 11,
      name: 'Gangtok',
      location: 'Sikkim',
      region: 'East',
      description: 'Capital of Sikkim with Buddhist monasteries, cable car rides, and breathtaking mountain vistas.',
      image: 'assets/destinations/gangtok.jpg',
      price: 13999,
      duration: '4D/3N',
      highlights: ['Monastery Visits', 'Cable Car Ride', 'Tsomgo Lake', 'MG Marg'],
      isPopular: true,
      difficulty: 'Moderate',
      bestTime: 'March to May, September to November'
    },
    {
      id: 12,
      name: 'Puri',
      location: 'Odisha',
      region: 'East',
      description: 'Sacred coastal city famous for Jagannath Temple and golden beaches perfect for spiritual and beach lovers.',
      image: 'assets/destinations/puri.jpg',
      price: 9999,
      duration: '3D/2N',
      highlights: ['Jagannath Temple', 'Golden Beach', 'Sand Art', 'Konark Sun Temple'],
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 13,
      name: 'Sundarbans',
      location: 'West Bengal',
      region: 'East',
      description: 'World\'s largest mangrove forest and home to the Royal Bengal Tiger with unique ecosystem.',
      image: 'assets/destinations/sundarban.jpg',
      price: 16999,
      duration: '4D/3N',
      highlights: ['Tiger Safari', 'Mangrove Forest', 'Boat Rides', 'Bird Watching'],
      difficulty: 'Moderate',
      bestTime: 'November to March'
    },
    {
      id: 14,
      name: 'Dooars',
      location: 'West Bengal',
      region: 'East',
      description: 'Gateway to Bhutan with lush tea gardens, wildlife sanctuaries, and elephant corridors.',
      image: 'assets/destinations/dooars.jpg',
      price: 11999,
      duration: '3D/2N',
      highlights: ['Elephant Safari', 'Tea Gardens', 'Wildlife Sanctuaries', 'River Crossing'],
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 15,
      name: 'Digha',
      location: 'West Bengal',
      region: 'East',
      description: 'Popular beach destination with golden sands and gentle waves, perfect for weekend getaways.',
      image: 'assets/destinations/digha.jpg',
      price: 6999,
      duration: '2D/1N',
      highlights: ['Beach Activities', 'Sea Bathing', 'Local Seafood', 'Marine Drive'],
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 16,
      name: 'Bishnupur',
      location: 'West Bengal',
      region: 'East',
      description: 'Historic town famous for terracotta temples, Baluchari sarees, and classical music traditions.',
      image: 'assets/destinations/bishnupur.jpg',
      price: 8999,
      duration: '2D/1N',
      highlights: ['Terracotta Temples', 'Handicrafts', 'Cultural Heritage', 'Rasmancha'],
      difficulty: 'Easy',
      bestTime: 'October to March'
    },

    // West India (including some coastal destinations)
    {
      id: 17,
      name: 'Mumbai',
      location: 'Maharashtra',
      region: 'West',
      description: 'City of dreams with Bollywood glamour, colonial architecture, and vibrant street food culture.',
      image: 'assets/destinations/mumbai.jpg',
      price: 12999,
      duration: '4D/3N',
      highlights: ['Gateway of India', 'Marine Drive', 'Bollywood Studios', 'Street Food'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'November to February'
    },
    {
      id: 18,
      name: 'Udaipur',
      location: 'Rajasthan',
      region: 'West',
      description: 'City of Lakes with magnificent palaces, romantic boat rides, and royal Rajasthani culture.',
      image: 'assets/destinations/udaipur-rajasthan.jpg',
      price: 15999,
      duration: '4D/3N',
      highlights: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Sunset Boat Ride'],
      isPopular: true,
      difficulty: 'Easy',
      bestTime: 'October to March'
    },
    {
      id: 19,
      name: 'Gujarat Heritage',
      location: 'Gujarat',
      region: 'West',
      description: 'Rich cultural heritage with ancient temples, stepwells, and the birthplace of Mahatma Gandhi.',
      image: 'assets/destinations/gujarat.jpg',
      price: 13999,
      duration: '5D/4N',
      highlights: ['Somnath Temple', 'Rann of Kutch', 'Sabarmati Ashram', 'Stepwells'],
      difficulty: 'Easy',
      bestTime: 'November to February'
    },

    // South India (including Andaman)
    {
      id: 20,
      name: 'Andaman Islands',
      location: 'Andaman & Nicobar',
      region: 'South',
      description: 'Pristine tropical islands with crystal clear waters, coral reefs, and world-class diving experiences.',
      image: 'assets/destinations/andaman.jpg',
      price: 25999,
      duration: '6D/5N',
      highlights: ['Scuba Diving', 'Radhanagar Beach', 'Cellular Jail', 'Island Hopping'],
      isPopular: true,
      difficulty: 'Moderate',
      bestTime: 'November to April'
    }
  ];

  getNorthIndiaDestinations(): RegionalDestination[] {
    return this.allDestinations.filter(dest => dest.region === 'North');
  }

  getSouthIndiaDestinations(): RegionalDestination[] {
    return this.allDestinations.filter(dest => dest.region === 'South');
  }

  getEastIndiaDestinations(): RegionalDestination[] {
    return this.allDestinations.filter(dest => dest.region === 'East');
  }

  getWestIndiaDestinations(): RegionalDestination[] {
    return this.allDestinations.filter(dest => dest.region === 'West');
  }

  getQuote(destination: RegionalDestination): void {
    // Navigate to contact form with destination information
    this.router.navigate(['/'], { 
      fragment: 'contact',
      queryParams: { 
        destination: destination.name,
        location: destination.location,
        region: destination.region,
        price: destination.price,
        duration: destination.duration,
        request: 'quote'
      }
    }).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  contactForCustomPackage(): void {
    // Navigate to contact form with custom package request
    this.router.navigate(['/'], { 
      fragment: 'contact',
      queryParams: { 
        request: 'custom-regional-package'
      }
    }).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  exploreAllDestinations(): void {
    this.router.navigate(['/tour-packages']).then(() => {
      setTimeout(() => this.layoutService.scrollToTopInstant(), 100);
    });
  }
}
