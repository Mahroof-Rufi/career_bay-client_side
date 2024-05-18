import { Component, OnInit } from '@angular/core';
import { AddJobPostService } from '../../../../services/add-job-post.service';
import { Employer, Job } from '../../../../store/employer-store/employer.model';
import { AuthService } from '../../../../services/auth.service';
import { Store } from '@ngrx/store';
import { getJobsData } from '../../../../store/employer-store/employer.selector';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogService, TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { DeleteJobConfirmationService } from '../../../../services/delete-job-confirmation.service';

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
    private employerState: Store<{employer:Employer}>,
    private deleteJobConfirmation: DeleteJobConfirmationService,
  ) {}

  ngOnInit(): void {
    this.employerState.select(getJobsData).subscribe((res:any) => {
        
      this.jobs = res
      
      
    })
  }

  trackByFn(job: Job): string {
    return job._id; 
  }  
  
  addJob(_id?:string) {
    _id ? this.addJobModalService.openModal(_id) : this.addJobModalService.openModal()
  }

  deleteJob(jobId:string) {
    this.deleteJobConfirmation.openModal(jobId)
  }
}