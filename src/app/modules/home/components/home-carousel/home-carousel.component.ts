import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HomeCarouselBackdropComponent } from './home-carousel-backdrop/home-carousel-backdrop.component';
import { HomeCarouselPostersComponent } from './home-carousel-posters/home-carousel-posters.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [
    HomeCarouselBackdropComponent,
    HomeCarouselPostersComponent,
    NgIf,
  ],
  templateUrl: './home-carousel.component.html',
})
export class HomeCarouselComponent implements OnChanges, OnDestroy {

  @Input() movies: any[] = [];
  movieSelected: any = null;
  indexMovie: number = 1;

  private carousel: number = 0;

  constructor() {
  }

  private startCarousel() {
    this.movieSelected = this.movies[0];
    this.movies = [this.movies[this.movies.length - 1], ...this.movies];
    this.carousel = setInterval(() => this.navigateToMovie(this.indexMovie+1), 8000);
  }

  private navigateToMovie(index: number): void {
    const difference: number = index - this.indexMovie;
    this.indexMovie = index;                                                                                     
    this.movieSelected = this.movies[index];

  }

  private navigate(direction: 'prev' | 'next'): void {
    this.navigateToMovie(direction === 'next' ? this.indexMovie + 1 : this.indexMovie - 1);
  }

  public onSelectMovie(movie: any){
    this.navigateToMovie(this.movies.indexOf(movie));
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.navigate('next');
    else if (event.key === 'ArrowLeft') this.navigate('prev');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && this.movies.length > 0) this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.carousel);
  }


}
