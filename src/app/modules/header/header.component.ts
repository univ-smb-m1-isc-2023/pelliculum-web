import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HeaderSearchComponent} from "./header-search/header-search.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderSignComponent,
    HeaderSearchComponent,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

}
