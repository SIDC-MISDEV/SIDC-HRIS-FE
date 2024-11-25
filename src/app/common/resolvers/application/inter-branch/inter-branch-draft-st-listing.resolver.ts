import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DraftGoodsIssuanceService } from 'app/api/sidc-services/dw-inventory';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterBranchDraftStListingResolver implements Resolve<boolean> {
  constructor(
    private draftGoodsReceiptPOService: DraftGoodsIssuanceService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = (route.params && route.params.id ? route.params.id: null);
    return this.draftGoodsReceiptPOService.apiVversionInventoryTransactionsDraftGoodsIssuanceGetAllDraftStByStockRequestIdStockRequestIdGet(id, environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}
