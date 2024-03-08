import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PosterComponent } from '../poster/poster.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TmdbService } from '../../../core/services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { genres } from '../../../configs/genres.config';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'app-search-list-movies',
  standalone: true,
  imports: [
    FormsModule,
    PosterComponent,
    TablerIconsModule,
    NgClass,
    StarsComponent,
  ],
  templateUrl: './search-list-movies.component.html'
})
export class SearchListMoviesComponent {

  public list: any;
  public movies: any[] = [];
  public moviesCopy: any[] = [];
  public searchTerm: string = '';

  private sortingGenres: number[] = [];

  protected isSortingByLikes: boolean = false;
  protected isSortingByDate: boolean = false;
  protected isSortingByGenre: boolean = false;
  protected isViewGrid: boolean = true;
  protected readonly genres = genres;



  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const result = await this.tmdbService.getTopMovies();
    this.list = {
      likes: this.randomLikes(),
      movies: result
    };
    this.movies = this.list.movies;
    this.moviesCopy = [...this.movies];
  }

  /**
   * Change the view of the movies list
   * @param view {string} - The view to change to
   */
  protected changeView(view: 'grid' | 'list'): void {
    this.isViewGrid = view === 'grid';
  }

  /**
   * Filter movies by title using the search term
   * if the search term is empty, it will show all the movies
   */
  protected filterMovies(): void {
    this.movies = this.searchTerm ? this.moviesCopy.filter((movie) => movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())) : [...this.moviesCopy];
  }

  protected sortByDate(): void {
    this.isSortingByDate = !this.isSortingByDate;
    this.isSortingByLikes = false;
    this.movies = this.isSortingByDate ? this.movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()) : [...this.moviesCopy];
  }

  protected sortByLikes(): void {
    this.isSortingByLikes = !this.isSortingByLikes;
    this.isSortingByDate = false;
    this.movies = this.isSortingByLikes ? this.movies.sort((a, b) => b.vote_count - a.vote_count) : [...this.moviesCopy];
  }

  /**
   * Toggles the inclusion of a genre in the filter criteria and updates the movies list.
   *
   * - If the specified genre is already selected, it is removed from the filter.
   * - If it is not selected, it is added to the filter.
   * The movies list is then filtered to only include movies that match all selected genres.
   *
   * @param {number} genre - The genre ID to be toggled.
   */
  protected sortByGenre(genre: number): void {
    this.sortingGenres = this.sortingGenres.includes(genre) ? this.sortingGenres.filter((g) => g !== genre) : [...this.sortingGenres, genre];
    this.isSortingByGenre = this.sortingGenres.length > 0;
    this.movies = this.moviesCopy.filter(movie => this.sortingGenres.every(genre => movie.genre_ids.includes(genre)));
  }

  protected randomLikes(): number {
    return Math.floor(Math.random() * 1000);
  }
}
