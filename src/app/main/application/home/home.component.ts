import { Component, OnInit } from '@angular/core';
import { ModuleCode } from 'app/common/models/app-access';
import { AuthService } from 'app/common/services/auth.service';

interface QuickAccessLink {
  title: string;
  icon: string;
  url: string;
  moduleCode: ModuleCode;
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
    { title: 'Dashboard', icon: 'bar-chart-2', url: '/application/dashboard-overview', moduleCode: ModuleCode.Dashboard },
    { title: 'Employees', icon: 'users', url: '/admin/employee', moduleCode: ModuleCode.Employees },
    { title: 'Organization', icon: 'git-branch', url: '/application/organization', moduleCode: ModuleCode.Organization },
    { title: 'Attendance and Payroll', icon: 'calendar', url: '/application/attendance-payroll', moduleCode: ModuleCode.AttendanceAndPayroll },
    { title: 'Performance Management', icon: 'trending-up', url: '/application/performance-management', moduleCode: ModuleCode.PerformanceManagement },
    { title: 'Learning Management', icon: 'book-open', url: '/application/learning-management', moduleCode: ModuleCode.LearningManagement },
    { title: 'HR Policies', icon: 'file-text', url: '/application/hr-policies', moduleCode: ModuleCode.HrPolicies },
    { title: 'Reports', icon: 'pie-chart', url: '/application/report', moduleCode: ModuleCode.Reports },
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // only the modules the user can view (token response applications), same as the sidebar
    this.quickAccessLinks = this.quickAccessLinks.filter(link => this.authService.hasPermission(link.moduleCode));
  }

}
