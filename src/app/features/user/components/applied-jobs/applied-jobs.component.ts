import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppliedJob, AppliedJobs, User } from '../../../../store/user-store/user.model';
import { getAppliedJobs } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.scss'
})
export class AppliedJobsComponent implements OnInit{

  appliedJobs!:any

  constructor(
    private userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.userStore.select(getAppliedJobs).subscribe((res) => {
      this.appliedJobs = res
      console.log(this.appliedJobs);
    })
  }  

}
