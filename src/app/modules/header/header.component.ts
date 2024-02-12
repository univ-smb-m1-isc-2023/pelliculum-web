import { Component } from '@angular/core';
import { HeaderSignComponent } from './header-sign/header-sign.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [HeaderSignComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
