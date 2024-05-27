import { Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Employer } from '../../store/employer.model';
import { getEmployerId } from '../../store/employer.selector';
import { ApplicationsConfirmationModalService } from '../../services/applications-confirmation-modal.service';
import { rejectApplication, updateApplicationStatus } from '../../store/employer.actions';

@Component({
  selector: 'app-applications-confirmation-modal',
  templateUrl: './applications-confirmation-modal.component.html',
  styleUrl: './applications-confirmation-modal.component.scss'
})
export class ApplicationsConfirmationModalComponent implements OnInit{

  employerId!:string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _employerStore: Store<{ employer:Employer }>,
    private readonly _applicationConfirmationModal:ApplicationsConfirmationModalService,
  ) {}

  ngOnInit(): void {
    this._employerStore.select(getEmployerId).subscribe((id) => this.employerId = id)    
  }

  get data(): any {
    return this._context.data
  }

  cancel() {
    this._applicationConfirmationModal.closeApplicationsStatusChangeDialogue()
  }

  confirm() {
    this._applicationConfirmationModal.closeApplicationsStatusChangeDialogue()
    this._employerStore.dispatch(updateApplicationStatus({ 
      employer_id:this.employerId, 
      job_id:this.data.jobId, 
      user_id:this.data.userId,
      newStatus:this.data.newStatus 
    }))
  }

  cancelReject() {
    this._applicationConfirmationModal.closeApplicationRejectionDialogue()
  }

  confirmReject() {
    this._applicationConfirmationModal.closeApplicationRejectionDialogue()
    this._employerStore.dispatch(rejectApplication({ job_id:this.data.jobId, user_id:this.data.userId }))
  }
}
