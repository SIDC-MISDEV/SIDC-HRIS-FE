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

import { CreateDraftGoodsReceiptCommand } from '../model/createDraftGoodsReceiptCommand';
import { UpSertDraftGoodsReceiptCommand } from '../model/upSertDraftGoodsReceiptCommand';
import { UpdateDraftGoodsReceiptCommand } from '../model/updateDraftGoodsReceiptCommand';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DraftGoodsReceiptService {

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
     * @param pageNumber 
     * @param pageSize 
     * @param branchCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptBranchCodeGet(version: string, pageNumber?: number, pageSize?: number, branchCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptBranchCodeGet(version: string, pageNumber?: number, pageSize?: number, branchCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptBranchCodeGet(version: string, pageNumber?: number, pageSize?: number, branchCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptBranchCodeGet(version: string, pageNumber?: number, pageSize?: number, branchCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptBranchCodeGet.');
        }




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/branchCode`,
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
     * @param version 
     * @param pageNumber 
     * @param pageSize 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptGet(version: string, pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGet(version: string, pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGet(version: string, pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGet(version: string, pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt`,
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
     * @param stockRequestId 
     * @param version 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet(stockRequestId: number, version: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet(stockRequestId: number, version: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet(stockRequestId: number, version: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet(stockRequestId: number, version: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (stockRequestId === null || stockRequestId === undefined) {
            throw new Error('Required parameter stockRequestId was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockRequestIdStockRequestIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/get-all-draft-rr-by-stock-request-id/${encodeURIComponent(String(stockRequestId))}`,
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
     * @param stockTransferId 
     * @param version 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet(stockTransferId: number, version: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet(stockTransferId: number, version: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet(stockTransferId: number, version: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet(stockTransferId: number, version: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (stockTransferId === null || stockTransferId === undefined) {
            throw new Error('Required parameter stockTransferId was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/get-all-draft-rr-by-stock-transfer-id/${encodeURIComponent(String(stockTransferId))}`,
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
     * @param id 
     * @param version 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet(id: number, version: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet(id: number, version: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet(id: number, version: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet(id: number, version: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptGetByIdAndAssignedBranchIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/get-by-id-and-assigned-branch/${encodeURIComponent(String(id))}`,
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
     * @param id 
     * @param version 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete(id: number, version: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete(id: number, version: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete(id: number, version: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete(id: number, version: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdDelete.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/${encodeURIComponent(String(id))}`,
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
     * @param id 
     * @param version 
     * @param warehouseCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdGet(id: number, version: string, warehouseCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdGet(id: number, version: string, warehouseCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdGet(id: number, version: string, warehouseCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdGet(id: number, version: string, warehouseCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdGet.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdGet.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (warehouseCode !== undefined && warehouseCode !== null) {
            queryParameters = queryParameters.set('warehouseCode', <any>warehouseCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/${encodeURIComponent(String(id))}`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdPut(id: number, version: string, body?: UpdateDraftGoodsReceiptCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdPut(id: number, version: string, body?: UpdateDraftGoodsReceiptCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdPut(id: number, version: string, body?: UpdateDraftGoodsReceiptCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptIdPut(id: number, version: string, body?: UpdateDraftGoodsReceiptCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdPut.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptIdPut.');
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/${encodeURIComponent(String(id))}`,
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
     * @param warehouseCode 
     * @param searchKey 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptOpenDraftRRByWarehouseCodeGet(version: string, pageNumber?: number, pageSize?: number, warehouseCode?: string, searchKey?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptOpenDraftRRByWarehouseCodeGet(version: string, pageNumber?: number, pageSize?: number, warehouseCode?: string, searchKey?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptOpenDraftRRByWarehouseCodeGet(version: string, pageNumber?: number, pageSize?: number, warehouseCode?: string, searchKey?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptOpenDraftRRByWarehouseCodeGet(version: string, pageNumber?: number, pageSize?: number, warehouseCode?: string, searchKey?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptOpenDraftRRByWarehouseCodeGet.');
        }





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (warehouseCode !== undefined && warehouseCode !== null) {
            queryParameters = queryParameters.set('warehouseCode', <any>warehouseCode);
        }
        if (searchKey !== undefined && searchKey !== null) {
            queryParameters = queryParameters.set('searchKey', <any>searchKey);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/open-DraftRR-by-warehouseCode`,
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
     * @param version 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptPost(version: string, body?: CreateDraftGoodsReceiptCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptPost(version: string, body?: CreateDraftGoodsReceiptCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptPost(version: string, body?: CreateDraftGoodsReceiptCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptPost(version: string, body?: CreateDraftGoodsReceiptCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptPost.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt`,
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
     * @param warehouseCode 
     * @param draftreference 
     * @param version 
     * @param status 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost(warehouseCode: string, draftreference: string, version: string, status?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost(warehouseCode: string, draftreference: string, version: string, status?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost(warehouseCode: string, draftreference: string, version: string, status?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost(warehouseCode: string, draftreference: string, version: string, status?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (warehouseCode === null || warehouseCode === undefined) {
            throw new Error('Required parameter warehouseCode was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost.');
        }

        if (draftreference === null || draftreference === undefined) {
            throw new Error('Required parameter draftreference was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptUpdateStatusWarehouseCodeDraftreferencePost.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/update-status/${encodeURIComponent(String(warehouseCode))}/${encodeURIComponent(String(draftreference))}`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut(id: number, version: string, body?: UpSertDraftGoodsReceiptCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut(id: number, version: string, body?: UpSertDraftGoodsReceiptCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut(id: number, version: string, body?: UpSertDraftGoodsReceiptCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut(id: number, version: string, body?: UpSertDraftGoodsReceiptCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut.');
        }

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionInventoryTransactionsDraftGoodsReceiptUpsertIdPut.');
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/v${encodeURIComponent(String(version))}/inventory/transactions/DraftGoodsReceipt/upsert/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
