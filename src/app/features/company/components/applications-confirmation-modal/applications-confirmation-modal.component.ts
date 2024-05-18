import { Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Employer } from '../../../../store/employer-store/employer.model';
import { getEmployerId } from '../../../../store/employer-store/employer.selector';
import { ApplicationsConfirmationModalService } from '../../services/applications-confirmation-modal.service';
import { updateCandidateStatus } from '../../../../store/employer-store/employer.actions';

@Component({
  selector: 'app-applications-confirmation-modal',
  templateUrl: './applications-confirmation-modal.component.html',
  styleUrl: './applications-confirmation-modal.component.scss'
})
export class ApplicationsConfirmationModalComponent implements OnInit{

  employerId!:string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
    private employerStore: Store<{ employer:Employer }>,
    private applicationConfirmationService:ApplicationsConfirmationModalService,
  ) {}

  ngOnInit(): void {
    this.employerStore.select(getEmployerId).subscribe((id) => this.employerId = id)
    console.log(this.data);
    
  }

  get data(): any {
    return this.context.data
  }

  cancel() {
    this.applicationConfirmationService.closeApplicationsStatusChangeDialogue()
  }

  confirm() {
    this.applicationConfirmationService.closeApplicationsStatusChangeDialogue()
    this.employerStore.dispatch(updateCandidateStatus({ 
      employer_id:this.employerId, 
      job_id:this.data.jobId, 
      user_id:this.data.userId,
      newStatus:this.data.newStatus 
    }))
  }

}
