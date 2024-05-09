import { Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { AddJobPostService } from '../../../../services/add-job-post.service';
import { Job } from '../../../../store/employer-store/employer.model';
import { StateManagerService } from '../../../../services/state-manager.service';

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
    private employerState:StateManagerService
  ) {}

  ngOnInit(): void {
    if(this.data) {
      this.heading = 'Edit Job Post'
      this.employerState.getJobBYId(this.data).subscribe((res) => {
        this.editJob = res
      })
    }
    this.jobPostFrom = this.formBuilder.group({
      jobTitle: this.formBuilder.control(this.editJob?.jobTitle || '', Validators.required),
      city: this.formBuilder.control({ value: this.editJob?.city || '', disabled:this.editJob?.remort || false }, Validators.required),
      state: this.formBuilder.control({ value: this.editJob?.state || '', disabled:this.editJob?.remort || false }, Validators.required),
      remort: [this.editJob?.remort || false, Validators.required],
      jobType: this.formBuilder.control(this.editJob?.jobType || '', Validators.required),
      minimumPay: this.formBuilder.control(this.editJob?.minimumPay || '', Validators.required),
      maximumPay: this.formBuilder.control('', Validators.required),
      payType: this.formBuilder.control('', Validators.required),
      experienceLevel: this.formBuilder.control('', Validators.required),
      workShift: this.formBuilder.control('', Validators.required),
      overView: this.formBuilder.control('' , [Validators.required, Validators.maxLength(600)]),
      responsibilities: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      skills: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      qualifications: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ])
    });
  }

  get data(): string {
    return this.context.data
  }

  get skills(): FormArray {
    return this.jobPostFrom.get('skills') as FormArray
  }

  get qualifications(): FormArray {
    return this.jobPostFrom.get('qualifications') as FormArray
  }

  get responsibilities(): FormArray {
    return this.jobPostFrom.get('responsibilities') as FormArray
  }

  addSkills() {
    (<FormArray>this.jobPostFrom.get('skills')).push(new FormControl('', Validators.required))
  }

  deleteSkill(index:number) {
    this.skills.removeAt(index)
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
      this.apiService.companyAddJobPost(jobData).subscribe((res) => {
        console.log(res);
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
    } else {      
      this.jobPostFrom.markAllAsTouched()
    }
  }

}
