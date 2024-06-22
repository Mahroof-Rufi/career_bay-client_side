import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminApiServiceService } from '../../services/admin-api-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @Output() totalNoOfUsersChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalNoOfEmployersChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalNoOfJobsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalNoOfAppliedJobsChange: EventEmitter<number> = new EventEmitter<number>();
  
  @ViewChild('dateRangeSelect') dateRangeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('yearSelect') yearSelect!: ElementRef<HTMLSelectElement>;

  userStat: number[] = [];
  employerStat: number[] = [];
  jobsStat: number[] = [];
  appliedJobsStat: number[] = [];
  hiringStat: number[] = [];

  totalNoOfUsers: number = 0;
  totalNoOfEmployers: number = 0;
  totalNoOfJobs: number = 0;
  totalNoOfAppliedJobs: number = 0;

  private chart: any;

  constructor(
    private readonly _adminAPIs: AdminApiServiceService
  ) {}

  ngAfterViewInit(): void {
    this.loadAllStats();
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    
    this.chart = new Chart('adminChart',  {
      type: 'line',
      data: {
        labels: ['one', 'two', 'three', 'four', 'five', 'six',],
        datasets: [
          {
            label: 'Users',
            data: this.userStat,
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgb(255, 205, 86)',
          },
          {
            label: 'Companies',
            data: this.employerStat,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'Jobs',
            data: this.jobsStat,
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'rgb(153, 102, 255)',
          },
          {
            label: 'Applications',
            data: this.appliedJobsStat,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Hiring',
            data: this.hiringStat,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Admin Dashboard Chart'
          }
        },
        scales: {
          y: {
            suggestedMin: 50,
            suggestedMax: 100,
          },
          x: {
            suggestedMin: 10,
            suggestedMax: 25
          }
        }
      },
    });
  }

  valueChanges() {
    this.loadAllStats();
  }

  emitChanges() {
    this.totalNoOfUsersChange.emit(this.totalNoOfUsers);
    this.totalNoOfEmployersChange.emit(this.totalNoOfEmployers);
    this.totalNoOfJobsChange.emit(this.totalNoOfJobs);
    this.totalNoOfAppliedJobsChange.emit(this.totalNoOfAppliedJobs);
  }

  loadAllStats() {
    const dateRange = this.dateRangeSelect.nativeElement.value;
    const year = this.yearSelect.nativeElement.value;
    const { startDate, endDate } = this.convertDateRange(dateRange, parseInt(year));

    this._adminAPIs.getDashboardStatistics(startDate, endDate).subscribe((response: any) => {
      this.userStat = response.userStats;
      this.employerStat = response.employerStats
      this.jobsStat = response.jobStats
      this.appliedJobsStat = response.jobApplicationStats
      this.hiringStat = response.hiringStats
      this.totalNoOfUsers = response.totalNoOfUsers
      this.totalNoOfEmployers = response.totalNoOfEmployers
      this.totalNoOfJobs = response.totalNoOfJobs
      this.totalNoOfAppliedJobs = response.totalNoOfAppliedJobs
      this.renderChartIfDataReady();
      this.emitChanges();
    });
  }

  renderChartIfDataReady() {
    if (this.userStat && this.employerStat && this.jobsStat && this.appliedJobsStat && this.hiringStat) {
      this.renderChart();
    }
  }

  convertDateRange(rangeString: string, year: number) {
    const months: { [key: string]: number } = {
      'jan': 0,
      'june': 5,
      'july': 6,
      'dec': 11
    };
  
    const [startMonth, endMonth]: string[] = rangeString.toLowerCase().split('-');
  
    if (typeof months[startMonth] != 'number' || typeof months[endMonth] != 'number') {
      throw new Error(`Invalid month(s) in range string: ${rangeString}`);
    }
    
    const startDate = new Date(year, months[startMonth], 1);
    const endDate = new Date(year, months[endMonth] + 1, 0, 23, 59, 59, 999);
  
    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  }
}
