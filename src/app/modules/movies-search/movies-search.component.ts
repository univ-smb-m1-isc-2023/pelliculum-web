import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genres } from '../../configs/genres.config';
import { slugify } from '../../core/utils/utilities.utils';
import { TmdbService } from '../../core/services/tmdb.service';
import { NgOptimizedImage } from '@angular/common';
import { SearchListMoviesComponent } from '../../shared/components/search-list-movies/search-list-movies.component';
import { Genre, IGenre } from '../../shared/models/genre.model';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { IMovie } from '../../shared/models/movie.model';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SearchListMoviesComponent,
    BackdropComponent,
  ],
  templateUrl: './movies-search.component.html'
})
export class MoviesSearchComponent {

  protected genre?: IGenre;
  protected movies: IMovie[] = [];

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) {
  }

  async ngOnInit(): Promise<void> {
    const queryGenre: string | undefined = this.route.snapshot.paramMap.get('genre') || undefined;
    if(!queryGenre) return;
    this.genre = Genre.fromSlug(queryGenre);
    if (!this.genre) return
    this.movies = await this.tmdbService.getMoviesByGenre(this.genre.id);
  }
}
