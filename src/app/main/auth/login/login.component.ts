import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
//import { IdentityService } from 'app/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'app/common/services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IdentityService } from 'app/api/sidc-services/identity';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;

  // Private
  private unsubscribeAll: Subject<any>;

  @BlockUI() blockUI: NgBlockUI;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   * @param {FormBuilder} formBuilder
   */
  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.unsubscribeAll = new Subject();

    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.blockUI.start();

    this.identityService.token(this.loginForm.getRawValue()).pipe(takeUntil(this.unsubscribeAll)).subscribe((result) => {
      this.blockUI.stop();
      // .NET 10 Identity returns the session directly; tolerate a { data } envelope too
      const response = result?.data ?? result;
      // TODO: remove — temporary debug for the HRIS application access check
      console.log('[login] token response', result);
      console.log('[login] applications', response?.applications, 'expected code', environment.applicationCode);
      const helper = new JwtHelperService();
      const tokenDetails = helper.decodeToken(response?.jwToken);
      if (!tokenDetails) {
        this.toastr.error('', 'Sign-in succeeded but no token was returned.', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          toastClass: 'toast ngx-toastr',
        });
        return;
      }
      // the token response lists the applications the user may open
      const hasApplicationAccess = (response.applications ?? []).some(app => app.code === environment.applicationCode);
      if (!hasApplicationAccess) {
        this.toastr.error('', 'Your account does not have access to this application.', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          toastClass: 'toast ngx-toastr',
        });
        return;
      }
      const fullName = tokenDetails.full_name;
      const firstName = tokenDetails.first_name;
      const lastName = tokenDetails.last_name;
      const employeeCode = tokenDetails.employee_code || null;
      this.authService.user = {...response, fullName, firstName, lastName, employeeCode};
      localStorage.setItem("currentUser", JSON.stringify(this.authService.currentUserValue));
      localStorage.setItem("token", this.authService.currentUserValue.jwToken);
      // drop a token left over from the former legacy (.NET 5) sign-in
      localStorage.removeItem("legacyToken");
      // if (this.authService.isAdmin) {
      //   this.router.navigate(["/admin/"]);
      // } else {
      //   this.authService.redirectMember();
      // }
      this.router.navigate(["/application/"]);

    }, (httpError: HttpErrorResponse) => {

      this.blockUI.stop();
      this.toastr.error('', httpError.error?.detail || httpError.error?.title, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
     
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // You can access the previous URL here if needed
        const previousUrl = this.router.url;
        sessionStorage.setItem("previousUrl", previousUrl);
      }

      if (event instanceof NavigationEnd) {
        // Access the current URL after navigation is complete
        const currentUrl = this.router.url;
        sessionStorage.setItem("currentUrl", currentUrl);
      }
    });

    // Subscribe to config changes
    this.coreConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
