import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { DeleteJobConfirmationService } from '../../../../services/delete-job-confirmation.service';
import { AuthService } from '../../../../services/auth.service';
import { Store } from '@ngrx/store';
import { Employer } from '../../../../store/employer-store/employer.model';
import { deleteJob } from '../../../../store/employer-store/employer.actions';

@Component({
  selector: 'app-delete-job-confirmation',
  templateUrl: './delete-job-confirmation.component.html',
  styleUrl: './delete-job-confirmation.component.scss'
})
export class DeleteJobConfirmationComponent implements OnInit{

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
    private alert: TuiAlertService,
    private confirmDeleteDialogue:DeleteJobConfirmationService,
    private APIService:AuthService,
    private employerState: Store<{employer:Employer}>
  ) {}

  editJobId!:string;

  ngOnInit(): void {
    if(this.data) {
      this.editJobId = this.data
    }
  }

  get data(): string {
    return this.context.data
  }

  closeDialog() {
    this.confirmDeleteDialogue.closeModal()
  }

  confirmDalete(jobId:string) {
    this.APIService.companyDeleteJob(jobId).subscribe( res => {
      console.log(res);
      this.employerState.dispatch(deleteJob({ id:jobId }))
      this.alert.open('', {
        label: 'Job Post delete sucessfull',
        status: 'success',
        autoClose: true,
        hasCloseButton: true,
      }).subscribe()  
      this.confirmDeleteDialogue.closeModal()
    }, err => {
      console.log(err);      
    })
  }
}
