import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { genres } from '../../configs/genres.config';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    private apiKey: string = 'efc1fdea36e98dc437d419f495a37666';
    private baseUrl: string = 'https://api.themoviedb.org/3';

    constructor(private http: HttpClient) {}

    getTopMovies() {
        const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr`;
        return this.http.get(url);
    }

    searchMovies(term: string): Observable<any> {
        if (!term.trim()) {
            return of([]);
        }

        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&include_adult=true&language=fr-FR&page=1&query=${term}`;

        return this.http.get(url).pipe(
            tap((data) => {
                if (data) {
                    console.log(`Found movies matching "${term}"`, data);
                } else {
                    console.log(`No movies found matching "${term}"`);
                }
            }),
            catchError(this.handleError('searchMovies', []))
        );
    }

    getMovieDetails(movieId: number): Observable<any> {
        const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=fr`;
        return this.http.get(url);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    getGenres(ids: number[]) {
        return genres.filter((genre) => ids.includes(genre.id));
    }

    getGenre(id: number) {
        return genres.find((genre) => genre.id === id);
    }
}
