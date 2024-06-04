import { Posts } from '../../user-store/user.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, User } from '../../user-store/user.model';
import { getJobsData, getPosts } from '../../user-store/user.selector';
import { initFlowbite } from 'flowbite';
import { AuthApiService } from '../../../../services/auth-api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,AfterViewInit{

  jobs!:Job[]
  posts!:any
  userData!:User;

  constructor(
    private readonly _userState:Store<{ user:User }>,
    private readonly _authAPIs:AuthApiService,
  ) {} 

  ngOnInit(): void {
    this._userState.select(getJobsData).subscribe((res) => this.jobs = res)
    this._userState.select(getPosts).subscribe( res => this.posts = res)    
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  trackByFn(id: string): string {
    return id; 
  }  

}
