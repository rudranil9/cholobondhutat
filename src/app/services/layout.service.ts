import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();
  
  // Theme transition animation state
  private themeTransitionActiveSubject = new BehaviorSubject<boolean>(false);
  public themeTransitionActive$ = this.themeTransitionActiveSubject.asObservable();
  
  // Theme transition animation direction
  private themeTransitionClass: 'to-night' | 'to-day' = 'to-night';

  constructor() {
    // Check for saved dark mode preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.darkModeSubject.next(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkModeSubject.next(prefersDark);
    }

    // Apply initial theme
    this.applyTheme(this.darkModeSubject.value);
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    this.applyTheme(newValue);
  }
  
  // Method to toggle theme with animation
  toggleThemeWithAnimation(): void {
    // Set animation direction for city transition
    this.themeTransitionClass = this.isDarkMode ? 'to-day' : 'to-night';
    
    // Activate transition animation
    this.themeTransitionActiveSubject.next(true);
    
    // Wait for the animation to reach the midpoint before changing theme
    setTimeout(() => {
      this.toggleDarkMode();
      
      // Animation complete, deactivate after full animation duration
      setTimeout(() => {
        this.themeTransitionActiveSubject.next(false);
      }, 3000); // Wait for remaining 3 seconds of animation
    }, 3000); // Change theme at 50% mark (3 seconds into 6-second animation)
  }
  
  // Get the current animation direction class
  get animationClass(): 'to-night' | 'to-day' {
    return this.themeTransitionClass;
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  scrollToTopInstant(): void {
    if (typeof window !== 'undefined') {
      // Use multiple methods to ensure scroll to top works
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
