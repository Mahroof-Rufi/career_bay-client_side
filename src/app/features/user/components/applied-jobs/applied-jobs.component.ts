import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppliedJob, AppliedJobs, User } from '../../user-store/user.model';
import { getAppliedJobs } from '../../user-store/user.selector';
import { Subscription } from 'rxjs';
import { loadAppliedJobs } from '../../user-store/user.actions';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.scss'
})
export class AppliedJobsComponent implements OnInit,OnDestroy{

  appliedJobs!:any
  userStoreSubscription!:Subscription

  constructor(
    private readonly _userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this._userStore.dispatch(loadAppliedJobs())
    this.userStoreSubscription = this._userStore.select(getAppliedJobs).subscribe((res) => {
      this.appliedJobs = res
    })
  }  

  ngOnDestroy(): void {
    this.userStoreSubscription.unsubscribe()
  }

}
