import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PosterComponent } from '../poster/poster.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TmdbService } from '../../../core/services/tmdb.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { genres } from '../../../configs/genres.config';
import { StarsComponent } from '../stars/stars.component';
import { UserService } from '../../../core/services/user.service';
import { IGenre } from '../../models/genre.model';
import { IMovie } from '../../models/movie.model';

@Component({
    selector: 'app-search-list-movies',
    standalone: true,
  imports: [FormsModule, PosterComponent, TablerIconsModule, NgClass, StarsComponent, RouterLink, AsyncPipe],
    templateUrl: './search-list-movies.component.html'
})
export class SearchListMoviesComponent {

    @Input() public style?: string;
    @Input() public movies: any[] = [];
    @Input() public genreSelected?: { id: number; name: string; text: string } = undefined;

    public list: any;
    public moviesCopy: any[] = [];
    public searchTerm: string = '';

    /**
     * The user's watchlist, a copy from the session storage, used to check if a movie is in the watchlist
     */
    protected watchlist: number[] = [];

    protected isSortingByLikes: boolean = false;
    protected isSortingByDate: boolean = false;
    protected isSortingByGenre: boolean = false;
    protected isViewGrid: boolean = true;

    protected readonly genres: IGenre[] = genres;
    private sortingGenres: number[] = [];

    constructor(
        private tmdbService: TmdbService,
        private activatedRoute: ActivatedRoute,
        protected userService: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        const result: IMovie[] = await this.tmdbService.getTopMovies();
        this.watchlist = (await this.userService.get()).watchlist;
        console.log(this.watchlist);
        this.list = {
            likes: this.randomLikes(),
            movies: result
        };
        if (this.movies.length === 0) {
            this.movies = this.list.movies;
        }
        this.movies.map((movie) => {
            movie.vote_average = (movie.vote_average / 2).toFixed(1);
        });
        this.moviesCopy = [...this.movies];
        console.log(this.movies);
    }


    /**
     * Add a movie to the watchlist if it's not already there, remove it if it is
     * @param movie {IMovie} - The movie id
     */
    protected async toggleWatchlist(movie: IMovie): Promise<void> {
        if (this.isWatchlisted(movie?.id)) {
            this.watchlist = this.watchlist.filter((id) => id !== movie?.id);
            await this.userService.removeWatchlist(movie);
        } else {
            this.watchlist = [...this.watchlist, movie?.id];
            await this.userService.addWatchlist(movie);
        }
    }

    protected isWatchlisted(movieId: number): boolean {
        return this.watchlist.includes(movieId);
    }


    protected isGenreSelected(genre: any): boolean {
        return this.genreSelected?.id === genre.id;
    }

    protected changeView(view: 'grid' | 'list'): void {
        this.isViewGrid = view === 'grid';
    }

    protected sortAndFilterMovies(): void {
        let movies = [...this.moviesCopy];
        if (this.isSortingByDate) movies = this.sortByDate(movies);
        if (this.isSortingByLikes) movies = this.sortByLikes(movies);
        if (this.isSortingByGenre) movies = this.sortByGenre(movies);
        if (this.searchTerm) movies = this.searchMovies(movies);
        this.movies = movies;
    }

    protected searchMovies(movies: any[]): any[] {
        return movies.filter((movie) => movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    protected toggleSortByGenre(genre: number): void {
        this.sortingGenres = this.sortingGenres.includes(genre) ? this.sortingGenres.filter((g) => g !== genre) : [...this.sortingGenres, genre];
        this.isSortingByGenre = this.sortingGenres.length > 0;
        this.sortAndFilterMovies();
    }

    protected toggleSortByLikes(): void {
        this.isSortingByLikes = !this.isSortingByLikes;
        this.isSortingByDate = this.isSortingByLikes ? false : this.isSortingByDate;
        this.sortAndFilterMovies();
    }

    protected toggleSortByDate(): void {
        this.isSortingByDate = !this.isSortingByDate;
        this.isSortingByLikes = this.isSortingByDate ? false : this.isSortingByLikes;
        this.sortAndFilterMovies();
    }

    protected randomLikes(): number {
        return Math.floor(Math.random() * 1000);
    }

    private sortByDate(movies: any[]): any[] {
        return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    private sortByLikes(movies: any[]): any[] {
        return movies.sort((a, b) => b.vote_average - a.vote_average);
    }

    private sortByGenre(movies: any[]): any[] {
        return movies.filter((movie) => this.sortingGenres.every((genre) => movie.genre_ids.includes(genre)));
    }
}
