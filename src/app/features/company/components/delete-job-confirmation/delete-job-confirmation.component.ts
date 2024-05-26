import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { DeleteJobConfirmationService } from '../../services/delete-job-confirmation.service';
import { Store } from '@ngrx/store';
import { Employer } from '../../store/employer.model';
import { deleteJob } from '../../store/employer.actions';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';

@Component({
  selector: 'app-delete-job-confirmation',
  templateUrl: './delete-job-confirmation.component.html',
  styleUrl: './delete-job-confirmation.component.scss'
})
export class DeleteJobConfirmationComponent implements OnInit{

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _alert: TuiAlertService,
    private readonly _confirmDeleteDialogue:DeleteJobConfirmationService,
    private readonly _jobAPIs:JobsApiServiceService,
    private readonly _employerState: Store<{employer:Employer}>
  ) {}

  editJobId!:string;

  ngOnInit(): void {
    if(this.data) {
      this.editJobId = this.data
    }
  }

  get data(): string {
    return this._context.data
  }

  closeDialog() {
    this._confirmDeleteDialogue.closeModal()
  }

  confirmDelete(jobId:string) {
    this._jobAPIs.companyDeleteJob(jobId).subscribe( res => {
      this._employerState.dispatch(deleteJob({ id:jobId }))
      this._alert.open('', {
        label: 'Job Post delete successful',
        status: 'success',
        autoClose: true,
        hasCloseButton: true,
      }).subscribe()  
      this._confirmDeleteDialogue.closeModal()
    }, err => {
      console.log(err);
      this._alert.open('', {
        label: err.error.message,
        status: 'error',
        autoClose: true,
        hasCloseButton: true
    }).subscribe()      
    })
  }
}
