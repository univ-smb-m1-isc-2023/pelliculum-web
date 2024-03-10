import { Component } from '@angular/core';
import { CategoryButtonComponent } from './category-button/category-button.component';
import { genres } from '../../../../configs/genres.config';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CategoryButtonComponent],
    templateUrl: './categories.component.html',
    styles: ``
})
export class CategoriesComponent {
  protected readonly genres = genres;
}
