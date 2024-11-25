import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchService, GoodsIssuanceService } from 'app/api/sidc-services/dw-inventory';
import { IssuanceType } from 'app/common/enums/IssuanceType';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-issuance-details',
  templateUrl: './issuance-details.component.html',
  styleUrls: ['./issuance-details.component.scss']
})
export class IssuanceDetailsComponent implements OnInit {
  contentHeader: object;
  public stDetails: any;
  public stIdLedger: any;
  public totalConversion: any;
  public stockTransfers = [];
  public branches = [];
  public branchCode: string;
  public branchName: string;
  public totalCount: number;
  private unsubscribeAll: Subject<any>;

  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private giService: GoodsIssuanceService,
    private branchService: BranchService
  ) { this.unsubscribeAll = new Subject(); }

  ngOnInit(): void {
    this.stDetails = this.activatedRoute.snapshot.data.IssuanceDetails.data;
    console.log("Data: ", this.stDetails);
    this.branchCode = this.stDetails?.branchCode;
    this.stockTransfers = this.stDetails?.goodsIssuanceDetail;  
    this.getBranchNameByCode();

    this.contentHeader = {
      headerTitle: "Issuance Details",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/application/",
          },
          {
            name: "Issuance",
            isLink: true,
            link: "/application/inventory/issuance/"
          },
          {
            name: "View Issuance Details",
            isLink: false,
          },
        ],
      },
    };    
  }

  getBranchNameByCode(): void {
    this.branchService.apiVversionInventoryStandardentriesBranchBranchCodeGet(
        environment.apiVersion, this.branchCode
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          const { data } = response;
          this.branches = data;          
          this.branchName = data.description;
          console.log("Branches",this.branches);
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

  getInvoiceType(): string | null {
    const transactionType= this.stDetails.transactionTypeCode;

    switch (transactionType) {
      case IssuanceType.StockTransfer:
        return "Stock Transfer";
      case IssuanceType.AdminUse:
        return "Admin Use";
      case IssuanceType.StockOut:
        return "Stock Out";
      case IssuanceType.Spoilage:
        return "Spoilage";
      case IssuanceType.StockFranchise:
        return "Stock Franchise";
      default:
        return null;
    }
  }
}
