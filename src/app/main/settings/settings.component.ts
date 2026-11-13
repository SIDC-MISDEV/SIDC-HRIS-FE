import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  contentHeader: object;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Settings',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          { name: 'Home', isLink: true, link: '/application/home/' },
          { name: 'Settings', isLink: false }
        ]
      }
    };
  }

  goToChangePassword(): void {
    this.router.navigate(['/admin/users/change-password']);
  }
}