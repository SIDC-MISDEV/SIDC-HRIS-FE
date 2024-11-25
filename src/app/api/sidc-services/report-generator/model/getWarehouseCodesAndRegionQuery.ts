/**
 * SIDC Report Generator Core
 * Our Endpoints are powered by .Net Core, Onion Architecture, CQRS with MediatR Library,Entity Framework Core - Code First,Repository Pattern - Generic, Swagger UI, API Versioning,Fluent Validation and Automapper.
 *
 * OpenAPI spec version: v1
 * Contact: sidcmisdepartment@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface GetWarehouseCodesAndRegionQuery { 
    regionCodes?: Array<string>;
    pageNumber?: number;
    pageSize?: number;
}