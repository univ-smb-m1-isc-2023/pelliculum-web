import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  styles: ``,
})
export class CarouselComponent implements OnInit, OnDestroy {

  @Input() movies: any[] = [];

  indexMovie: number = 0;
  currentPosition: number = 0;
  intervalId: number | undefined = undefined;

  readonly posterWidth: number = 150; // La largeur réelle de vos posters
  readonly spaceBetweenPosters: number = 48; // Espace entre les posters (space-x-12 correspond à 3rem soit environ 48px)
  readonly numberOfVisiblePosters: number = 7;
  readonly shiftInterval: number = 8000; // 4 secondes

  ngOnInit() {
    // Dupliquez les films pour créer une liste circulaire
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.indexMovie++;
      this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
      console.log(this.movies, this.movies.length, this.indexMovie);
      // Réinitialisez la position si nous avons atteint la fin des posters visibles
      if (this.indexMovie === this.movies.length) {
        this.currentPosition = 0;
        this.indexMovie = 0;
      }
    }, this.shiftInterval);
  }

  goToMovie(i: number) {
    this.indexMovie = i;
    this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
  }

}
