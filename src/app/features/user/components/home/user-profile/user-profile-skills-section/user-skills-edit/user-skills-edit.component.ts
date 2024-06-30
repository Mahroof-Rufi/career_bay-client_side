import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../../user-store/user.model';
import { getUserId, getUserSkills } from '../../../../../user-store/user.selector';
import { updateUserProfileSuccess, updateUserSkills } from '../../../../../user-store/user.actions';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { Subscription } from 'rxjs';
import { UserAPIServiceService } from '../../../../../services/user-api-service.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-user-skills-edit',
  templateUrl: './user-skills-edit.component.html',
  styleUrl: './user-skills-edit.component.scss'
})
export class UserSkillsEditComponent implements OnInit, OnDestroy{

  isLoading:boolean = false
  userSkills:string[] | undefined;
  skillsForm!:FormGroup;
  user_id!:string;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _alert:TuiAlertService,
    private readonly _profileEditModal:UserProfileEditModalService,
    private readonly _userAPIs:UserAPIServiceService,
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserSkills).subscribe((skills) => this.userSkills = skills)
    this._userStoreSubscription = this._userStore.select(getUserId).subscribe((id) => this.user_id = id)
    this.skillsForm = this._formBuilder.group({
      skills : this.initSkills() 
    })
  }

  initSkills() {
    const skillsArray = this._formBuilder.array([])
    if (this.userSkills && this.userSkills.length) {
      this.userSkills.forEach(res => {
        skillsArray.push(this._formBuilder.control(res, Validators.required))
      });
    } else {
      skillsArray.push(this._formBuilder.control('', Validators.required))
    }
    return skillsArray
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray
  }

  addSkill() {
    (<FormArray>this.skillsForm.get('skills')).push(new FormControl('', Validators.required))
  }

  deleteSkill(index:number) {
    this.skills.removeAt(index)
  }

  submitSkills() {
    if (this.skillsForm.valid) {
      this.isLoading = true
      const skillsValues:string[] = this.skillsForm.get('skills')?.value
      this._userAPIs.userUpdateSkills(skillsValues).subscribe({
        next: (res:any) => {
          this._profileEditModal.closeUserSkillsEditModal()
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
      this.skillsForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }
}
