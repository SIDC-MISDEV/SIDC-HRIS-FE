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
import { CreateStockRequestDetailCommand } from './createStockRequestDetailCommand';

export interface CreateStockRequestCommand { 
    idLedger?: number;
    reference?: string;
    crossReference?: string;
    inventoryRequestReference?: string;
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
    synced?: number;
    isFranchisee?: boolean;
    printed?: string;
    approved?: number;
    systemDate?: Date;
    transactionDate?: Date;
    idUser?: string;
    terminalNumber?: string;
    stockRequestDetail?: Array<CreateStockRequestDetailCommand>;
}