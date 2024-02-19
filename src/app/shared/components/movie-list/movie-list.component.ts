import { Component, Input } from '@angular/core';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    BackdropComponent,
  ],
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent {

  @Input() list: any;

}
