import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RatingsGraphComponent } from '../../../../shared/components/ratings-graph/ratings-graph.component';
import { StarsHoverableComponent } from '../../../../shared/components/stars-hoverable/stars-hoverable.component';
import { UserService } from '../../../../core/services/user.service';
import { SharedReviewService } from '../../../../core/services/shared-review.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-details-interactions',
    standalone: true,
    imports: [StarsComponent, TablerIconsModule, RatingsGraphComponent, StarsHoverableComponent],
    templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent implements OnInit, OnDestroy {
    @Input() reviews: any[] = [];

    protected selectedRating: number = 0;
    private subscription: Subscription = new Subscription();

    constructor(
        protected userService: UserService,
        protected reviewService: SharedReviewService
    ) {}

    handleRatingChange(newRating: number) {
        this.reviewService.selectedRating.next(newRating);
    }

    ngOnInit(): void {
        this.subscription = this.reviewService.selectedRating$.subscribe((rating) => {
            console.log(rating);
            this.selectedRating = rating;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
