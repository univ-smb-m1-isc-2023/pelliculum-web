import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-backdrop',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './backdrop.component.html',
  styles: ``
})
export class BackdropComponent {

  @Input() backdropPath: string | undefined;

  constructor() { }

  getBackdropUrl(): string {
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${this.backdropPath}`;
  }

}
