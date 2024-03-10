import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [
    TablerIconsModule,
    FormsModule,
    NgClass,
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

  public activeTab: string = 'follows';
  marker: HTMLDivElement | undefined;


  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getNetwork();
    this.initMarker();
  }

  public getNetwork(): void {
    this.userService.getFollows().then(r => {
      this.follows = r;
      this.contacts = this.follows;
      this.shownContacts = this.contacts;
    });
    this.userService.getFollowers().then(r => this.followers = r);
  }

  public selectTab(tabName: string) {
    this.activeTab = tabName;
  }

  public initMarker(): void {
    this.marker = document.getElementById('markerNetwork') as HTMLDivElement;
    const privateTab: HTMLDialogElement | null = document.getElementById('follows') as HTMLDialogElement;
    privateTab.click();
  }

  indicatorTab(e: any): void {
    console.log(e);
    if (!this.marker || !e) return;
    this.marker.style.left = e.target.offsetLeft + 10 + 'px';
    this.marker.style.width = e.target.offsetWidth -18+ 'px';
  }

  public switchFollowers(): void {
    this.contacts = this.followers;
    this.shownContacts = this.contacts;
    this.selectTab('followers')
  }

  public switchFollows(): void {
    this.contacts = this.follows;
    this.shownContacts = this.contacts;
    this.selectTab('follows')
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
