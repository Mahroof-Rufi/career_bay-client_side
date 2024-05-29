import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { AddJobPostService } from '../../services/add-job-post-modal.service';
import { Employer, Job } from '../../store/employer.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../store/employer.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { DeleteJobConfirmationService } from '../../services/delete-job-confirmation.service';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { closeHiring, loadEmployerJobs, loadEmployerJobsSuccess } from '../../store/employer.actions';
import { initFlowbite } from 'flowbite';
import { FilterOptions } from '../../../../models/filterOptions';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit, AfterViewInit{
  @Output() jobs!:Job[]
  @Output() totalJobs!:number;
  @Output() maxItemInPerPage:number = 10;
  @Output() pageNo:number = 1

  // exp_lvl!:string = 

  @Output() filterOptions:FilterOptions[] = [
    { label:'job status', subOptions:['active jobs', 'closed jobs'], type:'Radio' },
    { label:'job type', subOptions:['full time', 'part time', 'internship', 'contract',], type:'CheckBox' },
    { label:'job location', subOptions:['on-site', 'remort'], type:'CheckBox' },
    { label:'experience level', subOptions:['entry level', 'junior level', 'mid level', 'senior level', 'manager', 'director'], type:'CheckBox' },
  ]

  constructor(
    private readonly _addJobModal:AddJobPostService,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _router:Router,
    private readonly _alert: TuiAlertService,
    private readonly _employerStore: Store<{employer:Employer}>,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _deleteJobConfirmation: DeleteJobConfirmationService,
  ) {}

  ngOnInit(): void {

    this._activatedRoute.queryParamMap.subscribe({
      next: response => {
        console.log(response);
        
        const queryParams:any = {};
        response.keys.forEach(key => {
          queryParams[key] = response.get(key);
        });
        
        const query = response.get('page')
        if (query) {
          this.pageNo = parseInt(query)
        }        

        this._jobsAPIs.companyFetchJobs(this.pageNo || 1).subscribe({
          next: response => {      
            this._employerStore.dispatch(loadEmployerJobsSuccess({ jobs:response.jobs }))
            this.totalJobs = response.noOfJobs
          },
    
          error: err => {
    
          }
        })
      }
    })

    this._employerStore.select(getJobsData).subscribe((res:any) =>  {
      this.jobs = res
      console.log(this.jobs);
      
    } )
    
  }

  ngAfterViewInit():void {
    initFlowbite();
  }

  trackByFn(job: Job): string {
    return job._id; 
  }  
  
  addJob(_id?:string) {
    _id ? this._addJobModal.openModal(_id) : this._addJobModal.openModal()
  }

  deleteJob(jobId:string) {
    this._deleteJobConfirmation.openModal(jobId)
  }

  closeHiring(job_id:string) {
    // this._employerStore.dispatch(closeHiring({ job_id:job_id }))
    this._deleteJobConfirmation.openCloseHiringConfirmation(job_id)
  }
}