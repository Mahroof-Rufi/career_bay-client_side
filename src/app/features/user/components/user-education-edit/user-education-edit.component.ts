import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/user-store/user.model';
import { editUserEducation } from '../../../../store/user-store/user.actions';
import { getUserId } from '../../../../store/user-store/user.selector';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-education-edit',
  templateUrl: './user-education-edit.component.html',
  styleUrl: './user-education-edit.component.scss'
})
export class UserEducationEditComponent implements OnInit{

  educationForm!:FormGroup;
  userId!:string;

  constructor(
    private formBuilder:FormBuilder,
    private userStore:Store<{ user:User }>,
    private profileEditService:UserProfileEditModalService
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserId).subscribe((res) => this.userId = res)
    this.educationForm = this.formBuilder.group({
      universityName: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      present: [false, [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      distance: [false, [Validators.required]]
    })
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

    const cityControll = this.educationForm.get('city');
    const stateControll = this.educationForm.get('state')

    if (distance) {
      cityControll?.setValue('');
      stateControll?.setValue('');
      cityControll?.disable();
      stateControll?.disable();
      cityControll?.clearValidators();
      stateControll?.clearValidators();
    } else {
      cityControll?.enable();
      stateControll?.enable();
      cityControll?.setValidators(Validators.required);
      stateControll?.setValidators(Validators.required);
    }

    cityControll?.updateValueAndValidity();
    stateControll?.updateValueAndValidity();
  }


  submitEducation() {
    if (this.educationForm.valid) {
      this.userStore.dispatch(editUserEducation({ education:this.educationForm.value, userId:this.userId }))
      this.profileEditService.closeUserEducationEditModdal()
    } else {
      this.educationForm.markAllAsTouched()
    }
  }

}
