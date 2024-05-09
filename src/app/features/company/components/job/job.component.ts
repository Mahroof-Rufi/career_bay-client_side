import { Component, OnInit } from '@angular/core';
import { AddJobPostService } from '../../../../services/add-job-post.service';
import { Job } from '../../../../store/employer-store/employer.model';
import { AuthService } from '../../../../services/auth.service';
import { StateManagerService } from '../../../../services/state-manager.service';

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
    private stateService:StateManagerService
  ) {}

  ngOnInit(): void {
    this.APIService.companyFetchJobs().subscribe((res) => {
      console.log(res);
      this.stateService.setJobs(res.jobs)
      this.jobs = res.jobs
    })
  }

  trackByFn(index: number, job: Job): string {
    return job._id; 
  }  
  
  addJob(_id?:string) {
    _id ? this.addJobModalService.openModal(_id) : this.addJobModalService.openModal()
  }
}
