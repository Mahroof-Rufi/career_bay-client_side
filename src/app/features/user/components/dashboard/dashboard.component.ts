import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../../store/user-store/user.model';
import { getJobsData } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  jobs!:Job[]
  userData!:User;

  constructor(
    private userState:Store<{ user:User }>
  ) {} 

  ngOnInit(): void {
    // this.userState.select()
    this.userState.select(getJobsData).subscribe((res) => {      
      this.jobs = res
    })
  }

}
