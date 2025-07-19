import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Professional About Us Section -->
    <section id="about" class="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <!-- Subtle Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <!-- Section Header -->
        <div class="text-center mb-16 animate-fade-in">
          <div class="inline-block mb-4">
            <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              Our Story
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About 
            <span class="relative">
              Cholo Bondhu
              <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform scale-x-0 animate-scale-x"></div>
            </span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the story, mission, and vision behind our adventures that connect people, cultures, and unforgettable experiences.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Founder Section -->
          <div class="order-2 lg:order-1 animate-slide-in-left">
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Rukmini Pathak</h3>
                <p class="text-blue-600 dark:text-blue-400 font-semibold mb-4">Owner</p>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Cholo Bondhu is proudly named after and dedicated to Rukmini Pathak. Her values of hospitality, care, and attention to detail inspire everything we do in creating memorable travel experiences.
                </p>
              </div>
            </div>
          </div>

          <!-- Mission & Values -->
          <div class="order-1 lg:order-2 animate-slide-in-right">
            <div class="space-y-8">
              <!-- Mission Card -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h4>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      To craft unique and immersive travel experiences that connect people, cultures, and nature, fostering deeper understanding and lasting memories.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Vision Card -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h4>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      To be the most trusted travel community, inspiring people to explore with curiosity, respect, and adventure while preserving destinations.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Values Card -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Values</h4>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Authenticity, sustainability, community, and excellence guide every journey we craft for our travelers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="mt-20 animate-fade-in-up">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h3>
            <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a simple dream to a thriving travel community
            </p>
          </div>

          <div class="relative max-w-4xl mx-auto">
            <!-- Timeline Line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 h-full"></div>
            
            <!-- Timeline Items -->
            <div class="space-y-12">
              <div *ngFor="let milestone of timeline; let i = index" 
                   class="relative flex items-center animate-timeline-item"
                   [style.animation-delay]="(i * 300) + 'ms'"
                   [class.flex-row-reverse]="i % 2 === 1">
                
                <!-- Timeline marker -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"
                     [style.background-color]="milestone.color">
                </div>
                
                <!-- Content card -->
                <div class="w-5/12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                     [class.ml-auto]="i % 2 === 0"
                     [class.mr-auto]="i % 2 === 1">
                  <div class="text-center" [class.text-right]="i % 2 === 1">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ milestone.year }}</h4>
                    <h5 class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">{{ milestone.title }}</h5>
                    <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ milestone.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-20 text-center animate-fade-in-up">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">Ready to Start Your Adventure?</h3>
            <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of authentic experiences with Cholo Bondhu.
            </p>
            <button (click)="explorePackages()" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore Our Tours
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Professional Animations */
    @keyframes scale-x {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slide-in-left {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slide-in-right {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes timeline-item {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-scale-x {
      animation: scale-x 2s ease-out forwards;
    }

    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }

    .animate-slide-in-left {
      animation: slide-in-left 1s ease-out 0.3s forwards;
      opacity: 0;
    }

    .animate-slide-in-right {
      animation: slide-in-right 1s ease-out 0.6s forwards;
      opacity: 0;
    }

    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out 0.9s forwards;
      opacity: 0;
    }

    .animate-timeline-item {
      animation: timeline-item 0.8s ease-out forwards;
      opacity: 0;
    }

    /* Ensure smooth transitions */
    * {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  `]
})
export class AboutUsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private router: Router, private layoutService: LayoutService) {}

  timeline = [
    {
      year: '2020',
      title: 'The Journey Begins',
      description: 'Cholo Bondhu was founded with a vision to make travel more meaningful and accessible.',
      color: '#3B82F6'
    },
    {
      year: '2021',
      title: 'Community Growth',
      description: 'Launched our first tour packages and built a community of passionate travelers.',
      color: '#8B5CF6'
    },
    {
      year: '2023',
      title: 'Expansion & Excellence',
      description: 'Expanded across India with sustainable tourism practices and authentic experiences.',
      color: '#10B981'
    },
    {
      year: 'Today',
      title: 'Trusted Partnership',
      description: 'Serving 1,200+ travelers with 75+ destinations and maintaining 99.2% satisfaction.',
      color: '#F59E0B'
    }
  ];

  private isComponentVisible = true;

  ngOnInit(): void {
    // Ensure component visibility
    this.isComponentVisible = true;
  }

  ngAfterViewInit(): void {
    // Trigger animations after view is initialized
    setTimeout(() => {
      if (this.isComponentVisible) {
        // Force a repaint to ensure animations work
        const element = document.getElementById('about');
        if (element) {
          element.style.visibility = 'visible';
          element.style.opacity = '1';
        }
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.isComponentVisible = false;
  }

  explorePackages(): void {
    this.router.navigate(['/tour-packages']).then(() => {
      // Ensure scroll to top after navigation
      setTimeout(() => this.layoutService.scrollToTopInstant(), 100);
    });
  }
}
