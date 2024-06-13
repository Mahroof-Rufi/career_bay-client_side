import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ApplyJobConfirmationService } from '../../services/apply-job-confirmation.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngrx/store';
import { User } from '../../user-store/user.model';
import { getUserId } from '../../user-store/user.selector';
import { applyJob, saveJob, unSaveJob } from '../../user-store/user.actions';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIServiceService } from '../../services/user-api-service.service';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';

@Component({
  selector: 'app-apply-job-confirmation',
  templateUrl: './apply-job-confirmation.component.html',
  styleUrl: './apply-job-confirmation.component.scss',
})
export class ApplyJobConfirmationComponent implements OnInit, OnDestroy {
  user_id!: string;
  job_id!: string;
  type!: string;

  resumeFile: File | null = null;
  resumeRequiredError: boolean = false;

  private _getUserIdSubscription!: Subscription;

  constructor(
    private readonly _applyJobConfirmationService: ApplyJobConfirmationService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _formBuilder: FormBuilder,
    private readonly _userStore: Store<{ user: User }>,
    private readonly _jobsAPIs:JobsApiServiceService
  ) {}

  ngOnInit(): void {
    this._getUserIdSubscription = this._userStore.select(getUserId).subscribe((res) => (this.user_id = res));
    const data: any = this.data;
    this.job_id = data.jobId;
    this.type = data.type;
  }

  get data(): string {
    return this._context.data;
  }

  closeDialog() {
    this._applyJobConfirmationService.closeApplyJobConfirmationModal();
  }

  closeSaveJob() {
    this._applyJobConfirmationService.closeSaveJobConfirmation();
  }

  confirmSave() {
    this._userStore.dispatch(saveJob({ job_id: this.job_id }));
    this._applyJobConfirmationService.closeSaveJobConfirmation();
  }

  closeUnSave() {
    this._applyJobConfirmationService.closeUnSaveJobConfirmation();
  }

  confirmUnSave() {
    this._userStore.dispatch(unSaveJob({ job_id: this.job_id }));
    this._applyJobConfirmationService.closeUnSaveJobConfirmation();
  }

  handleResume(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.resumeFile = input.files[0];
    }
  }

  removeResume() {
    this.resumeFile = null;
  }

  submitJobApplication() {
    if (this.resumeFile) {
      const formData = new FormData
      formData.append('job_id', this.job_id)
      formData.append('resume', this.resumeFile)
      this._userStore.dispatch(applyJob({ formData:formData }))
    } else {
      this.resumeRequiredError = true;
    }
  }

  ngOnDestroy(): void {
    this._getUserIdSubscription.unsubscribe();
  }
}
