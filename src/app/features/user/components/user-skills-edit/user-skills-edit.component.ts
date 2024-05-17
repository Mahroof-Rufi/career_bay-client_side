import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-skills-edit',
  templateUrl: './user-skills-edit.component.html',
  styleUrl: './user-skills-edit.component.scss'
})
export class UserSkillsEditComponent implements OnInit{
  @Input() userSkills!:string[];

  skillsform!:FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
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

}
