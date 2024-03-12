import { Component, Input } from '@angular/core';
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

  @Input() rating: number[] = []
  protected ratings : number[] = []
  protected highestRating : number = 0
  protected height = 50
  protected totalRating : number = 0

  constructor() {}


  ngOnInit() {
    this.ratings = [
      234, 345, 456, 567, 678, 10, 890, 345, 456, 567, 432
    ]
    this.highestRating = Math.max(...this.ratings)
    this.totalRating = this.ratings.reduce((a, b) => a + b, 0)

  }


  getHauteurBarre(nombre: number): string {
    // Calcule la hauteur proportionnelle de la barre en fonction du nombre d'avis.
    const hauteur = (nombre / this.highestRating) * this.height;
    return `${hauteur}px`; // Retourne la hauteur en pixels.
  }

  getPourcentageAvis(nombre: number): string {
    return '(' + ((nombre / this.totalRating) * 100).toFixed(1) + '%)';
  }


}
