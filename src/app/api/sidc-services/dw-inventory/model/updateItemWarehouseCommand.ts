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
import { ItemWarehouseDetail } from './itemWarehouseDetail';

export interface UpdateItemWarehouseCommand { 
    id?: number;
    branchId?: number;
    branchCode?: string;
    warehouseId?: number;
    warehouseCode?: string;
    dateTimeExtracted?: Date;
    itemWarehouseDetail?: Array<ItemWarehouseDetail>;
}