import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../user-store/user.model';
import { getUserId, getUserSkills } from '../../user-store/user.selector';
import { updateUserSkills } from '../../user-store/user.actions';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-skills-edit',
  templateUrl: './user-skills-edit.component.html',
  styleUrl: './user-skills-edit.component.scss'
})
export class UserSkillsEditComponent implements OnInit{

  userSkills:string[] | undefined;
  skillsForm!:FormGroup;
  user_id!:string;

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  ngOnInit(): void {
    this._userStore.select(getUserSkills).subscribe((skills) => this.userSkills = skills)
    this._userStore.select(getUserId).subscribe((id) => this.user_id = id)
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
      const skillsValues:string[] = this.skillsForm.get('skills')?.value
      this._profileEditModal.closeUserSkillsEditModal()
      this._userStore.dispatch(updateUserSkills({ skills:skillsValues }))
    } else {
      this.skillsForm.markAllAsTouched()
    }
  }

}
