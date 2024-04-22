import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-stars-hoverable',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './stars-hoverable.component.html',
    styleUrls: ['./stars-hoverable.component.sass']
})
export class StarsHoverableComponent {
    protected rating?: number;

    public onRatingChange(rating: number): void {
        this.rating = rating;
    }
}
