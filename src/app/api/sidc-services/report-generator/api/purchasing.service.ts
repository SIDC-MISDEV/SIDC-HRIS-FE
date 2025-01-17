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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PurchasingService {

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
     * @param branchCode 
     * @param year 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingCheckMissingGrpoTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingCheckMissingGrpoTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingGrpoTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingGrpoTransactionsGet(version: string, branchCode?: string, year?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingCheckMissingGrpoTransactionsGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/check-missing-grpo-transactions`,
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
     * @param branchCode 
     * @param year 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingCheckMissingPrTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingCheckMissingPrTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingPrTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingPrTransactionsGet(version: string, branchCode?: string, year?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingCheckMissingPrTransactionsGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/check-missing-pr-transactions`,
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
     * @param branchCode 
     * @param year 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingCheckMissingRgTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingCheckMissingRgTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingRgTransactionsGet(version: string, branchCode?: string, year?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingCheckMissingRgTransactionsGet(version: string, branchCode?: string, year?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingCheckMissingRgTransactionsGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/check-missing-rg-transactions`,
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
     * @param dateFrom 
     * @param dateTo 
     * @param branchCode 
     * @param vendorCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingRgSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingRgSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingRgSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingRgSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingRgSupplierreportGet.');
        }





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom.toISOString());
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo.toISOString());
        }
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (vendorCode !== undefined && vendorCode !== null) {
            queryParameters = queryParameters.set('vendorCode', <any>vendorCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/rg-supplierreport`,
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
     * @param dateFrom 
     * @param dateTo 
     * @param region 
     * @param vendorCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingRgSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingRgSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingRgSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingRgSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingRgSupplierreportPerRegionGet.');
        }





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom.toISOString());
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo.toISOString());
        }
        if (region !== undefined && region !== null) {
            queryParameters = queryParameters.set('region', <any>region);
        }
        if (vendorCode !== undefined && vendorCode !== null) {
            queryParameters = queryParameters.set('vendorCode', <any>vendorCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/rg-supplierreport-per-region`,
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
     * @param dateFrom 
     * @param dateTo 
     * @param branchCode 
     * @param vendorCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingRvSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingRvSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingRvSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingRvSupplierreportGet(version: string, dateFrom?: Date, dateTo?: Date, branchCode?: string, vendorCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingRvSupplierreportGet.');
        }





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom.toISOString());
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo.toISOString());
        }
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (vendorCode !== undefined && vendorCode !== null) {
            queryParameters = queryParameters.set('vendorCode', <any>vendorCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/rv-supplierreport`,
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
     * @param dateFrom 
     * @param dateTo 
     * @param region 
     * @param vendorCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiVversionDatawarehousePurchasingRvSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiVversionDatawarehousePurchasingRvSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiVversionDatawarehousePurchasingRvSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiVversionDatawarehousePurchasingRvSupplierreportPerRegionGet(version: string, dateFrom?: Date, dateTo?: Date, region?: string, vendorCode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (version === null || version === undefined) {
            throw new Error('Required parameter version was null or undefined when calling apiVversionDatawarehousePurchasingRvSupplierreportPerRegionGet.');
        }





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom.toISOString());
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo.toISOString());
        }
        if (region !== undefined && region !== null) {
            queryParameters = queryParameters.set('region', <any>region);
        }
        if (vendorCode !== undefined && vendorCode !== null) {
            queryParameters = queryParameters.set('vendorCode', <any>vendorCode);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v${encodeURIComponent(String(version))}/datawarehouse/Purchasing/rv-supplierreport-per-region`,
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
