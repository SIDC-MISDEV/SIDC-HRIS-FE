import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ProjectReportTemplateAccessPerUserService } from 'app/api/sidc-services/reportserver';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  public contentHeader: object;
  public rows = [];
  public ColumnMode = ColumnMode;
  public loading = false;
  private tempData = [];


  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  page = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
    search: null
  };

  constructor(
    private toastr: ToastrService,
    private projectReportTemplateAccessPerUserService: ProjectReportTemplateAccessPerUserService,
  ) {
    this.unsubscribeAll = new Subject();

   }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Reports',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboard/'
          },
          {
            name: 'Reports',
            isLink: false
          }
        ]
      }
    }

    this.setPage({ offset: 0 });

  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.blockUI.start();
    this.loading = true;
    this.projectReportTemplateAccessPerUserService.apiVversionProjectsProjectReportTemplateAccessPerUserAccessPerUseridAndProjectcodeGet(environment.apiVersion,environment.projectCodeForReportServer,this.page.pageNumber + 1, this.page.size).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
      const { page, totalCount, totalPages } = response;
      this.rows = response.data;
      this.page.pageNumber = page - 1;
      this.page.totalCount = totalCount;
      this.loading = false;
     this.blockUI.stop();
    }, (httpError: HttpErrorResponse) => {
      this.loading = false;
      this.blockUI.stop();
      this.toastr.error('', httpError.error.Message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        toastClass: 'toast ngx-toastr',
      });
      
    });
  }

}
