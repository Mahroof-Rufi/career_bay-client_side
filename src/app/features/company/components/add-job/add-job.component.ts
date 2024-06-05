import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { AddJobPostService } from '../../services/add-job-post-modal.service';
import { Employer, Job } from '../../store/employer.model';
import { Store } from '@ngrx/store';
import { getJobById } from '../../store/employer.selector';
import { addJobPost, updateJob } from '../../store/employer.actions';
import { JobsApiServiceService } from '../../../../shared/services/jobs-api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent implements OnInit, OnDestroy{

  states:string[] = ['Kerala','Karnataka','Telengana'];
  jobTypes:string[] = ['FullTime', 'PartTime', 'Contract'];
  experienceLevels:string[] = ['InternShip','EntryLevel','Junior','Mid-Level','Senior'];
  workSchedule:string[] = ['Day Shift','Night Shift','Flexible'];
  payType:string[] = ['/Hr', '/Day', '/Week', '/Month', '/Year']

  jobPostFrom!:FormGroup;

  editJob!:Job | undefined;
  heading:string = 'Add Job Post';

  private _jobAPISubscription!:Subscription;
  private _alertSubscription!:Subscription;
  private _employerStoreSubscription!:Subscription;
  
  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _jobsAPIs:JobsApiServiceService,
    private readonly _router:Router,
    private readonly _alert: TuiAlertService,
    private readonly _addJobModal:AddJobPostService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _employerStore: Store<{employer:Employer}>
  ) {}

  ngOnInit(): void {
    if(this.data) {
      this.heading = 'Edit Job Post'
      this._employerStoreSubscription = this._employerStore.select(getJobById(this.data)).subscribe( res => {
        this.editJob = res
      } ) 
    }
    this.jobPostFrom = this._formBuilder.group({
      jobTitle: this._formBuilder.control(this.editJob?.jobTitle || '', Validators.required),
      city: this._formBuilder.control({ value: this.editJob?.city || '', disabled:this.editJob?.remort || false }, Validators.required),
      state: this._formBuilder.control({ value: this.editJob?.state || '', disabled:this.editJob?.remort || false }, Validators.required),
      remort: [this.editJob?.remort || false, Validators.required],
      jobType: this._formBuilder.control(this.editJob?.jobType || '', Validators.required),
      minimumPay: this._formBuilder.control(this.editJob?.minimumPay || '', Validators.required),
      maximumPay: this._formBuilder.control(this.editJob?.maximumPay || '', Validators.required),
      payType: this._formBuilder.control(this.editJob?.payType || '', Validators.required),
      experienceLevel: this._formBuilder.control(this.editJob?.experienceLevel || '', Validators.required),
      workShift: this._formBuilder.control(this.editJob?.workShift || '', Validators.required),
      overView: this._formBuilder.control(this.editJob?.overView || '' ,Validators.required),
      responsibilities: this.initResponsibilities(),
      qualifications: this.initQualifications()
    });
  }

  initResponsibilities() {
    const responsibilitiesArray = this._formBuilder.array([])
    if (this.editJob && this.editJob.responsibilities) {
      this.editJob.responsibilities.forEach(res => {
        responsibilitiesArray.push(this._formBuilder.control(res, Validators.required))
      });
    } else {
      responsibilitiesArray.push(this._formBuilder.control('', Validators.required))
    }
    return responsibilitiesArray
  }

  initQualifications() {
    const qualificationArray = this._formBuilder.array([]);
    if (this.editJob && this.editJob.qualifications) {
      this.editJob.qualifications.forEach( qualification => {
        qualificationArray.push(this._formBuilder.control(qualification, Validators.required))
      })
    } else {
      qualificationArray.push(this._formBuilder.control('', Validators.required))
    }
    return qualificationArray
  }

  get data(): string {
    return this._context.data
  }

  get qualifications(): FormArray {
    return this.jobPostFrom.get('qualifications') as FormArray
  }

  get responsibilities(): FormArray {
    return this.jobPostFrom.get('responsibilities') as FormArray
  }

  addQualification() {
    (<FormArray>this.jobPostFrom.get('qualifications')).push(new FormControl('', Validators.required))
  }

  deleteQualification(index:number) {
    this.qualifications.removeAt(index)
  }

  addResponsibility() {
    (<FormArray>this.jobPostFrom.get('responsibilities')).push(new FormControl('', Validators.required))
  }

  deleteResponsibility(index:number) {
    this.responsibilities.removeAt(index)
  }

  toggleLocation(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const remote = checkbox.checked;

    const cityControl = this.jobPostFrom.get('city');
    const stateControl = this.jobPostFrom.get('state');
    if (remote) {
      cityControl?.setValue('');
      stateControl?.setValue('');
      cityControl?.disable();
      stateControl?.disable();
      cityControl?.clearValidators();
      stateControl?.clearValidators();
    } else {
      cityControl?.enable();
      stateControl?.enable();
      cityControl?.setValidators(Validators.required);
      stateControl?.setValidators(Validators.required);
    }

    cityControl?.updateValueAndValidity();
    stateControl?.updateValueAndValidity();
  }

  submitJobPost() {
    if (this.jobPostFrom.valid) {
      const jobData:FormData = this.jobPostFrom.value
      if (this.editJob) {
        this._jobAPISubscription = this._jobsAPIs.companyEditJobPost(this.editJob._id, jobData).subscribe({
          next: response => {
            this._employerStore.dispatch(updateJob({ id:response.updatedJob._id, updatedJob:response.updatedJob }))
            this._addJobModal.closeModal()
            this._alertSubscription = this._alert.open('', {
              label: 'Job Post updated successful',
              status: 'success',
              autoClose: true,
              hasCloseButton: true,
            }).subscribe()
          },
          error: err => {
            this._alertSubscription = this._alert.open('', {
              label: err.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true,
            }).subscribe()
          }
        })
      } else {
        this._jobAPISubscription = this._jobsAPIs.companyAddJobPost(jobData).subscribe({
          next: response => {
            this._employerStore.dispatch(addJobPost({ job:response.job }))
            this._addJobModal.closeModal()
            this._alertSubscription = this._alert.open('', {
              label: 'Job Post Successful',
              status: 'success',
              autoClose: true,
              hasCloseButton: true,
            }).subscribe() 
          },
          
          error: err => {
            this._router.navigateByUrl('/home')
            this._alertSubscription = this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: true,
              hasCloseButton: true,
            }).subscribe()
          }
        })
      }
    } else {      
      this.jobPostFrom.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._jobAPISubscription?.unsubscribe()
    this._employerStoreSubscription?.unsubscribe()
    this._alertSubscription?.unsubscribe()
  }

}
