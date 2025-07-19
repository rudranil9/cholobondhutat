import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface TravelPackage {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  highlights: string[];
  category: string;
  categoryId: number;
}

@Component({
  selector: 'app-travel-categories-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Hero Section -->
      <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Company Logo -->
          <div class="flex justify-center mb-8">
            <div class="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img 
                src="assets/destinations/cholobondhu-logo.jpg" 
                alt="Cholo Bondhu Logo" 
                class="w-12 h-12 object-contain rounded-full"
              />
            </div>
          </div>
          
          <div class="text-center">
            <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {{currentCategory?.icon}} {{currentCategory?.name}}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {{currentCategory?.description}}
            </p>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{getFilteredPackages().length}} destinations available in this category
            </div>
          </div>
        </div>
      </section>

      <!-- Travel Packages Grid -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div *ngIf="getFilteredPackages().length === 0" class="text-center py-16">
            <div class="text-6xl mb-4">🚧</div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon!</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-8">
              We're working on curating amazing {{currentCategory?.name.toLowerCase()}} packages for you.
            </p>
            <button 
              (click)="contactForCustomPackage()"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105"
            >
              Request Custom Package
            </button>
          </div>

          <div *ngIf="getFilteredPackages().length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              *ngFor="let pkg of getFilteredPackages()" 
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              <!-- Package Image -->
              <div class="relative overflow-hidden">
                <img 
                  [src]="pkg.image" 
                  [alt]="pkg.name"
                  class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div class="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {{currentCategory?.icon}} {{currentCategory?.name}}
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

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Highlights:</h4>
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

                <!-- Price and Action -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{{pkg.price | number}}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">per person</span>
                  </div>
                  <button 
                    (click)="getQuote(pkg)"
                    class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105"
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
      <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <!-- Company Logo -->
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img 
                src="assets/destinations/cholobondhu-logo.jpg" 
                alt="Cholo Bondhu Logo" 
                class="w-12 h-12 object-contain rounded-full"
              />
            </div>
          </div>
          
          <h3 class="text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p class="text-blue-100 mb-8 text-lg">
            Let us create a custom {{currentCategory?.name.toLowerCase()}} package just for you!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div class="flex items-center space-x-2 text-lg text-white">
              <span>📱</span>
              <span class="font-semibold">WhatsApp: +91 8100282665</span>
            </div>
            <div class="flex items-center space-x-2 text-lg text-white">
              <span>🌐</span>
              <span class="font-semibold">www.cholobondhu.com</span>
            </div>
          </div>
          <div class="mt-8">
            <button 
              (click)="contactForCustomPackage()"
              class="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📞 Contact for Custom Package
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class TravelCategoriesPageComponent implements OnInit {
  currentCategory: any = null;
  categoryId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryName = params['categoryName'];
      this.route.queryParams.subscribe(queryParams => {
        this.categoryId = parseInt(queryParams['categoryId']) || 0;
        this.currentCategory = this.categories.find(cat => cat.id === this.categoryId);
      });
    });
  }

  categories = [
    {
      id: 1,
      name: "Cultural Tours",
      description: "Immerse yourself in rich heritage, ancient monuments, and local traditions. Explore historical sites, museums, and cultural experiences.",
      icon: "🏛️"
    },
    {
      id: 2,
      name: "Adventure",
      description: "Thrilling experiences from mountain treks to water sports and wildlife safaris. Perfect for adrenaline seekers and adventure enthusiasts.",
      icon: "🏔️"
    },
    {
      id: 3,
      name: "Beach & Islands",
      description: "Pristine beaches, crystal clear waters, and tropical island getaways. Relax on sandy shores and enjoy water activities.",
      icon: "🏖️"
    },
    {
      id: 4,
      name: "Spiritual",
      description: "Sacred journeys to temples, ashrams, and spiritual destinations. Find peace and spiritual enlightenment in divine locations.",
      icon: "🕉️"
    },
    {
      id: 5,
      name: "Wildlife",
      description: "Safari adventures, national parks, and wildlife photography tours. Experience nature's beauty and observe wildlife in their natural habitat.",
      icon: "🦁"
    },
    {
      id: 6,
      name: "Hill Stations",
      description: "Cool mountain retreats, scenic valleys, and refreshing getaways. Escape the heat and enjoy pleasant mountain weather.",
      icon: "⛰️"
    },
    {
      id: 7,
      name: "Luxury Travel",
      description: "Premium experiences with luxury accommodations and exclusive services. Indulge in the finest travel experiences money can buy.",
      icon: "💎"
    },
    {
      id: 8,
      name: "Family Tours",
      description: "Family-friendly destinations and activities for all age groups. Create lasting memories with packages designed for families.",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  // Sample packages - these would be filtered based on category
  allPackages: TravelPackage[] = [
    // Hill Stations - Category 6
    {
      id: 1,
      name: 'Darjeeling',
      location: 'West Bengal',
      description: 'Famous for its tea gardens, toy train, and stunning views of Mount Kanchenjunga.',
      image: 'assets/destinations/darjeeling.jpg',
      price: 12999,
      duration: '4D/3N',
      highlights: ['Tea Garden Tours', 'Toy Train Ride', 'Tiger Hill Sunrise', 'Monastery Visits'],
      category: 'hill-stations',
      categoryId: 6
    },
    {
      id: 2,
      name: 'Shimla',
      location: 'Himachal Pradesh',
      description: 'The Queen of Hills with colonial architecture and scenic beauty.',
      image: 'assets/destinations/shimla-manali.jpg',
      price: 15999,
      duration: '5D/4N',
      highlights: ['Mall Road', 'Ridge Walk', 'Kufri Skiing', 'Jakhu Temple'],
      category: 'hill-stations',
      categoryId: 6
    },
    {
      id: 3,
      name: 'Gangtok',
      location: 'Sikkim',
      description: 'Capital of Sikkim with breathtaking mountain views and Buddhist monasteries.',
      image: 'assets/destinations/gangtok.jpg',
      price: 13999,
      duration: '4D/3N',
      highlights: ['Monastery Visits', 'Cable Car Ride', 'Mountain Views', 'Local Markets'],
      category: 'hill-stations',
      categoryId: 6
    },
    // Beach & Islands - Category 3
    {
      id: 4,
      name: 'Goa Beaches',
      location: 'Goa',
      description: 'Sun, sand, and sea with vibrant nightlife and Portuguese heritage.',
      image: 'assets/destinations/goa.jpg',
      price: 14999,
      duration: '5D/4N',
      highlights: ['Beach Lounging', 'Water Sports', 'Nightlife', 'Heritage Tours'],
      category: 'beach-and-islands',
      categoryId: 3
    },
    {
      id: 5,
      name: 'Andaman Islands',
      location: 'Andaman & Nicobar',
      description: 'Crystal clear waters, pristine beaches, and rich marine life.',
      image: 'assets/destinations/andaman.jpg',
      price: 25999,
      duration: '6D/5N',
      highlights: ['Scuba Diving', 'Snorkeling', 'Island Hopping', 'Beach Activities'],
      category: 'beach-and-islands',
      categoryId: 3
    },
    {
      id: 6,
      name: 'Puri',
      location: 'Odisha',
      description: 'Sacred coastal city famous for Jagannath Temple and golden beaches.',
      image: 'assets/destinations/puri.jpg',
      price: 9999,
      duration: '3D/2N',
      highlights: ['Temple Visits', 'Beach Activities', 'Sand Art', 'Local Cuisine'],
      category: 'beach-and-islands',
      categoryId: 3
    },
    // Spiritual - Category 4
    {
      id: 7,
      name: 'Vaishno Devi',
      location: 'Jammu & Kashmir',
      description: 'Sacred pilgrimage to the holy shrine of Mata Vaishno Devi.',
      image: 'assets/destinations/vaishnodevi.jpg',
      price: 18999,
      duration: '4D/3N',
      highlights: ['Temple Visit', 'Helicopter Service', 'Spiritual Experience', 'Mountain Views'],
      category: 'spiritual',
      categoryId: 4
    },
    {
      id: 8,
      name: 'Haridwar & Rishikesh',
      location: 'Uttarakhand',
      description: 'Spiritual cities on the banks of the holy river Ganges.',
      image: 'assets/destinations/haridwar-mussoorie.jpg',
      price: 11999,
      duration: '4D/3N',
      highlights: ['Ganga Aarti', 'Temple Visits', 'Yoga & Meditation', 'River Rafting'],
      category: 'spiritual',
      categoryId: 4
    },
    // Wildlife - Category 5
    {
      id: 9,
      name: 'Sundarbans',
      location: 'West Bengal',
      description: 'World\'s largest mangrove forest, home to the Royal Bengal Tiger.',
      image: 'assets/destinations/sundarban.jpg',
      price: 16999,
      duration: '4D/3N',
      highlights: ['Tiger Safari', 'Boat Rides', 'Bird Watching', 'Village Tours'],
      category: 'wildlife',
      categoryId: 5
    },
    {
      id: 10,
      name: 'Jim Corbett',
      location: 'Uttarakhand',
      description: 'India\'s oldest national park, perfect for wildlife enthusiasts.',
      image: 'assets/destinations/jim-corbett.jpg',
      price: 19999,
      duration: '5D/4N',
      highlights: ['Jungle Safari', 'Wildlife Photography', 'Nature Walks', 'River Rafting'],
      category: 'wildlife',
      categoryId: 5
    }
  ];

  getFilteredPackages(): TravelPackage[] {
    return this.allPackages.filter(pkg => pkg.categoryId === this.categoryId);
  }

  getQuote(pkg: TravelPackage): void {
    // Navigate to contact form with package information
    this.router.navigate(['/contact'], { 
      queryParams: { 
        destination: pkg.name,
        location: pkg.location,
        price: pkg.price,
        duration: pkg.duration,
        category: this.currentCategory?.name,
        request: 'quote'
      }
    });
  }

  contactForCustomPackage(): void {
    // Navigate to contact form with custom package request
    this.router.navigate(['/contact'], { 
      queryParams: { 
        category: this.currentCategory?.name,
        request: 'custom-package'
      }
    });
  }
}
