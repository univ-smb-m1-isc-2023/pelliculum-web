import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { UserService } from '../../../../core/services/user.service';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { AnswerService } from '../../../../core/services/answer.service';
import { FormsModule } from '@angular/forms';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';


@Component({
  selector: 'app-movie-details-rating-answers',
  standalone: true,
  imports: [
    FormsModule,
    StarsComponent,
    TablerIconsModule,
  ],
  templateUrl: './movie-details-rating-answers.component.html',
  styleUrls: ['./movie-details-rating-answers.sass'],

})
export class MovieDetailsRatingAnswersComponent implements OnInit {

  @Input() id: number = 0;
  @Input() answers: any[] = [];

  private notyf = new Notyf();


  protected userAnswer: any = {};
  protected comment: string = '';
  protected spoiler: boolean = false;
  protected selectedAnswerId: number | null = null;


  profilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(protected user: UserService,
              protected tmdbService: TmdbService,
              protected answerService: AnswerService) {
  }

  ngOnInit(): void {
    if (!this.user.isLoggedIn()) return;
    this.profilePicture = `http://localhost:8080/profilePictures/${this.user.getUsername()}.jpeg`;
    this.getAnswers();
  }


  protected getAnswers(): void {
    this.answerService.getAnswers(this.id).then(r => {
      this.answers = r.data.map((answer: any) => {
        return {
          ...answer,
          showSpoiler: false,
          isLiked: answer.likes.includes(this.user.getUsername()),
          showAnswers: false,
          profilePicture: `http://localhost:8080/profilePictures/${answer.user}.jpeg`,
          timeElapsed: this.getTimeElapsed(answer.createdAt),
        };
      });
      this.getCurrentUserAnswer();
      console.log(this.answers);
    });
  }

  protected postAnswer(): void {
    this.answerService.comment = this.comment;
    this.answerService.spoiler = this.spoiler;


    this.answerService.postAnswer(this.id).then(r => {
      const newAnswer = r.data;
      this.answers.push(newAnswer);
      this.answerService.answerId = newAnswer.id;
      this.comment = '';
      this.spoiler = false;
      this.selectedAnswerId = null;
    }).then(() => {
        this.notyf.success('Réponse postée');
    })
  }



  protected getCurrentUserAnswer(): void {
    const username = this.user.getUsername();
    const userAnswerFound = this.answers.find(answer => answer.user.username === username);
    if (userAnswerFound) { // si trouvé on update les variables lié a l'input
      this.userAnswer = userAnswerFound;
      this.spoiler = this.userAnswer.spoiler;
      this.answerService.answerId = userAnswerFound.id;
    } else {
      this.userAnswer.comment = '';
    }
  }

  protected addLikeToAnswer(answerId: number): void {
    const username = this.user.getUsername();
    this.answerService.addLikeToAnswers(answerId, username).then(() => {
      const answer = this.answers.find(answer => answer.id === answerId);
      if (!answer.isLiked) {
        answer.likes.push(this.user.getUsername());
        answer.isLiked = true;
      } else {
        answer.likes = answer.likes.filter((like: any) => like !== this.user.getUsername());
        answer.isLiked = false;
      }
    }).catch(() => {
      this.notyf.error('Erreur lors de l\'ajout du like');
    });

  }

  protected toggleAnswer(answerId: number): void {
    this.selectedAnswerId = this.selectedAnswerId === answerId ? null : answerId;
    if (this.selectedAnswerId !== null) {
      const selectedAnswer = this.answers.find(answer => answer.id === answerId);
      if (selectedAnswer) {
        this.comment = `@${selectedAnswer.user.username}`;
      }
    } else {
      this.comment = '';
    }
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
      return `il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    } else if (minutes < 60) {
      return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (hours < 24) {
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (days < 7) {
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (weeks < 4) {
      return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    } else if (months < 12) {
      return `il y a ${months} mois`;
    } else {
      return `il y a ${years} an${years > 1 ? 's' : ''}`;
    }
  }


}



