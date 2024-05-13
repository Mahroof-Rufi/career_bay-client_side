import { Component, OnInit } from '@angular/core';
import { Job, User } from '../../../../store/user-store/user.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit{

  jobsData!:Job[];

  constructor(
    private userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.userStore.select(getJobsData).subscribe((data) => {
      this.jobsData = data
    })
  }

}
