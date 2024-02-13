import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconsModule } from '../../../../core/icons/icons.module';

@Component({
    selector: 'app-header-picture',
    standalone: true,
    imports: [RouterLink, TablerIconsModule, IconsModule],
    templateUrl: './header-picture.component.html',
})
export class HeaderPictureComponent {}
