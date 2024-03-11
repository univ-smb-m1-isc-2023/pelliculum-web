import { Component, Input } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { IMovie, Movie } from '../../models/movie.model';

@Component({
    selector: 'app-poster',
    standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgOptimizedImage,
  ],
    templateUrl: './poster.component.html',
    styles: ``
})
export class PosterComponent {

    @Input() public movie?: IMovie;
    @Input() public style?: string;
    @Input() public shadow?: boolean;

    protected readonly Movie = Movie;

    constructor() {}

    public onPosterError(event: any): void {
      event.target.src = 'https://dummyimage.com/40x60/eee/aaa.png&text=No+Image';
    }

}
