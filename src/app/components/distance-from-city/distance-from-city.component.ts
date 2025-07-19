import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DistanceDestination {
  id: number;
  name: string;
  location: string;
  distance: number; // in kilometers
  category: 'weekend' | 'short' | 'long';
  travelTime: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  transportMode: string[];
  highlights: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-distance-from-city',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Distance Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          *ngFor="let category of categories" 
          (click)="selectedCategory = category.value"
          [class]="'px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ' + 
                   (selectedCategory === category.value ? 
                    category.activeClass : 
                    'bg-gray-100 text-gray-600 hover:bg-gray-200')"
        >
          <span>{{category.icon}}</span>
          <span>{{category.label}}</span>
          <span class="text-xs opacity-75">({{category.distance}})</span>
        </button>
      </div>

      <!-- Category Description -->
      <div class="text-center mb-8">
        <div *ngIf="selectedCategory === 'weekend'" class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-purple-800 mb-2">🚗 Weekend Getaways</h3>
          <p class="text-purple-700">Quick escapes within 100km - Perfect for short breaks and spontaneous trips</p>
        </div>
        <div *ngIf="selectedCategory === 'short'" class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-blue-800 mb-2">🚌 Short Trips</h3>
          <p class="text-blue-700">Comfortable distances 100-300km - Ideal for 3-5 day holidays</p>
        </div>
        <div *ngIf="selectedCategory === 'long'" class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-green-800 mb-2">✈️ Long Distance Adventures</h3>
          <p class="text-green-700">Epic journeys 300km+ - Perfect for extended vacations and exploration</p>
        </div>
      </div>

      <!-- Destinations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let destination of getFilteredDestinations()" 
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
        >
          <!-- Destination Image -->
          <div class="relative overflow-hidden">
            <img 
              [src]="destination.image" 
              [alt]="destination.name"
              class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            >
            <div [class]="'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white ' + getCategoryBadgeClass(destination.category)">
              {{getCategoryIcon(destination.category)}} {{destination.distance}}km
            </div>
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
              ₹{{destination.price | number}}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <!-- Destination Content -->
          <div class="p-6">
            <div class="mb-3">
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                {{destination.name}}
              </h3>
              <div class="flex items-center text-gray-600 text-sm">
                <span class="text-red-500 mr-1">📍</span>
                <span class="mr-3">{{destination.location}}</span>
                <span class="text-blue-500 mr-1">⏱️</span>
                <span>{{destination.duration}}</span>
              </div>
            </div>

            <p class="text-gray-600 mb-4 text-sm line-clamp-3">{{destination.description}}</p>

            <!-- Travel Info -->
            <div [class]="'border-l-4 p-3 mb-4 ' + getCategoryInfoClass(destination.category)">
              <div class="flex items-center mb-1">
                <span class="text-lg mr-2">🚗</span>
                <span class="font-semibold text-sm">Travel Time: {{destination.travelTime}}</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  *ngFor="let mode of destination.transportMode" 
                  class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {{mode}}
                </span>
              </div>
            </div>

            <!-- Best For -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-2 text-sm">Best For:</h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  *ngFor="let bestFor of destination.bestFor" 
                  [class]="'px-2 py-1 rounded-full text-xs font-medium ' + getCategoryTagClass(destination.category)"
                >
                  {{bestFor}}
                </span>
              </div>
            </div>

            <!-- Highlights -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-2 text-sm">Highlights:</h4>
              <ul class="text-xs text-gray-600 space-y-1">
                <li *ngFor="let highlight of destination.highlights.slice(0, 3)" class="flex items-start">
                  <span class="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>{{highlight}}</span>
                </li>
                <li *ngIf="destination.highlights.length > 3" class="text-gray-500 text-xs">
                  +{{destination.highlights.length - 3}} more highlights
                </li>
              </ul>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3">
              <button 
                (click)="planTrip(destination)"
                [class]="'flex-1 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ' + getCategoryButtonClass(destination.category)"
              >
                Plan Trip
              </button>
              <button 
                (click)="bookDestination(destination)"
                [class]="'flex-1 border-2 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ' + getCategoryBorderClass(destination.category)"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Distance Summary -->
      <div class="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl mt-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4 text-center">Choose Your Perfect Distance</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-2xl mb-2">🚗</div>
            <h4 class="font-semibold text-purple-800">Weekend (0-100km)</h4>
            <p class="text-sm text-gray-600">2-3 hours drive</p>
            <p class="text-xs text-gray-500">Perfect for quick getaways</p>
          </div>
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-2xl mb-2">🚌</div>
            <h4 class="font-semibold text-blue-800">Short (100-300km)</h4>
            <p class="text-sm text-gray-600">3-6 hours journey</p>
            <p class="text-xs text-gray-500">Ideal for mini vacations</p>
          </div>
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-2xl mb-2">✈️</div>
            <h4 class="font-semibold text-green-800">Long (300km+)</h4>
            <p class="text-sm text-gray-600">6+ hours or flight</p>
            <p class="text-xs text-gray-500">Epic adventure trips</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class DistanceFromCityComponent {
  selectedCategory: 'weekend' | 'short' | 'long' = 'weekend';

  constructor(private router: Router) {}

  categories = [
    {
      value: 'weekend' as const,
      label: 'Weekend Getaways',
      icon: '🚗',
      distance: '0-100km',
      activeClass: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
    },
    {
      value: 'short' as const,
      label: 'Short Trips',
      icon: '🚌',
      distance: '100-300km',
      activeClass: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
    },
    {
      value: 'long' as const,
      label: 'Long Distance',
      icon: '✈️',
      distance: '300km+',
      activeClass: 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
    }
  ];

  destinations: DistanceDestination[] = [
    // Weekend Getaways (0-100km from Kolkata)
    {
      id: 1,
      name: 'Shantiniketan',
      location: 'West Bengal',
      distance: 165,
      category: 'short',
      travelTime: '3-4 hours',
      description: 'Peaceful university town founded by Rabindranath Tagore, known for its cultural heritage and artistic atmosphere.',
      image: 'assets/destinations/shantiniketan.jpg',
      price: 4999,
      duration: '2D/1N',
      transportMode: ['Car', 'Train', 'Bus'],
      highlights: ['Visva Bharati University', 'Tagore Museum', 'Local Handicrafts', 'Cultural Programs'],
      bestFor: ['Culture Lovers', 'Art Enthusiasts', 'Peaceful Retreat']
    },
    {
      id: 2,
      name: 'Bakkali',
      location: 'West Bengal',
      distance: 85,
      category: 'weekend',
      travelTime: '2 hours',
      description: 'Peaceful riverside destination perfect for a refreshing weekend getaway with natural beauty.',
      image: 'assets/destinations/bakkhali.jpg',
      price: 2499,
      duration: '2D/1N',
      transportMode: ['Car', 'Bus'],
      highlights: ['Riverside Views', 'Natural Beauty', 'Peaceful Environment', 'Local Culture'],
      bestFor: ['Nature Lovers', 'Peace Seekers', 'Weekend Escape']
    },
    {
      id: 21,
      name: 'Mayapur Iskcon',
      location: 'West Bengal',
      distance: 130,
      category: 'weekend',
      travelTime: '2.5 hours',
      description: 'Spiritual destination and headquarters of ISKCON with beautiful temples and peaceful atmosphere.',
      image: 'assets/destinations/mayapur.jpg',
      price: 3499,
      duration: '2D/1N',
      transportMode: ['Car', 'Bus', 'Train'],
      highlights: ['ISKCON Temple', 'Spiritual Atmosphere', 'Cultural Programs', 'Vegetarian Cuisine'],
      bestFor: ['Spiritual Seekers', 'Culture Enthusiasts', 'Peace Lovers']
    },
    {
      id: 22,
      name: 'Taki',
      location: 'West Bengal',
      distance: 70,
      category: 'weekend',
      travelTime: '1.5 hours',
      description: 'Charming border town on the banks of Ichhamati River, perfect for a quick weekend retreat.',
      image: 'assets/destinations/taki.jpg',
      price: 2199,
      duration: '2D/1N',
      transportMode: ['Car', 'Bus', 'Train'],
      highlights: ['Ichhamati River', 'Border Town Culture', 'River Views', 'Local Markets'],
      bestFor: ['River Lovers', 'Cultural Experience', 'Budget Travel']
    },
    {
      id: 3,
      name: 'Bishnupur',
      location: 'West Bengal',
      distance: 152,
      category: 'short',
      travelTime: '3 hours',
      description: 'Historic town famous for terracotta temples, traditional music, and cultural heritage.',
      image: 'assets/destinations/bishnupur.jpg',
      price: 5999,
      duration: '2D/1N',
      transportMode: ['Car', 'Train'],
      highlights: ['Terracotta Temples', 'Handicrafts', 'Cultural Heritage', 'Local Cuisine'],
      bestFor: ['History Buffs', 'Culture Enthusiasts', 'Architecture Lovers']
    },

    // Short Trips (100-300km)
    {
      id: 4,
      name: 'Darjeeling',
      location: 'West Bengal',
      distance: 650,
      category: 'long',
      travelTime: '10-12 hours',
      description: 'Queen of Hills with tea gardens, toy train, and magnificent mountain views.',
      image: 'assets/destinations/darjeeling.jpg',
      price: 12999,
      duration: '4D/3N',
      transportMode: ['Car', 'Train', 'Flight to Bagdogra'],
      highlights: ['Tea Gardens', 'Toy Train', 'Tiger Hill', 'Himalayan Views'],
      bestFor: ['Mountain Lovers', 'Tea Enthusiasts', 'Adventure Seekers']
    },
    {
      id: 5,
      name: 'Puri',
      location: 'Odisha',
      distance: 502,
      category: 'long',
      travelTime: '8-10 hours',
      description: 'Sacred coastal city with beautiful beaches and the famous Jagannath Temple.',
      image: 'assets/destinations/puri.jpg',
      price: 9999,
      duration: '3D/2N',
      transportMode: ['Car', 'Train', 'Flight to Bhubaneswar'],
      highlights: ['Jagannath Temple', 'Golden Beach', 'Sand Art', 'Local Cuisine'],
      bestFor: ['Spiritual Travelers', 'Beach Lovers', 'Cultural Experience']
    },
    {
      id: 6,
      name: 'Kalimpong',
      location: 'West Bengal',
      distance: 680,
      category: 'long',
      travelTime: '11-13 hours',
      description: 'Peaceful hill station with panoramic mountain views and rich cultural diversity.',
      image: 'assets/destinations/lava-rishop.jpg',
      price: 11999,
      duration: '4D/3N',
      transportMode: ['Car', 'Flight to Bagdogra + Car'],
      highlights: ['Mountain Views', 'Flower Nurseries', 'Monasteries', 'Adventure Sports'],
      bestFor: ['Peace Seekers', 'Adventure Lovers', 'Mountain Views']
    },

    // Weekend options
    {
      id: 7,
      name: 'Digha',
      location: 'West Bengal',
      distance: 187,
      category: 'short',
      travelTime: '3-4 hours',
      description: 'Popular beach destination perfect for a relaxing coastal weekend getaway.',
      image: 'assets/destinations/digha.jpg',
      price: 3999,
      duration: '2D/1N',
      transportMode: ['Car', 'Train', 'Bus'],
      highlights: ['Sandy Beaches', 'Sea Waves', 'Beach Activities', 'Seafood'],
      bestFor: ['Beach Lovers', 'Family Trip', 'Relaxation']
    },
    
  ];

  getFilteredDestinations(): DistanceDestination[] {
    return this.destinations.filter(dest => dest.category === this.selectedCategory);
  }

  getCategoryIcon(category: 'weekend' | 'short' | 'long'): string {
    const iconMap = { weekend: '🚗', short: '🚌', long: '✈️' };
    return iconMap[category];
  }

  getCategoryBadgeClass(category: 'weekend' | 'short' | 'long'): string {
    const classMap = {
      weekend: 'bg-gradient-to-r from-purple-500 to-pink-500',
      short: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      long: 'bg-gradient-to-r from-green-500 to-teal-500'
    };
    return classMap[category];
  }

  getCategoryInfoClass(category: 'weekend' | 'short' | 'long'): string {
    const classMap = {
      weekend: 'bg-purple-50 border-purple-400',
      short: 'bg-blue-50 border-blue-400',
      long: 'bg-green-50 border-green-400'
    };
    return classMap[category];
  }

  getCategoryTagClass(category: 'weekend' | 'short' | 'long'): string {
    const classMap = {
      weekend: 'bg-purple-100 text-purple-800',
      short: 'bg-blue-100 text-blue-800',
      long: 'bg-green-100 text-green-800'
    };
    return classMap[category];
  }

  getCategoryButtonClass(category: 'weekend' | 'short' | 'long'): string {
    const classMap = {
      weekend: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      short: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      long: 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
    };
    return classMap[category];
  }

  getCategoryBorderClass(category: 'weekend' | 'short' | 'long'): string {
    const classMap = {
      weekend: 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white',
      short: 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
      long: 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
    };
    return classMap[category];
  }

  planTrip(destination: DistanceDestination): void {
    console.log('Planning trip to:', destination.name);
    alert(`Planning trip to ${destination.name} (${destination.distance}km away). This would show route planning, itinerary options, and travel tips.`);
  }

  bookDestination(destination: DistanceDestination): void {
    // Navigate to contact form with destination information
    this.router.navigate(['/contact'], { 
      queryParams: { 
        destination: destination.name,
        location: destination.location,
        distance: destination.distance,
        price: destination.price,
        duration: destination.duration,
        category: destination.category,
        request: 'booking'
      }
    });
  }
}
