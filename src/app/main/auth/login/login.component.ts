import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject, throwError } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
//import { IdentityService } from 'app/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'app/common/services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IdentityService } from 'app/api/sidc-services/identity';
import { IdentityService as IdentityLegacyService } from 'app/api/sidc-services/identity-legacy';

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
    private identityLegacyService: IdentityLegacyService,
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

    this.requestTokens(this.loginForm.getRawValue()).pipe(takeUntil(this.unsubscribeAll)).subscribe(({ response, legacyToken }) => {
      this.blockUI.stop();
      const helper = new JwtHelperService();
      const tokenDetails = helper.decodeToken(response.jwToken);
      const fullName = tokenDetails.full_name;
      const firstName = tokenDetails.first_name;
      const lastName = tokenDetails.last_name;
      this.authService.user = {...response, fullName, firstName, lastName};
      localStorage.setItem("currentUser", JSON.stringify(this.authService.currentUserValue));
      localStorage.setItem("token", this.authService.currentUserValue.jwToken);
      // Token from the legacy .NET 5 Identity, used by the interceptor for payroll API calls
      if (legacyToken) {
        localStorage.setItem("legacyToken", legacyToken);
      } else {
        localStorage.removeItem("legacyToken");
      }
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

  /**
   * Sign in against both the .NET 10 Identity and the legacy .NET 5 Identity.
   * `response` is the session used by the app (.NET 10, or legacy when .NET 10 fails) and
   * `legacyToken` is the legacy JWT (null when the legacy sign-in failed).
   * Errors only when both fail, surfacing the .NET 10 error.
   */
  private requestTokens(credentials: { username: string; password: string }): Observable<{ response: any; legacyToken: string | null }> {
    const identity$ = this.identityService.token(credentials).pipe(
      map(response => ({ response, error: null as HttpErrorResponse | null })),
      catchError((error: HttpErrorResponse) => of({ response: null, error }))
    );
    const legacy$ = this.identityLegacyService.apiIdentityTokenPost(credentials).pipe(
      map(response => response.data),
      catchError(() => of(null))
    );

    return forkJoin([identity$, legacy$]).pipe(
      switchMap(([identity, legacy]) => {
        const response = identity.response ?? legacy;
        return response
          ? of({ response, legacyToken: legacy?.jwToken ?? null })
          : throwError(identity.error);
      })
    );
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
        console.log("previousUrl", previousUrl);
      }

      if (event instanceof NavigationEnd) {
        // Access the current URL after navigation is complete
        const currentUrl = this.router.url;
        sessionStorage.setItem("currentUrl", currentUrl);
        console.log("currentUrl", currentUrl);
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
