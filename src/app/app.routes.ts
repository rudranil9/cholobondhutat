import { Routes, ExtraOptions } from '@angular/router';

// Configure router options
export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
  initialNavigation: 'enabledBlocking'
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'tour-packages',
    loadComponent: () => import('./pages/tour-packages/tour-packages.component').then(m => m.TourPackagesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'travel-categories/:categoryName',
    loadComponent: () => import('./pages/travel-categories/travel-categories.component').then(m => m.TravelCategoriesPageComponent)
  },
  {
    path: 'explore-by-region',
    loadComponent: () => import('./pages/explore-by-region/explore-by-region.component').then(m => m.ExploreByRegionComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
