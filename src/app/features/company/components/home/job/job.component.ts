import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AddJobPostService } from '../../../services/add-job-post-modal.service';
import { Employer, Job } from '../../../store/employer.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../../store/employer.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { DeleteJobConfirmationService } from '../../../services/delete-job-confirmation.service';
import { JobsApiServiceService } from '../../../../../shared/services/jobs-api-service.service';
import { closeHiring, loadEmployerJobs, loadEmployerJobsSuccess } from '../../../store/employer.actions';
import { initFlowbite } from 'flowbite';
import { FilterOptions } from '../../../../../models/filterOptions';
import { AuthApiService } from '../../../../../services/auth-api-service.service';
import { Subscription } from 'rxjs';
import { tuiIconMoreVertical } from '@taiga-ui/icons';
import { TUI_ARROW } from '@taiga-ui/kit';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() jobs!: Job[]
  @Output() totalJobs!: number;
  @Output() maxItemInPerPage: number = 10;
  @Output() pageNo: number = 1

  sort!:string;
  readonly tuiIconMoreVertical = tuiIconMoreVertical;
  // exp_lvl!:string = 

  @Output() filterOptions: FilterOptions[] = [
    { label: 'sort by posted date', subOptions: [{ label: 'newest first', key: 'sort', value: 'newest' }, { label: 'oldest', key: 'sort', value: 'oldest' }], type: 'Radio' },
    { label: 'job status', subOptions: [{ label: 'active jobs', key: 'isClosed', value: 'false' }, { label: 'closed jobs', key: 'isClosed', value: 'true' }], type: 'Radio' },
    { label: 'job type', subOptions: [{ label: 'full time', key: 'jobType', value: 'FullTime' }, { label: 'part time', key: 'jobType', value: 'PartTime' }, { label: 'internship', key: 'jobType', value: 'InterShip' }, { label: 'contract', key: 'jobType', value: 'Contract' },], type: 'CheckBox' },
    { label: 'job location', subOptions: [{ label: 'on-site', key: 'remort', value: 'false' }, { label: 'remort', key: 'remort', value: 'true' }], type: 'CheckBox' },
    { label: 'experience level', subOptions: [{ label: 'entry level', key: 'experienceLevel', value: 'EntryLevel' }, { label: 'junior level', key: 'experienceLevel', value: 'Junior' }, { label: 'mid level', key: 'experienceLevel', value: 'Mid Level' }, { label: 'senior level', key: 'experienceLevel', value: 'Senior level' }, { label: 'manager', key: 'experienceLevel', value: 'Manager' }, { label: 'director', key: 'experienceLevel', value: 'Director' }], type: 'CheckBox' },
  ]

  private _queryParamsSubscription!:Subscription;
  private _jobsAPIsSubscription!:Subscription;
  private _employerRefreshTokenSubscription!:Subscription;

  constructor(
    private readonly _authService: AuthApiService,
    private readonly _addJobModal: AddJobPostService,
    private readonly _jobsAPIs: JobsApiServiceService,
    private readonly _router: Router,
    private readonly _alert: TuiAlertService,
    private readonly _employerStore: Store<{ employer: Employer }>,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _deleteJobConfirmation: DeleteJobConfirmationService,
  ) { }

  ngOnInit(): void {

    this._activatedRoute.queryParamMap.subscribe({
      next: response => {

        const queryParams: any = {};
        response.keys.forEach(key => {
          if (key !== 'page' && key !== 'sort') {
            queryParams[key] = response.getAll(key);
          }
        });

        const query = response.get('page')
        const sortQuery = response.get('sort')
        
        if (query ) {
          this.pageNo = parseInt(query)          
        }

        if (sortQuery) {
          this.sort = sortQuery
        }

        const filterQueryString = this.constructQueryString(queryParams);

        this._jobsAPIs.companyFetchJobs(this.pageNo || 1, this.sort, filterQueryString).subscribe({
          next: response => {
            console.log('res',response);
            
            this._employerStore.dispatch(loadEmployerJobsSuccess({ jobs: response.jobs }))
            this.totalJobs = response.noOfJobs
          },

          error: err => { }
        })

        this._authService.$employerTokenRefreshed.subscribe({
          next: response => {
            this._jobsAPIs.companyFetchJobs(this.pageNo || 1, this.sort).subscribe({
              next: response => {
                this._employerStore.dispatch(loadEmployerJobsSuccess({ jobs: response.jobs }))
                this.totalJobs = response.noOfJobs
              },

              error: err => { }
            })
          }
        })
      }
    })

    this._employerStore.select(getJobsData).subscribe((res: any) => {
      this.jobs = res
      console.log(this.jobs);

    })

  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  trackByFn(job: Job): string {
    return job._id;
  }

  addJob() {
    this._addJobModal.openModal(null)
  }

  editJob(id:string) {
    this._addJobModal.openModal(id)
  }

  deleteJob(jobId: string) {
    this._deleteJobConfirmation.openModal(jobId)
  }

  closeHiring(job_id: string) {
    // this._employerStore.dispatch(closeHiring({ job_id:job_id }))
    this._deleteJobConfirmation.openCloseHiringConfirmation(job_id)
  }

  ngOnDestroy(): void {
    this._jobsAPIsSubscription?.unsubscribe()
    this._queryParamsSubscription?.unsubscribe()
    this._employerRefreshTokenSubscription?.unsubscribe()
  }
}