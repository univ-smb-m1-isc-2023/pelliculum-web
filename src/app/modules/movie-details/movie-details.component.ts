import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { PosterComponent } from '../../shared/components/poster/poster.component';
import { StarsComponent } from '../../shared/components/stars/stars.component';
import { MovieDetailsTabsComponent } from './components/movie-details-tabs/movie-details-tabs.component';
import { NgClass, NgIf } from '@angular/common';
import {
  ProfileCustomizationTabComponent,
} from '../profile/components/profile-customization-tab/profile-customization-tab.component';
import { ProfileSecurityTabComponent } from '../profile/components/profile-security-tab/profile-security-tab.component';
import { ProfileTabsComponent } from '../profile/components/profile-tabs/profile-tabs.component';
import { MovieDetailsCastTabsComponent } from './components/movie-details-cast-tabs/movie-details-cast-tabs.component';
import { MovieDetailsCrewTabsComponent } from './components/movie-details-crew-tabs/movie-details-crew-tabs.component';
import { MovieDetailsRatingComponent } from './components/movie-details-rating/movie-details-rating.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [BackdropComponent, PosterComponent, StarsComponent, MovieDetailsTabsComponent, NgIf, ProfileCustomizationTabComponent, ProfileSecurityTabComponent, ProfileTabsComponent, MovieDetailsCastTabsComponent, MovieDetailsCrewTabsComponent, MovieDetailsRatingComponent, NgClass],
  templateUrl: './movie-details.component.html',
  styles: ``,
})

export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() currentMovie: any;

  public genres: { id: number; name: string }[] = [];

  public crew: any[] = [];
  public id: number | null = null;

  public director : string = '';

  public activeTab: string = 'cast';

  private destroy$: Subject<void> = new Subject();



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.extractMovieIdFromRoute();
    this.loadCrew();


    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.id = Number(params['id']);
          return this.tmdbService.getMovieDetails(this.id);
        }),
      )
      .subscribe(
        (data) => {
          this.currentMovie = data;
          console.log('Current Movie:', this.currentMovie);
          this.genres = this.currentMovie.genres;
        },
        (error) => {
          console.error('Error:', error);
        },
      );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        if (this.id) {
          this.tmdbService.getMovieDetails(this.id).subscribe(
            (data) => {
              this.currentMovie = data;
              console.log('Current Movie (Route Change):', this.currentMovie);
              this.genres = this.currentMovie.genres;
            },
            (error) => {
              console.error('Error (Route Change):', error);
            },
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

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  loadCrew() {
    if (this.id) {
      this.tmdbService.getMovieCredits(this.id).subscribe(
        (response: any) => {
          this.director = response.crew.find((member: { job: string; }) => member.job === 'Director').name;
          console.log(this.director)
          this.crew = response.crew.slice(0, 20);
          console.log('Crew:', this.crew);
        },
        (error: any) => {
          console.error('Error fetching movie credits:', error);
        },
      );
    }
  }
}
