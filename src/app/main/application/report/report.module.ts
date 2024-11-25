import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ReportComponent } from './report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BASE_PATH, ProjectReportTemplateAccessPerUserService, ProjectReportTemplateService } from 'app/api/sidc-services/reportserver';
import { environment } from 'environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  },
  {
    path: ':id',
    component: ReportViewerComponent,
    data: {
      title: 'View Report',
      breadcrumb: 'View',
    }
  },
]

@NgModule({
  declarations: [
    ReportComponent,
    ReportViewerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgApexchartsModule,
    TelerikReportingModule,
    NgbModule,
    NgxDatatableModule
  ],
  providers:[
    { provide: BASE_PATH, useValue: environment.apiUrlForReportServer },
    ProjectReportTemplateService,
    ProjectReportTemplateAccessPerUserService
  ]
})
export class ReportModule { }
