import { Component } from '@angular/core';
import { CategoryButtonComponent } from '../category-button/category-button.component';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CategoryButtonComponent],
    templateUrl: './categories.component.html',
    styles: ``
})
export class CategoriesComponent {}
