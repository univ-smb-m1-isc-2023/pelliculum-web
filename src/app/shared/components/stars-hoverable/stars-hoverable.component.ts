import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stars-hoverable',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './stars-hoverable.component.html',
  styleUrls: ['./stars-hoverable.component.sass']
})
export class StarsHoverableComponent implements OnInit{
  @Input() starSize = 1;
  @Input() rating: number | null = 0;
  @Output() ratingChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.processSize();
  }

  private processSize(){
    const newWidth = 1.39306640625 * this.starSize;
    const newHeight = 1.5 * this.starSize;
    const halfStar = 0.69580078125 * this.starSize;
    const marginValue = -halfStar;

    document.documentElement.style.setProperty('--star-width', `${newWidth}em`);
    document.documentElement.style.setProperty('--star-height', `${newHeight}em`);
    document.documentElement.style.setProperty('--half-star-width', `${halfStar}em`);
    document.documentElement.style.setProperty('--margin-value', `${marginValue}em`);
  }

  protected onRatingChange(ratingValue: number): void {
    this.rating = ratingValue;
    console.log(ratingValue)
    this.ratingChange.emit(ratingValue);
  }

}
