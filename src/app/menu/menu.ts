import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'home',
    url: 'application/home'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'bar-chart-2',
    url: 'application/dashboard-overview'
  },
  {
    id: 'employees',
    title: 'Employees',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'users',
    url: 'admin/pim'
  },
  {
    id: 'organization',
    title: 'Organization',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'git-branch',
    url: 'application/organization'
  },
  {
    id: 'attendance-payroll',
    title: 'Attendance & Payroll',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'calendar',
    url: 'application/attendance-payroll'
  },
  {
    id: 'performance-management',
    title: 'Performance Management',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'trending-up',
    url: 'application/performance-management'
  },
  {
    id: 'learning-management',
    title: 'Learning Management',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'book-open',
    url: 'application/learning-management'
  },
  {
    id: 'hr-policies',
    title: 'HR Policies',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'file-text',
    url: 'application/hr-policies'
  },
  {
    id: 'reports',
    title: 'Reports',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'pie-chart',
    url: 'application/report'
  },
  {
    id: 'archives',
    title: 'Archives',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'archive',
    url: 'application/archives'
  },
]
