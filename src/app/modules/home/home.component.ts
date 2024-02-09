import {Component, OnDestroy} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MovieService} from "../../core/services/movie.service";
import {NgForOf, NgIf} from "@angular/common";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnDestroy {
  searchQuery: string = '';
  movies: any;
  private destroy$: Subject<void> = new Subject();

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
