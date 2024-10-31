import { Component, OnInit } from '@angular/core';
import { AddJobPostService } from '../../../features/company/services/add-job-post-modal.service';
import { Employer, Job } from '../../../features/company/store/employer.model';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../../features/company/store/employer.selector';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { DeleteJobConfirmationService } from '../../../features/company/services/delete-job-confirmation.service';
import { JobsApiServiceService } from '../../services/jobs-api-service.service';
import { loadEmployerJobsSuccess } from '../../../features/company/store/employer.actions';

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
    private readonly _employerState: Store<{employer:Employer}>,
    private readonly _deleteJobConfirmation: DeleteJobConfirmationService 
  ) {}

  ngOnInit(): void {
    this._jobsAPIs.companyFetchJobs(1).subscribe({
      next: response => {
        this._employerState.dispatch(loadEmployerJobsSuccess(response.jobs))
      },

      error: err => {
        this._router.navigateByUrl('/home')
        this._alert.open('', {
          label: err.error.message,
          status: 'error',
          autoClose: true,
          hasCloseButton: true,
        }).subscribe()
      }
    })

    this._employerState.select(getJobsData).subscribe(res => this.jobs = res)
  }

  trackByFn(index: number, job: Job): string {
    return job._id; 
  }  
  
  addJob(_id?:string) {
    _id ? this._addJobModal.openModal(_id) : this._addJobModal.openModal()
  }

  deleteJob(jobId:string) {
    this._deleteJobConfirmation.openModal(jobId)
  }
}
