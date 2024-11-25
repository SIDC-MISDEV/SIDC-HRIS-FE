import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { AdminGuard } from 'app/common/guards/admin.guard';


import { BASE_PATH as BASE_PATH_REPORT_SERVER } from 'app/api/sidc-services/reportserver';
import { BASE_PATH as BASE_PATH_DW_INVENTORY, GoodsIssuanceService } from 'app/api/sidc-services/dw-inventory';
import { environment } from 'environments/environment';
import { ApiModule as ApiModuleForReportGenerator,
  BASE_PATH as BASE_PATH_DW_REPORTGENERATOR } from 'app/api/sidc-services/report-generator';
import { IdentityService, BASE_PATH as IDENTITY_BASE_PATH } from 'app/api/sidc-services/identity';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    //resolve: { ApplicantDetails: ApplicantDetailsResolver },
    canActivate: [AdminGuard]
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    ApiModuleForReportGenerator
  ],
  providers: [ 
    { provide: BASE_PATH_DW_INVENTORY, useValue: environment.apiUrlForDWInventory },
    { provide: BASE_PATH_REPORT_SERVER, useValue: environment.apiUrlForReportServer },
    { provide: BASE_PATH_DW_REPORTGENERATOR, useValue: environment.apiUrlForReportGenerator },
    {provide: IDENTITY_BASE_PATH, useValue: environment.apiUrlForIdentity},
    IdentityService,
    GoodsIssuanceService,
   ]
})
export class MainModule { }
