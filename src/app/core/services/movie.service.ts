// Objective: Create a service to handle the request to the movie API.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiBaseUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmMxZmRlYTM2ZTk4ZGM0MzdkNDE5ZjQ5NWEzNzY2NiIsInN1YiI6IjY1YjdhZTkxMGNkMzJhMDBlNGU1ZmU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RWsUTqQ00Rc1C7vi3A2KyZPh2mpD38v68IKeIbHylqw';

  constructor(private http: HttpClient) {}

  searchMovies(term: string): Observable<any> {
    if (!term.trim()) {
      // If the search term is empty, return an empty array.
      return of([]);
    }

    const url = `${this.apiBaseUrl}/search/movie?include_adult=true&language=fr-FR&page=1&query=${term}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    return this.http.get(url, { headers }).pipe(
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

