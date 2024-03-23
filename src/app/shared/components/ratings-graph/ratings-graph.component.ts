import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForOf } from '@angular/common';
import { StarsComponent } from '../stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-ratings-graph',
  standalone: true,
  imports: [
    NgForOf,
    StarsComponent,
    TablerIconsModule,
  ],
  templateUrl: './ratings-graph.component.html'
})
export class RatingsGraphComponent implements OnChanges {
  @Input() reviews: any[] = []

  protected ratings: number[] = []
  protected highestRating : number = 0
  protected height = 50
  protected sumRating : number = 0
  protected averageRating : number = 0

  constructor() {}


  ngOnChanges(changes : SimpleChanges) {
    if (changes['reviews']) {

      this.ratings = new Array(11).fill(0);

      for (let rating of this.reviews) {
        let index = rating.rating * 2;
        this.ratings[index] = this.ratings[index] ? this.ratings[index] + 1 : 1;
      }
      this.ratings = [16, 71, 88, 70, 13, 8, 53, 71, 22, 75]

      this.highestRating = Math.max(...this.ratings)
      this.sumRating = this.ratings.reduce((a, b) => a + b, 0)
      this.averageRating = this.sumRating / this.reviews.length
    }

  }

  getHeight(nombre: number): string {
    const hauteur = (nombre / this.highestRating) * this.height;
    return `${hauteur}px`;
  }

  getPercentage(nombre: number): string {
    return '(' + ((nombre / this.sumRating) * 100).toFixed(1) + '%)';
  }


}
