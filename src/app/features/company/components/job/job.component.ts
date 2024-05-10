import { Component, OnInit } from '@angular/core';
import { AddJobPostService } from '../../../../services/add-job-post.service';
import { Employer, Job } from '../../../../store/employer-store/employer.model';
import { AuthService } from '../../../../services/auth.service';
import { StateManagerService } from '../../../../services/state-manager.service';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../../../store/employer-store/employer.selector';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { deleteJob } from '../../../../store/employer-store/employer.actions';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit{

  jobs!:Job[]

  constructor(
    private addJobModalService:AddJobPostService,
    private APIService:AuthService,
    private router:Router,
    private alert: TuiAlertService,
    private stateService:StateManagerService,
    private employerState: Store<{employer:Employer}>,
  ) {}

  ngOnInit(): void {
    this.APIService.companyFetchJobs().subscribe((res) => {
      console.log(res);
      this.stateService.setJobs(res.jobs)
    }, err => {
      this.router.navigateByUrl('/home')
      this.alert.open('', {
        label: err.error.message,
        status: 'error',
        autoClose: true,
        hasCloseButton: true,
      }).subscribe()  
    })
    this.employerState.select(getJobsData).subscribe((res) => {
      this.jobs = res
    })
  }

  trackByFn(index: number, job: Job): string {
    return job._id; 
  }  
  
  addJob(_id?:string) {
    _id ? this.addJobModalService.openModal(_id) : this.addJobModalService.openModal()
  }

  deleteJob(jobId:string) {
    this.APIService.companyDeleteJob(jobId).subscribe( res => {
      console.log(res);
      this.employerState.dispatch(deleteJob({ id:jobId }))
    }, err => {
      console.log(err);      
    })
  }
}
