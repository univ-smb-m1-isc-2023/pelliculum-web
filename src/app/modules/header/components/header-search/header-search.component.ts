import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {Router, RouterLink} from "@angular/router";
import {TmdbService} from "../../../../core/services/tmdb.service";
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './header-search.component.html'
})
export class HeaderSearchComponent implements OnInit,OnDestroy {
  searchQuery: string = '';
  movies: any;

  private destroy$: Subject<void> = new Subject();


  constructor(private router: Router,private tmdbService: TmdbService, private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
    this.searchQuery = '';
    this.searchService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.searchMovies();
    });
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
    this.searchQuery = '';
    this.searchService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/movie-details', movieId]);
  }
}
