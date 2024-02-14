import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getUpcomingMovies() {
        // Check all movie in discover/movie endpoints with query params release_date.gte to today's date
        console.log(new Date().toDateString());
        const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&include_adult=false&language=fr&primary_release_date.gte=${new Date().toISOString().split("T")[0]}`;
        return this.http.get(url);
    }

    getGenres(ids: number[]) {
        return genres.filter((genre) => ids.includes(genre.id));
    }

    getGenre(id: number) {
        return genres.find((genre) => genre.id === id);
    }
}
