import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../services/auth-api-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy{
  @Output() changeView: EventEmitter<string> = new EventEmitter()
  @Input() isUser: boolean = true;

  userRequestOTPSuccessSub!:Subscription;
  userRequestOTPFailureSub!:Subscription;

  employerRequestOTPSuccessSub!:Subscription;
  employerRequestOTPFailureSub!:Subscription;

  userSubmitFormSuccessSub!:Subscription;
  userSubmitFormFailureSub!:Subscription;

  employerSubmitFormSuccessSub!:Subscription;
  employerSubmitFormFailureSub!:Subscription;

  forgotPasswordForm!: FormGroup;

  otpButton: string = 'Send OTP'

  startingMinute: number = 1;
  time: number = 0
  minutes: number = Math.floor(this.time / 60);
  seconds: number = Math.floor(this.time % 60);
  timerInterval: any;

  constructor(
    private readonly _authAPIs:AuthApiService,
    private readonly _alert: TuiAlertService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      OTP: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [confirmPasswordValidator] })
  }

  loginPage() {
    if (this.isUser) {
      this.changeView.emit('user-login')
    } else {
      this.changeView.emit('company-login')
    }
  }

  requestOTP() {
    if (this.forgotPasswordForm.get('email')?.valid) {
      if (this.isUser) {
        this._authAPIs.userForgotPasswordRequestOTP(this.forgotPasswordForm.get('email')?.value).subscribe({
          next: response => {
            this.otpButton = 'Resend OTP'
            this.time = this.startingMinute * 60;
            this.timerInterval = setInterval(() => {
              this.updateTimer();
            }, 1000);
            this.userRequestOTPSuccessSub = this._alert.open('', {
              label: 'OTP send Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
          },

          error: err => {
            this.userRequestOTPFailureSub = this._alert.open('', {
              label: err.error,
              status: 'error',
              autoClose: false,
              hasCloseButton: true
            }).subscribe()
          }
        })

      } else {
        this._authAPIs.companyForgotPasswordRequestOTP(this.forgotPasswordForm.get('email')?.value).subscribe({
          next: response => {
            this.otpButton = 'Resend OTP'
            this.time = this.startingMinute * 60;
            this.timerInterval = setInterval(() => {
              this.updateTimer();
            }, 1000);
            this.employerRequestOTPSuccessSub = this._alert.open('', {
              label: 'OTP send Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
          },

          error: err => {
            this._alert.open('', {
              label: err.error,
              status: 'error',
              autoClose: false,
              hasCloseButton: true
            }).subscribe()
          }
        })
      }
    }else {
      this.forgotPasswordForm.get('email')?.markAsTouched()
    }
  }

  updateTimer() {
    if (this.time > 0) {
      this.minutes = Math.floor(this.time / 60);
      this.seconds = Math.floor(this.time % 60);
      this.time--;
    } else {
      this.time = 0
      clearInterval(this.timerInterval);
    }
  }

  submitOTP() {
    if (this.forgotPasswordForm.valid) {
      if (this.isUser) {
        this._authAPIs.userResetPassword(this.forgotPasswordForm.value).subscribe({
          next: response => {
            this.userSubmitFormSuccessSub = this._alert.open('', {
              label: 'Password updated Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
            this.changeView.emit('user-login')
          },

          error: err => {
            this.userSubmitFormFailureSub = this._alert.open('', {
              label: err.error,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
          }
        })
      } else {
        this._authAPIs.companyResetPassword(this.forgotPasswordForm.value).subscribe({
          next: response => {
            this.employerSubmitFormSuccessSub = this._alert.open('', {
              label: 'Password updated Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
            this.changeView.emit('company-login')
          },

          error: err => {
            this.employerSubmitFormFailureSub = this._alert.open('', {
              label: err.error,
              status: 'error',
              autoClose: true,
              hasCloseButton: true
            }).subscribe()
          }
        })
      }
    } else {
      this.forgotPasswordForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.userRequestOTPSuccessSub?.unsubscribe()
    this.userRequestOTPFailureSub?.unsubscribe()

    this.employerRequestOTPSuccessSub?.unsubscribe()
    this.employerRequestOTPFailureSub?.unsubscribe()

    this.userSubmitFormSuccessSub?.unsubscribe()
    this.userSubmitFormFailureSub?.unsubscribe()

    this.employerSubmitFormSuccessSub?.unsubscribe()
    this.employerSubmitFormFailureSub?.unsubscribe()
  }
}


