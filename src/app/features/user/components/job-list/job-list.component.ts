import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { Job, User } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../user-store/user.selector';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { loadUserJobsSuccess } from '../../user-store/user.actions';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit, AfterViewInit{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 12;
  @Output() totalNoOfJobs!:number;
  @Output() jobs!:Job[];

  @Output() filterOptions: FilterOptions[] = [
    { label: 'sort by posted date', subOptions: [{ label: 'newest first', key: 'sort', value: 'newest' }, { label: 'oldest first', key: 'sort', value: 'oldest' }], type: 'Radio' },
    { label: 'job type', subOptions: [{ label: 'full time', key: 'jobType', value: 'FullTime' }, { label: 'part time', key: 'jobType', value: 'PartTime' }, { label: 'internship', key: 'jobType', value: 'InterShip' }, { label: 'contract', key: 'jobType', value: 'Contract' },], type: 'CheckBox' },
    { label: 'job location', subOptions: [{ label: 'on-site', key: 'remort', value: 'false' }, { label: 'remort', key: 'remort', value: 'true' }], type: 'CheckBox' },
    { label: 'experience level', subOptions: [{ label: 'entry level', key: 'experienceLevel', value: 'EntryLevel' }, { label: 'junior level', key: 'experienceLevel', value: 'Junior' }, { label: 'mid level', key: 'experienceLevel', value: 'Mid Level' }, { label: 'senior level', key: 'experienceLevel', value: 'Senior level' }, { label: 'manager', key: 'experienceLevel', value: 'Manager' }, { label: 'director', key: 'experienceLevel', value: 'Director' }], type: 'CheckBox' },
  ]

  constructor(
    private _userStore:Store<{ user:User }>,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _activatedRoute:ActivatedRoute
  ) {}

  sort!:string;

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: queries => {

        const queryParams: any = {};
        queries.keys.forEach(key => {
          if (key !== 'page' && key !== 'sort') {
            queryParams[key] = queries.getAll(key);
          }
        });

        const query = queries.get('page')
        if (query) {
          this.currentPageNo = parseInt(query)
        }

        const sortQuery = queries.get('sort')
        if (sortQuery) {         
          this.sort = sortQuery
        }

        const filterQueryString = this.constructQueryString(queryParams);
        
        this._jobsAPIs.userFetchALLJobs(this.currentPageNo || 1, this.sort, filterQueryString).subscribe({          
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

  ngAfterViewInit(): void {
    initFlowbite()
  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

}
