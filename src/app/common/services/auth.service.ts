import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { helpers } from 'chart.js';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AppModule, Permission, UserApplication } from '../models/app-access';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setApplicantInfo(applicantData: any, profilePicValue: string) {
    let userInfo: User = {...this.currentUserValue};
    userInfo.applicant = {...applicantData};
    userInfo.profilePicture = profilePicValue;

    // remove this line after
    userInfo.fullName = `${applicantData.firstName} ${applicantData.lastName}`;
    // end
    
    this.currentUserSubject.next(userInfo);
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.roles[0] === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.roles[0] === Role.Basic;
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.currentUserValue.jwToken)
  }

  set user(user: User) {
    this.currentUserSubject.next(user);
  }

  set tab(tab: string) {
    this.user.applicant.tab = tab;
  }


  /**
   *  This app's entry in the token response `applications`
   */
  get currentApplication(): UserApplication | undefined {
    return this.currentUserValue?.applications?.find(app => app.code === environment.applicationCode);
  }

  get hasApplicationAccess(): boolean {
    return !!this.currentApplication;
  }

  /**
   *  Confirms if the user has the permission on a module of this app
   */
  hasPermission(moduleCode: string, permission: string = Permission.View): boolean {
    const module = this.findModule(this.currentApplication?.modules ?? [], moduleCode);
    return !!module?.permissions?.includes(permission);
  }

  private findModule(modules: AppModule[], moduleCode: string): AppModule | undefined {
    for (const module of modules) {
      if (module.code === moduleCode) {
        return module;
      }
      const child = this.findModule(module.children ?? [], moduleCode);
      if (child) {
        return child;
      }
    }
    return undefined;
  }

  get tokenDetails() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.currentUserValue.jwToken);
  }

  clearSession() {
    sessionStorage.clear();
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  redirectMember() {
    if (this.currentUserValue && this.currentUserValue.applicant && this.currentUserValue.applicant.tab) {
      if (["BasicInformation", "Employment", "beneficiary", "livelihood", "characterReference", "membershipType", "requirements", "pmes", "payment", "waiver","declaration"].includes(this.currentUserValue.applicant.tab)) {
        this.router.navigate(["/registration/"]);
      } else {
        this.router.navigate(["/"]);
      }
    } else {
      this.router.navigate(["/registration/"]);
    }
    // this.router.navigate(["/home"]);
  }
}
