import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./movie-details-rating.sass'],
})
export class MovieDetailsRatingComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  @Input() reviews: any[] = [];
  @Input() selectedRating: number = 0;

  protected reviewed: boolean = false;
  protected userReview: any = {};
  protected comment: string = '';
  protected spoiler: boolean = false;
  protected liked: boolean = false;

  profilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(protected user: UserService,
              protected tmdbService: TmdbService,
              protected userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user.isLoggedIn()) return;
    this.profilePicture = `http://localhost:8080/profilePictures/${this.user.getUsername()}.jpeg`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviews']) {
      this.getCurrentUserReview();

    }
  }

  protected postReview(): void {
    console.log(this.selectedRating);
    this.userService.postReview(this.comment, this.id, this.selectedRating, this.spoiler).then(r => {
      this.reviews.push(r.data);
      this.reviewed = true;
      this.userReview.id = r.data.id;
    });
  }

  protected getCurrentUserReview(): void {
    const username = this.user.getUsername();
    const userReviewFound = this.reviews.find(review => review.user.username === username);
    if (userReviewFound) { // si trouvé on update les variables lié a l'input
      this.reviewed = true;
      this.userReview = userReviewFound;
      this.spoiler = this.userReview.spoiler;
    } else {
      this.reviewed = false;
      this.userReview.comment = '';
    }
  }

  protected updateReview(): void {
    console.log(this.spoiler);
    this.userService.updateReview(this.userReview.id, this.comment, 4.5, this.spoiler).then(r => {
      const index = this.reviews.findIndex(review => review.id === this.userReview.id);
      this.reviews[index].comment = r.data.comment;
      this.reviews[index].rating = r.data.rating;
      this.reviews[index].spoiler = r.data.spoiler;
      console.log(r.data.spoiler);
    });
  }

  protected deleteReview(): void {
    this.userService.deleteReview(this.userReview.id).then(() => {
      const index = this.reviews.findIndex(review => review.id === this.userReview.id);
      this.reviews.splice(index, 1);
      this.reviewed = false;
      this.userReview.comment = '';
    });
  }

  protected addLikeToReview(reviewId: number): void {
    this.userService.addLikeToReview(reviewId, this.user.getUsername()).then(() => {
      const review = this.reviews.find(review => review.id === reviewId);
      if (!this.liked){
        console.log('liked');
        this.liked = true;
        review.likes++;
      }else{
        console.log('unliked');
        this.liked = false;
        review.likes--;
      }
    });

  }

  protected toggleSpoiler(): void {
    this.spoiler = !this.spoiler;
  }

  protected toggleShowSpoiler(review: any): void {
    review.showSpoiler = !review.showSpoiler;
  }

}
