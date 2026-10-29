import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ModuleGuard } from 'app/common/guards/module.guard';
import { ModuleCode } from 'app/common/models/app-access';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'employee',
    canActivate: [ModuleGuard],
    data: { moduleCode: ModuleCode.Employees },
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],

})
export class AdminModule { }
