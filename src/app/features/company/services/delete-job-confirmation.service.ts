import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { DeleteJobConfirmationComponent } from '../components/delete-job-confirmation/delete-job-confirmation.component';

@Injectable()
export class DeleteJobConfirmationService {

  private confirmationDialogue: Observable<any> | undefined;
  private subscription!: Subscription
  private deleteJobId!: string

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {}

  private initializeDialog() {
    this.confirmationDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(DeleteJobConfirmationComponent, this.injector),
      {
        size:'m',
        data:this.deleteJobId ? this.deleteJobId : ''
    },
    );
  }

  openModal(jobId:string) {
    this.deleteJobId = jobId
    this.initializeDialog()

    if (this.confirmationDialogue) {
      this.subscription = this.confirmationDialogue.subscribe((result) => {
        
      })
    }
  }

  closeModal() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
