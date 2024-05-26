import { Component, OnInit } from '@angular/core';
import { Job, User } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../user-store/user.selector';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit{

  jobsData!:Job[];

  constructor(
    private _userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this._userStore.select(getJobsData).subscribe((data) => this.jobsData = data)
  }

}
