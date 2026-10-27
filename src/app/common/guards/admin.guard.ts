import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.auth.currentUserValue;

    // a session without access to this app (or from before app access existed) must sign in again
    if (currentUser && this.auth.isAuthenticated && this.auth.hasApplicationAccess) {
      // if (currentUser.roles[0] !== Role.Admin) {
      //   this.router.navigate(['/error/unauthorized']);
      //   return false;
      // }

      return true;
    }
   
    this.auth.clearSession();
    this.router.navigate(['/auth/login']);
    return false;
  }
  
}
