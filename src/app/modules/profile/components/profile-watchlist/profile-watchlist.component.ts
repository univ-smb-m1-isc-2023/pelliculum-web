import { Component, OnInit } from '@angular/core';
import { MoviesSearchComponent } from '../../../movies-search/movies-search.component';
import {
  SearchListMoviesComponent
} from '../../../../shared/components/search-list-movies/search-list-movies.component';
import { UserService } from '../../../../core/services/user.service';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { IMovie } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-profile-watchlist',
  standalone: true,
  imports: [
    MoviesSearchComponent,
    SearchListMoviesComponent,
  ],
  templateUrl: './profile-watchlist.component.html'
})
export class ProfileWatchlistComponent implements OnInit {

  protected watchlist: IMovie[] = [];

  constructor(private user: UserService, private tmdbService: TmdbService) {
  }

  public async ngOnInit(): Promise<void> {
    this.watchlist = await this.user.getWatchlist();
    console.log(this.watchlist);
  }



}
