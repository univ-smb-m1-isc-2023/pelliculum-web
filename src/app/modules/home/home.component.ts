import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TmdbService} from "../../core/services/tmdb.service";
import {BackdropComponent} from "../../shared/components/backdrop/backdrop.component";
import {BackdropDetailsComponent} from "./components/backdrop-details/backdrop-details.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BackdropComponent,
    BackdropDetailsComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {

  topMovies: any[] = []
  currentMovie: any = undefined;

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
    setInterval(() => {
      const currentIndex = this.topMovies.indexOf(this.currentMovie);
      const nextIndex = currentIndex === this.topMovies.length - 1 ? 0 : currentIndex + 1;
      this.currentMovie = this.topMovies[nextIndex];
    }, 5000);
  }

}
