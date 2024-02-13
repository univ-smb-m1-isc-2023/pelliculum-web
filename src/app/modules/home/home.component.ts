import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { BackdropDetailsComponent } from './components/backdrop-details/backdrop-details.component';
import { PosterComponent } from '../../shared/components/poster/poster.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, BackdropComponent, BackdropDetailsComponent, PosterComponent, CategoriesComponent, CarouselComponent],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent implements OnInit {
    topMovies: any[] = [];
    currentMovie: any = null;
    carousel: any[] = [];

    constructor(private tmdbService: TmdbService) {}

    ngOnInit(): void {
        this.tmdbService.getTopMovies().subscribe((data: any) => {
            this.topMovies = data.results;
            console.log(this.topMovies);
            this.startCarousel();
        });
    }

    private startCarousel() {
        this.currentMovie = this.topMovies[0];
        this.carousel = [this.topMovies[this.topMovies.length - 1], ...this.topMovies];
        setInterval(() => {
            this.currentMovie = this.carousel[this.carousel.indexOf(this.currentMovie) + 1] ?? this.carousel[0];
        }, 8000);
    }
}
