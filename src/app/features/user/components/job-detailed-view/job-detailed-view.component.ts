import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../../store/user-store/user.model';  
import { getJobById, getJobIsApplid, getUserId } from '../../../../store/user-store/user.selector';
import { ApplyJobConfirmationService } from '../../services/apply-job-confirmation.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-job-detailed-view',
  templateUrl: './job-detailed-view.component.html',
  styleUrl: './job-detailed-view.component.scss'
})
export class JobDetailedViewComponent implements OnInit{

  jobId!:string;
  user_id!:string;
  jobData:any;

  isApplied: boolean | null = null;

  constructor(
    private route:ActivatedRoute,
    private userStore:Store<{ user:User }>,
    private applyConfirmationService:ApplyJobConfirmationService,
    private apiService:AuthService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    this.userStore.select(getUserId).subscribe((id) => this.user_id = id)

    this.userStore.select(getJobIsApplid).subscribe((value) => this.isApplied = value)

    this.userStore.select(getJobById(this.jobId)).subscribe((res) => {
      this.jobData = res      
    })
  }

  applyJob(job_id:string) {
    this.applyConfirmationService.openApplyJobConfirmationModal(job_id)
  }

}
