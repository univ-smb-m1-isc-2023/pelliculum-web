import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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

  readonly posterWidth: number = 130; // La largeur réelle de vos posters
  readonly spaceBetweenPosters: number = 48; // Espace entre les posters (space-x-12 correspond à 3rem soit environ 48px)
  readonly numberOfVisiblePosters: number = 7;
  readonly shiftInterval: number = 8000; // 4 secondes

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.navigate('next');
    else if (event.key === 'ArrowLeft') this.navigate('prev');
  }


  ngOnInit(): void {
    // Dupliquez les films pour créer une liste circulaire
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startCarousel(): void {
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

  goToMovie(i: number): void {
    this.indexMovie = i;
    this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
  }

  navigate(direction: 'prev' | 'next'): void {
    if (direction === 'next') {
      this.indexMovie++;
      if (this.indexMovie >= this.movies.length) {
        this.indexMovie = 0; // Réinitialisation pour un défilement circulaire
      }
    } else if (direction === 'prev') {
      this.indexMovie--;
      if (this.indexMovie < 0) {
        this.indexMovie = this.movies.length - 1; // Réinitialisation pour un défilement circulaire
      }
    }

    this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
  }

}
