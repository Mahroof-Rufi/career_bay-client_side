import { Posts } from './../../../../store/user-store/user.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../../store/user-store/user.model';
import { getJobsData, getPosts } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  jobs!:Job[]
  posts!:any
  userData!:User;

  constructor(
    private userState:Store<{ user:User }>
  ) {} 

  ngOnInit(): void {
    // this.userState.select()
    this.userState.select(getJobsData).subscribe((res) => {      
      this.jobs = res
    })
    this.userState.select(getPosts).subscribe( res => {
      this.posts = res
      
      console.log(this.posts[0].posts);
      
    })
  }

  trackByFn(id: string): string {
    return id; 
  }  

}
