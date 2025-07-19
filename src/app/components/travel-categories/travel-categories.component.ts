import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-travel-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="destinations" class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Travel Categories
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our diverse range of travel experiences tailored to your interests
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let category of categories" 
               class="group cursor-pointer"
               (click)="navigateToCategory(category.id, category.name)">
            <div class="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <!-- Background Image -->
              <img [src]="category.image" 
                   [alt]="category.name"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-2xl">{{ category.icon }}</span>
                  <h3 class="text-xl font-bold">{{ category.name }}</h3>
                </div>
                <p class="text-gray-200 text-sm mb-3 line-clamp-2">
                  {{ category.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore →
                  </span>
                </div>
              </div>

              <!-- Hover Effect Badge -->
              <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-white text-sm font-medium">Popular</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Special Offers Section -->
        <div class="mt-20">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Special Travel Offers
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div *ngFor="let offer of specialOffers" 
                 class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div class="relative z-10">
                <div class="text-3xl mb-2">{{ offer.icon }}</div>
                <h4 class="text-lg font-bold mb-2">{{ offer.title }}</h4>
                <p class="text-blue-100 text-sm mb-3">{{ offer.description }}</p>
                <div class="text-2xl font-bold">{{ offer.discount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
export class TravelCategoriesComponent {
  constructor(private router: Router, private layoutService: LayoutService) {}

  navigateToCategory(categoryId: number, categoryName: string): void {
    // Convert category name to URL-friendly format
    const urlName = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    this.router.navigate(['/travel-categories', urlName], { 
      queryParams: { categoryId: categoryId }
    }).then(() => {
      setTimeout(() => this.layoutService.scrollToTopInstant(), 100);
    });
  }
  categories = [
    {
      id: 1,
      name: "Cultural Tours",
      description: "Immerse yourself in rich heritage, ancient monuments, and local traditions",
      icon: "🏛️",
      image: "assets/destinations/bishnupur.jpg"
    },
    {
      id: 2,
      name: "Adventure",
      description: "Thrilling experiences from mountain treks to water sports and wildlife safaris",
      icon: "🏔️",
      image: "assets/destinations/ladakh.jpg"
    },
    {
      id: 3,
      name: "Beach & Islands",
      description: "Pristine beaches, crystal clear waters, and tropical island getaways",
      icon: "🏖️",
      image: "assets/destinations/andaman.jpg"
    },
    {
      id: 4,
      name: "Spiritual",
      description: "Sacred journeys to temples, ashrams, and spiritual destinations",
      icon: "🕉️",
      image: "assets/destinations/vaishnodevi.jpg"
    },
    {
      id: 5,
      name: "Wildlife",
      description: "Safari adventures, national parks, and wildlife photography tours",
      icon: "🦁",
      image: "assets/destinations/sundarban.jpg"
    },
    {
      id: 6,
      name: "Hill Stations",
      description: "Cool mountain retreats, scenic valleys, and refreshing getaways",
      icon: "⛰️",
      image: "assets/destinations/darjeeling.jpg"
    },
    {
      id: 7,
      name: "Luxury Travel",
      description: "Premium experiences with luxury accommodations and exclusive services",
      icon: "💎",
      image: "assets/destinations/goa.jpg"
    },
    {
      id: 8,
      name: "Family Tours",
      description: "Family-friendly destinations and activities for all age groups",
      icon: "👨‍👩‍👧‍👦",
      image: "assets/destinations/kerala.jpg"
    }
  ];

  specialOffers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 3 months in advance and save big on your dream vacation",
      icon: "🐦",
      discount: "Up to 30% OFF"
    },
    {
      id: 2,
      title: "Group Discount",
      description: "Special rates for groups of 6 or more travelers",
      icon: "👥",
      discount: "25% OFF"
    },
    {
      id: 3,
      title: "Honeymoon Package",
      description: "Romantic getaways with special amenities for couples",
      icon: "💕",
      discount: "20% OFF"
    }
  ];
}
