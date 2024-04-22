import { Component, OnInit } from '@angular/core';
import { ProfileTabsComponent } from './components/profile-tabs/profile-tabs.component';
import {
  ProfileCustomizationTabComponent,
} from './components/profile-customization-tab/profile-customization-tab.component';
import { NgIf } from '@angular/common';
import { TmdbService } from '../../core/services/tmdb.service';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { UserService } from '../../core/services/user.service';
import { ProfileClassicComponent } from './components/profile-classic/profile-classic.component';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TabComponent } from '../../shared/components/tabs/components/tab/tab.component';
import { ProfileWatchlistComponent } from './components/profile-watchlist/profile-watchlist.component';
import { ProfileListsComponent } from './components/profile-lists/profile-lists.component';

@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [ProfileTabsComponent, ProfileCustomizationTabComponent, NgIf, BackdropComponent, ProfileClassicComponent, ProfileFriendsComponent, TabsComponent, TabComponent, ProfileWatchlistComponent, ProfileListsComponent],

  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent implements OnInit {
  activeTab: string = '';
  movie: any;
  reviews: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    protected user: UserService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.movie = (await this.tmdbService.getTopMovies())[0];
    await this.fetchReviews();
  }

  public async fetchReviews() {
    this.reviews = (await this.user.getReviews()).data;
    this.reviews.forEach(review => {
      this.tmdbService.getMovieDetails(review.movieId).then((movie) => {
        review.movie = movie.data;
      });
    });
    console.log(this.reviews);
  }
}
