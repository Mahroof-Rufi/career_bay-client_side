import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/user-store/user.model';
import { getUserId, getUserSkills } from '../../../../store/user-store/user.selector';
import { updateUserSkills } from '../../../../store/user-store/user.actions';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-skills-edit',
  templateUrl: './user-skills-edit.component.html',
  styleUrl: './user-skills-edit.component.scss'
})
export class UserSkillsEditComponent implements OnInit{

  userSkills:string[] | undefined;
  skillsform!:FormGroup;
  user_id!:string;

  constructor(
    private formBuilder:FormBuilder,
    private userStore:Store<{ user:User }>,
    private profileEditService:UserProfileEditModalService
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserSkills).subscribe((skills) => this.userSkills = skills)
    this.userStore.select(getUserId).subscribe((id) => this.user_id = id)
    this.skillsform = this.formBuilder.group({
      skills : this.initSkills() 
    })
  }

  initSkills() {
    const skillsArray = this.formBuilder.array([])
    if (this.userSkills && this.userSkills.length) {
      this.userSkills.forEach(res => {
        skillsArray.push(this.formBuilder.control(res, Validators.required))
      });
    } else {
      skillsArray.push(this.formBuilder.control('', Validators.required))
    }
    return skillsArray
  }

  get skills(): FormArray {
    return this.skillsform.get('skills') as FormArray
  }

  addSkill() {
    (<FormArray>this.skillsform.get('skills')).push(new FormControl('', Validators.required))
  }

  deleteSkill(index:number) {
    this.skills.removeAt(index)
  }

  submitSkills() {
    if (this.skillsform.valid) {
      const skillsValues:string[] = this.skillsform.get('skills')?.value
      this.profileEditService.closeUserSkillsEditModal()
      this.userStore.dispatch(updateUserSkills({ skills:skillsValues, user_id:this.user_id }))
    } else {
      this.skillsform.markAllAsTouched()
    }
  }

}
