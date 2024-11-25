import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AVPGroupService } from './api/aVPGroup.service';
import { AdjustmentService } from './api/adjustment.service';
import { AdjustmentDetailService } from './api/adjustmentDetail.service';
import { BranchService } from './api/branch.service';
import { BusinessSegmentService } from './api/businessSegment.service';
import { CategoryService } from './api/category.service';
import { DraftGoodsIssuanceService } from './api/draftGoodsIssuance.service';
import { DraftGoodsIssuanceDetailService } from './api/draftGoodsIssuanceDetail.service';
import { DraftGoodsReceiptService } from './api/draftGoodsReceipt.service';
import { DraftGoodsReceiptDetailService } from './api/draftGoodsReceiptDetail.service';
import { GoodsIssuanceService } from './api/goodsIssuance.service';
import { GoodsIssuanceDetailService } from './api/goodsIssuanceDetail.service';
import { GoodsReceiptService } from './api/goodsReceipt.service';
import { GoodsReceiptDetailService } from './api/goodsReceiptDetail.service';
import { IdentityService } from './api/identity.service';
import { ItemService } from './api/item.service';
import { ItemBarCodeMasterDataService } from './api/itemBarCodeMasterData.service';
import { ItemUnitOfMeasureService } from './api/itemUnitOfMeasure.service';
import { ItemUnitOfMeasureGroupService } from './api/itemUnitOfMeasureGroup.service';
import { ItemUnitOfMeasureGroupDetailsService } from './api/itemUnitOfMeasureGroupDetails.service';
import { ItemUnitPriceService } from './api/itemUnitPrice.service';
import { ItemWarehouseService } from './api/itemWarehouse.service';
import { ItemWarehouseBinService } from './api/itemWarehouseBin.service';
import { ItemWarehouseCostingService } from './api/itemWarehouseCosting.service';
import { ItemWarehouseDetailsService } from './api/itemWarehouseDetails.service';
import { ItemWarehouseHistoryService } from './api/itemWarehouseHistory.service';
import { ItemWarehouseHistoryDetailService } from './api/itemWarehouseHistoryDetail.service';
import { MainSegmentService } from './api/mainSegment.service';
import { PackagingTypeService } from './api/packagingType.service';
import { PriceListService } from './api/priceList.service';
import { PriceListDetailService } from './api/priceListDetail.service';
import { ProductionTypeService } from './api/productionType.service';
import { RegionService } from './api/region.service';
import { StockRequestService } from './api/stockRequest.service';
import { StockRequestDetailService } from './api/stockRequestDetail.service';
import { TransactionTypeService } from './api/transactionType.service';
import { UnitOfMeasureService } from './api/unitOfMeasure.service';
import { WarehouseService } from './api/warehouse.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AVPGroupService,
    AdjustmentService,
    AdjustmentDetailService,
    BranchService,
    BusinessSegmentService,
    CategoryService,
    DraftGoodsIssuanceService,
    DraftGoodsIssuanceDetailService,
    DraftGoodsReceiptService,
    DraftGoodsReceiptDetailService,
    GoodsIssuanceService,
    GoodsIssuanceDetailService,
    GoodsReceiptService,
    GoodsReceiptDetailService,
    IdentityService,
    ItemService,
    ItemBarCodeMasterDataService,
    ItemUnitOfMeasureService,
    ItemUnitOfMeasureGroupService,
    ItemUnitOfMeasureGroupDetailsService,
    ItemUnitPriceService,
    ItemWarehouseService,
    ItemWarehouseBinService,
    ItemWarehouseCostingService,
    ItemWarehouseDetailsService,
    ItemWarehouseHistoryService,
    ItemWarehouseHistoryDetailService,
    MainSegmentService,
    PackagingTypeService,
    PriceListService,
    PriceListDetailService,
    ProductionTypeService,
    RegionService,
    StockRequestService,
    StockRequestDetailService,
    TransactionTypeService,
    UnitOfMeasureService,
    WarehouseService ]
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
