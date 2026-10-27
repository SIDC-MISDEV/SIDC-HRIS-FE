import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { MailService } from './api/mail.service';
import { PayrollEmployeeDetailsService } from './api/payrollEmployeeDetails.service';
import { PayrollEmployeeScheduleService } from './api/payrollEmployeeSchedule.service';
import { PayrollPeriodService } from './api/payrollPeriod.service';
import { PayrollSummaryService } from './api/payrollSummary.service';
import { PayslipService } from './api/payslip.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    MailService,
    PayrollEmployeeDetailsService,
    PayrollEmployeeScheduleService,
    PayrollPeriodService,
    PayrollSummaryService,
    PayslipService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
