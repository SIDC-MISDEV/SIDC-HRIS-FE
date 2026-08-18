import { Component, OnInit } from '@angular/core';

interface QuickAccessLink {
  title: string;
  icon: string;
  url: string;
}

interface HomeCard {
  title: string;
  icon: string;
  headline: string;
  body: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public quickAccessLinks: QuickAccessLink[] = [
    { title: 'Dashboard', icon: 'bar-chart-2', url: '/application/dashboard-overview' },
    { title: 'Employees', icon: 'users', url: '/admin/pim' },
    { title: 'Organization', icon: 'git-branch', url: '/application/organization' },
    { title: 'Attendance and Payroll', icon: 'calendar', url: '/application/attendance-payroll' },
    { title: 'Performance Management', icon: 'trending-up', url: '/application/performance-management' },
    { title: 'Learning Management', icon: 'book-open', url: '/application/learning-management' },
    { title: 'HR Policies', icon: 'file-text', url: '/application/hr-policies' },
    { title: 'Reports', icon: 'pie-chart', url: '/application/report' },
  ];

  public cards: HomeCard[] = [
    {
      title: 'HR Bulletin',
      icon: 'file-text',
      headline: 'Sample bulletin headline',
      body: 'Placeholder summary text for an HR bulletin item goes here.'
    },
    {
      title: 'News and Updates',
      icon: 'bell',
      headline: 'Sample news headline',
      body: 'Placeholder summary text for a news/updates item goes here.'
    },
    {
      title: 'In the Spotlight',
      icon: 'star',
      headline: 'Sample spotlight headline',
      body: 'Placeholder summary text for a spotlight item goes here.'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
