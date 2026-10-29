import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Permission } from '../models/app-access';
import { AuthService } from '../services/auth.service';

/**
 * Allows a route only when the user has `view` on the module in `route.data.moduleCode`
 * (from the token response `applications`). Routes without a moduleCode are allowed.
 */
@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const moduleCode: string = route.data?.moduleCode;

    if (!moduleCode || this.auth.hasPermission(moduleCode, Permission.View)) {
      return true;
    }

    return this.router.createUrlTree(['/application/home']);
  }
}
