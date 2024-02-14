import { Component, Input } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';

@Component({
  selector: 'app-home-movie-rating',
  standalone: true,
  imports: [
    StarsComponent,
  ],
  templateUrl: './home-movie-rating.component.html'
})
export class HomeMovieRatingComponent {

  @Input() rating: any;

  constructor() { }

}
