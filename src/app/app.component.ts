import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
    templateUrl: './app.component.html',
    styles: ``
})
export class AppComponent {
    title = 'Pelliculum';
}
