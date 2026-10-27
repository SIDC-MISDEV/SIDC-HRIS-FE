import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PayslipService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Changes the employee's PIN (shared with the payslip PIN) and closes with true once it is saved.
@Component({
  selector: 'app-change-pin-modal',
  templateUrl: './change-pin-modal.component.html',
})
export class ChangePinModalComponent implements OnDestroy {
  @Input() title = 'Change PIN';
  // shown above the form, e.g. when the PIN has expired
  @Input() message = '';

  public oldPin = '';
  public newPin = '';
  public confirmPin = '';
  public showOldPin = false;
  public showNewPin = false;
  public showConfirmPin = false;
  public oldPinValid = false;
  public pinMismatch = false;
  public sameAsOld = false;
  public pinTooShort = false;
  public errorMessage = '';
  public saving = false;

  private unsubscribeAll = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private payslipService: PayslipService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  get isFormValid(): boolean {
    return (
      !!this.oldPin?.trim() &&
      !!this.newPin?.trim() &&
      !!this.confirmPin?.trim() &&
      !this.pinMismatch &&
      !this.sameAsOld &&
      !this.pinTooShort &&
      this.oldPinValid
    );
  }

  validateOldPin(): void {
    if (!this.oldPin?.trim()) {
      this.oldPinValid = false;
      return;
    }

    this.payslipService
      .apiVversionPayrollPayslipGetPayslipPinGet(environment.apiVersionForPayroll, this.oldPin)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => {
          this.oldPinValid = !!response?.Succeeded;
          this.errorMessage = this.oldPinValid ? '' : response?.Message || 'Invalid PIN.';
        },
        () => {
          this.oldPinValid = false;
          this.errorMessage = 'Server error. Please try again.';
        }
      );
  }

  checkPinMatch(): void {
    this.sameAsOld = !!this.oldPin && !!this.newPin && this.oldPin === this.newPin;
    this.pinMismatch = !!this.newPin && !!this.confirmPin && this.newPin !== this.confirmPin;
    this.pinTooShort = !!this.newPin && this.newPin.length < 6;
  }

  onSave(): void {
    this.checkPinMatch();
    if (!this.isFormValid) {
      return;
    }

    this.saving = true;
    this.payslipService
      .apiVversionPayrollPayslipUpdateEmployeePayslipPinPut(environment.apiVersionForPayroll, { pinHash: this.confirmPin })
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => {
          this.saving = false;
          if (response?.Succeeded) {
            this.toastr.success('PIN updated successfully', '', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              toastClass: 'toast ngx-toastr',
            });
            this.activeModal.close(true);
          } else {
            this.errorMessage = response?.Message || 'Unable to update PIN.';
          }
        },
        () => {
          this.saving = false;
          this.errorMessage = 'Server error. Please try again.';
        }
      );
  }
}
