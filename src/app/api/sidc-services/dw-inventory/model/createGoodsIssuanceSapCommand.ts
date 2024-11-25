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
import { GoodsIssuanceDetail } from './goodsIssuanceDetail';

export interface CreateGoodsIssuanceSapCommand { 
    idLedger?: number;
    docNum?: number;
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
    securityKey?: string;
    cancelled?: number;
    status?: string;
    synced?: number;
    systemDate?: Date;
    transactionDate?: Date;
    idUser?: string;
    extracted?: string;
    accountCode?: string;
    accountName?: string;
    isDummy?: boolean;
    employeeName?: string;
    department?: string;
    paidToDate?: number;
    accountNumber?: string;
    terminalNumber?: string;
    goodsIssuanceDetail?: Array<GoodsIssuanceDetail>;
}