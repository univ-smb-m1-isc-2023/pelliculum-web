import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [
    TablerIconsModule,
    FormsModule,
  ],
  templateUrl: './profile-friends.component.html'
})
export class ProfileFriendsComponent implements OnInit{

  protected friendName: string = '';
  protected friends : any[] = [];
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //this.userService.getFriends().then(r => console.log(r))
  }

  protected addFriend(): void {
    console.log(this.friendName)
    this.userService.addFriend(this.friendName).then(r => console.log(r))
  }

}
