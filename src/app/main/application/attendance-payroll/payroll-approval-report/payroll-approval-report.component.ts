import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { PayrollSummaryService } from 'app/api/sidc-services/payroll';
import { ProjectReportTemplateService } from 'app/api/sidc-services/reportserver';
import { AuthService } from 'app/common/services/auth.service';
import { StringResources } from 'app/common/resources/stringResources';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

export interface ReportDataCommand {
  id: number;
  name?: string;
  description?: string;
  fileName?: string;
  projectModuleId: number;
  projectName: number;
  revisionNumber: string;
  documentNumber: string;
  isActive?: boolean;
}

export type ApprovalDecision = 'APPROVED' | 'REJECTED';

export interface PayrollApprover {
  step: 'notedBy' | 'approvedBy';
  role: string;
  employeeNumber: string;
  name: string;
  position: string;
  status: string;
}

@Component({
  selector: 'app-payroll-approval-report',
  templateUrl: './payroll-approval-report.component.html',
  styleUrls: ['./payroll-approval-report.component.scss'],
})
export class PayrollApprovalReportComponent implements OnInit, OnDestroy {
  @ViewChild('viewer1', { static: false }) viewer: TelerikReportViewerComponent;

  // report-server module code the payroll summary .trdp is registered under
  private readonly projectModuleCode = 'payrollapproval';

  public contentHeader: object;
  public reportData: ReportDataCommand;
  public reportSource = {};
  public payrollId: string;
  public payrollGroup: string;
  public serviceUrl = `${environment.apiUrlForReportServer}/api/Reports/`;
  public approvers: PayrollApprover[] = [];
  public approversLoading = false;
  public approversError: string;
  public actionInProgress = false;
  // payroll_summary.Status, used to detect a final approval whose summary update failed
  public summaryStatus: string;
  public retryingSummaryStatus = false;
  // undefined = all employees; true = ATM only; false = non-ATM only
  public isATM: boolean | undefined = undefined;
  public readonly atmFilterOptions: { label: string; value: boolean | undefined }[] = [
    { label: 'All', value: undefined },
    { label: 'ATM', value: true },
    { label: 'Non-ATM', value: false },
  ];

  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

  viewerContainerStyle = {
    position: 'absolute',
    left: '10px',
    right: '10px',
    top: '10px',
    height: '95%',
    width: '98%',
    overflow: 'hidden',
    clear: 'both',
  };

  constructor(
    private toastr: ToastrService,
    private projectReportTemplateService: ProjectReportTemplateService,
    private payrollSummaryService: PayrollSummaryService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.payrollId = this.activatedRoute.snapshot.paramMap.get('id');
    // database the payroll belongs to, passed from the list page (defaults to Rank and File)
    this.payrollGroup = this.activatedRoute.snapshot.queryParamMap.get('group') ?? 'sofos2_payroll';

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
            name: 'Preview',
            isLink: false,
          },
        ],
      },
    };

    this.getApprovers();
    this.getReport();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getApprovers(): void {
    this.getSummaryStatus();
    this.approversLoading = true;
    this.approversError = null;
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetPayrollSummaryApproverGet(
        environment.apiVersionForPayroll,
        this.payrollGroup,
        this.payrollId,
        1,
        1
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          // API returns PascalCase; one approval record per payroll summary
          const item = response.Data?.[0];
          this.approvers = item
            ? [
                {
                  step: 'notedBy',
                  role: 'Noted by',
                  employeeNumber: item.NotedByEmployeeNumber,
                  name: item.NotedByNameApprover,
                  position: item.NotedByPositionApprover,
                  status: item.NotedByApproverStatus,
                },
                {
                  step: 'approvedBy',
                  role: 'Approved by',
                  employeeNumber: item.ApprovedByEmployeeNumber,
                  name: item.ApprovedByNameApprover,
                  position: item.ApprovedByPositionApprover,
                  status: item.ApprovedByApproverStatus,
                },
              ]
            : [];
          this.approversLoading = false;
        },
        (httpError: HttpErrorResponse) => {
          this.approvers = [];
          this.approversLoading = false;
          this.approversError = httpError.error?.Message ?? 'Unable to load approvers.';
        }
      );
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

  // Buttons show only on the logged-in user's own step, while it is still pending,
  // and only after every earlier step has been approved.
  canAct(index: number): boolean {
    const approver = this.approvers[index];
    const employeeCode = this.authService.currentUserValue?.employeeCode;
    if (!approver || !employeeCode || approver.employeeNumber !== employeeCode) {
      return false;
    }
    if (this.isDecided(approver.status)) {
      return false;
    }
    return this.approvers.slice(0, index).every((a) => a.status?.toUpperCase() === 'APPROVED');
  }

  async onDecision(approver: PayrollApprover, decision: ApprovalDecision): Promise<void> {
    const approving = decision === 'APPROVED';
    const result = await Swal.fire({
      title: approving ? 'Approve payroll summary?' : 'Reject payroll summary?',
      text: approving
        ? 'This payroll summary will be marked as approved.'
        : 'This payroll summary will be marked as rejected.',
      icon: approving ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: approving ? 'Approve' : 'Reject',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        confirmButton: approving ? 'btn btn-success ml-1' : 'btn btn-danger ml-1',
        cancelButton: 'btn btn-outline-secondary',
      },
      buttonsStyling: false,
    });
    if (!result.value) {
      return;
    }

    const body = {
      database: this.payrollGroup,
      payrollId: this.payrollId,
      employeeNumber: approver.employeeNumber,
      status: decision,
    };
    let request$: Observable<any> =
      approver.step === 'notedBy'
        ? this.payrollSummaryService.apiVversionPayrollPayrollSummaryUpdateNotedByStatusPut(environment.apiVersionForPayroll, body)
        : this.payrollSummaryService.apiVversionPayrollPayrollSummaryUpdateApprovedByStatusPut(environment.apiVersionForPayroll, body);

    // Approved by is the final step: once it approves, mark the payroll summary itself as approved
    if (approver.step === 'approvedBy' && approving) {
      request$ = request$.pipe(
        switchMap(() =>
          this.payrollSummaryService.apiVversionPayrollPayrollSummaryUpdatePayrollSummaryStatusPut(environment.apiVersionForPayroll, {
            database: this.payrollGroup,
            payrollId: this.payrollId,
            status: 'APPROVED',
          })
        )
      );
    }

    this.actionInProgress = true;
    request$.pipe(takeUntil(this.unsubscribeAll)).subscribe(
      () => {
        this.actionInProgress = false;
        this.toastr.success('', approving ? 'Payroll summary approved.' : 'Payroll summary rejected.', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          toastClass: 'toast ngx-toastr',
        });
        this.getApprovers();
      },
      (httpError: HttpErrorResponse) => {
        this.actionInProgress = false;
        this.showError(httpError.error?.Message ?? 'Unable to update approval status.');
        // the approver update may have succeeded before a later call failed
        this.getApprovers();
      }
    );
  }

  // There is no get-by-id endpoint, so read the group's summaries and pick this payroll.
  getSummaryStatus(): void {
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryGetPayrollSummaryGet(environment.apiVersionForPayroll, this.payrollGroup, 1, 9999)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          const summary = (response.Data ?? []).find((item: any) => item.PayrollId === this.payrollId);
          this.summaryStatus = summary?.Status;
        },
        () => {
          // leave the status unknown so no out-of-sync warning is shown on a failed lookup
          this.summaryStatus = undefined;
        }
      );
  }

  // Every approver approved, but the payroll summary itself was not marked approved
  // (the follow-up update-payroll-summary-status call failed).
  get isSummaryOutOfSync(): boolean {
    return (
      !this.approversLoading &&
      this.approvers.length > 0 &&
      this.summaryStatus !== undefined &&
      this.approvers.every((a) => a.status?.toUpperCase() === 'APPROVED') &&
      this.summaryStatus?.toUpperCase() !== 'APPROVED'
    );
  }

  // Only the final approver may re-send the summary status update.
  get isFinalApprover(): boolean {
    const employeeCode = this.authService.currentUserValue?.employeeCode;
    const finalApprover = this.approvers[this.approvers.length - 1];
    return !!employeeCode && finalApprover?.employeeNumber === employeeCode;
  }

  retrySummaryStatus(): void {
    this.retryingSummaryStatus = true;
    this.payrollSummaryService
      .apiVversionPayrollPayrollSummaryUpdatePayrollSummaryStatusPut(environment.apiVersionForPayroll, {
        database: this.payrollGroup,
        payrollId: this.payrollId,
        status: 'APPROVED',
      })
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        () => {
          this.retryingSummaryStatus = false;
          this.toastr.success('', 'Payroll summary approved.', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            toastClass: 'toast ngx-toastr',
          });
          this.getSummaryStatus();
        },
        (httpError: HttpErrorResponse) => {
          this.retryingSummaryStatus = false;
          this.showError(httpError.error?.Message ?? 'Unable to update payroll summary status.');
        }
      );
  }

  private isDecided(status: string): boolean {
    const value = status?.toUpperCase();
    return value === 'APPROVED' || value === 'REJECTED';
  }

  getReport(): void {
    this.blockUI.start();
    this.projectReportTemplateService
      .apiVversionProjectsProjectReportTemplateProjectModuleCodeGet(environment.apiVersionForReportServer, this.projectModuleCode, 1, 999)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        async (response) => {
          const templates: ReportDataCommand[] = response.data ?? [];
          this.reportData = templates.find((t) => t.isActive !== false) ?? templates[0];
          if (!this.reportData) {
            this.blockUI.stop();
            this.showError(`No report template registered for "${this.projectModuleCode}".`);
            return;
          }
          this.initReportViewer();
          // give the viewer time to initialise before handing it a report source
          await this.delay(1000);
          this.setReportSource();
          this.blockUI.stop();
        },
        (httpError: HttpErrorResponse) => {
          this.blockUI.stop();
          this.showError(httpError.error?.Message ?? 'Unable to load payroll summary report.');
        }
      );
  }

  initReportViewer(): void {
    const resources = navigator.language === 'ja-JP' ? StringResources.japanese : StringResources.english;
    this.viewer.viewerObject.stringResources = Object.assign(this.viewer.viewerObject.stringResources, resources);
  }

  setReportSource(): void {
    const rs = {
      report: this.reportData.projectModuleId + '/' + this.reportData.fileName,
      parameters: {
        // the report's data source calls the payroll API, which trusts the legacy Identity token
        token: localStorage.getItem('legacyToken') ?? localStorage.getItem('token'),
        hostServer: environment.apiUrlForPayroll,
        payrollId: this.payrollId,
        database: this.payrollGroup,
        // null = no filter; the report's isATM parameter must be a nullable Boolean
        isATM: this.isATM ?? null,
        reportTitle: this.reportData.name,
        reportDescription: this.reportData.description,
        reportProjectName: this.reportData.projectName,
        reportDocumentNumber: this.reportData.documentNumber,
        reportRevisionDate: this.reportData.revisionNumber,
      },
    } as unknown as JSON;

    this.viewer.setReportSource(rs);
  }

  onATMFilterChange(value: boolean | undefined): void {
    if (this.isATM === value || !this.reportData) {
      return;
    }
    this.isATM = value;
    this.setReportSource();
  }

  // The viewer re-enables its toolbar commands on every UI update, so disable the
  // parameters-area toggle each time; database and payrollId are supplied by the page.
  onUpdateUi = (): void => {
    this.viewer?.commands?.toggleParametersArea?.enabled(false);
  };

  private showError(message: string): void {
    this.toastr.error('', message, {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      toastClass: 'toast ngx-toastr',
    });
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
