import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
    this.userService.getFollows().then(r => this.friends = r);
    this.userService.getFollowers().then(r => console.log('followers' + r));
  }

  protected addFriend(): void {
    this.userService.addFriend(this.friendName).then(
      r => this.notyf.success(r.response.data)
    ).catch(
      r => this.notyf.error(r.response.data)
    );
  }

}
