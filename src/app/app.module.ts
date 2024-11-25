import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { BASE_PATH } from './api/sidc-services/dw-inventory';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MainModule } from './main/main.module';
import { environment } from 'environments/environment';
import { BlockUIModule } from 'ng-block-ui';
import { AuthService } from './common/services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiInterceptor } from './common/interceptor/api-interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CountriesService } from './common/services/countries.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/application',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BlockUIModule.forRoot({
      message: 'Loading...'
    }),

    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost:4201"],
      },
    }),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    
    // App modules
    LayoutModule,
    MainModule,
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  // ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: BASE_PATH, useValue: environment.apiUrlForDWInventory },
    AuthService,
    //ProjectReportTemplateService,
    CountriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
