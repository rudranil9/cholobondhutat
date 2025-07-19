import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Prevent auto-scroll restoration
window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Force scroll to top immediately after Angular loads
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    console.log('Angular loaded - forced to top');
  })
  .catch(err => console.error(err));
