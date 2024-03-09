import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genres } from '../../configs/genres.config';
import { slugify } from '../../core/utils/utilities.utils';
import { TmdbService } from '../../core/services/tmdb.service';
import { NgOptimizedImage } from '@angular/common';
import { SearchListMoviesComponent } from '../../shared/components/search-list-movies/search-list-movies.component';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SearchListMoviesComponent,
  ],
  templateUrl: './movies-search.component.html'
})
export class MoviesSearchComponent {

  protected genre?: { id: number; name: string; text: string } | undefined;
  protected movies: any[] = [];

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) {
  }

  async ngOnInit(): Promise<void> {
    const queryGenre: string = this.route.snapshot.paramMap.get('genre') || '';
    this.genre = genres.find((genre) => slugify(genre.name) === queryGenre);
    if (!this.genre) return
    this.movies = await this.tmdbService.getMoviesByGenre(this.genre.id);
  }
}
