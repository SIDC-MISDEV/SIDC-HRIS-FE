import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEmployeeComponent implements OnInit {

  public contentHeader: object;
  public filterPIMForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
            link:"/admin/pim/"
          },
          {
            name: "Add",
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

  }

}
