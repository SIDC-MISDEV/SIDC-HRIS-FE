/**
 * SIDCDatawarehouse
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CreateGoodsReceiptDetailCommand } from './createGoodsReceiptDetailCommand';

export interface CreateGoodsReceiptCommand { 
    idLedger?: number;
    reference?: string;
    crossReference?: string;
    stockRequestId?: number;
    stockRequestReference?: string;
    total?: number;
    transactionTypeId?: number;
    transactionTypeCode?: string;
    toWarehouseId?: number;
    toWarehouseCode?: string;
    fromWarehouseId?: number;
    fromWarehouseCode?: string;
    mainSegmentId?: number;
    mainSegmentCode?: string;
    businessSegmentId?: number;
    businessSegmentCode?: string;
    branchId?: number;
    branchCode?: string;
    remarks?: string;
    cancelled?: number;
    status?: string;
    systemDate?: Date;
    transactionDate?: Date;
    idUser?: string;
    extracted?: string;
    fromBranchCodeId?: number;
    fromBranchCode?: string;
    vendorCode?: string;
    accountCode?: string;
    accountName?: string;
    isDummy?: boolean;
    isManual?: boolean;
    accountNumber?: string;
    terminalNumber?: string;
    dataSourceId?: number;
    goodsReceiptDetail?: Array<CreateGoodsReceiptDetailCommand>;
}