import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";

const routes: Routes = [
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
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
})
export class ApplicationModule {}
