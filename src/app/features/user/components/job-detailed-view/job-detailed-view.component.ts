import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../../store/user-store/user.model';
import { getJobById } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-job-detailed-view',
  templateUrl: './job-detailed-view.component.html',
  styleUrl: './job-detailed-view.component.scss'
})
export class JobDetailedViewComponent implements OnInit{

  jobId!:string;
  jobData!:any;

  constructor(
    private route:ActivatedRoute,
    private userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    console.log(this.jobId);
    
    this.userStore.select(getJobById(this.jobId)).subscribe((res) => {
      this.jobData = res
      console.log(this.jobData);
      
    })
  }

}
