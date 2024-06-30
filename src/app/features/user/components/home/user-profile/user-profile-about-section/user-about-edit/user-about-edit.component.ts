import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../../user-store/user.model';
import { getUserAbout } from '../../../../../user-store/user.selector';
// import { updateUserAbout } from '../../user-store/user.actions';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { Router } from '@angular/router';
import { updateUserAbout, updateUserAboutSuccess } from '../../../../../user-store/user.actions';
import { Subscription } from 'rxjs';
import { UserAPIServiceService } from '../../../../../services/user-api-service.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-user-about-edit',
  templateUrl: './user-about-edit.component.html',
  styleUrl: './user-about-edit.component.scss'
})
export class UserAboutEditComponent implements OnInit, OnDestroy{

  isLoading:boolean = false
  aboutForm!:FormGroup;
  userId!:string;

  private _userStoreSubscription!:Subscription;
  
  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _profileEditModal:UserProfileEditModalService,
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _alert:TuiAlertService,
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserAbout).subscribe({
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
      this.isLoading = true
      const about:string = this.aboutForm.get('about')?.value 
      this._userAPIs.userUpdateAbout(about).subscribe({
        next: (res:any) => {
          this._profileEditModal.closeUserAboutEditModal()
          this._userStore.dispatch(updateUserAboutSuccess({ user:res.updatedData }))
        },
        error: err => {
          this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
        }).subscribe()
        }
      })
    } else {
      this.aboutForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}
