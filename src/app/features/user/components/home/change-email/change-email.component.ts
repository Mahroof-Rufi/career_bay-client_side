import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sameEmailValidator } from '../../../../../validators/same-email-validator';
import { TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { UserAPIServiceService } from '../../../services/user-api-service.service';
import { AuthApiService } from '../../../../../services/auth-api-service.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent implements OnInit,OnDestroy{

  private _userAPIsSubscription!:Subscription;
  private _alertSubscription!:Subscription;

  changeEmailForm!:FormGroup;

  OTP_BTN1:string = 'Send OTP'
  startingMinute1: number = 1; 
  time1: number = 0
  minutes1: number = Math.floor(this.time1 / 60);
  seconds1: number = Math.floor(this.time1 % 60);
  timerInterval1: any; 

  OTP_BTN2:string = 'Send OTP'
  startingMinute2: number = 1; 
  time2: number = 0
  minutes2: number = Math.floor(this.time1 / 60);
  seconds2: number = Math.floor(this.time1 % 60);
  timerInterval2: any; 

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _authAPIs:AuthApiService,
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _alert: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.changeEmailForm = this._formBuilder.group({
      currentEmail: ['', [Validators.required, Validators.email]],
      currentEmailOTP: ['', [Validators.required, Validators.maxLength(6)]],
      newEmail: ['', [Validators.required, Validators.email]],
      newEmailOTP: ['', [Validators.required,Validators.maxLength(6)]]
    }, { validators:[sameEmailValidator] } )
  }

  sendCurrentEmailOTP() {
    if (this.changeEmailForm.get('currentEmail')?.valid) {
      const currentEmail = this.changeEmailForm.get('currentEmail')?.value

      this._userAPIsSubscription = this._userAPIs.changeEmailSendOTP(currentEmail).subscribe({
        next: response => {
          this.OTP_BTN1 = 'Resend OTP'
          this.time1 = this.startingMinute1 * 60;
          this.timerInterval1 = setInterval(() => {
            this.updateTimer(1);
          }, 1000);
          this._alertSubscription = this._alert.open('', {
            label: response.message,
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        },

        error: err => {
          this._alertSubscription = this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }
      })

    } else {
      this.changeEmailForm.get('currentEmail')?.markAsTouched()
    }
  }

  sendNewEmailOTP() {
    if (this.changeEmailForm.get('newEmail')?.valid) {
      const newEmail = this.changeEmailForm.get('newEmail')?.value

      this._userAPIsSubscription = this._authAPIs.userRequestOTP(newEmail).subscribe({
        next: response => {
          this.OTP_BTN2 = 'Resend OTP'
          this.time2 = this.startingMinute1 * 60;
          this.timerInterval2 = setInterval(() => {
            this.updateTimer(2);
          }, 1000);
          this._alertSubscription = this._alert.open('', {
            label: response,
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        },

        error: err => {
          this._alertSubscription = this._alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }
      })
    
    } else {
      this.changeEmailForm.get('newEmail')?.markAsTouched()
    }
  }

  submitChangeEmail() {
    if (this.changeEmailForm.valid) {
      const formData = this.changeEmailForm.value;

      this._userAPIsSubscription = this._userAPIs.userUpdateEmail(formData).subscribe({
        next: response => {
          this._alertSubscription = this._alert.open('', {
            label: response.message,
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        },
        error: err => {
          this._alertSubscription = this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }
      })

    } else {
      this.changeEmailForm.markAllAsTouched()
    }
  }

  updateTimer(no:number) {
    if (no == 1) {
      if (this.time1 > 0) {
        this.minutes1 = Math.floor(this.time1 / 60);
        this.seconds1 = Math.floor(this.time1 % 60);
        this.time1--;
      } else {
        this.time1 = 0
        clearInterval(this.timerInterval1); 
      }
    } else {
      if (this.time2 > 0) {
        this.minutes2 = Math.floor(this.time2 / 60);
        this.seconds2 = Math.floor(this.time2 % 60);
        this.time2--;
      } else {
        this.time2 = 0
        clearInterval(this.timerInterval2); 
      }
    }
  } 

  ngOnDestroy(): void {
    this._userAPIsSubscription?.unsubscribe()
    this._alertSubscription?.unsubscribe()
  }

}
