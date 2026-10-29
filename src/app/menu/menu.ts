import { CoreMenu } from '@core/types'
import { ModuleCode } from 'app/common/models/app-access'

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
    moduleCode: ModuleCode.Dashboard,
    url: 'application/dashboard-overview'
  },
  {
    id: 'employees',
    title: 'Employees',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'users',
    moduleCode: ModuleCode.Employees,
    url: 'admin/employee'
  },
  {
    id: 'organization',
    title: 'Organization',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'git-branch',
    moduleCode: ModuleCode.Organization,
    url: 'application/organization'
  },
  {
    id: 'attendance-payroll',
    title: 'Attendance & Payroll',
    type: 'collapsible',
    role: ['ForIncubation'],
    icon: 'calendar',
    moduleCode: ModuleCode.AttendanceAndPayroll,
    children: [
      {
        id: 'payroll-approval-group',
        title: 'Payroll Approval',
        type: 'collapsible',
        role: ['ForIncubation'],
        icon: 'check-square',
        moduleCode: ModuleCode.PayrollApproval,
        children: [
          {
            id: 'payroll-approval',
            title: 'Payroll Summary',
            type: 'item',
            role: ['ForIncubation'],
            icon: 'circle',
            moduleCode: ModuleCode.PayrollSummary,
            url: 'application/attendance-payroll/payroll-summary-approval'
          },
          {
            id: 'payroll-allocation-approval',
            title: 'Payroll Allocation',
            type: 'item',
            role: ['ForIncubation'],
            icon: 'circle',
            moduleCode: ModuleCode.PayrollAllocation,
            url: 'application/attendance-payroll/payroll-allocation-approval'
          }
        ]
      }
    ]
  },
  {
    id: 'performance-management',
    title: 'Performance Management',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'trending-up',
    moduleCode: ModuleCode.PerformanceManagement,
    url: 'application/performance-management'
  },
  {
    id: 'learning-management',
    title: 'Learning Management',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'book-open',
    moduleCode: ModuleCode.LearningManagement,
    url: 'application/learning-management'
  },
  {
    id: 'hr-policies',
    title: 'HR Policies',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'file-text',
    moduleCode: ModuleCode.HrPolicies,
    url: 'application/hr-policies'
  },
  {
    id: 'reports',
    title: 'Reports',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'pie-chart',
    moduleCode: ModuleCode.Reports,
    url: 'application/report'
  },
  {
    id: 'archives',
    title: 'Archives',
    type: 'item',
    role: ['ForIncubation'],
    icon: 'archive',
    moduleCode: ModuleCode.Archives,
    url: 'application/archives'
  },
]
