import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PayrollSummaryService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import * as feather from 'feather-icons';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      headerTitle: 'Payroll Approval',
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

  view(row): void {
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
