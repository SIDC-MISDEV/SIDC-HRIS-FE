import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { GoodsIssuanceService } from 'app/api/sidc-services/dw-inventory';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterBranchStockTransferResolver implements Resolve<boolean> {
  constructor(
    private stockTransferService: GoodsIssuanceService,
    private router: Router
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = (route.params && route.params.id ? route.params.id: null);
    const transactionyear = (route.params && route.params.transactionyear ? route.params.transactionyear: null);
    return this.stockTransferService.apiVversionInventoryTransactionsGoodsIssuanceIdYearGet(id, transactionyear, environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}