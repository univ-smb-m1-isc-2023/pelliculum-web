import { Component, Input, OnInit } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { StarsHoverableComponent } from '../../../../shared/components/stars-hoverable/stars-hoverable.component';
import { UserService } from '../../../../core/services/user.service';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
    selector: 'app-movie-details-rating',
    standalone: true,
    imports: [StarsComponent, StarsHoverableComponent, FormsModule, TablerIconsModule],
    templateUrl: './movie-details-rating.component.html',
    styleUrls: ['./movie-details-rating.sass']
})
export class MovieDetailsRatingComponent implements OnInit{
    @Input() id: number = 0;

    protected reviews: any[] = [];
    protected reviewed: boolean = false;
    protected userReview: any = {};
    protected comment : string = '';
    protected spoiler : boolean = false;

    profilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';

    constructor(protected user: UserService,
                protected tmdbService : TmdbService,
                protected userService : UserService) {}

    ngOnInit(): void {
        if (!this.user.isLoggedIn()) return;
        this.profilePicture = `http://localhost:8080/profilePictures/${this.user.getUsername()}.jpeg`;
        this.getReviews()
    }

    private getReviews(): void {
        this.tmdbService.getReviews(this.id).then(r => {
            this.reviews = r.data.map((review: any) => {
                return {
                    ...review,
                    showSpoiler : false,
                    profilePicture: `http://localhost:8080/profilePictures/${review.author}.jpeg`,
                    timeElapsed: this.getTimeElapsed(review.createdAt)
                };
            });

            const username = this.user.getUsername();
            const userReviewFound = this.reviews.find(review => review.user.username === username);
            if (userReviewFound) { // si trouvé on update les variables lié a l'input
                this.reviewed = true;
                this.userReview = userReviewFound;
                this.spoiler = this.userReview.spoiler;
            } else {
                this.reviewed = false;
                this.userReview = null;
            }
        });
    }

    private getTimeElapsed(dateString: string): string {
        const previousDate = new Date(dateString);
        const currentDate = new Date();
        const elapsed = currentDate.getTime() - previousDate.getTime();

        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
            return `il y a ${seconds} secondes`;
        } else if (minutes < 60) {
            return `il y a ${minutes} minutes`;
        } else if (hours < 24) {
            return `il y a ${hours} heures`;
        } else if (days < 7) {
            return `il y a ${days} jours`;
        } else if (weeks < 4) {
            return `il y a ${weeks} semaines`;
        } else if (months < 12) {
            return `il y a ${months} mois`;
        } else {
            return `il y a ${years} ans`;
        }
    }

    protected postReview(): void {
        this.userService.postReview(this.comment, this.id, 4.5, this.spoiler).then(r => {
            this.reviews.push(r.data)
            this.reviewed = true;
        })
    }

    protected updateReview(): void {
        console.log(this.spoiler)
        this.userService.updateReview(this.userReview.id, this.comment, 4.5, this.spoiler).then(r => {
            const index = this.reviews.findIndex(review => review.id === this.userReview.id);
            this.reviews[index].comment = r.data.comment;
            this.reviews[index].rating = r.data.rating;
            this.reviews[index].spoiler = r.data.spoiler;
            console.log(r.data.spoiler)
        });
    }

    protected deleteReview(): void {
        this.userService.deleteReview(this.userReview.id).then(() => {
            const index = this.reviews.findIndex(review => review.id === this.userReview.id);
            this.reviews.splice(index, 1);
            this.reviewed = false;
            this.userReview = null;
        });
    }

    protected toggleSpoiler(): void {
        this.spoiler = !this.spoiler;
    }

    protected toggleShowSpoiler(review: any): void {
        review.showSpoiler = !review.showSpoiler;
    }

}
