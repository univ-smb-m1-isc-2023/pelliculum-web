import {Component, Input} from '@angular/core';
import {BackdropComponent} from "../../../../shared/components/backdrop/backdrop.component";

@Component({
  selector: 'app-backdrop-details',
  standalone: true,
  imports: [
    BackdropComponent
  ],
  templateUrl: './backdrop-details.component.html',
  styles: ``
})
export class BackdropDetailsComponent {

  @Input() movie: any;

  constructor() {
  }

}
