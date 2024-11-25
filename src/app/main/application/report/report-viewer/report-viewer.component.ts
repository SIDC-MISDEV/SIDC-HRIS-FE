import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { TelerikReportViewerComponent } from "@progress/telerik-angular-report-viewer";
import { StringResources } from "../../../../common/resources/stringResources";
import { HttpErrorResponse } from '@angular/common/http';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
//import { ProjectReportTemplateService } from 'app/api';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProjectReportTemplateService } from "app/api/sidc-services/reportserver";

export interface ReportDataCommand { 
  id: number;
  name?: string;
  description?: string;
  fileName?: string;
  projectModuleId : number;
  projectName : number;
  revisionNumber : string;
  documentNumber : string;
  isActive?: boolean;
  
}

@Component({
  selector: "app-report-viewer",
  templateUrl: "./report-viewer.component.html",
  styleUrls: ["./report-viewer.component.scss"],
})

export class ReportViewerComponent implements AfterViewInit, OnInit {
  @ViewChild("viewer1", { static: false }) viewer: TelerikReportViewerComponent;

  public reportToken: string;
  public contentHeader: object;
  public reportData : ReportDataCommand;
  reportSource = {};
  public reportId;
  public ColumnMode = ColumnMode;
  public loading = false;
  public serviceUrl = `${environment.apiUrlForReportServer}/api/Reports/`;
  public hostServer = environment.apiUrlForReportGenerator;
  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private toastr: ToastrService,
    private projectReportTemplateService: ProjectReportTemplateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.unsubscribeAll = new Subject();

   }


  ngOnInit(): void {
    //this.mmsToken = sessionStorage.getItem('token');
    this.reportToken = localStorage.getItem('token');
    this.contentHeader = {
      headerTitle: 'Report',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Reports',
            isLink: true,
            link: '/admin/reports/'
          },
          {
            name: 'Preview',
            isLink: false
          }
        ]
      }
    }
    this.reportId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.reportId);
    this.getReport();
  }

  async getReport() {
    this.blockUI.start();
    this.loading = true;
    await  this.projectReportTemplateService.apiVversionProjectsProjectReportTemplateIdGet(this.reportId, environment.apiVersion)
    .pipe(takeUntil(this.unsubscribeAll)).subscribe(async response => {
     this.reportData = response.data;

     this.loading = false;
     this.initReportViewer();
     await this.delay(1000);
     this.setReportSource();
     await this.delay(1000);
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

  initReportViewer(){
    const language = navigator.language;
    let resources = StringResources.english; // Default.

    if (language === "ja-JP") {
      resources = StringResources.japanese;
    }

    this.viewer.viewerObject.stringResources = Object.assign(
      this.viewer.viewerObject.stringResources,
      resources
    );
  }

  ngAfterViewInit(): void {
    
  }

  setReportSource(): void {
    let rs = {
      report: this.reportData.projectModuleId + "/" + this.reportData.fileName,
      parameters: {
        token : this.reportToken,
        hostServer : this.hostServer,
        //reportTitle : this.reportData.description,
        reportTitle :this.reportData.name,
        //reportDescription :  this.reportData.name,
        reportProjectName : this.reportData.projectName,
        reportDocumentNumber : this.reportData.documentNumber,
        reportRevisionDate : this.reportData.revisionNumber,
      }
    } as unknown as JSON;

    this.viewer.setReportSource(rs);
  }

  title = "Report Viewer";
  viewerContainerStyle = {
    position: "absolute",
    left: "10px",
    right: "10px",
    top: "10px",
    height: "95%",
    width: "98%",
    overflow: "hidden",
    clear: "both"
  };

  ready() {
    console.log("ready");

  }
  viewerToolTipOpening(e: any, args: any) {
    console.log("viewerToolTipOpening " + args.toolTip.text);
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
