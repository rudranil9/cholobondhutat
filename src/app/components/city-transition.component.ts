import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-transition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-transition.component.html',
  styleUrls: ['./city-transition.component.css']
})
export class CityTransitionComponent {
  @Input() visible: boolean = false;
  @Input() transitionType: 'to-night' | 'to-day' = 'to-night';
  @Input() isDarkMode: boolean = false;
}
