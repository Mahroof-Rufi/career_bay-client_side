import { Component, OnInit, Output } from '@angular/core';
import { Job, User } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../user-store/user.selector';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { loadUserJobsSuccess } from '../../user-store/user.actions';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 12;
  @Output() totalNoOfJobs!:number;
  @Output() jobs!:Job[];

  constructor(
    private _userStore:Store<{ user:User }>,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: queries => {
        const query = queries.get('page')
        if (query) {
          this.currentPageNo = parseInt(query)
        }
        
        this._jobsAPIs.userFetchALLJobs(this.currentPageNo || 1).subscribe({          
          next: response  => {
            console.log(response);
            this._userStore.dispatch(loadUserJobsSuccess({ jobs:response.data }))
            this.totalNoOfJobs = response.totalNoOfJob
          },
    
          error: err => {
    
          }
        })
      }
    })

    this._userStore.select(getJobsData).subscribe((data) => this.jobs = data)
  }

}
