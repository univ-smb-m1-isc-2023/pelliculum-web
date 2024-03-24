import { Component } from '@angular/core';
import { StarsHoverableComponent } from '../../shared/components/stars-hoverable/stars-hoverable.component';

@Component({
    selector: 'app-footer',
    standalone: true,
  imports: [
    StarsHoverableComponent,
  ],
    templateUrl: './footer.component.html'
})
export class FooterComponent {}
