import { Component } from '@angular/core';
import { PelliculumLogoComponent } from '../../shared/components/pelliculum-logo/pelliculum-logo.component';
import {
  PelliculumLogoTitleComponent
} from '../../shared/components/pelliculum-logo-title/pelliculum-logo-title.component';

@Component({
    selector: 'app-footer',
    standalone: true,
  imports: [
    PelliculumLogoComponent,
    PelliculumLogoTitleComponent,
  ],
    templateUrl: './footer.component.html'
})
export class FooterComponent {}
