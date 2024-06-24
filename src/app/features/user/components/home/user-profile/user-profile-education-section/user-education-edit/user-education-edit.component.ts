import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { User, education } from '../../../../../user-store/user.model';
import { editUserEducation } from '../../../../../user-store/user.actions';
import { getEducationById, getUserId } from '../../../../../user-store/user.selector';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-education-edit',
  templateUrl: './user-education-edit.component.html',
  styleUrl: './user-education-edit.component.scss'
})
export class UserEducationEditComponent implements OnInit, OnDestroy{

  educationForm!:FormGroup;

  Heading:string = "Add Education" 
  userId!:string;
  education:education | undefined;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _profileEditModal:UserProfileEditModalService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserId).subscribe(res => this.userId = res)
    if(this.data) {
      this.Heading = 'Edit Education'
      this._userStoreSubscription = this._userStore.select(getEducationById(this.data)).subscribe({
        next: response => {
          this.education = response
        }
      })
    }
    this.educationForm = this._formBuilder.group({
      universityName: [this.education?.universityName || '', [Validators.required]],
      subject: [this.education?.subject || '', [Validators.required]],
      startDate: [this.education?.startDate || '', [Validators.required]],
      endDate: [this.education?.endDate ||'', [Validators.required]],
      present: [this.education?.present || false, [Validators.required]],
      city: [this.education?.city || '', [Validators.required]],
      state: [this.education?.state || '', [Validators.required]],
      distance: [this.education?.distance || false, [Validators.required]]
    })
  }

  get data(): string {
    return this._context.data
  }

  preset(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    const present = checkbox.checked;

    const endDateControl = this.educationForm.get('endDate');
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


  distance(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    const distance = checkbox.checked;

    const cityControl = this.educationForm.get('city');
    const stateControl = this.educationForm.get('state')

    if (distance) {
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


  submitEducation() {
    if (this.educationForm.valid) {
      if (this.education?._id) {
        this._userStore.dispatch(editUserEducation({ education:this.educationForm.value, education_id:this.education._id }))
      } else {
        this._userStore.dispatch(editUserEducation({ education:this.educationForm.value }))
      }
      this._profileEditModal.closeUserEducationEditModal()
    } else {
      this.educationForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}
