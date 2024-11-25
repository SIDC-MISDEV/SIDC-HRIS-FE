import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CategoryService } from 'app/api/sidc-services/dw-inventory';
import { InventoryService } from 'app/api/sidc-services/report-generator';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CategoryResolver implements Resolve<boolean> {
  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.inventoryService.apiVversionDatawarehouseInventoryCategoryListGet(environment.apiVersion).pipe(
      catchError(error => {
        this.router.navigate(['/error/internal-server']);
        return of(null);
      })
    );
  }
}