import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/api/sidc-hris-services/employees-information-api';
import { finalize } from 'rxjs/operators';
// import { EmployeesService } from 'src/app/api/sidc-hris-services/employees-information-api'; // adjust path to your generated service

// ---- API response shapes (from your sample response) ----
interface AssignmentDto {
  positionName: string | null;
  departmentName: string | null;
  branchName: string | null;
  strategicGroupName: string | null;
  employmentStatus: number;
  isCurrent: boolean;
}

interface AddressDto {
  addressType: number;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
}

interface EmployeeDto {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  isActive: boolean;
  startDateRegularEmployment: string | null;
  addresses: AddressDto[];
  assignments: AssignmentDto[];
}

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ---- View model used by the table ----
interface Employee {
  id: string;
  serviceStatus: 'Active' | 'Separated';
  employeeNumber: string;
  name: string;
  status: string;
  position: string;
  department: string;
  region: string;
  address: string;
  link?: boolean;
}

// TODO: confirm these values against your backend enum
const EMPLOYMENT_STATUS: Record<number, string> = {
  0: 'Regular',
  1: 'Probationary',
  2: 'Agency'
};

@Component({
  selector: 'app-employees-information',
  templateUrl: './employees-information.component.html',
  styleUrls: ['./employees-information.component.scss']
})
export class EmployeesInformationComponent implements OnInit {
  searchTerm = '';
  loading = false;
  errorMessage = '';
  spinnerBars = Array.from({ length: 12 }, (_, i) => i);

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  trackById(_: number, e: Employee): string { return e.id; }

  constructor(
    private employeesService: EmployeesService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';

    // page 1, large page size so client-side search covers everything
    this.employeesService
      .getAllEmployees(1, 1000)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: PagedResponse<EmployeeDto>) => {
          this.employees = (res?.items ?? []).map(dto => this.toViewModel(dto));
          this.onSearch();
        },
        error: err => {
          console.error('Failed to load employees', err);
          this.errorMessage = 'Unable to load employees. Please try again.';
          this.employees = [];
          this.filteredEmployees = [];
        }
      });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredEmployees = !term
      ? [...this.employees]
      : this.employees.filter(e =>
          e.name.toLowerCase().includes(term) ||
          e.employeeNumber.toLowerCase().includes(term)
        );
  }

  // ---- mapping helpers ----
  private toViewModel(dto: EmployeeDto): Employee {
    const assignment =
      dto.assignments?.find(a => a.isCurrent) ?? dto.assignments?.[0];

    return {
      id: dto.id,
      serviceStatus: dto.isActive ? 'Active' : 'Separated',
      employeeNumber: dto.employeeNumber,
      name: this.buildName(dto),
      status: assignment ? EMPLOYMENT_STATUS[assignment.employmentStatus] ?? '' : '',
      position: assignment?.positionName ?? '',
      department: assignment?.departmentName ?? '',
      region: assignment?.strategicGroupName ?? assignment?.branchName ?? '',
      address: this.buildAddress(dto.addresses),
      link: dto.isActive
    };
  }

  private buildName(dto: EmployeeDto): string {
    const middleInitial = dto.middleName ? `${dto.middleName.charAt(0)}.` : '';
    return [dto.firstName, middleInitial, dto.lastName, dto.suffix]
      .filter(Boolean)
      .join(' ');
  }

  private buildAddress(addresses: AddressDto[]): string {
    // addressType meaning isn't in the sample; using the first address.
    // Change to addresses.find(a => a.addressType === X) once you know which is "work".
    const a = addresses?.[0];
    return a ? [a.barangay, a.city, a.province].filter(Boolean).join(', ') : '';
  }
  
  openEmployee(e: Employee): void {
    this.router.navigate(['/employees-information', e.employeeNumber, 'employee-records']);
  }

}