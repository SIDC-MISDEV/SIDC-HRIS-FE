import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// Scaffold only: no allocation API exists yet. Wire the list up the same way as
// PayrollApprovalComponent once the endpoints are available.
@Component({
  selector: 'app-payroll-allocation-approval',
  templateUrl: './payroll-allocation-approval.component.html',
  styleUrls: ['./payroll-allocation-approval.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollAllocationApprovalComponent implements OnInit {
  public contentHeader: object;
  public payrollGroup = 'sofos2_payroll';

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Payroll Allocation Approval',
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
            name: 'Payroll Allocation',
            isLink: false,
          },
        ],
      },
    };
  }

  onPayrollGroupChange(): void {
    // reload the allocation list here once the API is available
  }
}
