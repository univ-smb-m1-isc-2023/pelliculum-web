import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [
    TablerIconsModule,
    FormsModule,
    NgClass,
    NgIf,
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
  protected hoverState: { [username: string]: boolean } = {};

  public activeTab: string = 'follows';
  marker: HTMLDivElement | undefined;


  constructor(
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.getNetwork();
    this.initMarker();
  }

  public getNetwork(): void {
    this.userService.getFollowsDetails().then(r => {
      this.follows = r;
      this.contacts = this.follows;
      this.shownContacts = this.contacts;
      console.log(r)
    });
    this.userService.getFollowersDetails().then(r => this.followers = r);
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


  protected addFollow(username : string): void {
    this.userService.addFollow(username).then(
      r => {
        this.notyf.success(r);
      },
    ).catch(
      r => this.notyf.error(r.response.data),
    );
  }

  protected removeFollow(username : string): void {
    this.userService.removeFollow(username).then(
      r => {
        this.notyf.success(r);
      },
    ).catch(
      r => this.notyf.error(r.response.data),
    );

  }

}
