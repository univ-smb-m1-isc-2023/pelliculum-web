import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-input-custom',
    standalone: true,
    imports: [],
    templateUrl: './input-custom.component.html',
    styles: []
})
export class InputCustomComponent {
    constructor() {}

    @Input() value: string | undefined;

    @Input() size: string | undefined;

    @Input() type: string = '';
}
