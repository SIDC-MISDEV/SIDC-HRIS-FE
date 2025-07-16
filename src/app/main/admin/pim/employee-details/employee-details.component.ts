import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import Stepper from "bs-stepper";
import { Subject } from "rxjs";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeDetailsComponent implements OnInit {
  public contentHeader: object;
  public filterPIMForm!: FormGroup;

  private unsubscribeAll: Subject<any>;
  private horizontalWizardStepper: Stepper;
  private bsStepper;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
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
            isLink: true,
            link: "/admin/pim/",
          },
          {
            name: "Edit",
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

    this.horizontalWizardStepper = new Stepper(
      document.querySelector("#pim-stepper"),
      {}
    );

    this.bsStepper = document.querySelectorAll(".bs-stepper");
  }

  goToTab(tabNumber: number){
    console.log("Tab Number: ", tabNumber);
    this.horizontalWizardStepper.to(tabNumber);
  }
}
