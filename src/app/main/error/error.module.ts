import { NgModule } from '@angular/core';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InternalServerComponent } from './internal-server/internal-server.component';

const routes: Routes = [
  {
    path: 'internal-server',
    component: InternalServerComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  declarations: [
    InternalServerComponent,
    UnauthorizedComponent
  ],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],

})
export class ErrorModule { }
