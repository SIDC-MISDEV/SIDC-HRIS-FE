import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeDetailsComponent } from './employee-details.component';
import { PimPersonalInfoComponent } from './pim-personal-info/pim-personal-info.component';



@NgModule({
  declarations: [EmployeeDetailsComponent,PimPersonalInfoComponent],
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
