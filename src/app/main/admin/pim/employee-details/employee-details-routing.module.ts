import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: EmployeeDetailsComponent,
    data: {
      title: 'View PIM',
      breadcrumb: 'View'
    }
  },
  {
    path: 'edit/:id',
    component: EmployeeDetailsComponent,
    data: {
      title: 'Edit PIM',
      breadcrumb: 'Edit'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeDetailsRoutingModule { }
