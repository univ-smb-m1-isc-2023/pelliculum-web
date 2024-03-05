import { Component, Input } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';

@Component({
  selector: 'app-movie-details-rating',
  standalone: true,
  imports: [
    StarsComponent,
  ],
  templateUrl: './movie-details-rating.component.html',
})
export class MovieDetailsRatingComponent {
  @Input() id: number = 0;
  @Input() ratings: any[] = this.generateRandomRatings(5);

  generateRandomRatings(count: number): any[] {
    const randomRatings = [];

    for (let i = 0; i < count; i++) {
      randomRatings.push({
        user: `User ${i + 1}`,
        year: 2024,
        stars: 5,
        value: Math.floor(Math.random() * 10) + 1,
        comment: 'Random comment',
        likes: Math.floor(Math.random() * 20),
        comments: Math.floor(Math.random() * 10),
      });
    }

    return randomRatings;
  }
}
