import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { PosterComponent } from '../../shared/components/poster/poster.component';
import { StarsComponent } from '../../shared/components/stars/stars.component';
import { NgClass, NgIf } from '@angular/common';
import {
  ProfileCustomizationTabComponent,
} from '../profile/components/profile-customization-tab/profile-customization-tab.component';
import { ProfileSecurityTabComponent } from '../profile/components/profile-security-tab/profile-security-tab.component';
import { ProfileTabsComponent } from '../profile/components/profile-tabs/profile-tabs.component';
import { MovieDetailsCastTabsComponent } from './components/movie-details-cast-tabs/movie-details-cast-tabs.component';
import { MovieDetailsCrewTabsComponent } from './components/movie-details-crew-tabs/movie-details-crew-tabs.component';
import { MovieDetailsRatingComponent } from './components/movie-details-rating/movie-details-rating.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TabComponent } from '../../shared/components/tabs/components/tab/tab.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  MovieDetailsInteractionsComponent,
} from './components/movie-details-interactions/movie-details-interactions.component';
import { UserService } from '../../core/services/user.service';

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
    MovieDetailsInteractionsComponent,
  ],
  templateUrl: './movie-details.component.html',
  styles: [`
    /* Vos styles ici */
  `],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() currentMovie: any;

  private id: number | null = null;
  protected genres: { id: number; name: string }[] = [];

  protected crew: any[] = [];
  protected cast: any[] = [];
  protected reviews: any[] = [];

  protected director: string = '';

  protected selectedRating: number = 0;
  protected userReview: any = {};

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, protected user: UserService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const movieId = Number(params['id']);
        if (!isNaN(movieId)) {
          this.id = movieId;
          return this.loadMovieDetails();
        }
        return [];
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRatingChange(ratingValue: number): void {
    this.selectedRating = ratingValue;
  }

  private async loadMovieDetails() {
    if (!this.id) return;
    await this.tmdbService.getMovieDetails(this.id).then(response => {
      this.currentMovie = response.data;
      this.genres = this.currentMovie.genres;
    });
    await this.loadCrew();
    await this.loadCast();
    await this.getReviews();
  }

  private async loadCrew() {
    if (!this.id) return;
    const response = await this.tmdbService.getMovieCredits(this.id);
    this.crew = response.data.crew;
    this.director = this.crew.find(member => member.job === 'Director')?.name;
  }

  private async loadCast() {
    if (!this.id) return;
    const response = await this.tmdbService.getMovieCredits(this.id);
    this.cast = response.data.cast;
  }

  private async getReviews() {
    if (!this.id) return;
    const response = await this.tmdbService.getReviews(this.id);
    console.log(response.data);
    this.reviews = response.data.map((review: any) => {
      return {
        ...review,
        showSpoiler: false,
        profilePicture: `http://localhost:8080/profilePictures/${review.author}.jpeg`,
        timeElapsed: this.getTimeElapsed(review.createdAt),
      };
    });
    this.getCurrentUserReview();
  }

  private getTimeElapsed(dateString: string): string {
    const previousDate = new Date(dateString);
    const currentDate = new Date();
    const elapsed = currentDate.getTime() - previousDate.getTime();

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return `il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    } else if (minutes < 60) {
      return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (hours < 24) {
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (days < 7) {
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (weeks < 4) {
      return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    } else if (months < 12) {
      return `il y a ${months} mois`;
    } else {
      return `il y a ${years} an${years > 1 ? 's' : ''}`;
    }
  }

  protected getCurrentUserReview(): void {
    const username = this.user.getUsername();
    const userReviewFound = this.reviews.find(review => review.user.username === username);
    if (userReviewFound) { // si trouvé on update les variables lié a l'input
      this.userReview = userReviewFound;
      this.selectedRating = this.userReview.rating;
    }
  }
}
