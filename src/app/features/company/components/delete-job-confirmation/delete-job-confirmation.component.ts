import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { DeleteJobConfirmationService } from '../../services/delete-job-confirmation.service';
import { Store } from '@ngrx/store';
import { Employer } from '../../store/employer.model';
import { closeHiring, deleteJob, deletePostSuccess } from '../../store/employer.actions';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { Subscription } from 'rxjs';
import { PostsApiServiceService } from '../../../../shared/services/posts-api-service.service';

@Component({
  selector: 'app-delete-job-confirmation',
  templateUrl: './delete-job-confirmation.component.html',
  styleUrl: './delete-job-confirmation.component.scss'
})
export class DeleteJobConfirmationComponent implements OnInit, OnDestroy{

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _alert: TuiAlertService,
    private readonly _confirmDeleteDialogue:DeleteJobConfirmationService,
    private readonly _jobAPIs:JobsApiServiceService,
    private readonly _postsAPIs:PostsApiServiceService,
    private readonly _employerState: Store<{employer:Employer}>
  ) {}

  editJobId!:string;
  postId!:string;
  messageType!:'deleteJob' | 'CloseHiring' | 'deletePost';

  private _jobsAPIsSubscription!:Subscription;
  private _alertSubscription!:Subscription;

  ngOnInit(): void {
    if(this.data) {
      const data:any = this.data
      this.editJobId = data.job_id
      this.messageType = data.messageType,
      this.postId = data.post_id
    }
  }

  get data(): string {
    return this._context.data
  }

  closeDialog() {
    this._confirmDeleteDialogue.closeModal()
  }

  confirmDeleteJob(jobId:string) {
    this._jobsAPIsSubscription = this._jobAPIs.companyDeleteJob(jobId).subscribe( res => {
      this.closeDialog()
      this._employerState.dispatch(deleteJob({ id:jobId }))
      this._alertSubscription = this._alert.open('', {
        label: 'Job Post delete successful',
        status: 'success',
        autoClose: true,
        hasCloseButton: true,
      }).subscribe()  
      this._confirmDeleteDialogue.closeModal()
    }, err => {
      console.log(err);
      this._alertSubscription = this._alert.open('', {
        label: err.error.message,
        status: 'error',
        autoClose: true,
        hasCloseButton: true
      }).subscribe()      
    })
  }

  confirmDeletePost() {
    this._jobsAPIsSubscription = this._postsAPIs.deletePost(this.postId).subscribe({
      next: (response:any) => {
        this.closeDialog()
        this._employerState.dispatch(deletePostSuccess({ post_id:response.post_id }))
      },
       
      error: err => {
        this._alertSubscription = this._alert.open('', {
          label: err.error.message,
          status: 'error',
          autoClose: true,
          hasCloseButton: true
        }).subscribe()
      },
    })
    this.closeDialog()
  }

  closeHiring(job_id:string) {
    this._confirmDeleteDialogue.closeModal()
    this._employerState.dispatch(closeHiring({ job_id:job_id }))
  }

  ngOnDestroy(): void {
    this._jobsAPIsSubscription?.unsubscribe()
    this._alertSubscription?.unsubscribe()
  }
}
