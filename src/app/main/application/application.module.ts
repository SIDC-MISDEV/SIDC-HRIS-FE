import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { HomeComponent } from "./home/home.component";
import { ModuleGuard } from "app/common/guards/module.guard";
import { ModuleCode } from "app/common/models/app-access";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "dashboard-overview",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "Dashboard", moduleCode: ModuleCode.Dashboard },
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "inventory",
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: "report",
    canActivate: [ModuleGuard],
    data: { moduleCode: ModuleCode.Reports },
    loadChildren: () =>
      import("./report/report.module").then((m) => m.ReportModule),
  },
  {
    path: "organization",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "Organization", moduleCode: ModuleCode.Organization },
  },
  {
    path: "attendance-payroll",
    canActivate: [ModuleGuard],
    data: { moduleCode: ModuleCode.AttendanceAndPayroll },
    loadChildren: () =>
      import("./attendance-payroll/attendance-payroll.module").then(
        (m) => m.AttendancePayrollModule
      ),
  },
  {
    path: "performance-management",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "Performance Management", moduleCode: ModuleCode.PerformanceManagement },
  },
  {
    path: "learning-management",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "Learning Management", moduleCode: ModuleCode.LearningManagement },
  },
  {
    path: "hr-policies",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "HR Policies", moduleCode: ModuleCode.HrPolicies },
  },
  {
    path: "archives",
    component: ComingSoonComponent,
    canActivate: [ModuleGuard],
    data: { title: "Archives", moduleCode: ModuleCode.Archives },
  },
  {
    path: "help-support",
    component: ComingSoonComponent,
    data: { title: "Help and Support" },
  },
];

@NgModule({
  declarations: [
    ComingSoonComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
})
export class ApplicationModule {}
