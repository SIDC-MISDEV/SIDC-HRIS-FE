import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PayrollApprovalComponent } from './payroll-approval/payroll-approval.component';
import { PayrollApprovalDetailsComponent } from './payroll-approval-details/payroll-approval-details.component';
import { PayrollApprovalReportComponent } from './payroll-approval-report/payroll-approval-report.component';
import { PayrollAllocationApprovalComponent } from './payroll-allocation-approval/payroll-allocation-approval.component';
import { BASE_PATH as BASE_PATH_PAYROLL, PayrollSummaryService } from 'app/api/sidc-services/payroll';
import { BASE_PATH as BASE_PATH_REPORT_SERVER, ProjectReportTemplateService } from 'app/api/sidc-services/reportserver';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { environment } from 'environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'payroll-approval',
    pathMatch: 'full'
  },
  {
    path: 'payroll-approval',
    component: PayrollApprovalComponent,
    data: { title: 'Payroll Summary Approval' }
  },
  {
    path: 'payroll-approval/:id',
    component: PayrollApprovalDetailsComponent,
    data: { title: 'Payroll Summary Approval Details' }
  },
  {
    path: 'payroll-approval/:id/report',
    component: PayrollApprovalReportComponent,
    data: { title: 'Payroll Summary Report' }
  },
  {
    path: 'payroll-allocation-approval',
    component: PayrollAllocationApprovalComponent,
    data: { title: 'Payroll Allocation Approval' }
  }
];

@NgModule({
  declarations: [
    PayrollApprovalComponent,
    PayrollApprovalDetailsComponent,
    PayrollApprovalReportComponent,
    PayrollAllocationApprovalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgbModule,
    TelerikReportingModule
  ],
  providers: [
    { provide: BASE_PATH_PAYROLL, useValue: environment.apiUrlForPayroll },
    { provide: BASE_PATH_REPORT_SERVER, useValue: environment.apiUrlForReportServer },
    PayrollSummaryService,
    ProjectReportTemplateService
  ]
})
export class AttendancePayrollModule { }
