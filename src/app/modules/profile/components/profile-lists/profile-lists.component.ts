import { Component, OnInit } from '@angular/core';
import { MovieListCardComponent } from '../../../../shared/components/movie-list-card/movie-list-card.component';
import { ListsService } from '../../../../core/services/lists.service';
import { IList } from '../../../../shared/models/list.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-profile-lists',
  standalone: true,
  imports: [
    MovieListCardComponent,
  ],
  templateUrl: './profile-lists.component.html'
})
export class ProfileListsComponent implements OnInit {

  protected userLists: IList[] = [];

  constructor(private listService: ListsService, private user: UserService) {}

  public async ngOnInit(): Promise<void> {
    this.userLists = (await this.listService.getUserLists(this.user.getUsername()!, true)).data;
  }

}
