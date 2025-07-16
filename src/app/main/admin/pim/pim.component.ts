import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import * as feather from 'feather-icons';


@Component({
  selector: "app-pim",
  templateUrl: "./pim.component.html",
  styleUrls: ["./pim.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PIMComponent implements OnInit {
  public contentHeader: object;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public rows = [];
  public filterPIMForm!: FormGroup;
  public isEmployeeInfoVisible:boolean=true;
  public page = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
    // search: null
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    feather.replace();
    this.contentHeader = {
      headerTitle: "PIM",
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
            name: "PIM",
            isLink: false,
          },
        ],
      },
    };

    this.filterPIMForm = this.formBuilder.group({
      employeeName: [null],
      employeeCode: [null],
      employmentStatusId: [0],
      filterInclusion: [null],
      immediateSuperior: [null],
      jobTitle: [null],
      departmentId: [0],
    });

    this.setPage({offset: 0});
  }

  ngAfterViewChecked() {
    feather.replace();
  }

  toggleEmployeeInfoVisibility() {
    this.isEmployeeInfoVisible = !this.isEmployeeInfoVisible;
    setTimeout(() => {
      feather.replace();
    });
  } 

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    let staticResponse = {
      data: [
        {
          id: 1,
          employeeCode: "SIDC3422",
          firstName: "Lance Chester",
          lastName: "Malaluan",
          jobTitle: "ASE",
          status: "Regular",
          department: "MIS",
          immediateSuperior: "Magnaye, Jeffrey",
        },
        {
          id: 2,
          employeeCode: "SIDC3422",
          firstName: "Geraldine",
          lastName: "Candelaria",
          jobTitle: "ASE",
          status: "Regular",
          department: "MIS",
          immediateSuperior: "Lopez, Justine Joy",
        },
        {
          id: 3,
          employeeCode: "SIDC3422",
          firstName: "Jonelle Ervyn",
          lastName: "Mesa",
          jobTitle: "ASE",
          status: "Regular",
          department: "MIS",
          immediateSuperior: "De Gracia, Ricardo",
        },
      ],
      page: 1,
      totalPages: 1,
      totalCount: 3,
      hasPreviousPage: false,
      hasNextPage: false,
      failed: false,
      message: null,
      succeeded: true,
    };    
    const { data, page, totalCount, totalPages } = staticResponse;
    this.rows = data;
    this.page.pageNumber = page-1;
    this.page.totalCount = totalCount;
  }
}
