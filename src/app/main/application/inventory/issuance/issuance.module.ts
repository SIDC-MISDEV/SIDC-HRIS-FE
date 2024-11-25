import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IssuanceComponent } from './issuance.component';
import { IssuanceDetailsComponent } from './issuance-details/issuance-details.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IssuanceDetailsResolver } from 'app/common/resolvers/application/inventory/issuance-details.resolver';
import { BranchService } from 'app/api/sidc-services/dw-inventory';

const routes: Routes = [
  {
    path: '',
    component: IssuanceComponent
  },

  {
    path: "issuance-details/:id/:transactionyear",
    component: IssuanceDetailsComponent,
    resolve: {
      IssuanceDetails: IssuanceDetailsResolver,
    },
    data: {
      title: "View Issuance Details",
      breadcrumb: "View",
    },
  },
]


@NgModule({
  declarations: [IssuanceComponent, IssuanceDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgSelectModule,
    NgxDatatableModule,
  ],
  providers: [BranchService]
})
export class IssuanceModule { }
