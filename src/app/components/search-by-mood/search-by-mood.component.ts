import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MoodDestination {
  id: number;
  mood: 'hills' | 'sea' | 'forest';
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  bestTime: string;
  activities: string[];
  moodDescription: string;
  features: string[];
}

@Component({
  selector: 'app-search-by-mood',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Mood Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          *ngFor="let mood of moods" 
          (click)="selectedMood = mood.value"
          [class]="'px-6 py-3 rounded-full font-semibold transition-all duration-300 ' + 
                   (selectedMood === mood.value ? 
                    mood.activeClass : 
                    'bg-gray-100 text-gray-600 hover:bg-gray-200')"
        >
          <span class="mr-2">{{mood.icon}}</span>
          {{mood.label}}
        </button>
      </div>

      <!-- Mood Description -->
      <div class="text-center mb-8">
        <div *ngIf="selectedMood === 'hills'" class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-green-800 mb-2">🏔️ Hill Station Escapes</h3>
          <p class="text-green-700">Breathe in the fresh mountain air, enjoy cool weather, and find peace in nature's grandeur</p>
        </div>
        <div *ngIf="selectedMood === 'sea'" class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-blue-800 mb-2">🌊 Coastal Adventures</h3>
          <p class="text-blue-700">Feel the ocean breeze, walk on sandy beaches, and let the waves wash your worries away</p>
        </div>
        <div *ngIf="selectedMood === 'forest'" class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
          <h3 class="text-2xl font-bold text-emerald-800 mb-2">🌲 Forest Retreats</h3>
          <p class="text-emerald-700">Connect with nature, discover wildlife, and rejuvenate in the heart of wilderness</p>
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
            <div [class]="'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white ' + getMoodBadgeClass(destination.mood)">
              {{getMoodIcon(destination.mood)}} {{getMoodLabel(destination.mood)}}
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

            <!-- Best Time -->
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4">
              <div class="flex items-center">
                <span class="text-amber-500 mr-2">🌤️</span>
                <span class="font-semibold text-amber-800 text-sm">Best Time:</span>
              </div>
              <p class="text-amber-700 text-sm">{{destination.bestTime}}</p>
            </div>

            <!-- Activities -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-2 text-sm">Popular Activities:</h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  *ngFor="let activity of destination.activities.slice(0, 3)" 
                  [class]="'px-2 py-1 rounded-full text-xs font-medium ' + getMoodTagClass(destination.mood)"
                >
                  {{activity}}
                </span>
                <span 
                  *ngIf="destination.activities.length > 3"
                  class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                >
                  +{{destination.activities.length - 3}} more
                </span>
              </div>
            </div>

            <!-- Features -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  *ngFor="let feature of destination.features.slice(0, 2)" 
                  class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {{feature}}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3">
              <button 
                (click)="exploreDestination(destination)"
                [class]="'flex-1 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ' + getMoodButtonClass(destination.mood)"
              >
                Explore
              </button>
              <button 
                (click)="getQuote(destination)"
                [class]="'flex-1 border-2 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ' + getMoodBorderClass(destination.mood)"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Show All Button -->
      <div class="text-center mt-8" *ngIf="getFilteredDestinations().length >= 6">
        <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          View All {{getMoodLabel(selectedMood)}} Destinations
        </button>
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
export class SearchByMoodComponent {
  selectedMood: 'hills' | 'sea' | 'forest' = 'hills';

  constructor(private router: Router) {}

  moods = [
    {
      value: 'hills' as const,
      label: 'Hill Stations',
      icon: '🏔️',
      activeClass: 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
    },
    {
      value: 'sea' as const,
      label: 'Sea & Beaches',
      icon: '🌊',
      activeClass: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
    },
    {
      value: 'forest' as const,
      label: 'Forests & Wildlife',
      icon: '🌲',
      activeClass: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    }
  ];

  destinations: MoodDestination[] = [
    // Hill Stations
    {
      id: 1,
      mood: 'hills',
      name: 'Darjeeling',
      location: 'West Bengal',
      description: 'Famous for its tea gardens, toy train, and stunning views of Mount Kanchenjunga. Experience colonial charm and mountain serenity.',
      image: 'assets/destinations/darjeeling.jpg',
      price: 12999,
      duration: '4D/3N',
      bestTime: 'March to May, September to November',
      activities: ['Tea Garden Tours', 'Toy Train Ride', 'Tiger Hill Sunrise', 'Monastery Visits', 'Cable Car Ride'],
      moodDescription: 'Perfect for peaceful mountain retreat',
      features: ['Mountain Views', 'Tea Culture', 'Colonial Heritage']
    },
    {
      id: 2,
      mood: 'hills',
      name: 'Ooty',
      location: 'Tamil Nadu',
      description: 'Queen of Hill Stations with beautiful botanical gardens, toy train, and pleasant weather perfect for a relaxing mountain getaway.',
      image: 'assets/destinations/ooty.jpg',
      price: 14999,
      duration: '4D/3N',
      bestTime: 'April to June, September to November',
      activities: ['Botanical Gardens', 'Toy Train Ride', 'Boating', 'Tea Factory Visits', 'Horse Riding'],
      moodDescription: 'Classic hill station experience',
      features: ['Cool Climate', 'Gardens', 'Colonial Heritage']
    },
    {
      id: 11,
      mood: 'hills',
      name: 'Shimla',
      location: 'Himachal Pradesh',
      description: 'The Queen of Hills offers pleasant weather, colonial architecture, and scenic beauty perfect for a refreshing hill station experience.',
      image: 'assets/destinations/shimla-manali.jpg',
      price: 15999,
      duration: '5D/4N',
      bestTime: 'March to June, September to November',
      activities: ['Mall Road Shopping', 'Ridge Walk', 'Kufri Skiing', 'Jakhu Temple', 'Heritage Train'],
      moodDescription: 'Colonial hill station charm',
      features: ['Cool Climate', 'Shopping', 'Adventure Sports']
    },
    {
      id: 12,
      mood: 'hills',
      name: 'Gangtok',
      location: 'Sikkim',
      description: 'Capital of Sikkim with breathtaking mountain views, Buddhist monasteries, and peaceful atmosphere in the Eastern Himalayas.',
      image: 'assets/destinations/sikkim.jpg',
      price: 13999,
      duration: '4D/3N',
      bestTime: 'March to May, September to November',
      activities: ['Monastery Visits', 'Cable Car Ride', 'Mountain Views', 'Local Markets', 'Cultural Tours'],
      moodDescription: 'Himalayan mountain retreat',
      features: ['Buddhist Culture', 'Mountain Views', 'Clean Environment']
    },
    {
      id: 13,
      mood: 'hills',
      name: 'Gulmarg',
      location: 'Jammu & Kashmir',
      description: 'Meadow of Flowers with world-class skiing, gondola rides, and stunning alpine scenery in the Kashmir valley.',
      image: 'assets/destinations/gulmarg.jpg',
      price: 18999,
      duration: '5D/4N',
      bestTime: 'December to March (Snow), April to October (Flowers)',
      activities: ['Skiing', 'Gondola Ride', 'Golf', 'Trekking', 'Photography'],
      moodDescription: 'Alpine adventure paradise',
      features: ['Snow Sports', 'Alpine Meadows', 'Adventure Activities']
    },
    {
      id: 14,
      mood: 'hills',
      name: 'Mussoorie',
      location: 'Uttarakhand',
      description: 'Queen of the Hills with pleasant weather, colonial charm, and beautiful valley views perfect for a peaceful mountain getaway.',
      image: 'assets/destinations/mussoorie.jpg',
      price: 12999,
      duration: '4D/3N',
      bestTime: 'March to June, September to November',
      activities: ['Mall Road Walk', 'Cable Car Ride', 'Kempty Falls', 'Gun Hill', 'Nature Walks'],
      moodDescription: 'Classic Himalayan hill station',
      features: ['Valley Views', 'Colonial Heritage', 'Pleasant Weather']
    },

    // Sea & Beaches
    {
      id: 4,
      mood: 'sea',
      name: 'Goa Beaches',
      location: 'Goa',
      description: 'Sun, sand, and sea with vibrant nightlife, Portuguese heritage, and some of India\'s most beautiful beaches.',
      image: 'assets/destinations/goa.jpg',
      price: 14999,
      duration: '5D/4N',
      bestTime: 'November to March',
      activities: ['Beach Lounging', 'Water Sports', 'Nightlife', 'Heritage Tours', 'Spice Plantation'],
      moodDescription: 'Tropical beach paradise',
      features: ['Golden Beaches', 'Nightlife', 'Portuguese Culture']
    },
    {
      id: 5,
      mood: 'sea',
      name: 'Andaman Islands',
      location: 'Andaman & Nicobar',
      description: 'Crystal clear waters, pristine beaches, and rich marine life. Perfect for those seeking untouched natural beauty.',
      image: 'assets/destinations/andaman.jpg',
      price: 25999,
      duration: '6D/5N',
      bestTime: 'November to April',
      activities: ['Scuba Diving', 'Snorkeling', 'Island Hopping', 'Beach Activities', 'Coral Viewing'],
      moodDescription: 'Pristine island paradise',
      features: ['Crystal Waters', 'Marine Life', 'Untouched Nature']
    },
    {
      id: 6,
      mood: 'sea',
      name: 'Puri',
      location: 'Odisha',
      description: 'Sacred coastal city famous for Jagannath Temple and golden beaches. Perfect blend of spirituality and seaside relaxation.',
      image: 'assets/destinations/puri.jpg',
      price: 9999,
      duration: '3D/2N',
      bestTime: 'October to March',
      activities: ['Temple Visits', 'Beach Activities', 'Sand Art', 'Local Cuisine', 'Cultural Shows'],
      moodDescription: 'Spiritual beach destination',
      features: ['Sacred Sites', 'Cultural Heritage', 'Golden Beaches']
    },
    {
      id: 10,
      mood: 'sea',
      name: 'Digha',
      location: 'West Bengal',
      description: 'Popular beach destination with golden sands, gentle waves, and a perfect weekend getaway for families and couples.',
      image: 'assets/destinations/digha.jpg',
      price: 6999,
      duration: '2D/1N',
      bestTime: 'October to March',
      activities: ['Beach Walks', 'Sea Bathing', 'Local Seafood', 'Shopping', 'Photography'],
      moodDescription: 'Accessible coastal retreat',
      features: ['Family Friendly', 'Budget Travel', 'Local Culture']
    },

    // Forests & Wildlife
    {
      id: 7,
      mood: 'forest',
      name: 'Sundarbans',
      location: 'West Bengal',
      description: 'World\'s largest mangrove forest, home to the Royal Bengal Tiger. Experience unique ecosystem and wildlife.',
      image: 'assets/destinations/sundarban.jpg',
      price: 16999,
      duration: '4D/3N',
      bestTime: 'November to March',
      activities: ['Tiger Safari', 'Boat Rides', 'Bird Watching', 'Village Tours', 'Photography'],
      moodDescription: 'Mangrove wilderness adventure',
      features: ['Royal Bengal Tiger', 'Mangrove Forest', 'Unique Ecosystem']
    },
    {
      id: 8,
      mood: 'forest',
      name: 'Jim Corbett',
      location: 'Uttarakhand',
      description: 'India\'s oldest national park, perfect for wildlife enthusiasts seeking tigers, elephants, and diverse flora.',
      image: 'assets/destinations/jim-corbett.jpg',
      price: 19999,
      duration: '5D/4N',
      bestTime: 'November to March',
      activities: ['Jungle Safari', 'Wildlife Photography', 'Nature Walks', 'River Rafting', 'Bird Watching'],
      moodDescription: 'Classic wildlife experience',
      features: ['Tiger Reserve', 'Diverse Wildlife', 'Adventure Activities']
    },
    {
      id: 9,
      mood: 'forest',
      name: 'Dooars',
      location: 'West Bengal',
      description: 'Gateway to Bhutan with lush tea gardens, elephant corridors, and diverse wildlife in the foothills of the Himalayas.',
      image: 'assets/destinations/dooars.jpg',
      price: 11999,
      duration: '3D/2N',
      bestTime: 'October to March',
      activities: ['Elephant Safari', 'Tea Garden Tours', 'Bird Watching', 'Village Visits', 'Nature Photography'],
      moodDescription: 'Himalayan foothills wilderness',
      features: ['Elephant Corridors', 'Tea Gardens', 'Himalayan Views']
    }
  ];

  getFilteredDestinations(): MoodDestination[] {
    return this.destinations.filter(dest => dest.mood === this.selectedMood);
  }

  getMoodIcon(mood: 'hills' | 'sea' | 'forest'): string {
    const moodMap = { hills: '🏔️', sea: '🌊', forest: '🌲' };
    return moodMap[mood];
  }

  getMoodLabel(mood: 'hills' | 'sea' | 'forest'): string {
    const moodMap = { hills: 'Hill Stations', sea: 'Sea & Beaches', forest: 'Forests & Wildlife' };
    return moodMap[mood];
  }

  getMoodBadgeClass(mood: 'hills' | 'sea' | 'forest'): string {
    const classMap = {
      hills: 'bg-gradient-to-r from-green-500 to-blue-500',
      sea: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      forest: 'bg-gradient-to-r from-green-500 to-emerald-500'
    };
    return classMap[mood];
  }

  getMoodTagClass(mood: 'hills' | 'sea' | 'forest'): string {
    const classMap = {
      hills: 'bg-green-100 text-green-800',
      sea: 'bg-blue-100 text-blue-800',
      forest: 'bg-emerald-100 text-emerald-800'
    };
    return classMap[mood];
  }

  getMoodButtonClass(mood: 'hills' | 'sea' | 'forest'): string {
    const classMap = {
      hills: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600',
      sea: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
      forest: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
    };
    return classMap[mood];
  }

  getMoodBorderClass(mood: 'hills' | 'sea' | 'forest'): string {
    const classMap = {
      hills: 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
      sea: 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
      forest: 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
    };
    return classMap[mood];
  }

  exploreDestination(destination: MoodDestination): void {
    console.log('Exploring destination:', destination.name);
    alert(`Exploring ${destination.name}. This would show detailed information, photo galleries, and travel guides.`);
  }

  getQuote(destination: MoodDestination): void {
    // Navigate to contact form with destination information for quote
    this.router.navigate(['/contact'], { 
      queryParams: { 
        destination: destination.name,
        location: destination.location,
        duration: destination.duration,
        mood: destination.mood,
        request: 'quote'
      }
    });
  }
}
