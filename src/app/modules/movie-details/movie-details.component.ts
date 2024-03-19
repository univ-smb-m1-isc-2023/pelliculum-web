import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { PosterComponent } from '../../shared/components/poster/poster.component';
import { StarsComponent } from '../../shared/components/stars/stars.component';
import { NgClass, NgIf } from '@angular/common';
import { ProfileCustomizationTabComponent } from '../profile/components/profile-customization-tab/profile-customization-tab.component';
import { ProfileSecurityTabComponent } from '../profile/components/profile-security-tab/profile-security-tab.component';
import { ProfileTabsComponent } from '../profile/components/profile-tabs/profile-tabs.component';
import { MovieDetailsCastTabsComponent } from './components/movie-details-cast-tabs/movie-details-cast-tabs.component';
import { MovieDetailsCrewTabsComponent } from './components/movie-details-crew-tabs/movie-details-crew-tabs.component';
import { MovieDetailsRatingComponent } from './components/movie-details-rating/movie-details-rating.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TabComponent } from '../../shared/components/tabs/components/tab/tab.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MovieDetailsInteractionsComponent } from './components/movie-details-interactions/movie-details-interactions.component';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    imports: [
        BackdropComponent,
        PosterComponent,
        StarsComponent,
        NgIf,
        NgClass,
        ProfileCustomizationTabComponent,
        ProfileSecurityTabComponent,
        ProfileTabsComponent,
        MovieDetailsCastTabsComponent,
        MovieDetailsCrewTabsComponent,
        MovieDetailsRatingComponent,
        TabsComponent,
        TabComponent,
        TablerIconsModule,
        MovieDetailsInteractionsComponent
    ],
    templateUrl: './movie-details.component.html',
    styles: [
        `
            /* Vos styles ici */
        `
    ]
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    @Input() currentMovie: any;

    protected id: number | null = null;
    protected genres: { id: number; name: string }[] = [];
    protected crew: any[] = [];
    protected cast: any[] = [];
    protected director: string = '';
    protected activeTab: string = 'cast';

    private destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private tmdbService: TmdbService
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params) => {
                    const movieId = Number(params['id']);
                    if (!isNaN(movieId)) {
                        this.id = movieId;
                        return this.loadMovieDetails();
                    }
                    return [];
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private async loadCrew() {
        if (!this.id) return;
        const response = await this.tmdbService.getMovieCredits(this.id);
        this.crew = response.data.crew;
        this.director = this.crew.find((member) => member.job === 'Director')?.name;
    }

    private async loadCast() {
        if (!this.id) return;
        const response = await this.tmdbService.getMovieCredits(this.id);
        this.cast = response.data.cast;
    }

    private async loadMovieDetails() {
        if (!this.id) return;
        await this.tmdbService.getMovieDetails(this.id).then((response) => {
            this.currentMovie = response.data;
            this.genres = this.currentMovie.genres;
        });
        await this.loadCrew();
        await this.loadCast();
    }

    protected selectTab(tab: string) {
        this.activeTab = tab;
    }
}
