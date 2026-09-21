import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [EmployeeComponent,AddEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxDatatableModule,
    CoreCommonModule,
    ContentHeaderModule,
    FormsModule,
    NgbModule,
    RouterModule
  ]
})
export class EmployeeModule { }
