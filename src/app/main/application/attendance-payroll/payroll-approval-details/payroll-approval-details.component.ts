import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PayrollSummaryService } from 'app/api/sidc-services/payroll';
import { environment } from 'environments/environment';
import * as feather from 'feather-icons';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-approval-details',
  templateUrl: './payroll-approval-details.component.html',
  styleUrls: ['../payroll-approval/payroll-approval.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollApprovalDetailsComponent implements OnInit, OnDestroy {
  public contentHeader: object;
  public ColumnMode = ColumnMode;
  public rows = [];
  public loading = false;
  public payrollId: string;
  public payrollGroup: string;
  // undefined = all employees; true = ATM only; false = non-ATM only
  public isATM: boolean | undefined = undefined;

  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

  public page: { pageNumber: number; size: number; totalCount?: number; totalPages?: number } = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private payrollSummaryService: PayrollSummaryService,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    feather.replace();
    this.payrollId = this.route.snapshot.paramMap.get('id');
    // database the payroll belongs to, passed from the list page (defaults to Rank and File)
    this.payrollGroup = this.route.snapshot.queryParamMap.get('group') ?? 'sofos2_payroll';

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
            isLink: true,
            link: '/application/attendance-payroll/payroll-approval',
          },
          {
            name: 'Details',
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

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.blockUI.start();
    this.loading = true;
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetPayrollSummaryDetailsGet(
        environment.apiVersionForPayroll,
        this.payrollGroup,
        this.payrollId,
        this.isATM,
        this.page.pageNumber + 1,
        this.page.size
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          // API returns PascalCase; map rows to the camelCase props used by the table columns
          this.rows = (response.Data ?? []).map((item: any) => ({
            employeeNum: item.EmployeeNum,
            employeeName: item.EmployeeName,
            grossPay: item.GrossPay,
            totalDeduction: item.TotalDeduction,
            netPay: item.NetPay,
            periodFrom: item.PeriodFrom,
            periodTo: item.PeriodTo,
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
          this.toastr.error('', httpError.error?.Message ?? 'Unable to load payroll summary details.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
        }
      );
  }

  onATMFilterChange(value: string): void {
    this.isATM = value === '' ? undefined : value === 'true';
    this.setPage({ offset: 0 });
  }

  back(): void {
    this.router.navigate(['/application/attendance-payroll/payroll-approval']);
  }
}
