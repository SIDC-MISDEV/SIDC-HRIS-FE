import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PayrollSummaryService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import * as feather from 'feather-icons';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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

  constructor(
    private toastr: ToastrService,
    private payrollSummaryService: PayrollSummaryService,
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

    this.setPage({ offset: 0 });
  }

  ngAfterViewChecked() {
    feather.replace();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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
