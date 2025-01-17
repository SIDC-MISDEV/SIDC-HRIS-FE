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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BulkUpSertStockRequestCommand } from '../model/bulkUpSertStockRequestCommand';
import { CreateStockRequestCommand } from '../model/createStockRequestCommand';
import { UpdateStockRequestCommand } from '../model/updateStockRequestCommand';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class StockRequestService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param version 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestBulkPostPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestBulkPostPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestBulkPostPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestBulkPostPost(version: string, body?: BulkUpSertStockRequestCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestBulkPostPost.');
        }


        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/bulk-post`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param version 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestBulkUpdateInsertPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestBulkUpdateInsertPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestBulkUpdateInsertPost(version: string, body?: BulkUpSertStockRequestCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestBulkUpdateInsertPost(version: string, body?: BulkUpSertStockRequestCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestBulkUpdateInsertPost.');
        }


        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/bulk-update-insert`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param version 
     * @param pageNumber 
     * @param pageSize 
     * @param year 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestGet(version: string, pageNumber?: number, pageSize?: number, year?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestGet(version: string, pageNumber?: number, pageSize?: number, year?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestGet(version: string, pageNumber?: number, pageSize?: number, year?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestGet(version: string, pageNumber?: number, pageSize?: number, year?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestGet.');
        }




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (year !== undefined && year !== null) {
            queryParameters = queryParameters.set('year', <any>year);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param version 
     * @param transactionDate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestIdDelete(id: number, version: string, transactionDate?: Date, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestIdDelete(id: number, version: string, transactionDate?: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestIdDelete(id: number, version: string, transactionDate?: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestIdDelete(id: number, version: string, transactionDate?: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdDelete.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdDelete.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (transactionDate !== undefined && transactionDate !== null) {
            queryParameters = queryParameters.set('transactionDate', <any>transactionDate.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param version 
     * @param body 
     * @param transactionDate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestIdPut(id: number, version: string, body?: UpdateStockRequestCommand, transactionDate?: Date, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestIdPut(id: number, version: string, body?: UpdateStockRequestCommand, transactionDate?: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestIdPut(id: number, version: string, body?: UpdateStockRequestCommand, transactionDate?: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestIdPut(id: number, version: string, body?: UpdateStockRequestCommand, transactionDate?: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdPut.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdPut.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (transactionDate !== undefined && transactionDate !== null) {
            queryParameters = queryParameters.set('transactionDate', <any>transactionDate.toISOString());
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/${encodeURIComponent(String(id))}`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param year 
     * @param version 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestIdYearGet(id: number, year: number, version: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestIdYearGet(id: number, year: number, version: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestIdYearGet(id: number, year: number, version: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestIdYearGet(id: number, year: number, version: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdYearGet.');
        }

        if (year === null || year === undefined) {
            throw new Error('Required parameter year was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdYearGet.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestIdYearGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/${encodeURIComponent(String(id))}/${encodeURIComponent(String(year))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param version 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestPost(version: string, body?: CreateStockRequestCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestPost(version: string, body?: CreateStockRequestCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestPost(version: string, body?: CreateStockRequestCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestPost(version: string, body?: CreateStockRequestCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestPost.');
        }


        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param fromWarehouseCode 
     * @param stockRequestReference 
     * @param version 
     * @param status 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost(fromWarehouseCode: string, stockRequestReference: string, version: string, status?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost(fromWarehouseCode: string, stockRequestReference: string, version: string, status?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost(fromWarehouseCode: string, stockRequestReference: string, version: string, status?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost(fromWarehouseCode: string, stockRequestReference: string, version: string, status?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (fromWarehouseCode === null || fromWarehouseCode === undefined) {
            throw new Error('Required parameter fromWarehouseCode was null or undefined when calling apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost.');
        }

        if (stockRequestReference === null || stockRequestReference === undefined) {
            throw new Error('Required parameter stockRequestReference was null or undefined when calling apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsStockRequestUpdateStatusFromWarehouseCodeStockRequestReferencePost.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/StockRequest/update-status/${encodeURIComponent(String(fromWarehouseCode))}/${encodeURIComponent(String(stockRequestReference))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
