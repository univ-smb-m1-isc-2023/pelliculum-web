import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PosterComponent } from '../poster/poster.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TmdbService } from '../../../core/services/tmdb.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { genres } from '../../../configs/genres.config';
import { StarsComponent } from '../stars/stars.component';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-search-list-movies',
    standalone: true,
    imports: [FormsModule, PosterComponent, TablerIconsModule, NgClass, StarsComponent, RouterLink],
    templateUrl: './search-list-movies.component.html'
})
export class SearchListMoviesComponent {

    @Input() public style?: string;
    @Input() public movies: any[] = [];
    @Input() public genreSelected?: { id: number; name: string; text: string } = undefined;

    public list: any;
    public moviesCopy: any[] = [];
    public searchTerm: string = '';
    protected isSortingByLikes: boolean = false;
    protected isSortingByDate: boolean = false;
    protected isSortingByGenre: boolean = false;
    protected isViewGrid: boolean = true;
    protected readonly genres = genres;
    private sortingGenres: number[] = [];

    constructor(
        private tmdbService: TmdbService,
        private activatedRoute: ActivatedRoute,
        protected userService: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        const result = await this.tmdbService.getTopMovies();
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
