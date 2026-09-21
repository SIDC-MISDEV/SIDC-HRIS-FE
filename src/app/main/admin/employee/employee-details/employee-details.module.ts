import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeePersonalInfoComponent } from './employee-personal-info/employee-personal-info.component';



@NgModule({
  declarations: [EmployeeDetailsComponent,EmployeePersonalInfoComponent],
  imports: [
      CommonModule,
      CoreCommonModule,
      ContentHeaderModule,
      FormsModule,
      NgbModule,
      RouterModule,
      EmployeeDetailsRoutingModule
    ]
})
export class EmployeeDetailsModule { }
