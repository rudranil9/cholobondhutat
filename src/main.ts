import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Prevent any initial scroll behavior
window.history.scrollRestoration = 'manual';

// Force scroll to top immediately and continuously until page is loaded
function forceScrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.pageYOffset !== 0) {
      window.pageYOffset = 0;
    }
  } catch (e) {
    // Fallback if any method fails
    try {
      window.scrollTo(0, 0);
    } catch (fallbackError) {
      console.log('Scroll reset fallback failed:', fallbackError);
    }
  }
}

// Apply immediately
forceScrollToTop();

// Apply on DOM content loaded
document.addEventListener('DOMContentLoaded', forceScrollToTop);

// Apply repeatedly during initial load with higher frequency
const scrollInterval = setInterval(forceScrollToTop, 5); // Every 5ms

// Override any scroll attempts during initial load
const originalScrollTo = window.scrollTo.bind(window);
let allowScrolling = false;

(window as any).scrollTo = function(x: any, y?: any) {
  if (allowScrolling) {
    if (typeof x === 'object') {
      return originalScrollTo(x);
    } else {
      return originalScrollTo(x, y || 0);
    }
  } else {
    // Force to top during initial load
    return originalScrollTo(0, 0);
  }
};

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Stop the aggressive scroll prevention after app is loaded
    setTimeout(() => {
      clearInterval(scrollInterval);
      allowScrolling = true; // Re-enable normal scrolling
      forceScrollToTop(); // One final scroll to top
      // Restore original scrollTo
      window.scrollTo = originalScrollTo;
    }, 1500); // Wait 1.5 seconds for everything to settle
  })
  .catch(err => console.error(err));
