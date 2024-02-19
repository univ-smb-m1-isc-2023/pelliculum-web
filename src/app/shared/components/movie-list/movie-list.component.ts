import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent {

  @Input() list: any;

}
