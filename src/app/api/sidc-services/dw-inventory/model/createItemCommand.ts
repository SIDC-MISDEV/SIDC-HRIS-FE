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
import { CreateItemUnitOfMeasureCommand } from './createItemUnitOfMeasureCommand';

export interface CreateItemCommand { 
    itemCode?: string;
    itemName?: string;
    categoryId?: number;
    subCategoryId?: number;
    subSubCategoryId?: number;
    packagingTypeId?: number;
    isActive?: boolean;
    lastPurchasedDate?: Date;
    itemUnitOfMeasureGroupId?: number;
    itemUnitOfMeasureId?: number;
    itemUnitOfMeasure?: Array<CreateItemUnitOfMeasureCommand>;
}