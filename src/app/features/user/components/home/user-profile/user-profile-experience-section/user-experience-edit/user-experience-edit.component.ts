import { User, experience } from '../../../../../user-store/user.model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { updateUserExperience, updateUserProfileSuccess } from '../../../../../user-store/user.actions';
import { getExperienceById, getUserId } from '../../../../../user-store/user.selector';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../../../../../../services/auth-api-service.service';
import { UserAPIServiceService } from '../../../../../services/user-api-service.service';

@Component({
  selector: 'app-user-experience-edit',
  templateUrl: './user-experience-edit.component.html',
  styleUrl: './user-experience-edit.component.scss'
})
export class UserExperienceEditComponent implements OnInit, OnDestroy{

  isLoading:boolean = false
  userId!:string;
  jobType:string[] = ['InterShip', 'ParTime', 'FullTime']
  cities:string[] = []
  states:string[] = []

  Heading:string = 'Add Experience'
  exp:experience | undefined;

  experienceForm!:FormGroup;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _profileEditModal: UserProfileEditModalService,
    private readonly _alert:TuiAlertService,
    private readonly _authAPIs: AuthApiService,
    private readonly _userAPIs: UserAPIServiceService,
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserId).subscribe((res) => this.userId = res)
    if(this.data) {
      this.Heading = 'Edit Experience'
      this._userStoreSubscription = this._userStore.select(getExperienceById(this.data)).subscribe( res => this.exp = res) 
    }
    this.experienceForm = this._formBuilder.group({
      jobTitle: [this.exp?.jobTitle || '', [Validators.required]],
      companyName: [this.exp?.companyName || '', [Validators.required]],
      jobType: [this.exp?.jobType || '', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      present: [this.exp?.present || false, [Validators.required]],
      city: [this.exp?.city || '', [Validators.required]],
      state: [this.exp?.state || '', [Validators.required]],
      remort: [this.exp?.remort || false, [Validators.required]],
      overView: [this.exp?.overView || '', [Validators.required, Validators.maxLength(600)]],
      technologies : this.initTechnologies() 
    })
    this._authAPIs.getCities().subscribe((res:any) => this.cities = res)
    this._authAPIs.getStates().subscribe((res:any) => this.states = res)
  }

  initTechnologies() {
    const skillsArray = this._formBuilder.array([])
    if (this.exp && this.exp.technologies) {
      this.exp.technologies.forEach(res => {
        skillsArray.push(this._formBuilder.control(res, Validators.required))
      });
    } else {
      skillsArray.push(this._formBuilder.control('', Validators.required))
    }
    return skillsArray
  }

  get data(): string {
    return this._context.data
  }

  get technologies(): FormArray {
    return this.experienceForm.get('technologies') as FormArray
  }

  addTechnology() {
    (<FormArray>this.experienceForm.get('technologies')).push(new FormControl('', Validators.required))
  }

  deleteTechnology(index:number) {
    this.technologies.removeAt(index)
  }

  toggleEndDate(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    const present = checkbox.checked;

    const endDateControl = this.experienceForm.get('endDate');
    if (present) {
      endDateControl?.setValue('');
      endDateControl?.disable();
      endDateControl?.clearValidators();
    } else {
      endDateControl?.enable();
      endDateControl?.setValidators(Validators.required);
    }

    endDateControl?.updateValueAndValidity();
  }

  toggleRemort(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    const remort = checkbox.checked;

    const cityControl = this.experienceForm.get('city');
    const stateControl = this.experienceForm.get('state')

    if (remort) {
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

  submitExperience() {
    if (this.experienceForm.valid) {
      this.isLoading = true
      const experience = this.experienceForm.value
      if (this.exp?._id) {
        this._userAPIs.userUpdateExperience(experience, this.exp._id).subscribe({
          next: (res:any) => {
            this._profileEditModal.closeUserExperienceEditModal()
            this._userStore.dispatch(updateUserProfileSuccess({ newData:res.updatedData }))
          },
          error: err => {
            this.isLoading = false
            this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: false,
              hasCloseButton: true
            }).subscribe()
          }
        })
      } else {
        this._userAPIs.userUpdateExperience(experience).subscribe({
          next: (res:any) => {
            this._profileEditModal.closeUserExperienceEditModal()
            this._userStore.dispatch(updateUserProfileSuccess({ newData:res.updatedData }))
          },
          error: err => {
            this.isLoading = false
            this._alert.open('', {
              label: err.error.message,
              status: 'error',
              autoClose: false,
              hasCloseButton: true
            }).subscribe()
          }
        })
      }
    } else {
      this.experienceForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}
