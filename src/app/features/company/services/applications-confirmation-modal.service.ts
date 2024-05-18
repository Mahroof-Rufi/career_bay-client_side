import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { ApplicationsConfirmationModalComponent } from '../components/applications-confirmation-modal/applications-confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsConfirmationModalService {

  private applicationStatusChangeDialogue: Observable<any> | undefined;
  private applicationStatusChangeSubscription!: Subscription

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector
  ) { }

  openApplicationStatusChangeDialogue(job_id:string | null, user_id:string, status:string) {
    if (status) {
      this.applicationStatusChangeDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(ApplicationsConfirmationModalComponent, this.injector),
        {
          size:'l',
          data:{jobId:job_id, userId:user_id, newStatus:status}
        } 
      )
    }

    if (this.applicationStatusChangeDialogue) {
      this.applicationStatusChangeSubscription = this.applicationStatusChangeDialogue.subscribe()
    }

  }

  closeApplicationsStatusChangeDialogue() {
    if (this.applicationStatusChangeSubscription) {
      this.applicationStatusChangeSubscription.unsubscribe()
    }
  }
}
