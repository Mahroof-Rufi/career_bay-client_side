import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @Output() changeView: EventEmitter<string> = new EventEmitter()
  @Input() isUser: boolean = true;

  forgotPasswordForm!: FormGroup;

  otpButton: string = 'Send OTP'

  startingMinute: number = 1;
  time: number = 0
  minutes: number = Math.floor(this.time / 60);
  seconds: number = Math.floor(this.time % 60);
  timerInterval: any;

  constructor(
    private authService: AuthService,
    private alert: TuiAlertService) { }

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
        this.authService.userForgorPasswordRequestOTP(this.forgotPasswordForm.get('email')?.value).subscribe((res) => {
          this.otpButton = 'Resend OTP'
          this.time = this.startingMinute * 60;
          this.timerInterval = setInterval(() => {
            this.updateTimer();
          }, 1000);
          this.alert.open('', {
            label: 'OTP send Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }, (err) => {
          this.alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        })
      } else {
        this.authService.companyForgorPasswordRequestOTP(this.forgotPasswordForm.get('email')?.value).subscribe((res) => {

          this.otpButton = 'Resend OTP'
          this.time = this.startingMinute * 60;
          this.timerInterval = setInterval(() => {
            this.updateTimer();
          }, 1000);
          this.alert.open('', {
            label: 'OTP send Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }, (err) => {

          this.alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        })
      }
    } else {
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
        this.authService.userResetPassword(this.forgotPasswordForm.value).subscribe((res) => {

          this.alert.open('', {
            label: 'Password updated Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
          this.changeView.emit('user-login')
        }, (err) => {
          console.log(err);
          
          this.alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        })
      } else {
        this.authService.companyResetPassword(this.forgotPasswordForm.value).subscribe((res) => {
          console.log('here the comp reset pass res', res);
          this.alert.open('', {
            label: 'Password updated Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
          this.changeView.emit('company-login')
        }, (err) => {
          this.alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        })
      }
    } else {
      this.forgotPasswordForm.markAllAsTouched()
    }
  }
}


