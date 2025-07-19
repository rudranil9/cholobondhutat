import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-founder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-32 left-20 w-4 h-4 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div class="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed opacity-60"></div>
      <div class="absolute bottom-32 left-32 w-5 h-5 bg-indigo-400 rounded-full animate-float-slow opacity-60"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <span class="text-sm font-medium text-blue-600 dark:text-blue-400">Meet Our Owner</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Visionary Behind
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Cholo Bondhu</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the passion and dedication that drives our mission to create unforgettable travel experiences
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left Side - Simple Text Content -->
          <div class="relative">
            <!-- Main Content Container -->
            <div class="relative group">
              <!-- Decorative Background -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-20"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-600 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 opacity-20"></div>
              
              <!-- Content Container with Glass Effect -->
              <div class="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <!-- Simple Text Content -->
                <div class="text-center py-16">
                  <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Rukmini Pathak
                  </h3>
                  <p class="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                    Owner
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    The inspiration and namesake of Cholo Bondhu, whose values of hospitality, warmth, and genuine care guide everything we do.
                  </p>
                </div>

                <!-- Glow Effect -->
                <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
              </div>
            </div>

            <!-- Values Cards -->
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div class="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">❤️</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Hospitality</div>
              </div>
              <div class="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">🏠</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Care & Comfort</div>
              </div>
            </div>
          </div>

          <!-- Right Side - Content -->
          <div class="space-y-8">
            <!-- Name and Title -->
            <div>
              <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Rukmini Pathak
              </h3>
              <div class="flex items-center space-x-2 mb-4">
                <span class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium">
                  Owner
                </span>
                <span class="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium">
                  Travel Enthusiast
                </span>
              </div>
            </div>

            <!-- Story Content -->
            <div class="space-y-6">
              <div class="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Our Inspiration
                </h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Cholo Bondhu is named after and dedicated to Rukmini Pathak, whose values of hospitality, warmth, and genuine care for others inspire everything we do. Her spirit of welcoming people with open arms guides our approach to travel.
                </p>
              </div>

              <div class="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Our Values
                </h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Just as Rukmini Pathak believed in treating every guest like family, we ensure that every traveler receives personal attention, genuine care, and experiences that feel like visiting a home away from home.
                </p>
              </div>

              <div class="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Our Promise
                </h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Carrying forward her legacy of care and hospitality, Cholo Bondhu continues to create travel experiences that are memorable, comfortable, and filled with the warmth that she embodied throughout her life.
                </p>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey
              </button>
              <button class="flex-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Quote Section -->
        <div class="mt-20 text-center">
          <div class="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <div class="text-6xl text-blue-500 mb-4">"</div>
            <blockquote class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6 italic">
              Travel is not just about reaching a destination; it's about discovering yourself along the way and creating bonds that last a lifetime.
            </blockquote>
            <div class="flex items-center justify-center space-x-4">
              <div class="text-left">
                <div class="font-semibold text-gray-900 dark:text-white">Rukmini Pathak</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Inspiration, Cholo Bondhu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes float-delayed {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }

    @keyframes float-slow {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float-delayed 4s ease-in-out infinite;
    }

    .animate-float-slow {
      animation: float-slow 5s ease-in-out infinite;
    }

    .shadow-3xl {
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
    }

    /* Glass morphism enhancements */
    .backdrop-blur-lg {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    /* Hover effects */
    .group:hover .animate-bounce {
      animation-duration: 0.5s;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .text-4xl {
        font-size: 2.5rem;
      }
      
      .text-5xl {
        font-size: 3rem;
      }
    }
  `]
})
export class AboutFounderComponent {
  constructor() {}
}
