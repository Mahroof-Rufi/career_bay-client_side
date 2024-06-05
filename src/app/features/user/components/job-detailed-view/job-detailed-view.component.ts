import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Job, User } from '../../user-store/user.model';  
import { getJobById, getJobIsApplied as getJobIsApplied, getJobIsSaved, getUserId } from '../../user-store/user.selector';
import { ApplyJobConfirmationService } from '../../services/apply-job-confirmation.service';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { isApplied, isSaved } from '../../user-store/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detailed-view',
  templateUrl: './job-detailed-view.component.html',
  styleUrl: './job-detailed-view.component.scss'
})
export class JobDetailedViewComponent implements OnInit, OnDestroy{

  jobId!:string;
  user_id!:string;
  jobData:any;

  isApplied: boolean | null = null;
  isSaved!: boolean;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _route:ActivatedRoute,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _applyConfirmationModal:ApplyJobConfirmationService,
  ) {}

  ngOnInit(): void {
    this.jobId = this._route.snapshot.params['id'];
    this._userStore.dispatch(isApplied({ jobId:this.jobId }))
    this._userStore.dispatch(isSaved({ jobId:this.jobId }))

    this._userStoreSubscription = this._userStore.select(getUserId).subscribe(userId => this.user_id = userId)
    this._userStoreSubscription = this._userStore.select(getJobIsApplied).subscribe((value) => this.isApplied = value)
    this._userStoreSubscription = this._userStore.select(getJobIsSaved).subscribe((value) => this.isSaved = value)
    this._userStoreSubscription = this._userStore.select(getJobById(this.jobId)).subscribe((res) => this.jobData = res)
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

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}
