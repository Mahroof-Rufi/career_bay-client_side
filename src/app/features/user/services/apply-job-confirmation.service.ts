import { Injectable, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { ApplyJobConfirmationComponent } from '../components/apply-job-confirmation/apply-job-confirmation.component';

@Injectable()
export class ApplyJobConfirmationService {

  private applyJobConfirmation: Observable<any> | undefined;
  private applyJobConfirmationSubscription!: Subscription

  private saveJobConfirmation: Observable<any> | undefined;
  private saveJobConfirmationSubscription!: Subscription;

  private unSaveJobConfirmation: Observable<any> | undefined;
  private unSaveJobConfirmationSubscription!: Subscription;

  job_id!:string;

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) { }

  private initializeApplyJobConfirmationModal() {
    this.applyJobConfirmation = this.dialogueService.open<any>(
      new PolymorpheusComponent(ApplyJobConfirmationComponent, this.injector),
      {
        size:'m',
        data: { jobId:this.job_id, type:'applyJob' }
      },
    );
  }
  
  
  openApplyJobConfirmationModal(job_id:string) {
    this.job_id = job_id
    this.initializeApplyJobConfirmationModal()
    if (this.applyJobConfirmation) {
      this.applyJobConfirmationSubscription = this.applyJobConfirmation?.subscribe()
    }
  }

  closeApplyJobConfirmationModal() {
    if (this.applyJobConfirmationSubscription) {
      this.applyJobConfirmationSubscription.unsubscribe()
    }
  }

  openSaveJobConfirmationModal(job_id:string) {
    this.job_id = job_id
    this.saveJobConfirmation = this.dialogueService.open<any>(
      new PolymorpheusComponent(ApplyJobConfirmationComponent, this.injector),
      {
        size:'m',
        data: { jobId:this.job_id, type:'save-Job' }
      },
    );

    if (this.saveJobConfirmation) {
      this.saveJobConfirmationSubscription = this.saveJobConfirmation.subscribe()
    }
  }

  closeSaveJobConfirmation() {
    this.saveJobConfirmationSubscription?.unsubscribe()
  }

  openUnSaveJobConfirmationModal(job_id:string) {
    this.job_id = job_id
    this.unSaveJobConfirmation = this.dialogueService.open<any>(
      new PolymorpheusComponent(ApplyJobConfirmationComponent, this.injector),
      {
        size:'m',
        data: { jobId:this.job_id, type:'unSave-Job' }
      },
    );

    if (this.unSaveJobConfirmation) {
      this.unSaveJobConfirmationSubscription = this.unSaveJobConfirmation.subscribe()
    }
  }

  closeUnSaveJobConfirmation() {
    this.unSaveJobConfirmationSubscription?.unsubscribe()
  }
}
