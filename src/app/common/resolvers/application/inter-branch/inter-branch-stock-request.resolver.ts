import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { StockRequestService } from 'app/api/sidc-services/dw-inventory';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterBranchStockRequestResolver implements Resolve<boolean> {
  constructor(
    private stockRequestService: StockRequestService,
    private router: Router
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = (route.params && route.params.id ? route.params.id: null);
    const transactionyear = (route.params && route.params.transactionyear ? route.params.transactionyear: null);
    return this.stockRequestService.apiVversionInventoryTransactionsStockRequestIdYearGet(id, transactionyear, environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}