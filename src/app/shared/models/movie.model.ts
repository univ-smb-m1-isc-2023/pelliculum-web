import { genres } from '../../configs/genres.config';
import { Genre } from './genre.model';
import { slugify } from '../../core/utils/utilities.utils';

export class Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    constructor(
        adult: boolean,
        backdrop_path: string,
        genre_ids: number[],
        id: number,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        release_date: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    ) {
        this.adult = adult;
        this.backdrop_path = backdrop_path;
        this.genre_ids = genre_ids;
        this.id = id;
        this.original_language = original_language;
        this.original_title = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.video = video;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }

    public static fromJson(data: any): Movie[] {
        return data.map(
            (movie: any) =>
                new Movie(movie.adult, movie.backdrop_path, movie.genre_ids, movie.id, movie.original_language, movie.original_title, movie.overview, movie.popularity, movie.poster_path, movie.release_date, movie.title, movie.video, movie.vote_average, movie.vote_count)
        );
    }

    /**
     * Get the details page URL
     * @returns {string}
     */
    public getDetailsPageUrl(): string {
        return `/film/${this.id}`;
    }

    /**
     * Slugify the movie title
     * @returns {string}
     */
    public slug(): string {
        return slugify(this.title);
    }

    /**
     * Get the poster URL
     * @returns {string}
     */
    public getPosterUrl(): string {
        return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
    }

    /**
     * Get the backdrop URL
     * @returns {string}
     */
    public getBackdropUrl(): string {
        return `https://image.tmdb.org/t/p/w500${this.backdrop_path}`;
    }

    /**
     * Get the release year
     * @returns {number}
     */
    public getReleaseYear(): number {
        return new Date(this.release_date).getFullYear();
    }

    /**
     *  Get the genres
     *  @returns {Genre[]}
     */
    public getGenres(): Genre[] {
        return genres.filter((genre) => this.genre_ids.includes(genre.id));
    }
}
