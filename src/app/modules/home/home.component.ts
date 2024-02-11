import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TmdbService} from "../../core/services/tmdb.service";
import {BackdropComponent} from "../../shared/components/backdrop/backdrop.component";
import {BackdropDetailsComponent} from "./components/backdrop-details/backdrop-details.component";
import {PosterComponent} from "../../shared/components/poster/poster.component";
import {CategoriesComponent} from "./components/categories/categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BackdropComponent,
    BackdropDetailsComponent,
    PosterComponent,
    CategoriesComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {

  topMovies: any[] = []
  currentMovie: any = null;
  carousel: any[] = [];

  constructor(private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    this.tmdbService.getTopMovies().subscribe((data: any) => {
      this.topMovies = data.results;
      console.log(this.topMovies);
      this.startCarousel();
    });
  }

  private startCarousel() {
    this.currentMovie = this.topMovies[0];
    this.carousel = this.topMovies.slice(0, 9);
    setInterval(() => {
      const currentIndex = this.topMovies.indexOf(this.currentMovie);
      const nextIndex = currentIndex === this.topMovies.length - 1 ? 0 : currentIndex + 1;
      this.currentMovie = this.topMovies[nextIndex];
      this.carousel = this.topMovies.slice(nextIndex, nextIndex + 9);
    }, 5000);
  }

}
