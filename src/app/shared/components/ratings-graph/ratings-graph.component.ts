import { Component, Input, SimpleChanges } from '@angular/core';
import { NgForOf } from '@angular/common';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'app-ratings-graph',
  standalone: true,
  imports: [
    NgForOf,
    StarsComponent,
  ],
  templateUrl: './ratings-graph.component.html'
})
export class RatingsGraphComponent {
  @Input() reviews: any[] = []

  protected ratings: number[] = []
  protected highestRating : number = 0
  protected height = 50
  protected totalRating : number = 0

  constructor() {}


  ngOnInit() {


  }

  ngOnChanges(changes : SimpleChanges) {
    if (changes['reviews']) {

      this.ratings = new Array(11).fill(0);

      for (let rating of this.reviews) {
        let index = rating.rating * 2;
        this.ratings[index] = this.ratings[index] ? this.ratings[index] + 1 : 1;
      }

      this.highestRating = Math.max(...this.ratings)
      this.totalRating = this.ratings.reduce((a, b) => a + b, 0)
    }

  }

  getHeight(nombre: number): string {
    const hauteur = (nombre / this.highestRating) * this.height;
    return `${hauteur}px`;
  }

  getPercentage(nombre: number): string {
    return '(' + ((nombre / this.totalRating) * 100).toFixed(1) + '%)';
  }


}
