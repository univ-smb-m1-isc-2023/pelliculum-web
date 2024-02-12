import { Component } from '@angular/core';

@Component({
  selector: 'app-header-notification',
  standalone: true,
  imports: [],
  templateUrl: './header-notification.component.html'
})
export class HeaderNotificationComponent {
  items = [
    { name: 'review', user : 'John Doe', film : 'The Dark Knight', icon: 'fa fa-star' },
    { name: 'comment', user : 'John Doe', film : 'The Dark Knight', icon: 'fa fa-comment' },
  ];

}
