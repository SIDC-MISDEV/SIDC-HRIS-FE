import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PayrollApprovalComponent } from './payroll-approval/payroll-approval.component';
import { BASE_PATH as BASE_PATH_PAYROLL, PayrollSummaryService } from 'app/api/sidc-services/payroll';
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
    data: { title: 'Payroll Approval' }
  }
];

@NgModule({
  declarations: [PayrollApprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers: [
    { provide: BASE_PATH_PAYROLL, useValue: environment.apiUrlForPayroll },
    PayrollSummaryService
  ]
})
export class AttendancePayrollModule { }
