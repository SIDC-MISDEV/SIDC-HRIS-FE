import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

//import { User } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexGrid, ApexStroke, ApexLegend, ApexTitleSubtitle, ApexTooltip, ApexPlotOptions, ApexYAxis, ApexFill, ApexMarkers, ApexTheme } from 'ng-apexcharts';
//import { AuthenticationService } from 'app/auth/service';
//import { DashboardService } from 'app/main/dashboard/dashboard.service';

// import { locale as english } from 'app/main/dashboard/i18n/en';
// import { locale as french } from 'app/main/dashboard/i18n/fr';
// import { locale as german } from 'app/main/dashboard/i18n/de';
// import { locale as portuguese } from 'app/main/dashboard/i18n/pt';


export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {

@ViewChild('apexRadarChartRef') apexRadarChartRef: any;
@ViewChild('apexLineChartRef') apexLineChartRef: any;
public apexLineChart: Partial<ChartOptions>;
public apexRadarChart: Partial<ChartOptions>;

@ViewChild('apexRadarChartSalesAndPurchaseRef') apexRadarChartSalesAndPurchaseRef: any;
public apexRadarChartSalesAndPurchase: Partial<ChartOptions>;


@ViewChild('apexBarChartRef') apexBarChartRef: any;
public apexBarChart: Partial<ChartOptions>;


public isMenuToggled = false;

// Public
public data: any;
public currentUser: any;
//public currentUser: User;
public isAdmin: boolean;
public isClient: boolean;
public statisticsBar;
public statisticsLine;
public revenueReportChartoptions;
public budgetChartoptions;
public goalChartoptions;
public statePrimaryChartoptions;
public stateWarningChartoptions;
public stateSecondaryChartoptions;
public stateInfoChartoptions;
public stateDangerChartoptions;
public earningChartoptions;

// Private
private $barColor = '#f3f3f3';
private $trackBgColor = '#EBEBEB';
private $textMutedColor = '#b9b9c3';
private $budgetStrokeColor2 = '#dcdae3';
private $goalStrokeColor2 = '#51e5a8';
private $textHeadingColor = '#5e5873';
private $strokeColor = '#ebe9f1';
private $earningsStrokeColor2 = '#28c76f66';
private $earningsStrokeColor3 = '#28c76f33';


  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#ffe700',
      series2: '#00d4bd',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1'
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };

/**
 * Constructor
 * @param {AuthenticationService} _authenticationService
 * @param {DashboardService} _dashboardService
 * @param {CoreConfigService} _coreConfigService
 * @param {CoreTranslationService} _coreTranslationService
 */
constructor(
  //private _authenticationService: AuthenticationService,
  //private _dashboardService: DashboardService,
  private _coreConfigService: CoreConfigService,
  private _coreTranslationService: CoreTranslationService
) {
  // this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  // this.isAdmin = this._authenticationService.isAdmin;
  // this.isClient = this._authenticationService.isClient;
  this.isAdmin = true;

  // this._coreTranslationService.translate(english, french, german, portuguese);
  // Statistics Bar Chart
  this.statisticsBar = {
    chart: {
      height: 70,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: [this.$barColor, this.$barColor, this.$barColor, this.$barColor, this.$barColor],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [colors.solid.warning],
    series: [
      {
        name: '2020',
        data: [45, 85, 65, 45, 65]
      }
    ],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };

  // Statistics Line Chart
  this.statisticsLine = {
    chart: {
      height: 70,
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
      // show: true,
      borderColor: this.$trackBgColor,
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        // left: 0,
        // right: 0,
        top: -30,
        bottom: -10
      }
    },
    stroke: {
      width: 3
    },
    colors: [colors.solid.info],
    series: [
      {
        data: [0, 20, 5, 30, 15, 45]
      }
    ],
    markers: {
      size: 2,
      colors: colors.solid.info,
      strokeColors: colors.solid.info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: '#ffffff',
          strokeColor: colors.solid.info,
          size: 5
        }
      ],
      shape: 'circle',
      radius: 2,
      hover: {
        size: 3
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '0px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };

  // Revenue Report Chart
  this.revenueReportChartoptions = {
    chart: {
      height: 230,
      stacked: true,
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        columnWidth: '17%',
        endingShape: 'rounded'
      }
    },
    colors: [colors.solid.primary, colors.solid.warning],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: this.$textMutedColor,
          fontSize: '0.86rem'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: this.$textMutedColor,
          fontSize: '0.86rem'
        }
      }
    }
  };

  //this.apexChart([] , []);  
  this.apexChart(
    ['33','34','12'], 
    ['22','45','23'], 
    ['a','b','c']);  
  this.arexRadalrChart();
  this.setApexRadarChartSalesAndPurchase();

  this.setBarchart();
}
  setBarchart() {
    // Apex Bar Chart
    this.apexBarChart = {
      series: [
        {
          data: [
            700, 
            350, 
            480, 
            600, 
            210, 
            550, 
            150,
            730, 
            350, 
            420, 
            680, 
            220, 
            510, 
            140
          ]
        }
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '30%',
          endingShape: 'rounded'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      colors: [colors.solid.info],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          '6AM-7AM',
          '7AM-8AM',
          '8AM-9AM',
          '9AM-8AM',
          '10AM-8AM',
          '11AM-8AM',
          '12PM-1PM',
          '1PM-2PM',
          '2PM-3PM',
          '3PM-4PM',
          '4PM-5PM',
          '5PM-6PM',
          '6PM-7PM',
          '7PM-8PM',
        ]
      }
    };
  }
 arexRadalrChart() {
    // Apex Radar Chart
    this.apexRadarChart = {
      series: [
        {
          name: 'Member',
          data: [141, 64, 81, 60, 42, 42, 33, 23],
        },
        {
          name: 'Non Member',
          data: [65, 46, 42, 225, 58, 63, 76, 43]
        }
      ],
      fill: {
        opacity: [1, 0.8]
      },
      stroke: {
        show: false,
        width: 0
      },
      markers: {
        size: 0
      },
      grid: {
        show: false
      },
      colors: [ "#e0ce00","#1b9400"],
      chart: {
        height: 400,
        type: 'radar',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: false,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },

      xaxis: {
        categories: ['Feeds', 'Grocery', 'Agri', 'Frozen Goods', 'Accesories', 'Dairy', 'Rice', 'Egg']
      }
    };
  }

  setApexRadarChartSalesAndPurchase() {
    // Apex Radar Chart
    this.apexRadarChartSalesAndPurchase = {
      series: [
        {
          name: 'Sales',
          data: [141, 64, 81, 60, 42, 42, 33, 23],
          color: '#32a83a',
        },
        {
          name: 'Purchase',
          data: [65, 46, 42, 225, 58, 63, 76, 43],
         color: '#008FFB',
        }
      ],
      fill: {
        opacity: [1, 0.8]
      },
      stroke: {
        show: false,
        width: 0
      },
      markers: {
        size: 0
      },
      grid: {
        show: false
      },
      //colors: [ "#e0ce00","#1b9400"],
      chart: {
        height: 400,
        type: 'radar',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: false,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },

      xaxis: {
        categories: ['Feeds', 'Grocery', 'Agri', 'Frozen Goods', 'Accesories', 'Dairy', 'Rice', 'Egg']
      }
    };
  }

apexChart(dataSeries : any, dataSeries2 : any , dataCategories : any){
  this.apexLineChart = {
    series: [
      {
        name: 'Purchase',
        data: dataSeries,
        color: '#32a83a',
      },
      {
        name: 'Sales',
        data: dataSeries2,
        color: '#008FFB',
      }
    ],
    chart: {
      height: 400,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: [colors.solid.white],
      colors: [colors.solid.warning]
    },
    colors: [colors.solid.warning],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      categories: dataCategories
    },
    yaxis: {
      show : true,
      title: {
        text: 'Sales and Purchase Statistics',
      },
      //seriesName : 'kwhwhw',
      labels: {
        formatter: function (value) {
          return value + ' units';
        },
      },
    },
    tooltip: {
      custom: function (data) {
        return (
          '<div class="px-1 py-50">' +
          '<span>' +
          data.series[data.seriesIndex][data.dataPointIndex] +
          ' - </span>' +
          '</div>'
        );
      }
    }
  };
 }
// Lifecycle Hooks
// -----------------------------------------------------------------------------------------------------

/**
 * On init
 */
ngOnInit(): void {
  // get the currentUser details from localStorage
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Get the dashboard service data
  // this._dashboardService.onApiDataChanged.subscribe(response => {
  //   this.data = response;
  // });

  this.data = {
    'statistics': {
        'analyticsData': {
            'vendor': '345',
            'categories': '115',
            'products': '1.423k',
            'sales': '230k',
            'customers': '8.549k',
            'revenue': '$9745'
        }
    },
};
}

/**
 * After View Init
 */
ngAfterViewInit() {
  // Subscribe to core config changes
  this._coreConfigService.getConfig().subscribe(config => {
    // If Menu Collapsed Changes
    if (
      (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) &&
      localStorage.getItem('currentUser')
    ) {
      setTimeout(() => {
        if (this.currentUser.role == 'Admin') {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;
          this.apexRadarChart.chart.width = this.apexRadarChartRef?.nativeElement.offsetWidth;
          this.apexLineChart.chart.width = this.apexLineChartRef?.nativeElement.offsetWidth;

        }
      }, 500);
    }
  });
}
}
