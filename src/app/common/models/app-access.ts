// Application access returned by the .NET 10 Identity token response (`data.applications`)
export interface AppModule {
  code: string;
  name: string;
  route?: string;
  permissions?: string[];
  children?: AppModule[];
}

export interface UserApplication {
  code: string;
  name: string;
  modules?: AppModule[];
}

export enum ModuleCode {
  Dashboard = 'DASHBOARD',
  Employees = 'EMPLOYEES',
  Organization = 'ORGANIZATION',
  AttendanceAndPayroll = 'ATTENDANCE_AND_PAYROLL',
  PayrollApproval = 'PAYROLL_APPROVAL',
  PayrollSummary = 'PAYROLL_SUMMARY',
  PayrollAllocation = 'PAYROLL_ALLOCATION',
  PerformanceManagement = 'PERFORMANCE_MANAGEMENT',
  LearningManagement = 'LEARNING_MANAGEMENT',
  HrPolicies = 'HR_POLICIES',
  Reports = 'REPORTS',
  Archives = 'ARCHIVES'
}

export enum Permission {
  View = 'view',
  Edit = 'edit'
}
