import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordCommand, ChangePasswordService } from 'app/api/sidc-services/identity-legacy';
import { AuthService } from 'app/common/services/auth.service';
import { MustMatchValidator } from 'app/common/ui/validators/mustmatch.validator';
import { PasswordValidator } from 'app/common/ui/validators/password.validator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

interface PasswordRule {
  key: 'characterLength' | 'lowerCase' | 'upperCase' | 'number';
  label: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;

  contentHeader: object;
  changePasswordForm: FormGroup;
  changePasswordCommand: ChangePasswordCommand;
  currentUserName: string = null;
  submitted = false;
  loading = false;

  // true = password is masked
  isOldPasswordHidden = true;
  isNewPasswordHidden = true;
  isConfirmPasswordHidden = true;

  readonly rules: PasswordRule[] = [
    { key: 'characterLength', label: 'Minimum 8 characters long' },
    { key: 'lowerCase', label: 'At least one lowercase character' },
    { key: 'upperCase', label: 'At least one uppercase character' },
    { key: 'number', label: 'At least one number' }
  ];

  private unsubscribeAll = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private changePasswordService: ChangePasswordService,
    private authService: AuthService
  ) {}

  get f() {
    return this.changePasswordForm.controls;
  }

  // New password is identical to the current password
  get sameAsCurrent(): boolean {
    const current = this.f.currentPassword.value;
    const next = this.f.password.value;
    return !!current && !!next && current === next;
  }

  ngOnInit(): void {
    this.currentUserName = this.authService.currentUserValue?.userName;

    this.contentHeader = {
      headerTitle: 'Change Password',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          { name: 'Home', isLink: true, link: '/application/home/' },
          { name: 'Settings', isLink: true, link: '/settings' },
          { name: 'Change Password', isLink: false }
        ]
      }
    };

    this.changePasswordForm = this.formBuilder.group(
      {
        username: [this.currentUserName],
        currentPassword: ['', Validators.required],
        password: ['', [Validators.required, PasswordValidator.strong]],
        confirmPassword: ['', Validators.required]
      },
      { validator: [MustMatchValidator('password', 'confirmPassword')] }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ruleFailed(key: PasswordRule['key']): boolean {
    return !!this.f.password.errors?.[key];
  }

  showRuleState(): boolean {
    return this.submitted || this.f.password.dirty;
  }

  hideUnhideOldPassword(): void {
    this.isOldPasswordHidden = !this.isOldPasswordHidden;
  }

  hideUnhideNewPassword(): void {
    this.isNewPasswordHidden = !this.isNewPasswordHidden;
  }

  hideUnhideConfirmPassword(): void {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.changePasswordForm.invalid || this.sameAsCurrent) {
      return;
    }

    this.changePasswordCommand = this.changePasswordForm.getRawValue();

    const result = await Swal.fire({
      title: 'Change password?',
      text: 'Your password will be changed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Change',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      heightAuto: false,        // stops the page/footer height from changing
      scrollbarPadding: false,  // stops the sideways shift when the scrollbar hides
      customClass: {
        confirmButton: 'btn btn-primary ml-1',
        cancelButton: 'btn btn-outline-secondary'
      },
      buttonsStyling: false
    });
    if (!result.value) {
      return;
    }

    this.loading = true;
    this.blockUI.start();

    this.changePasswordService
      .apiChangepasswordChangePasswordPost(this.changePasswordCommand)
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => {
          this.loading = false;
          this.blockUI.stop();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            title: 'Password changed',
            text: 'Your password has been changed successfully.',
            icon: 'success',
            confirmButtonText: 'Ok',
            heightAuto: false,
            scrollbarPadding: false,
            customClass: { confirmButton: 'btn btn-primary' },
            buttonsStyling: false
          });
          this.router.navigate(['/application']);
        },
        (httpError: HttpErrorResponse) => {
          this.toastr.error('', httpError.error?.Message || 'Unable to change password.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr'
          });
        }
      );
  }
}