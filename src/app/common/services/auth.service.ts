import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { helpers } from 'chart.js';
import { Router } from '@angular/router';

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
