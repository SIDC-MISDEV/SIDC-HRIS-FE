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
import { UpSertDraftGoodsReceiptCommandDetail } from './upSertDraftGoodsReceiptCommandDetail';

export interface UpSertDraftGoodsReceiptCommand { 
    idLedger?: number;
    id?: number;
    reference?: string;
    draftReference?: string;
    crossReference?: string;
    stockRequestId?: number;
    stockRequestReference?: string;
    stockTransferId?: number;
    stockTransferReference?: string;
    total?: number;
    transactionTypeCode?: string;
    toWarehouseCode?: string;
    fromWarehouseCode?: string;
    mainSegmentCode?: string;
    businessSegmentCode?: string;
    branchCode?: string;
    remarks?: string;
    cancelled?: number;
    status?: string;
    systemDate?: Date;
    transactionDate?: Date;
    idUser?: string;
    extracted?: string;
    fromBranchCode?: string;
    vendorCode?: string;
    accountCode?: string;
    accountName?: string;
    isDummy?: boolean;
    isManual?: boolean;
    accountNumber?: string;
    terminalNumber?: string;
    draftGoodsReceiptDetail?: Array<UpSertDraftGoodsReceiptCommandDetail>;
}