import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HeroComponent } from '../../components/hero/hero.component';
import { TravelCategoriesComponent } from '../../components/travel-categories/travel-categories.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { IndiaMapExplorerComponent } from '../../components/india-map-explorer/india-map-explorer.component';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    TravelCategoriesComponent,
    WhyChooseUsComponent,
    IndiaMapExplorerComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-travel-categories></app-travel-categories>
      <app-why-choose-us></app-why-choose-us>
      <app-india-map-explorer></app-india-map-explorer>
      <app-about-us></app-about-us>
      <app-contact-us></app-contact-us>
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    // Subscribe to layout service if needed for any home-specific logic
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
