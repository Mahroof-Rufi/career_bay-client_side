import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { User, education } from '../../../../store/user-store/user.model';
import { editUserEducation } from '../../../../store/user-store/user.actions';
import { getEducationById, getUserId } from '../../../../store/user-store/user.selector';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-user-education-edit',
  templateUrl: './user-education-edit.component.html',
  styleUrl: './user-education-edit.component.scss'
})
export class UserEducationEditComponent implements OnInit{

  educationForm!:FormGroup;

  Heading:string = "Add Education" 
  userId!:string;
  eductn:education | undefined;

  constructor(
    private formBuilder:FormBuilder,
    private userStore:Store<{ user:User }>,
    private profileEditService:UserProfileEditModalService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserId).subscribe((res) => this.userId = res)
    if(this.data) {
      this.Heading = 'Edit Education'
      this.userStore.select(getEducationById(this.data)).subscribe( res => {
        this.eductn = res
      }) 
    }
    this.educationForm = this.formBuilder.group({
      universityName: [this.eductn?.universityName || '', [Validators.required]],
      subject: [this.eductn?.subject || '', [Validators.required]],
      startDate: [this.eductn?.startDate || '', [Validators.required]],
      endDate: [this.eductn?.endDate ||'', [Validators.required]],
      present: [this.eductn?.present || false, [Validators.required]],
      city: [this.eductn?.city || '', [Validators.required]],
      state: [this.eductn?.state || '', [Validators.required]],
      distance: [this.eductn?.distance || false, [Validators.required]]
    })
  }

  get data(): string {
    return this.context.data
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
      if (this.eductn?._id) {
        this.userStore.dispatch(editUserEducation({ education:this.educationForm.value, userId:this.userId, edcn_id:this.eductn._id }))
      } else {
        this.userStore.dispatch(editUserEducation({ education:this.educationForm.value, userId:this.userId }))
      }
      this.profileEditService.closeUserEducationEditModdal()
    } else {
      this.educationForm.markAllAsTouched()
    }
  }

}
