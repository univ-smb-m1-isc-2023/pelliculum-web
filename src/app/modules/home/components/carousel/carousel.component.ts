import { Component, Input } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    PosterComponent,
    NgClass,
  ],
  templateUrl: './carousel.component.html',
  styles: ``
})
export class CarouselComponent {

  @Input() movies: any[] = [];
  indexMovie = 0
  currentPosition = 0;
  intervalId: any;
  readonly posterWidth = 150; // Remplacez par la largeur réelle de vos posters
  readonly shiftInterval = 4000; // 4 secondes

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      // Calculez la nouvelle position
      this.currentPosition += this.posterWidth + 28;
      this.indexMovie ++;
      // Si on arrive à la fin, on recommence
      if (this.currentPosition > this.posterWidth * (this.movies.length - 7)) {
        this.currentPosition = 0;
        this.indexMovie = 0;
      }
    }, this.shiftInterval);
  }

  trackById(index: number, item: any): number {
    return item.id; // Remplacez par la propriété unique de vos objets film
  }

}
