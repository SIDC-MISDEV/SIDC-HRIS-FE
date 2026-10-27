import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { PayrollSummaryService, PayslipService } from 'app/api/sidc-services/payroll';
import { ProjectReportTemplateService } from 'app/api/sidc-services/reportserver';
import { AuthService } from 'app/common/services/auth.service';
import { ModuleCode, Permission } from 'app/common/models/app-access';
import { StringResources } from 'app/common/resources/stringResources';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable, Subject, timer } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ChangePinModalComponent } from '../payroll-pin/change-pin-modal.component';
import { EnterPinModalComponent } from '../payroll-pin/enter-pin-modal.component';

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
  @ViewChild('idleWarningHost', { static: true }) idleWarningHost: ElementRef<HTMLElement>;

  // report-server module code the payroll summary .trdp is registered under
  private readonly projectModuleCode = 'payrollapproval';
  // return to the payroll summary list after this long without user activity
  private readonly idleTimeoutMs = 300000; // 5 minutes
  // the warning is shown during the last few seconds of idleTimeoutMs
  private readonly idleWarningSeconds = 5;
  private readonly listUrl = '/application/attendance-payroll/payroll-summary-approval';

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
  // seconds left before the idle redirect; null while the warning is hidden
  public idleCountdown: number | null = null;
  // the page stays empty until the PIN is accepted (or PIN protection is off)
  public pinVerified = false;
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
    private router: Router,
    private ngZone: NgZone,
    private payslipService: PayslipService,
    private modalService: NgbModal,
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
            link: '/application/attendance-payroll/payroll-summary-approval',
          },
          {
            name: 'Preview',
            isLink: false,
          },
        ],
      },
    };

    this.checkPinRequirement();
    // a transformed or overflow-hidden ancestor would trap a fixed element, so host it on <body>
    document.body.appendChild(this.idleWarningHost.nativeElement);
    this.watchIdle();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.idleWarningHost.nativeElement.remove();
    this.modalService.dismissAll();
  }

  // The payroll summary uses the employee's payslip PIN and its on/off setting. Nothing is
  // loaded until the PIN is accepted; cancelling returns to the payroll summary list.
  private checkPinRequirement(): void {
    this.payslipService
      .apiVversionPayrollPayslipGetEmployeePinIsRequiredGet(environment.apiVersionForPayroll)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => (response?.Data?.IsRequired === false ? this.unlock() : this.checkPinExpiry()),
        // fail safe: ask for the PIN when the setting can't be confirmed
        () => this.checkPinExpiry()
      );
  }

  private checkPinExpiry(): void {
    this.payslipService
      .apiVversionPayrollPayslipGetEmployeePinExpiryGet(environment.apiVersionForPayroll)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: any) => this.promptForPin(response?.Message === 'PIN expired'),
        () => this.promptForPin(false)
      );
  }

  private promptForPin(expired: boolean): void {
    const modalRef = expired
      ? this.modalService.open(ChangePinModalComponent, { backdrop: 'static', keyboard: false })
      : this.modalService.open(EnterPinModalComponent, { backdrop: 'static', keyboard: false });
    if (expired) {
      modalRef.componentInstance.message = 'Your PIN has expired. Please change it to view the payroll summary.';
    }
    modalRef.result.then(
      () => this.unlock(),
      () => this.router.navigate([this.listUrl], { queryParams: { group: this.payrollGroup } })
    );
  }

  private unlock(): void {
    this.pinVerified = true;
    this.getApprovers();
    this.getReport();
  }

  // Any activity restarts the countdown and hides the warning. The warning shows for the
  // last idleWarningSeconds; while the page is busy (report loading, a modal open, a decision
  // being saved) the warning is held back and the countdown starts over once it's free.
  private watchIdle(): void {
    this.ngZone.runOutsideAngular(() => {
      const activity$ = merge(
        ...['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'].map((name) => fromEvent(document, name)),
        // capture so scrolling inside the report viewer counts too
        fromEvent(document, 'scroll', { capture: true })
      );

      activity$
        .pipe(
          startWith(null),
          switchMap(() => {
            this.setIdleCountdown(null);
            let remaining = this.idleWarningSeconds;
            return timer(this.idleTimeoutMs - this.idleWarningSeconds * 1000, 1000).pipe(
              map(() => {
                if (this.isBusy()) {
                  remaining = this.idleWarningSeconds;
                  this.setIdleCountdown(null);
                  return false;
                }
                if (remaining === 0) {
                  return true;
                }
                this.setIdleCountdown(remaining--);
                return false;
              })
            );
          }),
          filter((expired) => expired),
          take(1),
          takeUntil(this.unsubscribeAll)
        )
        .subscribe(() =>
          this.ngZone.run(() => {
            this.idleCountdown = null;
            this.toastr.info('', 'Returned to the payroll summary list due to inactivity.', {
              timeOut: 3000,
              positionClass: 'toast-bottom-center',
              toastClass: 'toast ngx-toastr',
            });
            this.router.navigate([this.listUrl], { queryParams: { group: this.payrollGroup } });
          })
        );
    });
  }

  // re-enter the zone only when the value changes so mousemove doesn't trigger change detection
  private setIdleCountdown(value: number | null): void {
    if (this.idleCountdown !== value) {
      this.ngZone.run(() => (this.idleCountdown = value));
    }
  }

  private isBusy(): boolean {
    return Swal.isVisible() || this.modalService.hasOpenModals() || this.actionInProgress || this.retryingSummaryStatus || this.blockUI.isActive;
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
                  role: 'Verified by',
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

  // Approve/reject/retry need `edit` on the Payroll Summary module (token response applications)
  get canEdit(): boolean {
    return this.authService.hasPermission(ModuleCode.PayrollSummary, Permission.Edit);
  }

  // Buttons show only on the logged-in user's own step, while it is still pending,
  // and only after every earlier step has been approved.
  canAct(index: number): boolean {
    if (!this.canEdit) {
      return false;
    }
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
        : 'This payroll summary will be marked as rejected. Please state the reason.',
      icon: approving ? 'question' : 'warning',
      // a reject must carry remarks; the modal stays open until some are entered
      ...(approving
        ? {}
        : {
            input: 'textarea' as const,
            inputPlaceholder: 'Enter remarks...',
            // matches the API's 500-character limit on remarks
            inputAttributes: { 'aria-label': 'Remarks', maxlength: '500' },
            inputValidator: (value: string) => (!value?.trim() ? 'Remarks are required to reject.' : null),
          }),
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
    const remarks = approving ? undefined : String(result.value).trim();
    if (!approving && !remarks) {
      return;
    }

    const body = {
      database: this.payrollGroup,
      payrollId: this.payrollId,
      employeeNumber: approver.employeeNumber,
      status: decision,
      remarks,
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
        // the report's data source calls the payroll API with this token
        token: localStorage.getItem('token'),
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
