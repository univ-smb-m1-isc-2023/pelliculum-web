import { Component, OnInit } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-profile-classic',
    standalone: true,
    imports: [PosterComponent, StarsComponent],
    templateUrl: './profile-classic.component.html'
})
export class ProfileClassicComponent implements OnInit {

    protected follows: any[] = [];

    constructor(private userService: UserService) {}

    public async ngOnInit(): Promise<void> {
        this.follows = (await this.userService.getFollows()).data
    }
}
