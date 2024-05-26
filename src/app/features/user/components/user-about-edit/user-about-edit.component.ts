import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../user-store/user.model';
import { getUserAbout } from '../../user-store/user.selector';
// import { updateUserAbout } from '../../user-store/user.actions';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { Router } from '@angular/router';
import { updateUserAbout } from '../../user-store/user.actions';

@Component({
  selector: 'app-user-about-edit',
  templateUrl: './user-about-edit.component.html',
  styleUrl: './user-about-edit.component.scss'
})
export class UserAboutEditComponent implements OnInit{

  aboutForm!:FormGroup;
  userId!:string;
  
  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _profileEditModal:UserProfileEditModalService,
  ) {}

  ngOnInit(): void {
    this._userStore.select(getUserAbout).subscribe({
      next: response => {
        this.aboutForm = this._formBuilder.group({
          about: [response.about, [Validators.required, Validators.maxLength(600)]]
        });
        this.userId = response.userID
      }
    })

  }

  submitEditAbout() {
    if (this.aboutForm.valid) {
      const about:string = this.aboutForm.get('about')?.value 
      this._userStore.dispatch(updateUserAbout({ newAbout:about }))
      // this._userStore.dispatch(updateUserAbout({ newData:{ about:about }, userId:this.userId },))
      this._profileEditModal.closeUserAboutEditModal()

    } else {
      this.aboutForm.markAllAsTouched()
    }
  }

}
