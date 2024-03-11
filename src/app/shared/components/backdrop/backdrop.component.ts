import { Component, Input } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { IMovie, Movie } from '../../models/movie.model';

@Component({
    selector: 'app-backdrop',
    standalone: true,
    imports: [NgOptimizedImage, NgClass, NgIf],
    templateUrl: './backdrop.component.html',
    styles: ``
})
export class BackdropComponent {

    @Input() public movie?: IMovie;
    @Input() public style?: string;

    constructor() {}

    protected readonly Movie = Movie;
}
