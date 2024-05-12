import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../../store/user-store/user.model';
import { loadJobs } from '../../../../store/user-store/user.actions';
import { getJobsData } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  jobs!:Job[]

  constructor(
    private userState:Store<{ user:User }>
  ) {} 

  ngOnInit(): void {
    this.userState.dispatch(loadJobs())
    this.userState.select(getJobsData).subscribe((res) => {      
      this.jobs = res
      console.log(this.jobs);
      
    })
  }

}
