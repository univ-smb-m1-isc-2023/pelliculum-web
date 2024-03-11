import { Component, Input } from '@angular/core';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { RouterLink } from '@angular/router';
import { PosterComponent } from '../poster/poster.component';
import { slugify } from '../../../core/utils/utilities.utils';

@Component({
    selector: 'app-movie-list',
    standalone: true,
  imports: [BackdropComponent, RouterLink, PosterComponent],
    templateUrl: './movie-list.component.html'
})
export class MovieListComponent {

    @Input() list: any;

  protected readonly slugify = slugify;
}
