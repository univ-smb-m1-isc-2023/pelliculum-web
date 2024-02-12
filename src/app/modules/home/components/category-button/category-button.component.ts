import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-category-button',
    standalone: true,
    imports: [],
    templateUrl: './category-button.component.html',
    styles: ``
})
export class CategoryButtonComponent {
    @Input() category: string | undefined;
    @Input() icon: string | undefined;

    constructor() {}
}
