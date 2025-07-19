import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { CityTransitionComponent } from '../components/city-transition.component';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NavigationComponent, CityTransitionComponent],
  template: `
    <!-- City Transition Animation -->
    <app-city-transition
      [visible]="showThemeTransition"
      [transitionType]="themeAnimationClass"
      [isDarkMode]="isDarkMode">
    </app-city-transition>

    <div [class]="'min-h-screen transition-colors duration-300 ' + (isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900')">
      <!-- Navigation -->
      <app-navigation 
        [darkMode]="isDarkMode" 
        (darkModeToggle)="toggleDarkMode()">
      </app-navigation>
      
      <!-- Main Content -->
      <main class="pt-16">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer [class]="'py-12 mt-16 ' + (isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-900 text-white')">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Company Info -->
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <img 
                    src="/assets/destinations/cholobondhu-logo.jpg" 
                    alt="Cholo Bondhu Logo" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <span class="text-xl font-bold">Cholo Bondhu</span>
              </div>
              <p class="text-gray-400 mb-4 max-w-md">
                Your trusted travel companion for exploring incredible destinations across India and beyond. 
                Creating memories that last a lifetime.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <span class="text-xl">📘</span>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <span class="text-xl">📷</span>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <span class="text-xl">🐦</span>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li><a routerLink="/" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a routerLink="/tour-packages" class="text-gray-400 hover:text-white transition-colors">Tour Packages</a></li>
                <li><a routerLink="/" fragment="about" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a routerLink="/contact" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <!-- Services -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Services</h3>
              <ul class="space-y-2 text-gray-400">
                <li>Custom Tour Planning</li>
                <li>Group Bookings</li>
                <li>Adventure Tours</li>
                <li>Cultural Experiences</li>
                <li>Family Packages</li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Contact Info</h3>
              <ul class="space-y-2 text-gray-400">
                <li class="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91 81002 82665</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>info&#64;cholobondhu.com</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Bagnan, Howrah 711303</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cholo Bondhu Tour & Travels. All rights reserved.</p>
            <p class="mt-2 text-sm">Made with ❤️ for travelers by travelers</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  showThemeTransition = false;
  themeAnimationClass: 'to-night' | 'to-day' = 'to-night';
  private destroy$ = new Subject<void>();

  constructor(private layoutService: LayoutService, private router: Router) {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on every navigation
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTo(0, 0);
          document.body.scrollTo(0, 0);
        });
      });
  }

  ngAfterViewInit() {
    // Ensure scroll position after view initialization
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    this.layoutService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark: boolean) => {
        this.isDarkMode = isDark;
      });

    // Subscribe to theme transition animation state
    this.layoutService.themeTransitionActive$
      .pipe(takeUntil(this.destroy$))
      .subscribe((active: boolean) => {
        this.showThemeTransition = active;
        if (active) {
          this.themeAnimationClass = this.layoutService.animationClass;
        }
      });

    // Listen to router events and scroll to top on navigation
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // Scroll to top immediately when navigation completes
        this.layoutService.scrollToTopInstant();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDarkMode(): void {
    this.layoutService.toggleThemeWithAnimation();
  }
}
