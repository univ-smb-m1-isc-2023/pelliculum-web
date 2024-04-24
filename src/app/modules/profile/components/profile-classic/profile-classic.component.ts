import { Component, Input, OnInit } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { UserService } from '../../../../core/services/user.service';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { NgIf } from '@angular/common';
import { UsersService } from '../../../../core/services/users.service';

@Component({
    selector: 'app-profile-classic',
    standalone: true,
  imports: [PosterComponent, StarsComponent, NgIf],
    templateUrl: './profile-classic.component.html'
})
export class ProfileClassicComponent implements OnInit {
    protected follows: any[] = [];
    @Input() reviews: any[] = [];

    constructor(
        private userService: UserService,
        private tmdbService: TmdbService,
        protected usersService: UsersService,
    ) {}

    public async ngOnInit(): Promise<void> {
        this.follows = (await this.userService.getFollows()).data;
        this.reviews = (await this.userService.getReviews()).data;
        this.reviews.map(async (review: any) => {
            review.movie = (await this.tmdbService.getMovieDetails(review.movieId)).data;
        })
    }
}
