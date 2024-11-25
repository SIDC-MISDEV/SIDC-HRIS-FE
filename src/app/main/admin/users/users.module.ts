import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class UsersModule { }
