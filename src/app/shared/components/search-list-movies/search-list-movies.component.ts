import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PosterComponent } from '../poster/poster.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TmdbService } from '../../../core/services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-list-movies',
  standalone: true,
  imports: [
    FormsModule,
    PosterComponent,
    TablerIconsModule,
    NgClass,
  ],
  templateUrl: './search-list-movies.component.html'
})
export class SearchListMoviesComponent {

  public list: any;
  public movies: any[] = [];
  public moviesCopy: any[] = [];
  public searchTerm: string = '';
  public view: 'grid' | 'list' = 'grid';

  protected isSortingByLikes: boolean = false;
  protected isSortingByDate: boolean = false;


  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.list = this.activatedRoute.snapshot.paramMap.get('id');
    this.tmdbService.getTopMovies().subscribe((data: any) => {
      this.list = {
        likes: this.randomLikes(),
        movies: data.results
      };
      this.movies = this.list.movies;
      this.moviesCopy = [...this.movies];
    });
  }

  /**
   * Change the view of the movies list
   * @param view {string} - The view to change to
   */
  protected changeView(view: 'grid' | 'list'): void {
    if (this.view === view) return;
    this.view = view;
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
    this.movies = this.isSortingByDate ? this.movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()) : [...this.moviesCopy];
  }

  protected sortByLikes(): void {
    this.isSortingByLikes = !this.isSortingByLikes;
    this.movies = this.isSortingByLikes ? this.movies.sort((a, b) => b.vote_count - a.vote_count) : [...this.moviesCopy];
  }

  protected randomLikes(): number {
    return Math.floor(Math.random() * 1000);
  }
}
