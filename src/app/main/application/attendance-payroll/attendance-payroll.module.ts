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
import { EnterPinModalComponent } from './payroll-pin/enter-pin-modal.component';
import { ChangePinModalComponent } from './payroll-pin/change-pin-modal.component';
import { BASE_PATH as BASE_PATH_PAYROLL, PayrollSummaryService, PayslipService } from 'app/api/sidc-services/payroll';
import { BASE_PATH as BASE_PATH_REPORT_SERVER, ProjectReportTemplateService } from 'app/api/sidc-services/reportserver';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { environment } from 'environments/environment';
import { ModuleGuard } from 'app/common/guards/module.guard';
import { ModuleCode } from 'app/common/models/app-access';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'payroll-summary-approval',
    pathMatch: 'full'
  },
  {
    path: 'payroll-summary-approval',
    component: PayrollApprovalComponent,
    canActivate: [ModuleGuard],
    data: { title: 'Payroll Summary Approval', moduleCode: ModuleCode.PayrollSummary }
  },
  {
    path: 'payroll-summary-approval/:id',
    component: PayrollApprovalDetailsComponent,
    canActivate: [ModuleGuard],
    data: { title: 'Payroll Summary Approval Details', moduleCode: ModuleCode.PayrollSummary }
  },
  {
    path: 'payroll-summary-approval/:id/report',
    component: PayrollApprovalReportComponent,
    canActivate: [ModuleGuard],
    data: { title: 'Payroll Summary Report', moduleCode: ModuleCode.PayrollSummary }
  },
  {
    path: 'payroll-allocation-approval',
    component: PayrollAllocationApprovalComponent,
    canActivate: [ModuleGuard],
    data: { title: 'Payroll Allocation Approval', moduleCode: ModuleCode.PayrollAllocation }
  }
];

@NgModule({
  declarations: [
    PayrollApprovalComponent,
    PayrollApprovalDetailsComponent,
    PayrollApprovalReportComponent,
    PayrollAllocationApprovalComponent,
    EnterPinModalComponent,
    ChangePinModalComponent
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
    PayslipService,
    ProjectReportTemplateService
  ]
})
export class AttendancePayrollModule { }
