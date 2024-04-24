import { Component, Input } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-profiles-films',
    standalone: true,
    imports: [PosterComponent, StarsComponent, NgIf],
    templateUrl: './profiles-films.component.html'
})
export class ProfilesFilmsComponent {
    @Input() reviews: any[] = [];
}
