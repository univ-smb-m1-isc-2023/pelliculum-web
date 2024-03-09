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
  protected contacts: any[] = [];
  protected shownContacts: any[] = [];
  protected followers: any[] = [];
  protected follows: any[] = [];
  protected searchQuery: string = '';

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.userService.getFollows().then(r => {
      this.follows = r;
      this.contacts = this.follows;
      this.shownContacts = this.contacts;
    });
    this.userService.getFollowers().then(r => this.followers = r);
  }

  public switchFollowers(): void {
    this.contacts = this.followers;
    this.shownContacts = this.contacts;
  }

  public switchFollows(): void {
    this.contacts = this.follows;
    this.shownContacts = this.contacts;
  }

  public search(): void {
    this.shownContacts = this.contacts.filter(contact => contact.username.includes(this.searchQuery));
  }



  protected addFriend(): void {
    this.userService.addFriend(this.friendName).then(
      r => {
        this.notyf.success(r);
      },
    ).catch(
      r => this.notyf.error(r.response.data),
    );
  }

}
