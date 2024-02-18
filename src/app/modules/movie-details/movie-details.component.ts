import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {TmdbService} from "../../core/services/tmdb.service";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { PosterComponent } from '../../shared/components/poster/poster.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    BackdropComponent,
    PosterComponent,
  ],
  templateUrl: './movie-details.component.html',
  styles: ``
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() currentMovie: any;

  genres: { id: number; name: string }[] = [];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const movieId = Number(params['id']);
        return this.tmdbService.getMovieDetails(movieId);
      })
    ).subscribe(
      (data) => {
        this.currentMovie = data;
        console.log('Current Movie:', this.currentMovie);
        this.genres = this.currentMovie.genres;
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const movieId = this.extractMovieIdFromRoute();
      if (movieId) {
        this.tmdbService.getMovieDetails(movieId).subscribe(
          (data) => {
            this.currentMovie = data;
            console.log('Current Movie (Route Change):', this.currentMovie);
            this.genres = this.currentMovie.genres;
          },
          (error) => {
            console.error('Error (Route Change):', error);
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private extractMovieIdFromRoute(): number | null {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    return isNaN(movieId) ? null : movieId;
  }
}
