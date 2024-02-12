
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {TmdbService} from "../../core/services/tmdb.service";
import {BackdropComponent} from "../../shared/components/backdrop/backdrop.component";
import {BackdropDetailsComponent} from "./components/backdrop-details/backdrop-details.component";
import {PosterComponent} from "../../shared/components/poster/poster.component";
import {CategoriesComponent} from "./components/categories/categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    NgForOf,
    BackdropComponent,
    BackdropDetailsComponent,
    PosterComponent,
    CategoriesComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``
})

export class HomeComponent implements OnInit, OnDestroy {

  topMovies: any[] = []
  currentMovie: any = undefined;
  searchQuery: string = '';
  movies: any;
  currentMovie: any = null;
  carousel: any[] = [];

  private destroy$: Subject<void> = new Subject();


  constructor(private router: Router,private tmdbService: TmdbService) {
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
    this.carousel = [this.topMovies[this.topMovies.length-1], ...this.topMovies];
    setInterval(() => {
      this.currentMovie = this.carousel[this.carousel.indexOf(this.currentMovie) + 1] ?? this.carousel[0];
    },4000)
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchMovies(): void {
    this.tmdbService.searchMovies(this.searchQuery)
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

  redirectToMovieDetails(movieId: number): void {
    this.router.navigate(['/movie-details', movieId]);
  }
}
