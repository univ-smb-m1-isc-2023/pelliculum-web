import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey: string = "efc1fdea36e98dc437d419f495a37666"
  private baseUrl: string = "https://api.themoviedb.org/3"

  constructor(private http: HttpClient) { }

  getTopMovies() {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr`;
    return this.http.get(url);
  }

}
