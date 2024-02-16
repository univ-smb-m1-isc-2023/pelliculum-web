import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../core/icons/icons.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
    selector: 'app-category-button',
    standalone: true,
    imports: [IconsModule, TablerIconsModule],
    templateUrl: './category-button.component.html',
    styles: ``
})
export class CategoryButtonComponent {
    @Input() category: string | undefined;
    @Input() icon: string | undefined;

    constructor() {}
}
