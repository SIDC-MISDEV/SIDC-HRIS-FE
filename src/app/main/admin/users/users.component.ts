import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public contentHeader: object;
  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Users',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/admin/'
          },
          {
            name: 'Users',
            isLink: false
          }
        ]
      }
    }
  }

}
