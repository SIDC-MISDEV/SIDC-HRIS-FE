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
  public filterEmployeeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Employees",
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
            name: "Employees",
            isLink: true,
            link:"/admin/employee/"
          },
          {
            name: "Add",
            isLink: false,
          },
        ],
      },
    };

    this.filterEmployeeForm = this.formBuilder.group({
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
