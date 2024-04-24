import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { NgClass, NgIf } from '@angular/common';
import { UsersService } from '../../../../core/services/users.service';

@Component({
    selector: 'app-profile-friends',
    standalone: true,
    imports: [TablerIconsModule, FormsModule, NgClass, NgIf],
    templateUrl: './profile-friends.component.html'
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

    public activeTab: 'follows' | 'followers' = 'follows';
    public marker: HTMLDivElement | undefined;

    constructor(private userService: UserService, protected usersService: UsersService) {}

    public async ngOnInit(): Promise<void> {
        this.initMarker();
        await this.getNetwork();
    }

    public async getNetwork(): Promise<void> {
        const follows = (await this.userService.getFollowsDetails()).data;
        const followers = (await this.userService.getFollowersDetails()).data;
        this.follows = follows;
        this.followers = followers;
        this.contacts = follows;
        this.shownContacts = this.contacts;
        console.log(this.contacts);
    }

    public selectTab(tabName: 'followers' | 'follows'): void {
        this.activeTab = tabName;
    }

    public initMarker(): void {
        this.marker = document.getElementById('markerNetwork') as HTMLDivElement;
        const privateTab: HTMLDialogElement | null = document.getElementById('follows') as HTMLDialogElement;
        privateTab?.click();
    }

    public switchFollowers(): void {
        this.contacts = this.followers;
        this.shownContacts = this.contacts;
        this.selectTab('followers');
    }

    public switchFollows(): void {
        this.contacts = this.follows;
        this.shownContacts = this.contacts;
        this.selectTab('follows');
    }

    public search(): void {
        this.shownContacts = this.contacts.filter((contact) => contact.username.includes(this.searchQuery));
    }

    protected addFollow(username: string): void {
        this.userService
            .addFollow(username)
            .then((r) => {
                console.log(r);
                if (this.follows.filter((f): boolean => f.username === r.data.username).length === 0) {
                    this.follows.push(r.data);
                }
                this.notyf.success(r);
            })
            .catch((r) => this.notyf.error(r.response.data));
    }

    protected removeFollow(username: string): void {
        this.userService
            .removeFollow(username)
            .then((r) => this.notyf.success(r))
            .catch((r) => this.notyf.error(r.response.data));
    }

    protected indicatorTab(e: any): void {
        if (!this.marker || !e) return;
        this.marker.style.left = e.target.offsetLeft + 10 + 'px';
        this.marker.style.width = e.target.offsetWidth - 18 + 'px';
    }
}
