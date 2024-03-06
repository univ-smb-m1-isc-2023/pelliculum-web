import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { NgClass } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [PosterComponent, NgClass],
    templateUrl: './carousel.component.html',
    styles: ``
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
    @Input() movies: any[] = [];
    @Output() movieSelected: any = new EventEmitter<any>();

    indexMovie: number = 0;
    currentPosition: number = 0;
    intervalId: number | undefined = undefined;

    posterWidth: number = 130; // La largeur réelle de vos posters
    spaceBetweenPosters: number = 48; // Espace entre les posters (space-x-12 correspond à 3rem soit environ 48px)
    readonly numberOfVisiblePosters: number = 7;
    readonly shiftInterval: number = 8000; // 4 secondes

    constructor(private responsive: BreakpointObserver) {}

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') this.navigate('next');
        else if (event.key === 'ArrowLeft') this.navigate('prev');
    }

    ngOnInit(): void {
        this.startCarousel();
        this.observeBreakpoints();
    }

    observeBreakpoints(): void {
        this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe((result) => {
            if (result.matches) {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    this.updateCarouselSize(60, 16); // Exemple pour xs
                } else if (result.breakpoints[Breakpoints.Small]) {
                    this.updateCarouselSize(75, 24); // Exemple pour sm
                } else if (result.breakpoints[Breakpoints.Medium]) {
                    this.updateCarouselSize(110, 32); // Exemple pour md
                } else if (result.breakpoints[Breakpoints.Large]) {
                    this.updateCarouselSize(120, 40); // Exemple pour lg
                } else if (result.breakpoints[Breakpoints.XLarge]) {
                    this.updateCarouselSize(130, 48); // Exemple pour xl
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['movies']) {
            console.log(this.movies.length);
        }
    }

    startCarousel(): void {
        this.intervalId = setInterval(() => {
            this.indexMovie++;
            this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
            this.movies.push(this.movies[this.indexMovie - 1]);
            // Réinitialisez la position si nous avons atteint la fin des posters visibles
            if (this.indexMovie === this.movies.length) {
                this.currentPosition = 0;
                this.indexMovie = 0;
            }
        }, this.shiftInterval);
    }

    goToMovie(i: number): void {
        for (let j = 0; j < i - this.indexMovie; j++) {
            this.movies.push(this.movies[this.indexMovie + j]);
        }
        this.movieSelected.emit(this.movies[i]);
        this.indexMovie = i;
        this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
    }

    navigate(direction: 'prev' | 'next'): void {
        if (direction === 'next') {
            this.indexMovie++;
            if (this.indexMovie >= this.movies.length) {
                this.indexMovie = 0; // Réinitialisation pour un défilement circulaire
            }
        } else if (direction === 'prev') {
            this.indexMovie--;
            if (this.indexMovie < 0) {
                this.indexMovie = this.movies.length - 1; // Réinitialisation pour un défilement circulaire
            }
        }
        this.movieSelected.emit(this.movies[this.indexMovie]);
        this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
    }

    updateCarouselSize(width: number, spacing: number): void {
        this.posterWidth = width;
        this.spaceBetweenPosters = spacing;
        // N'oubliez pas de réajuster la position actuelle du carrousel pour refléter le nouveau dimensionnement
        this.currentPosition = (this.posterWidth + this.spaceBetweenPosters) * this.indexMovie;
    }
}
