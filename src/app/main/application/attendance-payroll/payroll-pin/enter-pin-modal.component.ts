import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PayslipService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Asks for the employee's PIN (shared with the payslip PIN) and closes with true once the API accepts it.
@Component({
  selector: 'app-enter-pin-modal',
  templateUrl: './enter-pin-modal.component.html',
})
export class EnterPinModalComponent implements OnDestroy {
  @Input() title = 'Enter your PIN';
  @Input() message = 'Enter your PIN to view the payroll summary.';
  @Input() confirmLabel = 'Submit';

  public pin = '';
  public showPin = false;
  public errorMessage = '';
  public validating = false;

  private unsubscribeAll = new Subject<void>();

  constructor(public activeModal: NgbActiveModal, private payslipService: PayslipService) {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (!this.pin?.trim()) {
      this.errorMessage = 'Please enter your PIN.';
      return;
    }

    this.validating = true;
    this.errorMessage = '';
    this.payslipService
      .apiVversionPayrollPayslipGetPayslipPinGet(environment.apiVersionForPayroll, this.pin)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => {
          this.validating = false;
          if (response?.Succeeded) {
            this.activeModal.close(true);
          } else {
            this.errorMessage = response?.Message || 'Invalid PIN.';
          }
        },
        () => {
          this.validating = false;
          this.errorMessage = 'Server error. Please try again.';
        }
      );
  }
}
