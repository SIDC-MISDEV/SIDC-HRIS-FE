import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { PIMComponent } from './pim.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddEmployeeComponent
  },
  {
    path: 'employee-details',
    loadChildren: () => import('../pim/employee-details/employee-details.module').then(m => m.EmployeeDetailsModule)
  },
  {
    path: '',
    component: PIMComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PIMRoutingModule { }
