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

export interface CreateItemWarehouseBinCommand { 
    itemUnitOfMeasureId?: number;
    minimumQuantity?: number;
    maximumQuantity?: number;
    runningQuantity?: number;
    isConsignment?: boolean;
}