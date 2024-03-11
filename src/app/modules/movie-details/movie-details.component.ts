import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { PosterComponent } from '../../shared/components/poster/poster.component';
import { StarsComponent } from '../../shared/components/stars/stars.component';
import { MovieDetailsTabsComponent } from './components/movie-details-tabs/movie-details-tabs.component';
import { NgIf } from '@angular/common';
import { ProfileCustomizationTabComponent } from '../profile/components/profile-customization-tab/profile-customization-tab.component';
import { ProfileSecurityTabComponent } from '../profile/components/profile-security-tab/profile-security-tab.component';
import { ProfileTabsComponent } from '../profile/components/profile-tabs/profile-tabs.component';
import { MovieDetailsCastTabsComponent } from './components/movie-details-cast-tabs/movie-details-cast-tabs.component';
import { MovieDetailsCrewTabsComponent } from './components/movie-details-crew-tabs/movie-details-crew-tabs.component';
import { MovieDetailsRatingComponent } from './components/movie-details-rating/movie-details-rating.component';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    imports: [BackdropComponent, PosterComponent, StarsComponent, MovieDetailsTabsComponent, NgIf, ProfileCustomizationTabComponent, ProfileSecurityTabComponent, ProfileTabsComponent, MovieDetailsCastTabsComponent, MovieDetailsCrewTabsComponent, MovieDetailsRatingComponent],
    templateUrl: './movie-details.component.html',
    styles: ``
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    @Input() currentMovie: any;

    public genres: { id: number; name: string }[] = [];

    public activeTab: string = 'cast';

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tmdbService: TmdbService
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                switchMap((params) => {
                    const movieId = Number(params['id']);
                    return this.tmdbService.getMovieDetails(movieId);
                })
            )
            .subscribe(
                (data) => {
                    this.currentMovie = data;
                    // Ci gît un console.log ... (console.log('Current Movie:', this.currentMovie);)
                    this.genres = this.currentMovie.genres;
                },
                (error) => {
                    console.error('Error:', error);
                }
            );

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                const movieId = this.extractMovieIdFromRoute();
                if (movieId) {
                    this.tmdbService.getMovieDetails(movieId).subscribe(
                        (data) => {
                            this.currentMovie = data;
                            // Ci gît un console.log ... (console.log('Current Movie (Route Change):', this.currentMovie);)
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

    selectTab(tab: string) {
        this.activeTab = tab;
    }
}
