import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeesInformationComponent } from './employees-information/employees-information.component';
import { EmployeeRecordsComponent } from './employees-information/employee-records/employee-records.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'employees-information',
    component: EmployeesInformationComponent
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    ChangePasswordComponent,
    EmployeeRecordsComponent,
  ],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class UsersModule { }
