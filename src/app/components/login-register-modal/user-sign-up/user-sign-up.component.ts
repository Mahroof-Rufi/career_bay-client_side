import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { noSpaceAllowed } from '../../../validators/no-space-allowed.validator';
import { confirmPasswordValidator } from '../../../validators/confirm-password.validator';
import { environment } from '../../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../../services/auth-api-service.service';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserSignUpComponent implements OnInit,OnDestroy{
  @Output() changeView:EventEmitter<string> = new EventEmitter()

  isLoading:boolean = false

  private _requestOtpAPISubscription!:Subscription;
  private _registrationAPISubscription!:Subscription;

  private _requestOTPSuccessSubscription!:Subscription;
  private _requestOTPFailureSubscription!:Subscription;

  private _registrationSuccessSubscription!:Subscription;
  private _registrationFailureSubscription!:Subscription;

  protected minDate = new TuiDay(1980, 0, 1);
  protected maxDate = TuiDay.currentLocal();

  constructor(
   private _authAPIs:AuthApiService,
   private _alert: TuiAlertService,
   private _formBuilder: FormBuilder
  ) {}

  registrationForm!: FormGroup;
  otpButton:string = 'Send OTP'

  startingMinute: number = 1; 
  time: number = 0
  minutes: number = Math.floor(this.time / 60);
  seconds: number = Math.floor(this.time % 60);
  timerInterval: any; 

  industries: string[] = []

  genders: string[] = ['Male','Female','Other']

  ngOnInit(): void {
      this.registrationForm =  this._formBuilder.group({
      firstName: ['', [Validators.required, noSpaceAllowed]],
      lastName: ['', [noSpaceAllowed]],
      profile_url: [''],
      email: ['', [Validators.required, Validators.email, noSpaceAllowed]],
      password: ['', [Validators.required, noSpaceAllowed, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, noSpaceAllowed, Validators.minLength(8)]],
      jobTitle: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      DOB: [new TuiDay(1980, 0, 1), [Validators.required]],
      gender: ['', [Validators.required]],
      OTP: ['', [Validators.required, noSpaceAllowed, Validators.minLength(6)]]
    },{ validators: [confirmPasswordValidator]})

    this._authAPIs.getIndustries().subscribe((res:any) => this.industries = res)
  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      this.isLoading = true
      let profile_Url:string = '';
      const gender = this.registrationForm.get('gender')?.value;
      const firstName = this.registrationForm.get('firstName')?.value
      const lastName = this.registrationForm.get('lastName')?.value
      
      if (gender === 'Male') {
        profile_Url = environment.defaultAvatarApi+`/public/boy?username=[${firstName}]`;
      } else if (gender === 'Female') {
        profile_Url = environment.defaultAvatarApi+`/public/girl?username=[${firstName}]`;
      } else {
        profile_Url = environment.defaultAvatarApi+`/username?username=${firstName}+${lastName}`;
      }

      this.registrationForm.patchValue({
        profile_url: profile_Url
      });
      
      this._registrationAPISubscription = this._authAPIs.userRegistration(this.registrationForm.value).subscribe({
        next: response => {          
          this._registrationSuccessSubscription = this._alert.open('', {
            label: 'Registration successful',
            status: 'success',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
          this.changeView.emit('user-login')
        },
        error: err => {
          this.isLoading = false
          this._registrationFailureSubscription = this._alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        }
      })

    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

  redirectLogin() {
    this.changeView.emit('user-login')
  }

  requestOTP() {
    if (this.registrationForm.get('email')?.valid) {
      const email = this.registrationForm.get('email')?.value

      this._requestOtpAPISubscription = this._authAPIs.userRequestOTP(email).subscribe({
        next: response => {
          this.otpButton = 'Resend OTP'
          this._requestOTPSuccessSubscription = this._alert.open('', {
            label: response,
            status: 'success',
            autoClose: true,
          }).subscribe()
          this.time = this.startingMinute * 60;
          this.timerInterval = setInterval(() => {
            this.updateTimer();
          }, 1000);
        },
        error: err => {
          this._requestOTPFailureSubscription = this._alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        }
      })
    } else {
      this.registrationForm.get('email')?.markAsTouched()
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

  ngOnDestroy(): void {
    this._requestOtpAPISubscription?.unsubscribe()
    this._registrationAPISubscription?.unsubscribe()

    this._requestOTPSuccessSubscription?.unsubscribe()
    this._requestOTPFailureSubscription?.unsubscribe()

    this._registrationSuccessSubscription?.unsubscribe()
    this._registrationFailureSubscription?.unsubscribe()
  }
}
