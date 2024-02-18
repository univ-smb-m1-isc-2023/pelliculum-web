import { Component } from '@angular/core';
import { HeaderSignComponent } from './components/header-sign/header-sign.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
  imports: [HeaderSignComponent, RouterLink],
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
