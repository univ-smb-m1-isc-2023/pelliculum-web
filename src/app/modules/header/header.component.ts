import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { HeaderSignComponent } from './components/header-sign/header-sign.component';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
<<<<<<< HEAD
    imports: [HeaderSignComponent, RouterLink, NgOptimizedImage],
=======
    imports: [HeaderSignComponent, HeaderSearchComponent, FormsModule, NgForOf, NgIf],
>>>>>>> feature/search-movie
    templateUrl: './header.component.html'
})
export class HeaderComponent {}
