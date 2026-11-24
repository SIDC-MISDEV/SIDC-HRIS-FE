import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'app/api/sidc-hris-services/employees-information-api';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

// TODO: adjust this path to wherever your generated "Employee Development Records API" lives
import {
  DisciplinaryActionsService,
  EmployeeDisciplinaryCasesService,
  EmployeePerformanceEvaluationsService,
  EmployeeTrainingParticipantsService
} from 'app/api/sidc-hris-services/employee-development-records-api';

/* =========================================================
   1. TYPES: UI
   ========================================================= */
interface NavItem {
  key: string;
  label: string;
  icon: string;
  route: string;
}

interface EducationRow {
  label: string;
  level: number | null;   // backend enum value; null = not mapped yet
  hasCourse: boolean;     // false = Course/Program shows "-" instead of "n/a"
}

/** Tables that have the Expand / Download / Print menu */
type TableKey = 'movement' | 'training' | 'disciplinary';

/** Cards that have an edit modal */
type EditSection = 'job' | 'personal' | 'contact' | 'government';

interface AddressForm {
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
}

/** Flat model bound to the edit modal (only the fields of the open section are shown) */
interface EditForm {
  // personal
  gender: number | null;
  dateOfBirth: string;
  civilStatus: number | null;
  birthplace: string;
  mothersMaidenName: string;
  nationality: string;
  // address & contact
  contactNumberOne: string;
  contactNumberTwo: string;
  email: string;
  presentAddress: AddressForm;
  permanentAddress: AddressForm;
  // government ids
  sssNumber: string;
  pagIbigNumber: string;
  philHealthNumber: string;
  tinNumber: string;
  healthCardNumber: string;
  // job summary dates
  dateHired: string;
  startDateAgencyEmployment: string;
  startDateProbationaryEmployment: string;
  startDateRegularEmployment: string;
}

interface MovementRow {
  description: string;
  startDate: string;
  positionFrom: string;
  positionTo: string;
  divisionFrom: string;
  divisionTo: string;
  departmentFrom: string;
  departmentTo: string;
}

interface TrainingRow {
  title: string;
  date: string;       // ISO date
  venue: string;
}

interface DisciplinaryRow {
  date: string;       // ISO date
  policy: string;
  description: string;
  sanction: string;
}

interface PerformanceEvaluation {
  year: number;
  pdfUrl: string | null;
}

interface PerformanceRating {
  year: number;
  rating: number;
  position: string;
  department: string;
}

interface ChartTick { y: number; label: string; }
interface ChartPoint { x: number; y: number; rating: string; lines: string[]; }
interface RatingChart {
  left: number;
  right: number;
  bottom: number;
  ticks: ChartTick[];
  points: ChartPoint[];
  polyline: string;
}

/* =========================================================
   2. TYPES: API RESPONSE (getEmployeesByEmployeeNumber)
   ========================================================= */
interface GovernmentIdsDto {
  sssNumber: string | null;
  pagIbigNumber: string | null;
  philHealthNumber: string | null;
  tinNumber: string | null;
  healthCardNumber: string | null;
}

interface EducationDto {
  level: number;
  schoolName: string;
  courseProgram: string;
  yearStarted: number;
  yearGraduated: number | null;
  isGraduate: boolean;
  honors: string | null;
}

interface DependentDto {
  name: string;
  relationship: string;
  gender: number;
  dateOfBirth: string;
  isBeneficiary: boolean;
}

interface AddressDto {
  addressType: number;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
}

interface AssignmentDto {
  positionName: string | null;
  departmentName: string | null;
  branchName: string | null;
  strategicGroupName: string | null;
  employmentStatus: number;
  movementType: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isCurrent: boolean;
  remarks: string | null;
}

interface EmployeeDetailDto {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  dateOfBirth: string;
  birthplace: string;
  gender: number;
  civilStatus: number;
  nationality: string;
  bloodType: string;
  memberCode: string | null;
  contactNumberOne: string;
  contactNumberTwo: string | null;
  email: string;
  mothersMaidenName: string;
  fathersName: string;
  photoUrl: string | null;
  dateHired: string;
  startDateAgencyEmployment: string | null;
  startDateProbationaryEmployment: string | null;
  startDateRegularEmployment: string | null;
  endDate: string | null;
  separationReason: string | null;
  isActive: boolean;
  governmentIds: GovernmentIdsDto;
  educations: EducationDto[];
  dependents: DependentDto[];
  addresses: AddressDto[];
  assignments: AssignmentDto[];
}

/* =========================================================
   2b. TYPES: DEVELOPMENT RECORDS API RESPONSES
   TODO: these field names are ASSUMED (the generated services return `any`).
   Compare them with a real response and fix the names here; the mappers in
   section 16b are the only other place that uses them.
   ========================================================= */
interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface TrainingParticipantDto {
  employeeId: string;
  courseTitle: string;
  startDate: string;
  venue: string | null;
}

interface PerformanceEvaluationDto {
  employeeId: string;
  periodYear: number;
  overallRating: number | null;
  documentUrl: string | null;
}

interface DisciplinaryCaseDto {
  id: string;
  employeeId: string;
  incidentDate: string;
  policyViolated: string;
  description: string;
}

interface DisciplinaryActionDto {
  disciplinaryCaseId: string;
  employeeId: string;
  sanction: string;
}

/* =========================================================
   3. CONSTANTS: ENUM LABELS
   TODO: confirm all of these against your backend enums
   ========================================================= */
const EMPLOYMENT_STATUS: Record<number, string> = { 0: 'Regular', 1: 'Probationary', 2: 'Agency' };
const GENDER: Record<number, string> = { 1: 'Male', 2: 'Female' };
const CIVIL_STATUS: Record<number, string> = { 1: 'Single', 2: 'Married', 3: 'Widowed', 4: 'Separated' };

// Placeholder values: only 0 appears in your sample data.
const MOVEMENT_TYPE: Record<number, string> = {
  0: 'New Hire',
  1: 'Promotion',
  2: 'Lateral Transfer',
  3: 'Wage Adjustment',
  4: 'Merit Increase'
};

/* =========================================================
   3b. CONSTANTS: EDIT MODAL
   ========================================================= */
// TODO: confirm against your backend enum (same assumption as presentAddress / permanentAddress)
const ADDRESS_PRESENT = 1;
const ADDRESS_PERMANENT = 2;

const toOptions = (map: Record<number, string>) =>
  Object.keys(map).map(k => ({ value: Number(k), label: map[Number(k)] }));

const EDIT_TITLES: Record<EditSection, string> = {
  job: 'Edit Job Summary',
  personal: 'Edit Personal Details',
  contact: 'Edit Address and Contact Details',
  government: 'Edit Government Membership Information'
};

/* =========================================================
   4. CONSTANTS: EDUCATION TABLE ROWS
   TODO: confirm the level numbers against your backend enum.
   Only 1 = Bachelor's comes from your sample data; the rest are placeholders.
   ========================================================= */
const EDUCATION_ROWS: EducationRow[] = [
  { label: 'Pre-Elementary',            level: 10, hasCourse: false },
  { label: 'Elementary',                level: 11, hasCourse: false },
  { label: 'Highschool (BEC)',          level: 12, hasCourse: false },
  { label: 'Junior High School (K-12)', level: 13, hasCourse: false },
  { label: 'Senior Highschool (K-12)',  level: 14, hasCourse: false },
  { label: 'Vocational / Technical',    level: 15, hasCourse: true },
  { label: 'Associate Degree',          level: 16, hasCourse: true },
  { label: "Bachelor's Degree",         level: 1,  hasCourse: true },
  { label: "Master's Degree",           level: 2,  hasCourse: true },
  { label: 'Doctorate Degree',          level: 3,  hasCourse: true },
  { label: 'Postdoctoral',              level: 17, hasCourse: true }
];

/* =========================================================
   5. CONSTANTS: TABLE EXPORT TITLES
   ========================================================= */
const TABLE_TITLES: Record<TableKey, string> = {
  movement: 'Employee Movement (Personnel Action) History',
  training: 'Learning and Development Activities Attended',
  disciplinary: 'Summary of Disciplinary Action Received'
};

/* =========================================================
   6. CONSTANTS: API PAGE SIZE
   Large page so everything for one employee arrives in a single request.
   ========================================================= */
const PAGE_SIZE = 1000;

@Component({
  selector: 'app-employee-records',
  templateUrl: './employee-records.component.html',
  styleUrls: ['./employee-records.component.scss']
})
export class EmployeeRecordsComponent implements OnInit {

  /* -------------------------------------------------------
     7. STATE
     ------------------------------------------------------- */
  activeTab = 'overview';
  employeeNumber = '';

  employee: EmployeeDetailDto | null = null;
  loading = false;
  errorMessage = '';

  navItems: NavItem[] = [
    { key: 'overview',     label: 'Overview',               icon: 'icon-user',     route: 'overview' },
    { key: 'personal',     label: 'Personal Information',   icon: 'icon-id-card',  route: 'personal-information' },
    { key: 'education',    label: 'Educational Background', icon: 'icon-book',     route: 'educational-background' },
    { key: 'movement',     label: 'Movement History',       icon: 'icon-movement', route: 'movement-history' },
    { key: 'training',     label: 'Training Records',       icon: 'icon-training', route: 'training-records' },
    { key: 'performance',  label: 'Performance Records',    icon: 'icon-chart',    route: 'performance-records' },
    { key: 'disciplinary', label: 'Disciplinary Records',   icon: 'icon-gavel',    route: 'disciplinary-records' }
  ];

  // table data
  movementRows: MovementRow[] = [];
  trainingRows: TrainingRow[] = [];
  disciplinaryRows: DisciplinaryRow[] = [];
  evaluations: PerformanceEvaluation[] = [];
  chart: RatingChart = this.buildChart([]);

  // table toolbar (Expand / Download / Print)
  openMenu: TableKey | null = null;
  expandedKey: TableKey | null = null;

  // edit modal
  editSection: EditSection | null = null;
  editForm: EditForm = this.emptyForm();
  saving = false;
  saveError = '';
  readonly genderOptions = toOptions(GENDER);
  readonly civilStatusOptions = toOptions(CIVIL_STATUS);

  /* -------------------------------------------------------
     8. CONSTRUCTOR & LIFECYCLE
     ------------------------------------------------------- */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private trainingParticipantsService: EmployeeTrainingParticipantsService,
    private performanceEvaluationsService: EmployeePerformanceEvaluationsService,
    private disciplinaryCasesService: EmployeeDisciplinaryCasesService,
    private disciplinaryActionsService: DisciplinaryActionsService
  ) { }

  ngOnInit(): void {
    this.employeeNumber = this.route.snapshot.paramMap.get('employeeNumber') ?? '';

    // Restore the active tab from the URL (?tab=personal) on load/refresh
    const tabFromUrl = this.route.snapshot.queryParamMap.get('tab');
    if (tabFromUrl && this.navItems.some(n => n.key === tabFromUrl)) {
      this.activeTab = tabFromUrl;
    }

    this.loadEmployee();
  }

  /* -------------------------------------------------------
     9. DATA LOADING
     ------------------------------------------------------- */
  loadEmployee(): void {
    if (!this.employeeNumber) {
      this.errorMessage = 'No employee number provided.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.employeesService
      .getEmployeesByEmployeeNumber(this.employeeNumber)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: EmployeeDetailDto) => {
          this.employee = res;
          this.movementRows = this.buildMovementRows(res.assignments ?? []);
          this.loadDevelopmentRecords(res);
        },
        error: err => {
          console.error('Failed to load employee', err);
          this.errorMessage = 'Unable to load employee record. Please try again.';
          this.employee = null;
          this.movementRows = [];
          this.trainingRows = [];
          this.evaluations = [];
          this.disciplinaryRows = [];
          this.chart = this.buildChart([]);
        }
      });
  }

  /* -------------------------------------------------------
     10. TAB NAVIGATION
     ------------------------------------------------------- */
  /** Called when a nav item is clicked: shows its section, hides the rest */
  selectTab(item: NavItem): void {
    this.activeTab = item.key;
    this.expandedKey = null;
    this.openMenu = null;

    // Keep the tab in the URL without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: item.key },
      queryParamsHandling: 'merge'
    });
  }

  isActive(key: string): boolean {
    return this.activeTab === key;
  }

  /* -------------------------------------------------------
     11. PROFILE CARD (left column)
     ------------------------------------------------------- */
  get fullName(): string {
    const e = this.employee;
    if (!e) { return ''; }
    const mi = e.middleName ? `${e.middleName.charAt(0)}.` : '';
    return [e.firstName, mi, e.lastName, e.suffix].filter(Boolean).join(' ');
  }

  get photoSrc(): string {
    return this.employee?.photoUrl || 'assets/images/avatar-placeholder.png';
  }

  /* -------------------------------------------------------
     12. TAB: OVERVIEW
     ------------------------------------------------------- */
  get currentAssignment(): AssignmentDto | null {
    const list = this.employee?.assignments ?? [];
    return list.find(a => a.isCurrent) ?? list[0] ?? null;
  }

  get employmentStatusLabel(): string {
    const a = this.currentAssignment;
    return a ? EMPLOYMENT_STATUS[a.employmentStatus] ?? '' : '';
  }

  get workAddress(): string {
    // TODO: filter by the addressType that means "work" once you know it
    const a = this.employee?.addresses?.[0];
    return a
      ? [a.street, a.barangay, a.city, a.province, a.zipCode].filter(Boolean).join(', ')
      : '';
  }

  get probationaryTenure(): string {
    const e = this.employee;
    return this.tenureYears(
      e?.startDateProbationaryEmployment,
      e?.startDateRegularEmployment ?? e?.endDate
    );
  }

  get regularTenure(): string {
    return this.tenureYears(this.employee?.startDateRegularEmployment, this.employee?.endDate);
  }

  openJobDescription(): void { }
  openKpi(): void { }
  openCompetency(): void { }

  /* -------------------------------------------------------
     13. TAB: PERSONAL INFORMATION
     ------------------------------------------------------- */
  get age(): string {
    const dob = this.employee?.dateOfBirth;
    if (!dob) { return ''; }

    const b = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - b.getFullYear();
    const hadBirthday =
      now.getMonth() > b.getMonth() ||
      (now.getMonth() === b.getMonth() && now.getDate() >= b.getDate());
    if (!hadBirthday) { years--; }

    return `${years} years old`;
  }

  get qualifiedDependents(): number {
    return this.employee?.dependents?.length ?? 0;
  }

  // TODO: confirm addressType values against your backend enum (assumed 1 = Present, 2 = Permanent)
  get presentAddress(): string {
    return this.formatAddress(this.employee?.addresses?.find(a => a.addressType === 1));
  }

  get permanentAddress(): string {
    return this.formatAddress(this.employee?.addresses?.find(a => a.addressType === 2));
  }

  /* -------------------------------------------------------
     14. TAB: EDUCATIONAL BACKGROUND
     ------------------------------------------------------- */
  get educationTable() {
    const records = this.employee?.educations ?? [];
    const empty = 'n/a';

    return EDUCATION_ROWS.map(row => {
      const ed = records.find(r => r.level === row.level);
      const noCourse = row.hasCourse ? empty : '-';

      return {
        level: row.label,
        school: ed?.schoolName || empty,
        address: empty, // not in the API response yet (e.g. add ed?.schoolAddress later)
        years: ed ? `${ed.yearStarted} to ${ed.yearGraduated ?? 'Present'}` : empty,
        course: ed ? (ed.courseProgram || noCourse) : noCourse
      };
    });
  }

  /* -------------------------------------------------------
     15. TAB: MOVEMENT HISTORY
     Built from `assignments`: each row compares an assignment with the one before it.
     ------------------------------------------------------- */
  private buildMovementRows(assignments: AssignmentDto[]): MovementRow[] {
    const sorted = [...assignments].sort(
      (a, b) => new Date(a.effectiveFrom).getTime() - new Date(b.effectiveFrom).getTime()
    );
    const dash = '-';

    return sorted.map((a, i) => {
      const prev = i > 0 ? sorted[i - 1] : null;
      return {
        description: MOVEMENT_TYPE[a.movementType] ?? dash,
        startDate: a.effectiveFrom,
        positionFrom: prev?.positionName || dash,
        positionTo: a.positionName || dash,
        // Division uses branchName, matching the "Region/Division" field on the Overview tab
        divisionFrom: prev?.branchName || dash,
        divisionTo: a.branchName || dash,
        departmentFrom: prev?.departmentName || dash,
        departmentTo: a.departmentName || dash
      };
    });
  }

  /* -------------------------------------------------------
     16. TAB: PERFORMANCE RECORDS
     ------------------------------------------------------- */
  openEvaluation(ev: PerformanceEvaluation): void {
    if (ev.pdfUrl) {
      window.open(ev.pdfUrl, '_blank');
    }
  }

  /** Builds the SVG line chart geometry (no chart library needed) */
  private buildChart(history: PerformanceRating[]): RatingChart {
    const left = 60;
    const right = 740;
    const top = 30;
    const bottom = 200;
    const empty: RatingChart = { left, right, bottom, ticks: [], points: [], polyline: '' };

    if (!history.length) { return empty; }

    const sorted = [...history].sort((a, b) => a.year - b.year);
    const ratings = sorted.map(h => h.rating);
    const yMin = Math.min(4, Math.floor(Math.min(...ratings)));
    const yMax = Math.max(4.8, Math.ceil(Math.max(...ratings) * 5) / 5);
    const yOf = (v: number) => bottom - ((v - yMin) / (yMax - yMin)) * (bottom - top);

    const steps = Math.round((yMax - yMin) / 0.2);
    const ticks: ChartTick[] = Array.from({ length: steps + 1 }, (_, i) => {
      const v = yMin + i * 0.2;
      return { y: yOf(v), label: Number.isInteger(v) ? String(v) : v.toFixed(1) };
    });

    const slot = (right - left) / sorted.length;
    const points: ChartPoint[] = sorted.map((h, i) => ({
      x: left + slot * (i + 0.5),
      y: yOf(h.rating),
      rating: h.rating.toFixed(1),
      lines: [String(h.year), ...this.wrap(h.position, 18), ...this.wrap(h.department, 18)]
    }));

    return {
      left,
      right,
      bottom,
      ticks,
      points,
      polyline: points.map(p => `${p.x},${p.y}`).join(' ')
    };
  }

  /** Splits text into lines of roughly `max` characters, breaking on spaces */
  private wrap(text: string, max: number): string[] {
    const lines: string[] = [];
    let line = '';
    for (const word of text.split(' ')) {
      if (line && (line + ' ' + word).length > max) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    if (line) { lines.push(line); }
    return lines;
  }

  /* -------------------------------------------------------
     16b. DEVELOPMENT RECORDS (training / performance / disciplinary)
     Each request fails on its own: a failed call only empties its own tab.
     ------------------------------------------------------- */
  private loadDevelopmentRecords(emp: EmployeeDetailDto): void {
    this.loadTrainings(emp);
    this.loadPerformance(emp);
    this.loadDisciplinary(emp);
  }

  private loadTrainings(emp: EmployeeDetailDto): void {
    // This endpoint has no employeeId filter, so we filter client-side.
    // TODO: ask the backend to add an employeeId parameter.
    this.trainingParticipantsService
      .getAllEmployeeTrainingParticipants(1, PAGE_SIZE)
      .pipe(catchError(err => this.logAndEmpty('trainings', err)))
      .subscribe((res: PagedResponse<TrainingParticipantDto> | null) => {
        this.trainingRows = (res?.items ?? [])
          .filter(p => p.employeeId === emp.id)
          .map(p => ({
            title: p.courseTitle || '-',
            date: p.startDate,
            venue: p.venue || '-'
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      });
  }

  private loadPerformance(emp: EmployeeDetailDto): void {
    this.performanceEvaluationsService
      .getAllEmployeePerformanceEvaluations(1, PAGE_SIZE, emp.id)
      .pipe(catchError(err => this.logAndEmpty('performance evaluations', err)))
      .subscribe((res: PagedResponse<PerformanceEvaluationDto> | null) => {
        const list = (res?.items ?? [])
          .filter(e => typeof e.periodYear === 'number')
          .sort((a, b) => a.periodYear - b.periodYear);

        // PDF cards
        this.evaluations = list.map(e => ({
          year: e.periodYear,
          pdfUrl: e.documentUrl ?? null
        }));

        // Rating chart. Position/department under each year come from the
        // assignment the employee held at the end of that year.
        const ratings: PerformanceRating[] = list
          .filter(e => typeof e.overallRating === 'number')
          .map(e => {
            const a = this.assignmentForYear(emp.assignments, e.periodYear);
            return {
              year: e.periodYear,
              rating: e.overallRating as number,
              position: a?.positionName ?? '',
              department: a?.departmentName ?? ''
            };
          });
        this.chart = this.buildChart(ratings);
      });
  }

  private loadDisciplinary(emp: EmployeeDetailDto): void {
    // Cases hold date / policy / description; actions hold the sanction.
    forkJoin({
      cases: this.disciplinaryCasesService
        .getAllEmployeeDisciplinaryCases(1, PAGE_SIZE, emp.id)
        .pipe(catchError(err => this.logAndEmpty('disciplinary cases', err))),
      actions: this.disciplinaryActionsService
        .getAllDisciplinaryActions(1, PAGE_SIZE, undefined, emp.id)
        .pipe(catchError(err => this.logAndEmpty('disciplinary actions', err)))
    }).subscribe(({ cases, actions }) => {
      const sanctions = new Map<string, string[]>();
      for (const a of ((actions as PagedResponse<DisciplinaryActionDto> | null)?.items ?? [])) {
        const list = sanctions.get(a.disciplinaryCaseId) ?? [];
        if (a.sanction) { list.push(a.sanction); }
        sanctions.set(a.disciplinaryCaseId, list);
      }

      this.disciplinaryRows = ((cases as PagedResponse<DisciplinaryCaseDto> | null)?.items ?? [])
        .map(c => ({
          date: c.incidentDate,
          policy: c.policyViolated || '-',
          description: c.description || '-',
          sanction: sanctions.get(c.id)?.join(', ') || '-'
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  /** The assignment in effect at the end of `year` (latest one that started by then) */
  private assignmentForYear(list: AssignmentDto[] | null | undefined, year: number): AssignmentDto | null {
    const yearEnd = new Date(year, 11, 31).getTime();
    return (list ?? [])
      .filter(a => new Date(a.effectiveFrom).getTime() <= yearEnd)
      .sort((a, b) => new Date(b.effectiveFrom).getTime() - new Date(a.effectiveFrom).getTime())[0] ?? null;
  }

  private logAndEmpty(what: string, err: unknown) {
    console.error(`Failed to load ${what}`, err);
    return of(null);
  }

  /* -------------------------------------------------------
     16c. EDIT MODAL
     Click the edit icon -> modal opens prefilled -> Save calls updateEmployee.
     ------------------------------------------------------- */
  get editTitle(): string {
    return this.editSection ? EDIT_TITLES[this.editSection] : '';
  }

  openEdit(section: EditSection): void {
    const e = this.employee;
    if (!e) { return; }

    const date = (v: string | null | undefined) => (v ? v.slice(0, 10) : ''); // <input type="date"> needs yyyy-MM-dd
    const addr = (type: number): AddressForm => {
      const a = e.addresses?.find(x => x.addressType === type);
      return {
        street: a?.street ?? '',
        barangay: a?.barangay ?? '',
        city: a?.city ?? '',
        province: a?.province ?? '',
        zipCode: a?.zipCode ?? ''
      };
    };
    const g = e.governmentIds;

    this.editForm = {
      gender: e.gender ?? null,
      dateOfBirth: date(e.dateOfBirth),
      civilStatus: e.civilStatus ?? null,
      birthplace: e.birthplace ?? '',
      mothersMaidenName: e.mothersMaidenName ?? '',
      nationality: e.nationality ?? '',
      contactNumberOne: e.contactNumberOne ?? '',
      contactNumberTwo: e.contactNumberTwo ?? '',
      email: e.email ?? '',
      presentAddress: addr(ADDRESS_PRESENT),
      permanentAddress: addr(ADDRESS_PERMANENT),
      sssNumber: g?.sssNumber ?? '',
      pagIbigNumber: g?.pagIbigNumber ?? '',
      philHealthNumber: g?.philHealthNumber ?? '',
      tinNumber: g?.tinNumber ?? '',
      healthCardNumber: g?.healthCardNumber ?? '',
      dateHired: date(e.dateHired),
      startDateAgencyEmployment: date(e.startDateAgencyEmployment),
      startDateProbationaryEmployment: date(e.startDateProbationaryEmployment),
      startDateRegularEmployment: date(e.startDateRegularEmployment)
    };
    this.saveError = '';
    this.editSection = section;
  }

  closeEdit(): void {
    if (this.saving) { return; }
    this.editSection = null;
  }

  saveEdit(): void {
    const e = this.employee;
    const section = this.editSection;
    if (!e || !section || this.saving) { return; }

    const updated = this.applyEdit(e, section, this.editForm);

    this.saving = true;
    this.saveError = '';

    // TODO: if your UpdateEmployeeCommand differs from the employee response, adapt it in applyEdit()
    this.employeesService
      .updateEmployee(updated as any, e.id)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.employee = updated;   // show the saved values straight away
          this.editSection = null;
        },
        error: err => {
          console.error('Failed to update employee', err);
          this.saveError = 'Unable to save changes. Please try again.';
        }
      });
  }

  /** Returns a copy of the employee with only the open section's fields replaced */
  private applyEdit(e: EmployeeDetailDto, section: EditSection, f: EditForm): EmployeeDetailDto {
    const orNull = (v: string) => (v && v.trim() ? v.trim() : null);

    switch (section) {
      case 'personal':
        return {
          ...e,
          gender: f.gender as number,
          dateOfBirth: f.dateOfBirth,
          civilStatus: f.civilStatus as number,
          birthplace: f.birthplace.trim(),
          mothersMaidenName: f.mothersMaidenName.trim(),
          nationality: f.nationality.trim()
        };

      case 'contact':
        return {
          ...e,
          contactNumberOne: f.contactNumberOne.trim(),
          contactNumberTwo: orNull(f.contactNumberTwo),
          email: f.email.trim(),
          addresses: this.mergeAddresses(e.addresses, f)
        };

      case 'government':
        return {
          ...e,
          governmentIds: {
            ...e.governmentIds,
            sssNumber: orNull(f.sssNumber),
            pagIbigNumber: orNull(f.pagIbigNumber),
            philHealthNumber: orNull(f.philHealthNumber),
            tinNumber: orNull(f.tinNumber),
            healthCardNumber: orNull(f.healthCardNumber)
          }
        };

      case 'job':
        return {
          ...e,
          dateHired: f.dateHired,
          startDateAgencyEmployment: f.startDateAgencyEmployment || null,
          startDateProbationaryEmployment: f.startDateProbationaryEmployment || null,
          startDateRegularEmployment: f.startDateRegularEmployment || null
        };
    }
  }

  /** Updates the present/permanent entries, or adds one if it didn't exist and was filled in */
  private mergeAddresses(list: AddressDto[] | null | undefined, f: EditForm): AddressDto[] {
    const items = [...(list ?? [])];

    const upsert = (type: number, a: AddressForm) => {
      const entry: AddressDto = {
        addressType: type,
        street: a.street.trim(),
        barangay: a.barangay.trim(),
        city: a.city.trim(),
        province: a.province.trim(),
        zipCode: a.zipCode.trim()
      };
      const i = items.findIndex(x => x.addressType === type);
      if (i >= 0) {
        items[i] = { ...items[i], ...entry };
      } else if ([entry.street, entry.barangay, entry.city, entry.province, entry.zipCode].some(v => v)) {
        items.push(entry);
      }
    };

    upsert(ADDRESS_PRESENT, f.presentAddress);
    upsert(ADDRESS_PERMANENT, f.permanentAddress);
    return items;
  }

  private emptyForm(): EditForm {
    const addr = (): AddressForm => ({ street: '', barangay: '', city: '', province: '', zipCode: '' });
    return {
      gender: null, dateOfBirth: '', civilStatus: null, birthplace: '', mothersMaidenName: '', nationality: '',
      contactNumberOne: '', contactNumberTwo: '', email: '',
      presentAddress: addr(), permanentAddress: addr(),
      sssNumber: '', pagIbigNumber: '', philHealthNumber: '', tinNumber: '', healthCardNumber: '',
      dateHired: '', startDateAgencyEmployment: '', startDateProbationaryEmployment: '', startDateRegularEmployment: ''
    };
  }

  /* -------------------------------------------------------
     17. TABLE TOOLBAR: EXPAND / DOWNLOAD / PRINT
     ------------------------------------------------------- */
  toggleMenu(key: TableKey, event: Event): void {
    event.stopPropagation();
    this.openMenu = this.openMenu === key ? null : key;
  }

  expand(key: TableKey): void {
    this.expandedKey = this.expandedKey === key ? null : key;
    this.openMenu = null;
  }

  /** Downloads the table as a CSV file (opens in Excel) */
  download(key: TableKey): void {
    const { headers, rows } = this.getExport(key);
    const csv = [headers, ...rows]
      .map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.employeeNumber || 'employee'}-${key}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.openMenu = null;
  }

  /** Prints only the table, in a separate window */
  print(key: TableKey): void {
    this.openMenu = null;
    const table = document.getElementById('tbl-' + key);
    if (!table) { return; }

    const w = window.open('', '_blank', 'width=1000,height=700');
    if (!w) { return; }

    w.document.write(`<!DOCTYPE html><html><head><title>${TABLE_TITLES[key]}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; }
        h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: center; }
        th, td { border: 1px solid #999; padding: 6px; }
        th { background: #eee; text-transform: uppercase; }
      </style></head>
      <body><h2>${TABLE_TITLES[key]}</h2>${table.outerHTML}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  }

  private getExport(key: TableKey): { headers: string[]; rows: string[][] } {
    switch (key) {
      case 'movement':
        return {
          headers: [
            'Description', 'Start Date',
            'Position From', 'Position To',
            'Division From', 'Division To',
            'Department From', 'Department To'
          ],
          rows: this.movementRows.map(r => [
            r.description, this.fmt(r.startDate, 'dd-MMM-yyyy'),
            r.positionFrom, r.positionTo,
            r.divisionFrom, r.divisionTo,
            r.departmentFrom, r.departmentTo
          ])
        };
      case 'training':
        return {
          headers: ['Title of Training', 'Date', 'Venue'],
          rows: this.trainingRows.map(r => [r.title, this.fmt(r.date, 'MMMM dd, yyyy'), r.venue])
        };
      case 'disciplinary':
        return {
          headers: ['Date', 'Policy Violated', 'Brief Description', 'Sanction'],
          rows: this.disciplinaryRows.map(r => [
            this.fmt(r.date, 'd-MMM-yyyy'), r.policy, r.description, r.sanction
          ])
        };
    }
  }

  /** Close the dropdown when clicking anywhere else */
  @HostListener('document:click')
  closeMenu(): void {
    this.openMenu = null;
  }

  /** Esc leaves the expanded view */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.openMenu = null;
    this.expandedKey = null;
    this.closeEdit();
  }

  /* -------------------------------------------------------
     18. LABEL HELPERS (used by templates)
     ------------------------------------------------------- */
  genderLabel(v: number): string { return GENDER[v] ?? ''; }
  civilStatusLabel(v: number): string { return CIVIL_STATUS[v] ?? ''; }

  /* -------------------------------------------------------
     19. PRIVATE HELPERS
     ------------------------------------------------------- */
  private fmt(iso: string, format: string): string {
    return iso ? formatDate(iso, format, 'en-US') : '';
  }

  private formatAddress(a?: AddressDto | null): string {
    return a
      ? [a.street, a.barangay, a.city, a.province].filter(Boolean).join(', ')
      : '';
  }

  private tenureYears(start?: string | null, end?: string | null): string {
    if (!start) { return '0.00'; }
    const from = new Date(start).getTime();
    const to = end ? new Date(end).getTime() : Date.now();
    const years = Math.max(0, (to - from) / (1000 * 60 * 60 * 24 * 365.25));
    return years.toFixed(2);
  }
}