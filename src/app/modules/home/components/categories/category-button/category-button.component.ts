import { Component, Input, OnInit } from '@angular/core';
import { IconsModule } from '../../../../../core/icons/icons.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterLink } from '@angular/router';
import { slugify } from '../../../../../core/utils/utilities.utils';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [IconsModule, TablerIconsModule, RouterLink],
  templateUrl: './category-button.component.html',
  styles: ``,
})
export class CategoryButtonComponent implements OnInit {
  @Input() genre: { id: number; name: string, text: string, icon: string } | undefined;
  @Input() icon: string | undefined;

  protected url: string | undefined;

  constructor() {
  }

  public ngOnInit(): void {
    this.url = '/films/' + slugify(this.genre?.name || '')
  }
}
