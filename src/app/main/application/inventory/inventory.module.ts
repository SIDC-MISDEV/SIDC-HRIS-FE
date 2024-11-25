import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GoodsReceiptService } from 'app/api/sidc-services/dw-inventory';

const routes: Routes = [

  {
    path: 'issuance',
    loadChildren: () =>
      import("./issuance/issuance.module").then((m) => m.IssuanceModule),
  },
  
]


@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    ContentHeaderModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgSelectModule,
    NgxDatatableModule,
  ],
  providers: [
    GoodsReceiptService,
    DecimalPipe,
    DatePipe,
  ],
})
export class InventoryModule { }
