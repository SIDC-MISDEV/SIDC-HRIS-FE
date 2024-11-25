import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DraftGoodsReceiptService } from 'app/api/sidc-services/dw-inventory';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InterBranchDraftRRListingResolver implements Resolve<boolean> {
  constructor(
    private draftGoodsReceiptService: DraftGoodsReceiptService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = (route.params && route.params.id ? route.params.id: null);
    return this.draftGoodsReceiptService.apiVversionInventoryTransactionsDraftGoodsReceiptGetAllDraftRrByStockTransferIdStockTransferIdGet(id, environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}
