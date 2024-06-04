import { Posts } from '../../user-store/user.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, User } from '../../user-store/user.model';
import { getJobsData, getPosts, getUserId } from '../../user-store/user.selector';
import { initFlowbite } from 'flowbite';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { triggerPostLike } from '../../user-store/user.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,AfterViewInit{

  jobs!:Job[]
  posts!:any
  user_id!:string;

  constructor(
    private readonly _userState:Store<{ user:User }>,
    private readonly _authAPIs:AuthApiService,
  ) {} 

  ngOnInit(): void {
    this._userState.select(getJobsData).subscribe((res) => this.jobs = res)
    this._userState.select(getPosts).subscribe( res => this.posts = res)   
    this._userState.select(getUserId).subscribe( id => this.user_id = id)  
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  trackByFn(id: string): string {
    return id; 
  }  

  likeTrigger(employerId:string,post_id:any) {  
    this._userState.dispatch(triggerPostLike({ employer_id:employerId, post_id:post_id }))
  }

}
