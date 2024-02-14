import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {genres} from "../../configs/genres.config";
import axios from "axios";
import {Observable} from "rxjs";
import {Movie, MovieApiResponse} from "../../shared/models/movie.model";

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

  getGenres(ids: number[]) {
    return genres.filter(genre => ids.includes(genre.id));
  }

  getGenre(id: number) {
    return genres.find(genre => genre.id === id);
  }

  async getRandomMovie() {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=fr-FR`;
    const movies = await axios.get(url)
    const randomIndex = Math.floor(Math.random() * movies.data.total_pages);
    const randomMovie = await axios.get(`${url}&page=${randomIndex}`)
    return randomMovie.data.results[Math.floor(Math.random() * randomMovie.data.results.length)];
  }

  getActors(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/2/credits?api_key=${this.apiKey}&language=fr-FR`;
    return this.http.get(url);
  }


}
