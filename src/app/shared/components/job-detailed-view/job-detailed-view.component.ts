import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Job, User } from '../../../features/user/user-store/user.model';  
import { getJobById, getJobIsApplied as getJobIsApplied, getJobIsSaved, getUserId } from '../../../features/user/user-store/user.selector';
import { ApplyJobConfirmationService } from '../../../features/user/services/apply-job-confirmation.service';
import { isApplied, isSaved } from '../../../features/user/user-store/user.actions';
import { Subscription } from 'rxjs';
import { JobsApiServiceService } from '../../services/jobs-api-service.service';
import { AdminApiServiceService } from '../../../features/admin/services/admin-api-service.service';
import { GetPreviousRouteService } from '../../services/get-previous-route.service';

@Component({
  selector: 'app-job-detailed-view',
  templateUrl: './job-detailed-view.component.html',
  styleUrl: './job-detailed-view.component.scss'
})
export class JobDetailedViewComponent implements OnInit, OnDestroy{

  viewMode!:string;
  jobId!:string;
  user_id!:string;
  jobData:any;

  isApplied: boolean | null = null;
  isSaved!: boolean;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _router:Router,
    private readonly _route:ActivatedRoute,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _adminAPIs:AdminApiServiceService,
    private readonly _applyConfirmationModal:ApplyJobConfirmationService,
    private readonly _getPreviousRoute:GetPreviousRouteService
  ) {}

  ngOnInit(): void {
    this.jobId = this._route.snapshot.params['id'];
    this.viewMode = this._route.snapshot.params['context'];
      
    if (this.viewMode == 'user') {
      this._userStore.dispatch(isApplied({ jobId:this.jobId }))
      this._userStore.dispatch(isSaved({ jobId:this.jobId }))

      this._userStoreSubscription = this._userStore.select(getUserId).subscribe(userId => this.user_id = userId)
      this._userStoreSubscription = this._userStore.select(getJobIsApplied).subscribe((value) => this.isApplied = value)
      this._userStoreSubscription = this._userStore.select(getJobIsSaved).subscribe((value) => this.isSaved = value)
    }
    
    if (this.viewMode == 'user') {
      this._jobsAPIs.userGetJobById(this.jobId).subscribe((res) => {
        this.jobData = res.job
      })
    } else if (this.viewMode == 'employer') {
      this._jobsAPIs.companyGetJobById(this.jobId).subscribe((res) => {
        this.jobData = res.job
      })
    } else if (this.viewMode == 'admin') {
      this._adminAPIs.getJobById(this.jobId).subscribe((res) => {
        this.jobData = res.job
      })
    }
  }

  applyJob(job_id:string,applyJob:boolean = true) {
    this._applyConfirmationModal.openApplyJobConfirmationModal(job_id)
  }

  saveJob(job_id:string) {
    this._applyConfirmationModal.openSaveJobConfirmationModal(job_id)
  }

  unSaveJob(job_id:string) {
    this._applyConfirmationModal.openUnSaveJobConfirmationModal(job_id)
  }

  goBack() {
    this._router.navigateByUrl(this._getPreviousRoute.getPreviousURL())
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}
