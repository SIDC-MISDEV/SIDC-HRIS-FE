import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],

})
export class AdminModule { }
