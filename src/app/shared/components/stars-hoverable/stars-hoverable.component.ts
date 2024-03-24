import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stars-hoverable',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './stars-hoverable.component.html',
  styleUrls: ['./stars-hoverable.component.sass']
})
export class StarsHoverableComponent {

  constructor() { }

  rating: number | null = 4.5;

  onRatingChange(ratingValue: number): void {
    this.rating = ratingValue;
    console.log('Étoile cochée :', this.rating);
  }

}
