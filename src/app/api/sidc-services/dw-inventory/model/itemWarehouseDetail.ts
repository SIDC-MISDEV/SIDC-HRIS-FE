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
import { ItemWarehouse } from './itemWarehouse';

export interface ItemWarehouseDetail { 
    id?: number;
    createdBy?: string;
    createdOn?: Date;
    lastModifiedBy?: string;
    lastModifiedOn?: Date;
    itemWarehouseId?: number;
    itemWarehouse?: ItemWarehouse;
    itemCode?: string;
    runningQuantity?: number;
}