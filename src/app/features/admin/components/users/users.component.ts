import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, adminStateModel } from '../../store/admin.model';
import { getJobsData, getUsersData } from '../../store/admin.selector';
import { jobAction, loadJobs, loadUsers, userAction } from '../../store/admin.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';
import { Job } from '../../../company/store/employer.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 10;
  @Output() totalUserProfiles!:number;

  @Output() filterOptions!: FilterOptions[];

  viewMode!:string
  users!:User[];
  jobs!:Job[];

  queryParamSubscription!:Subscription;
  adminTokenRefreshedSubscription!:Subscription;

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _adminStore:Store<{ admin:adminStateModel }>,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.url.subscribe(url => {
      const currentRoute = url.map(segment => segment.path)
      this.viewMode = currentRoute[0]
      if (this.viewMode == 'users') {
        this.filterOptions = [
          { label: 'sort by name', subOptions: [ { label: 'A-Z', key: 'sort', value: 'a-z' }, { label: 'Z-A', key: 'sort', value: 'z-a' } ], type: 'Radio' },
          { label: 'role / position', subOptions: [ { label: 'developer', key: 'jobTitle', value: 'Developer' }, { label: 'designer', key: 'jobTitle', value: 'Designer' }, { label: 'manager', key: 'jobTitle', value: 'Manager' }, { label: 'consultant', key: 'jobTitle', value: 'Consultant' } ], type: 'CheckBox' },
          { label: 'active / blocked', subOptions: [ { label: 'Active users', key: 'isActive', value: 'true' }, { label: 'Blocked users', key: 'isActive', value: 'false' } ], type: 'Radio' }
        ]
      } else if (this.viewMode == 'jobs') {
        this.filterOptions = [
          { label: 'sort by posted date', subOptions: [{ label: 'newest first', key: 'sort', value: 'newest' }, { label: 'oldest', key: 'sort', value: 'oldest' }], type: 'Radio' },
          { label: 'job status', subOptions: [{ label: 'active jobs', key: 'isActive', value: 'true' }, { label: 'blocked jobs', key: 'isActive', value: 'false' }], type: 'Radio' },
          { label: 'closed/ongoing', subOptions: [{ label: 'ongoing jobs', key: 'isClose', value: 'false' }, { label: 'closed jobs', key: 'isClosed', value: 'true' }], type: 'Radio' },
          { label: 'job type', subOptions: [{ label: 'full time', key: 'jobType', value: 'FullTime' }, { label: 'part time', key: 'jobType', value: 'PartTime' }, { label: 'internship', key: 'jobType', value: 'InterShip' }, { label: 'contract', key: 'jobType', value: 'Contract' },], type: 'CheckBox' },
          { label: 'job location', subOptions: [{ label: 'on-site', key: 'remort', value: 'false' }, { label: 'remort', key: 'remort', value: 'true' }], type: 'CheckBox' },
          { label: 'experience level', subOptions: [{ label: 'entry level', key: 'experienceLevel', value: 'EntryLevel' }, { label: 'junior level', key: 'experienceLevel', value: 'Junior' }, { label: 'mid level', key: 'experienceLevel', value: 'Mid Level' }, { label: 'senior level', key: 'experienceLevel', value: 'Senior level' }, { label: 'manager', key: 'experienceLevel', value: 'Manager' }, { label: 'director', key: 'experienceLevel', value: 'Director' }], type: 'CheckBox' },
        ]
      }
    });
    this.queryParamSubscription = this._activatedRoute.queryParamMap.subscribe({
      next: queries => {

        const pageNo = queries.get('page')
        if (pageNo) {
          this.currentPageNo = parseInt(pageNo)
        }

        const queryParams: any = {};
        queries.keys.forEach(key => {
          if (key !== 'page') {
            queryParams[key] = queries.getAll(key);
          }
        });

        const filterQueryString = this.constructQueryString(queryParams);
        

        if (this.viewMode == 'users') {
          this._adminStore.dispatch(loadUsers({ pageNo:this.currentPageNo, queries:filterQueryString }))
        } else if (this.viewMode == 'jobs') {
          this._adminStore.dispatch(loadJobs({ pageNo:this.currentPageNo, queries:filterQueryString }))
        }
      }
    })

    this.adminTokenRefreshedSubscription = this._authService.$adminTokenRefreshed.subscribe(res => this._adminStore.dispatch(loadUsers({ pageNo:this.currentPageNo })))
    this._adminStore.select(getUsersData).subscribe((data) => {
      this.users = data.users 
      this.totalUserProfiles = data.totalUsersCount
    })

    this._adminStore.select(getJobsData).subscribe({
      next: response => {
        this.jobs = response.jobs
        this.totalUserProfiles = response.totalJobsCount
      }
    })
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  trackByFn(id: string): string {
    return id; 
  }  

  userAction(userId:string) {
    this._adminStore.dispatch(userAction({ user_id:userId }))
  }

  jobAction(job_id:string) {
    this._adminStore.dispatch(jobAction({ job_id:job_id }))
  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

  ngOnDestroy(): void {
    this.queryParamSubscription?.unsubscribe()
    this.adminTokenRefreshedSubscription?.unsubscribe()
  }

}
