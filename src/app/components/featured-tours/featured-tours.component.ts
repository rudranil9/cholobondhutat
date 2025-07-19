import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-tours',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="tours" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Tours
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our handpicked selection of extraordinary destinations and experiences
          </p>
        </div>

        <!-- Tours Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let tour of featuredTours" 
               class="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-4 premium-card">
            
            <!-- Glow effect background -->
            <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            <!-- Tour Image -->
            <div class="relative h-64 overflow-hidden">
              <img [src]="tour.image" 
                   [alt]="tour.title"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse-subtle">
                  {{ tour.category }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm border border-white/20">
                  {{ tour.duration }}
                </span>
              </div>
              <!-- Floating overlay content -->
              <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div class="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                  <span class="text-sm font-medium text-gray-800">Quick View</span>
                </div>
              </div>
            </div>

            <!-- Tour Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ tour.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {{ tour.description }}
              </p>
              
              <!-- Tour Details -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center space-x-1">
                    <span>📍</span>
                    <span>{{ tour.location }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{{ tour.groupSize }}</span>
                  </span>
                </div>
              </div>

              <!-- Rating and Price -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-1">
                  <div class="flex text-yellow-400">
                    <span *ngFor="let star of getStars(tour.rating)">⭐</span>
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-300 ml-1">
                    ({{ tour.reviews }})
                  </span>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ₹{{ tour.price | number }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    per person
                  </div>
                </div>
              </div>

              <!-- Book Button -->
              <button 
                (click)="bookTour(tour)"
                class="relative w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium overflow-hidden group premium-button transform hover:scale-105 transition-all duration-300"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 animate-shimmer"></div>
                <span class="relative z-10">Book Now</span>
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- View All Tours Button -->
        <div class="text-center mt-12">
          <button class="relative px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold overflow-hidden group premium-outline-button transform hover:scale-105 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <span class="relative z-10 group-hover:text-white transition-colors duration-300">View All Tours</span>
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </button>
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

    .premium-card {
      position: relative;
      backdrop-filter: blur(10px);
    }

    .premium-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .premium-card:hover::before {
      opacity: 1;
      animation: shimmer-card 2s ease-in-out infinite;
    }

    .animate-pulse-subtle {
      animation: pulse-subtle 3s ease-in-out infinite;
    }

    .premium-button {
      box-shadow: 0 4px 15px 0 rgba(59, 130, 246, 0.3);
    }

    .premium-button:hover {
      box-shadow: 0 8px 30px 0 rgba(59, 130, 246, 0.5);
    }

    .premium-outline-button {
      position: relative;
      overflow: hidden;
    }

    .premium-outline-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.8s ease;
    }

    .premium-outline-button:hover::before {
      left: 100%;
    }

    @keyframes shimmer-card {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes pulse-subtle {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }

    @keyframes shine {
      0% {
        transform: translateX(-100%) skewX(-12deg);
      }
      100% {
        transform: translateX(200%) skewX(-12deg);
      }
    }

    .animate-shine {
      animation: shine 1.5s ease-in-out;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .animate-shimmer {
      animation: shimmer 2s ease-in-out infinite;
    }

    /* Enhanced hover effects */
    .group:hover .filter {
      filter: brightness(1.1) contrast(1.1) saturate(1.2);
    }
  `]
})
export class FeaturedToursComponent {
  constructor(private router: Router) {}

  featuredTours = [
    {
      id: 1,
      title: "Golden Triangle Delhi-Agra-Jaipur",
      description: "Experience India's most iconic destinations including the magnificent Taj Mahal, vibrant Delhi, and royal Jaipur in this classic tour.",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Cultural",
      duration: "7 Days",
      location: "Delhi, Agra, Jaipur",
      groupSize: "2-15 people",
      rating: 4.8,
      reviews: 124,
      price: 35000
    },
    {
      id: 2,
      title: "Goa Beach Paradise",
      description: "Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of India's most popular beach destination.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Beach",
      duration: "5 Days",
      location: "North & South Goa",
      groupSize: "2-20 people",
      rating: 4.6,
      reviews: 89,
      price: 22000
    },
    {
      id: 3,
      title: "Himalayan Adventure Trek",
      description: "Embark on an unforgettable journey through the majestic Himalayas with breathtaking views and spiritual experiences.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Adventure",
      duration: "10 Days",
      location: "Himachal Pradesh",
      groupSize: "4-12 people",
      rating: 4.9,
      reviews: 67,
      price: 45000
    },
    {
      id: 4,
      title: "Kerala Backwaters Cruise",
      description: "Sail through serene backwaters, stay in traditional houseboats, and explore the spice gardens of God's Own Country.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Nature",
      duration: "6 Days",
      location: "Kerala",
      groupSize: "2-10 people",
      rating: 4.7,
      reviews: 156,
      price: 28000
    },
    {
      id: 5,
      title: "Rajasthan Royal Heritage",
      description: "Explore magnificent palaces, desert landscapes, and rich cultural heritage of the Land of Kings.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Heritage",
      duration: "8 Days",
      location: "Rajasthan",
      groupSize: "2-16 people",
      rating: 4.8,
      reviews: 98,
      price: 38000
    },
    {
      id: 6,
      title: "Andaman Island Escape",
      description: "Discover pristine beaches, coral reefs, and marine life in this tropical paradise perfect for relaxation and adventure.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Island",
      duration: "7 Days",
      location: "Andaman & Nicobar",
      groupSize: "2-14 people",
      rating: 4.9,
      reviews: 78,
      price: 42000
    }
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  bookTour(tour: any): void {
    // Navigate to contact form with tour information
    this.router.navigate(['/contact'], { 
      queryParams: { 
        tour: tour.title,
        location: tour.location,
        price: tour.price,
        duration: tour.duration,
        request: 'booking'
      }
    });
  }
}
