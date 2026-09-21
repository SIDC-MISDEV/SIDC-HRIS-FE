import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddEmployeeComponent
  },
  {
    path: 'employee-details',
    loadChildren: () => import('../employee/employee-details/employee-details.module').then(m => m.EmployeeDetailsModule)
  },
  {
    path: '',
    component: EmployeeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule { }
