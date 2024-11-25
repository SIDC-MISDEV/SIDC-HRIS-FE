import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { InterBranchService } from './api/interBranch.service';
import { InventoryService } from './api/inventory.service';
import { LogsService } from './api/logs.service';
import { POSSummaryService } from './api/pOSSummary.service';
import { PurchasingService } from './api/purchasing.service';
import { SalesService } from './api/sales.service';
import { VirtualInventoryService } from './api/virtualInventory.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    InterBranchService,
    InventoryService,
    LogsService,
    POSSummaryService,
    PurchasingService,
    SalesService,
    VirtualInventoryService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
