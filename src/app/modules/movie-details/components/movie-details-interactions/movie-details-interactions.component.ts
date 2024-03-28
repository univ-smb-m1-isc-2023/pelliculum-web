import { Component, Input } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RatingsGraphComponent } from '../../../../shared/components/ratings-graph/ratings-graph.component';

@Component({
    selector: 'app-movie-details-interactions',
    standalone: true,
    imports: [StarsComponent, TablerIconsModule, RatingsGraphComponent],
    templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent {
    @Input() reviews: any[] = [];
}
