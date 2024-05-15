import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/user-store/user.model';
import { getUserAbout } from '../../../../store/user-store/user.selector';
import { updateUserAbout } from '../../../../store/user-store/user.actions';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-about-edit',
  templateUrl: './user-about-edit.component.html',
  styleUrl: './user-about-edit.component.scss'
})
export class UserAboutEditComponent implements OnInit{

  aboutForm!:FormGroup;
  userId!:string;
  
  constructor(
    private formBuilder:FormBuilder,
    private userStore:Store<{ user:User }>,
    private profileEditService:UserProfileEditModalService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserAbout).subscribe((res) => {
      this.aboutForm = this.formBuilder.group({
        about: [res.about, [Validators.required, Validators.maxLength(600)]]
      });
      this.userId = res.userID
    })
  }

  submitEditAbout() {
    if (this.aboutForm.valid) {
      const about:string = this.aboutForm.get('about')?.value 
      this.userStore.dispatch(updateUserAbout({ newData:{ about:about }, userId:this.userId },))
      this.profileEditService.closeUseraboutEditModal()

    } else {
      this.aboutForm.markAllAsTouched()
    }
  }

}
