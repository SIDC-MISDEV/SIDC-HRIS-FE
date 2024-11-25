import { HttpErrorResponse } from '@angular/common/http';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { GoodsIssuanceService } from 'app/api/sidc-services/dw-inventory';
import { AuthService } from 'app/common/services/auth.service';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-issuance',
  templateUrl: './issuance.component.html',
  styleUrls: ['./issuance.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class IssuanceComponent implements OnInit {

  public contentHeader: object;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public rows = [];
  public user: any;
  public stTransactions: any;
  public branchArray = [];
  public idLedger: any;
  public selectedId: number = undefined;

  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI: NgBlockUI;

   // Decorator
   @ViewChild(DatatableComponent) table: DatatableComponent;
   @ViewChild("selectYear", { static: false }) selectYear: ElementRef;

  page = { 
    year: 2024,
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
    search: null,
  };
  constructor(
    private giService: GoodsIssuanceService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Issuance",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/admin/",
          },
          {
            name: "Issuance",
            isLink: false,
          },
        ],
      },
    };

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const previousUrl = this.router.url;
        sessionStorage.setItem("previousUrl", previousUrl);
        console.log("previousUrl", previousUrl);
      }

      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        sessionStorage.setItem("currentUrl", currentUrl);
        console.log("currentUrl", currentUrl);
      }
    });
    const lastPage = sessionStorage.getItem("lastPage");
    const lastYearVisited = sessionStorage.getItem("lastYearVisited");
    const previousLink = sessionStorage.getItem("previousUrl");
    const currentLink = sessionStorage.getItem("currentUrl");
    if ( lastYearVisited && previousLink && currentLink &&
      previousLink.startsWith("/application/inventory/issuance/issuance-details") &&
      currentLink === "/application/inventory/issuance"
    ) {
      this.page.year = parseInt(lastYearVisited);
      this.setPage({ offset: parseInt(lastPage, 10) });
    } 
    else {
        this.setPage({ offset: 0 });
    }
  }
  
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    sessionStorage.setItem("lastPage", pageInfo.offset);
    
    this.blockUI.start();      

    this.giService
      .apiVversionInventoryTransactionsGoodsIssuanceGetAllByBranchCodeGet(
        environment.apiVersion,
        this.page.pageNumber + 1,
        this.page.size,
        this.page.year
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          const { data, page, totalCount, totalPages } = response;
          this.rows = data.map((r) => {
            return r;
          });
          
          this.page.pageNumber = page - 1;
          this.page.totalCount = totalCount;
          sessionStorage.setItem("lastYearVisited", this.page.year.toString());

          this.blockUI.stop();
        },
        (httpError: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toastr.error("", httpError.error.Message, {
            timeOut: 3000,
            positionClass: "toast-bottom-center",
            toastClass: "toast ngx-toastr",
          });
        }
      );
  }
  
  changeYear(event: any){
    this.setPage({ offset: 0 });
  }

  ngAfterViewInit() {
    const lastYearVisited = sessionStorage.getItem("lastYearVisited");
    const previousLink = sessionStorage.getItem("previousUrl");
    const currentLink = sessionStorage.getItem("currentUrl");
    if (
      lastYearVisited &&
      currentLink.startsWith("/application/inventory/issuance") &&
      !previousLink.startsWith("/application/inventory/issuance")
    ) {
      sessionStorage.removeItem("lastYearVisited");
      console.log("Ready to delete!");
    } else {
      console.log("Not yet ready for deletion");
    }
  }
  
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
