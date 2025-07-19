import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3 cursor-pointer" (click)="navigateHome()">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden border border-gray-200">
              <img 
                src="/assets/destinations/cholobondhu-logo.jpg" 
                alt="Cholo Bondhu Logo" 
                class="w-full h-full object-contain"
              />
            </div>
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              Cholo Bondhu
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-2">
            <a *ngFor="let item of menuItems" 
               [routerLink]="item.route"
               [fragment]="item.fragment || undefined"
               routerLinkActive="text-blue-600 font-semibold active-nav-item"
               [routerLinkActiveOptions]="{ exact: true }"
               (mouseenter)="preloadRoute(item.route)"
               class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium relative nav-link group">
              <span class="relative z-10">{{ item.label }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100"></div>
            </a>
          </div>

          <!-- Right side buttons -->
          <div class="flex items-center space-x-4">
            <!-- Dark mode toggle -->
            <button
              (click)="toggleDarkMode()"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span class="text-lg">{{ darkMode ? '☀️' : '🌙' }}</span>
            </button>

            <!-- Book Now button -->
            <button (click)="navigateToContact()" class="hidden md:inline-flex px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Book Now
            </button>

            <!-- Mobile menu button -->
            <button 
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-6 h-6" [class.hidden]="mobileMenuOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg class="w-6 h-6" [class.hidden]="!mobileMenuOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden transition-all duration-300 overflow-hidden" 
             [ngClass]="{ 'max-h-0 opacity-0': !mobileMenuOpen, 'max-h-96 opacity-100': mobileMenuOpen }">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <a *ngFor="let item of menuItems" 
               [routerLink]="item.route"
               [fragment]="item.fragment || undefined"
               (click)="closeMobileMenu()"
               (mouseenter)="preloadRoute(item.route)"
               routerLinkActive="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
               [routerLinkActiveOptions]="{ exact: true }"
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {{ item.label }}
            </a>
            
            <!-- Mobile Book Now -->
            <div class="mt-4 px-3">
              <button (click)="navigateToContact()" class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Mobile Menu Animation */
    .mobile-menu-container {
      transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    /* Professional Navigation Styles */
    nav {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    /* Enhanced Interactive Navigation Links */
    .nav-link {
      position: relative;
      padding: 0.75rem 1.25rem;
      border-radius: 0.75rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .nav-link::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
      transition: all 0.4s ease;
      transform: translateX(-50%);
      border-radius: 2px;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.6s ease;
      pointer-events: none;
    }

    .nav-link:hover::before {
      width: 90%;
    }

    .nav-link:hover::after {
      left: 100%;
    }

    .nav-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    }

    .nav-link:hover span {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }

    /* Active link enhanced styles */
    .active-nav-item {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
    }

    .active-nav-item::before {
      width: 90%;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6);
    }

    /* Enhanced Logo - Simple without effects */
    .cursor-pointer .w-10 {
      transition: none;
    }

    .cursor-pointer:hover .w-10 {
      transform: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* Book Now button enhanced animation */
    .bg-gradient-to-r {
      background-size: 200% 200%;
      position: relative;
      overflow: hidden;
    }

    .bg-gradient-to-r::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6);
      background-size: 400% 400%;
      border-radius: inherit;
      z-index: -1;
      animation: gradientBorder 3s ease infinite;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bg-gradient-to-r:hover::before {
      opacity: 1;
    }

    .bg-gradient-to-r:hover {
      animation: gradientShift 2s ease infinite;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes gradientBorder {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Dark mode enhanced interactions */
    .dark .nav-link:hover {
      background-color: rgba(59, 130, 246, 0.15);
      color: #60A5FA;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
    }

    .dark .active-nav-item {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }

    /* Enhanced mobile menu animations */
    .transition-all {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Button hover effects enhancement */
    button {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    button:hover {
      transform: translateY(-2px);
    }

    /* Dark mode toggle enhanced effect */
    .p-2.rounded-lg:hover {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
      transform: translateY(-1px) scale(1.05);
      box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2);
    }

    /* Simple logo text without shimmer */
    .text-gray-900, .dark .text-white {
      background: none;
      background-clip: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
    }

    /* Ensure visibility and responsiveness */
    .hidden {
      display: none;
    }

    @media (max-width: 768px) {
      .md\\:hidden { display: block; }
      .md\\:flex { display: none; }
      .md\\:inline-flex { display: none; }
    }

    @media (min-width: 769px) {
      .md\\:hidden { display: none; }
      .md\\:flex { display: flex; }
      .md\\:inline-flex { display: inline-flex; }
    }
  `]
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() darkMode = false;
  @Output() darkModeToggle = new EventEmitter<void>();

  isScrolled = false;
  mobileMenuOpen = false;
  private preloadedRoutes = new Set<string>();
  private destroy$ = new Subject<void>();

  menuItems = [
    { label: 'Home', route: '/', fragment: null },
    { label: 'Tour Packages', route: '/tour-packages', fragment: null },
    { label: 'Explore Regions', route: '/explore-by-region', fragment: null },
    { label: 'About', route: '/about', fragment: null },
    { label: 'Contact', route: '/contact', fragment: null }
  ];

  constructor(private router: Router, private layoutService: LayoutService) {
    // Ensure mobile menu starts closed
    this.mobileMenuOpen = false;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnInit() {
    // Ensure mobile menu is closed on initialization
    this.mobileMenuOpen = false;
    
    // Close mobile menu on route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.mobileMenuOpen = false;
      });

    // Components are already being preloaded via PreloadAllModules in app.config.ts
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  preloadRoute(route: string) {
    // Simple hover preloading - just trigger the import
    if (!this.preloadedRoutes.has(route)) {
      this.preloadedRoutes.add(route);
      
      // Trigger component preloading based on route
      switch(route) {
        case '/tour-packages':
          import('../../pages/tour-packages/tour-packages.component');
          break;
        case '/explore-by-region':
          import('../../pages/explore-by-region/explore-by-region.component');
          break;
        case '/about':
          import('../../pages/about/about.component');
          break;
        case '/contact':
          import('../../pages/contact/contact.component');
          break;
      }
    }
  }

  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  navigateHome() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => this.layoutService.scrollToTopInstant(), 100);
    });
    this.closeMobileMenu();
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      // Wait for the page to load, then scroll to the contact form
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        } else {
          // Fallback to top if form not found
          this.layoutService.scrollToTopInstant();
        }
      }, 300);
    });
    this.closeMobileMenu();
  }

  toggleDarkMode() {
    this.darkModeToggle.emit();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    console.log('Mobile menu toggled:', this.mobileMenuOpen);
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    console.log('Mobile menu closed');
  }
}
