import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DraftGoodsReceiptPOService } from 'app/api/sidc-services/dw-purchasing';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InterBranchDraftRVListingResolver implements Resolve<boolean> {
  constructor(
    private draftGoodsReceiptPOService: DraftGoodsReceiptPOService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = (route.params && route.params.id ? route.params.id: null);
    return this.draftGoodsReceiptPOService.apiVversionPurchasingTransactionsDraftGoodsReceiptPOGetAllDraftRvByPurchaseRequestIdPurchaseRequestIdGet(id, environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}
