import { Component, OnInit } from '@angular/core';
import { AddJobPostService } from '../../services/add-job-post-modal.service';
import { Employer, Job } from '../../store/employer.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../store/employer.selector';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { DeleteJobConfirmationService } from '../../services/delete-job-confirmation.service';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit{

  jobs!:Job[]

  constructor(
    private readonly _addJobModal:AddJobPostService,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _router:Router,
    private readonly _alert: TuiAlertService,
    private readonly _employerStore: Store<{employer:Employer}>,
    private readonly _deleteJobConfirmation: DeleteJobConfirmationService,
  ) {}

  ngOnInit(): void {
    this._employerStore.select(getJobsData).subscribe((res:any) =>  this.jobs = res)
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
}