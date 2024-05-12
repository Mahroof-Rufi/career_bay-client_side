import { Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { AddJobPostService } from '../../../../services/add-job-post.service';
import { Employer, Job } from '../../../../store/employer-store/employer.model';
import { Store } from '@ngrx/store';
import { getJobById } from '../../../../store/employer-store/employer.selector';
import { addJobPost, updateJob } from '../../../../store/employer-store/employer.actions';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent implements OnInit{

  states:string[] = ['Kerala','Karnataka','Telengana'];
  jobTypes:string[] = ['FullTime', 'PartTime', 'Contract'];
  experienceLevels:string[] = ['InternShip','EntryLevel','Junior','Senior'];
  workSchedule:string[] = ['Day Shift','Night Shift','Flexible']
  jobPostFrom!:FormGroup;

  editJob!:Job | undefined;
  heading:string = 'Add Job Post';
  
  constructor(
    private formBuilder:FormBuilder,
    private apiService:AuthService,
    private router:Router,
    private alert: TuiAlertService,
    private modalService:AddJobPostService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
    private employerState: Store<{employer:Employer}>
  ) {}

  ngOnInit(): void {
    if(this.data) {
      this.heading = 'Edit Job Post'
      this.employerState.select(getJobById(this.data)).subscribe( res => {
        this.editJob = res
      } ) 
    }
    this.jobPostFrom = this.formBuilder.group({
      jobTitle: this.formBuilder.control(this.editJob?.jobTitle || '', Validators.required),
      city: this.formBuilder.control({ value: this.editJob?.city || '', disabled:this.editJob?.remort || false }, Validators.required),
      state: this.formBuilder.control({ value: this.editJob?.state || '', disabled:this.editJob?.remort || false }, Validators.required),
      remort: [this.editJob?.remort || false, Validators.required],
      jobType: this.formBuilder.control(this.editJob?.jobType || '', Validators.required),
      minimumPay: this.formBuilder.control(this.editJob?.minimumPay || '', Validators.required),
      maximumPay: this.formBuilder.control(this.editJob?.maximumPay || '', Validators.required),
      payType: this.formBuilder.control(this.editJob?.payType || '', Validators.required),
      experienceLevel: this.formBuilder.control(this.editJob?.experienceLevel || '', Validators.required),
      workShift: this.formBuilder.control(this.editJob?.workShift || '', Validators.required),
      overView: this.formBuilder.control(this.editJob?.overView || '' ,Validators.required),
      responsibilities: this.initResponsibilities(),
      qualifications: this.initQualifications()
    });
  }

  initResponsibilities() {
    const responsibilitiesArray = this.formBuilder.array([])
    if (this.editJob && this.editJob.responsibilities) {
      this.editJob.responsibilities.forEach(res => {
        responsibilitiesArray.push(this.formBuilder.control(res, Validators.required))
      });
    } else {
      responsibilitiesArray.push(this.formBuilder.control('', Validators.required))
    }
    return responsibilitiesArray
  }

  initQualifications() {
    const qualificationArray = this.formBuilder.array([]);
    if (this.editJob && this.editJob.qualifications) {
      this.editJob.qualifications.forEach( qualification => {
        qualificationArray.push(this.formBuilder.control(qualification, Validators.required))
      })
    } else {
      qualificationArray.push(this.formBuilder.control('', Validators.required))
    }
    return qualificationArray
  }

  get data(): string {
    return this.context.data
  }

  get qualifications(): FormArray {
    return this.jobPostFrom.get('qualifications') as FormArray
  }

  get responsibilities(): FormArray {
    return this.jobPostFrom.get('responsibilities') as FormArray
  }

  addqualification() {
    (<FormArray>this.jobPostFrom.get('qualifications')).push(new FormControl('', Validators.required))
  }

  deletequalification(index:number) {
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
        this.apiService.companyEditJobPost(this.editJob._id, jobData).subscribe( res => {
          this.employerState.dispatch(updateJob({id:res.updateJob._id, updatedJob:res.updateJob}))
          this.modalService.closeModal()
          this.alert.open('', {
            label: 'Job Post updated sucessfull',
            status: 'success',
            autoClose: true,
            hasCloseButton: true,
          }).subscribe()  
          
        }, err => {
          this.alert.open('', {
            label: err.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true,
          }).subscribe()  
        })
      } else {
        this.apiService.companyAddJobPost(jobData).subscribe((res) => {
          this.employerState.dispatch(addJobPost({ job:res.data }))
          this.modalService.closeModal()
          this.alert.open('', {
            label: 'Job Post Sucessfull',
            status: 'success',
            autoClose: true,
            hasCloseButton: true,
          }).subscribe()        
        }, (err) => {
          this.router.navigateByUrl('/home')
          this.alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true,
          }).subscribe()  
        })
      }
    } else {      
      this.jobPostFrom.markAllAsTouched()
    }
  }

}
