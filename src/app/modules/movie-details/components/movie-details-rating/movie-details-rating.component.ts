import { Component, Input, OnInit } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { StarsHoverableComponent } from '../../../../shared/components/stars-hoverable/stars-hoverable.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-movie-details-rating',
    standalone: true,
    imports: [StarsComponent, StarsHoverableComponent],
    templateUrl: './movie-details-rating.component.html',
    styleUrls: ['./movie-details-rating.sass']
})
export class MovieDetailsRatingComponent implements OnInit{
    @Input() id: number = 0;
    @Input() ratings: any[] = this.generateRandomRatings(5);

    profilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';

    constructor(protected user: UserService) {}

    ngOnInit(): void {
        if (!this.user.isLoggedIn()) return;
        this.profilePicture = `http://localhost:8080/profilePictures/${this.user.getUsername()}.jpeg`;
    }

    generateRandomRatings(count: number): any[] {
        const randomRatings = [];

        for (let i = 0; i < count; i++) {
            randomRatings.push({
                user: `User ${i + 1}`,
                year: 2024,
                stars: 5,
                value: Math.floor(Math.random() * 10) + 1,
                comment: 'Random comment',
                likes: Math.floor(Math.random() * 20),
                comments: Math.floor(Math.random() * 10)
            });
        }

        return randomRatings;
    }
}
