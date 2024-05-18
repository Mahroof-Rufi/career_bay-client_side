import { Injectable, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { ApplyJobConfirmationComponent } from '../components/apply-job-confirmation/apply-job-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ApplyJobConfirmationService {

  private applyJobConfirmation: Observable<any> | undefined;
  private applyJobConfirmationSubsciption!: Subscription

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
        data: this.job_id
      },
    );
  }
  
  openApplyJobConfirmationModal(job_id:string) {
    this.job_id = job_id
    this.initializeApplyJobConfirmationModal()
    if (this.applyJobConfirmation) {
      this.applyJobConfirmationSubsciption = this.applyJobConfirmation?.subscribe()
    }
  }

  closeApplyjobConfirmationModal() {
    if (this.applyJobConfirmationSubsciption) {
      this.applyJobConfirmationSubsciption.unsubscribe()
    }
  }
}
