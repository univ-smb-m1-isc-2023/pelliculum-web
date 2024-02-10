
import {Component, OnDestroy} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MovieService} from "../../core/services/movie.service";
import {NgForOf, NgIf} from "@angular/common";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TmdbService} from "../../core/services/tmdb.service";
import {BackdropComponent} from "../../shared/components/backdrop/backdrop.component";
import {BackdropDetailsComponent} from "./components/backdrop-details/backdrop-details.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    NgForOf
    BackdropComponent,
    BackdropDetailsComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnDestroy {
  searchQuery: string = '';
  movies: any;
  private destroy$: Subject<void> = new Subject();
export class HomeComponent implements OnInit {

  topMovies: any[] = []
  currentMovie: any = undefined;

  constructor(private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    this.tmdbService.getTopMovies().subscribe((data: any) => {
      this.topMovies = data.results;
      console.log(this.topMovies);
      this.startCarousel();
    });
  }

  private startCarousel() {
    this.currentMovie = this.topMovies[0];
    setInterval(() => {
      const currentIndex = this.topMovies.indexOf(this.currentMovie);
      const nextIndex = currentIndex === this.topMovies.length - 1 ? 0 : currentIndex + 1;
      this.currentMovie = this.topMovies[nextIndex];
    }, 5000);
  }

  constructor(private movieService: MovieService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchMovies(): void {
    this.movieService.searchMovies(this.searchQuery)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(
        (data) => {
          this.movies = data.results;
          console.log('Movies:', this.movies);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
