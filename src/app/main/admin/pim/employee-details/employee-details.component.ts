import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  private unsubscribeAll: Subject<any>;
  private horizontalWizardStepper: Stepper;
  private bsStepper;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const snapshotData = this.activatedRoute.snapshot.data;
    console.log("SNAPSHOT: ", snapshotData);

    this.contentHeader = {
      headerTitle: snapshotData.title,
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
            name: snapshotData.breadcrumb,
            isLink: false,
          },
        ],
      },
    };

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
