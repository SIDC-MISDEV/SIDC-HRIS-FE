import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(protected httpClient: HttpClient) { }

  public getCountries(): Observable<any> {
    return this.httpClient.request<any>('get',`https://restcountries.com/v3.1/all`);
  }
}
