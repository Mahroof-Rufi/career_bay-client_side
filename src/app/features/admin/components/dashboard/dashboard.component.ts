import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalNoOfUsers: number = 0;
  totalNoOfEmployers: number = 0;
  totalNoOfJobs: number = 0;
  totalNoOfAppliedJobs: number = 0;

  onTotalNoOfUsers(count: number) {
    this.totalNoOfUsers = count;
  }

  onTotalNoOfEmployers(count: number) {
    this.totalNoOfEmployers = count;
  }

  onTotalNoOfJobs(count: number) {
    this.totalNoOfJobs = count;
  }

  onTotalNoOfAppliedJobs(count: number) {
    this.totalNoOfAppliedJobs = count;
  }

}
