import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PayrollSummaryService, PayslipService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import * as feather from 'feather-icons';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ChangePinModalComponent } from '../payroll-pin/change-pin-modal.component';
import { EnterPinModalComponent } from '../payroll-pin/enter-pin-modal.component';

@Component({
  selector: 'app-payroll-approval',
  templateUrl: './payroll-approval.component.html',
  styleUrls: ['./payroll-approval.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollApprovalComponent implements OnInit, OnDestroy {
  public contentHeader: object;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public rows = [];
  public loading = false;
  public showPayrollIdColumn = false;

  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

  public page: { pageNumber: number; size: number; totalCount?: number; totalPages?: number } = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
  };
  public payrollGroup = 'sofos2_payroll';
  // whether a PIN is asked before opening a payroll summary (shared with the payslip PIN setting)
  public pinActive = true;
  public pinToggleLoading = false;

  constructor(
    private toastr: ToastrService,
    private payrollSummaryService: PayrollSummaryService,
    private payslipService: PayslipService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    feather.replace();
    this.contentHeader = {
      headerTitle: 'Payroll Summary Approval',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/application/home',
          },
          {
            name: 'Attendance & Payroll',
            isLink: false,
          },
          {
            name: 'Payroll Approval',
            isLink: false,
          },
          {
            name: 'Payroll Summary',
            isLink: false,
          },
        ],
      },
    };

    // keep the group the user came back from (e.g. the report page's idle redirect)
    const group = this.activatedRoute.snapshot.queryParamMap.get('group');
    if (group === 'sofos2_payroll' || group === 'sofos2_payroll_manager') {
      this.payrollGroup = group;
    }

    this.setPage({ offset: 0 });
    this.loadPinActiveStatus();
  }

  ngAfterViewChecked() {
    feather.replace();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.modalService.dismissAll();
  }

  loadPinActiveStatus(): void {
    this.payslipService
      .apiVversionPayrollPayslipGetEmployeePinIsRequiredGet(environment.apiVersionForPayroll)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => (this.pinActive = response?.Data?.IsRequired !== false),
        // keep the default (on) if the status can't be fetched
        () => {}
      );
  }

  // turning the PIN on saves right away; turning it off needs the current PIN first
  onPinToggleChange(checked: boolean): void {
    if (checked) {
      this.setPinActive(true);
      return;
    }

    this.pinActive = false;
    const modalRef = this.modalService.open(EnterPinModalComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.title = 'Confirm PIN';
    modalRef.componentInstance.message = 'Enter your current PIN to turn off PIN protection for payroll summaries and payslips.';
    modalRef.componentInstance.confirmLabel = 'Turn Off';
    modalRef.result.then(
      () => this.setPinActive(false),
      () => (this.pinActive = true)
    );
  }

  private setPinActive(isActive: boolean): void {
    this.pinToggleLoading = true;
    this.payslipService
      .apiVversionPayrollPayslipUpdateEmployeePayslipPinIsRequiredPut(environment.apiVersionForPayroll, { isRequired: isActive })
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        () => {
          this.pinActive = isActive;
          this.pinToggleLoading = false;
          this.toastr.success(`PIN protection ${isActive ? 'enabled' : 'disabled'}`, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        },
        () => {
          this.pinActive = !isActive;
          this.pinToggleLoading = false;
          this.toastr.error('', 'Unable to update PIN setting.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        }
      );
  }

  openChangePinModal(): void {
    this.modalService.open(ChangePinModalComponent, { backdrop: 'static', keyboard: false }).result.catch(() => {});
  }

  async confirmResetPin(): Promise<void> {
    const result = await Swal.fire({
      title: 'Reset PIN?',
      text: 'A temporary PIN will be sent to your registered email.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset',
      cancelButtonText: 'No',
      customClass: { confirmButton: 'btn btn-danger', cancelButton: 'btn btn-secondary ml-1' },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () =>
        this.payslipService
          .apiVversionPayrollPayslipUpdateResetEmployeePayslipPinPut(environment.apiVersionForPayroll, {})
          .toPromise()
          .then(
            (response: any) => {
              if (!response?.Succeeded) {
                Swal.showValidationMessage(response?.Message || 'Unable to reset PIN.');
                return false;
              }
              return true;
            },
            () => {
              Swal.showValidationMessage('Server error. Please try again.');
              return false;
            }
          ),
    });

    if (result.value) {
      this.toastr.success('Your PIN has been reset. A temporary PIN has been sent to your registered email.', '', {
        timeOut: 10000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
    }
  }

  onPayrollGroupChange(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.blockUI.start();
    this.loading = true;
    // payrollGroup is the selected database (sofos2_payroll / sofos2_payroll_manager)
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetPayrollSummaryGet(
        environment.apiVersionForPayroll,
        this.payrollGroup,
        this.page.pageNumber + 1,
        this.page.size
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          // API returns PascalCase; map rows to the camelCase props used by the table columns
          this.rows = (response.Data ?? []).map((item: any) => ({
            payrollId: item.PayrollId,
            payPeriod: item.PayrollPeriod,
            grossPay: item.TotalGrossPay,
            totalDeduction: item.TotalDeduction,
            netPay: item.TotalNetPay,
            status: item.Status,
          }));
          this.page.pageNumber = response.Page - 1;
          this.page.totalCount = response.TotalCount;
          this.page.totalPages = response.TotalPages;
          this.loading = false;
          this.blockUI.stop();
        },
        (httpError: HttpErrorResponse) => {
          this.rows = [];
          this.page.totalCount = 0;
          this.loading = false;
          this.blockUI.stop();
          this.toastr.error('', httpError.error?.Message ?? 'Unable to load payroll summary.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        }
      );
  }

  isApproved(row: any): boolean {
    return row?.status?.toUpperCase() === 'APPROVED';
  }

  isRejected(row: any): boolean {
    return row?.status?.toUpperCase() === 'REJECTED';
  }

  viewRejectionReason(row: any): void {
    this.blockUI.start();
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetPayrollSummaryApproverGet(environment.apiVersionForPayroll, this.payrollGroup, row.payrollId, 1, 1)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          this.blockUI.stop();
          // API returns the latest approval round first
          const item = response.Data?.[0];
          const rejections = [
            { role: 'Verified by', name: item?.NotedByNameApprover, status: item?.NotedByApproverStatus, remarks: item?.NotedByRemarks },
            { role: 'Approved by', name: item?.ApprovedByNameApprover, status: item?.ApprovedByApproverStatus, remarks: item?.ApprovedByRemarks },
          ].filter((a) => a.status?.toUpperCase() === 'REJECTED');

          if (!rejections.length) {
            this.toastr.info('', 'No rejection reason found for this payroll.', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              toastClass: 'toast ngx-toastr',
            });
            return;
          }

          const html = rejections
            .map(
              (a) => `
                <div class="text-left mb-1">
                  <small class="text-muted d-block">Rejected by (${this.escapeHtml(a.role)})</small>
                  <div class="font-weight-bolder mb-50">${this.escapeHtml(a.name || '—')}</div>
                  <div class="border rounded p-1" style="white-space: pre-wrap; word-break: break-word;">${this.escapeHtml(
                    a.remarks || 'No remarks provided.'
                  )}</div>
                </div>`
            )
            .join('');

          Swal.fire({
            title: 'Rejection Reason',
            html: `<div class="text-muted mb-1">${this.escapeHtml(row.payPeriod ?? '')}</div>${html}`,
            icon: 'info',
            confirmButtonText: 'Close',
            customClass: { confirmButton: 'btn btn-primary' },
            buttonsStyling: false,
          });
        },
        (httpError: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toastr.error('', httpError.error?.Message ?? 'Unable to load rejection reason.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        }
      );
  }

  private escapeHtml(value: string): string {
    const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, (c) => entities[c] ?? c);
  }

  exportATMEmployees(row: any): void {
    if (!this.isApproved(row)) {
      return;
    }
    this.blockUI.start();
    this.fetchAllATMEmployees(row.payrollId)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (items) => {
          this.blockUI.stop();
          if (!items.length) {
            this.toastr.info('', 'No ATM employees found for this payroll.', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              toastClass: 'toast ngx-toastr',
            });
            return;
          }
          this.downloadCsv(`ATM-Employees-${row.payrollId}.csv`, items);
        },
        (httpError: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toastr.error('', httpError.error?.Message ?? 'Unable to export ATM employees.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        }
      );
  }

  // payrollGroup is the selected database (sofos2_payroll / sofos2_payroll_manager)
  private fetchAllATMEmployees(payrollId: string): Observable<any[]> {
    return this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetEmployeeAtmAmountGet(environment.apiVersionForPayroll, this.payrollGroup, payrollId)
      .pipe(map((response) => (Array.isArray(response) ? response : response?.Data ?? [])));
  }

  private downloadCsv(fileName: string, items: any[]): void {
    const headers = ['Acct. Number', 'Amount', 'Name'];
    const escape = (value: any) => {
      const text = value === null || value === undefined ? '' : String(value);
      return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const lines = items.map((item) =>
      [item.AccountNumber, item.NetPay, item.EmployeeName]
        .map(escape)
        .join(',')
    );
    // BOM so Excel opens the file as UTF-8
    const blob = new Blob(['﻿' + [headers.join(','), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  statusBadgeClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'badge-light-success';
      case 'REJECTED':
        return 'badge-light-danger';
      default:
        return 'badge-light-warning';
    }
  }
}
