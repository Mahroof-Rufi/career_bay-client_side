import { Component, Inject, OnInit } from '@angular/core';
import { ApplyJobConfirmationService } from '../../services/apply-job-confirmation.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/user-store/user.model';
import { getUserId } from '../../../../store/user-store/user.selector';
import { applyJob } from '../../../../store/user-store/user.actions';

@Component({
  selector: 'app-apply-job-confirmation',
  templateUrl: './apply-job-confirmation.component.html',
  styleUrl: './apply-job-confirmation.component.scss'
})
export class ApplyJobConfirmationComponent implements OnInit{

  user_id!:string

  constructor(
    private applyJobConfirmationService:ApplyJobConfirmationService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
    private userStore:Store<{ user:User }>
  ) {}


  ngOnInit(): void {
    this.userStore.select(getUserId).subscribe((res) => this.user_id = res)
  }

  get data(): string {
    return this.context.data
  }

  closeDialog() {
    this.applyJobConfirmationService.closeApplyjobConfirmationModal()
  }

  confirmApply() {  
    this.userStore.dispatch(applyJob({ job_id:this.data, user_id:this.user_id }))
    this.applyJobConfirmationService.closeApplyjobConfirmationModal()
  }
}
