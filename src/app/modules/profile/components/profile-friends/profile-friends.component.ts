import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [
    TablerIconsModule,
    FormsModule,
  ],
  templateUrl: './profile-friends.component.html',
})
export class ProfileFriendsComponent implements OnInit {

  private notyf: Notyf = new Notyf();

  protected friendName: string = '';
  protected friends: any[] = [];

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getFriends().then(r => this.friends = r);
  }

  protected addFriend(): void {
    this.userService.addFriend(this.friendName).then(
      r => this.notyf.success(r.response.data)
    ).catch(
      r => this.notyf.error(r.response.data)
    );
  }

}
