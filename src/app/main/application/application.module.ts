import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { HomeComponent } from "./home/home.component";

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
    data: { title: "Dashboard" },
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
    loadChildren: () =>
      import("./report/report.module").then((m) => m.ReportModule),
  },
  {
    path: "organization",
    component: ComingSoonComponent,
    data: { title: "Organization" },
  },
  {
    path: "attendance-payroll",
    component: ComingSoonComponent,
    data: { title: "Attendance & Payroll" },
  },
  {
    path: "performance-management",
    component: ComingSoonComponent,
    data: { title: "Performance Management" },
  },
  {
    path: "learning-management",
    component: ComingSoonComponent,
    data: { title: "Learning Management" },
  },
  {
    path: "hr-policies",
    component: ComingSoonComponent,
    data: { title: "HR Policies" },
  },
  {
    path: "archives",
    component: ComingSoonComponent,
    data: { title: "Archives" },
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
