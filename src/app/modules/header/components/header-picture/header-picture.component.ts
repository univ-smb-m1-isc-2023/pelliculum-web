import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconsModule } from '../../../../core/icons/icons.module';
import { AxiosService } from '../../../../core/services/axios.service';

@Component({
    selector: 'app-header-picture',
    standalone: true,
    imports: [RouterLink, TablerIconsModule, IconsModule],
    templateUrl: './header-picture.component.html'
})
export class HeaderPictureComponent implements OnInit{

    profilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';

    constructor(private axiosService: AxiosService) {}

    ngOnInit(): void {
        if(!this.axiosService.isLoggedIn()) return
        this.profilePicture = `http://localhost:8080/profilePictures/${this.axiosService.getUsername()}.jpeg`
    }


}
