import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { noSpaceAllowed } from '../../validators/no-space-allowed.validator';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.scss'
})
export class UserSignUpComponent implements OnInit{
  @Output() changeView:EventEmitter<string> = new EventEmitter()

  constructor(
   private router:Router,
   private authService:AuthService,
   private alert: TuiAlertService,
   private formBuilder: FormBuilder
  ) {}

  registrationForm!: FormGroup;
  otpButton:string = 'Send OTP'

  startingMinute: number = 1; 
  time: number = 0
  minutes: number = Math.floor(this.time / 60);
  seconds: number = Math.floor(this.time % 60);
  timerInterval: any; 



  industries: string[] = [
    'IT',
    'Media'
  ]

  genders: string[] = [
    'Male',
    'Female',
    'Other'
  ]

  ngOnInit(): void {
      this.registrationForm =  this.formBuilder.group({
      firstName: ['', [Validators.required, noSpaceAllowed]],
      lastName: ['', [noSpaceAllowed]],
      profile_url: [''],
      email: ['', [Validators.required, Validators.email, noSpaceAllowed]],
      password: ['', [Validators.required, noSpaceAllowed, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, noSpaceAllowed, Validators.minLength(8)]],
      jobTitle: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      OTP: ['', [Validators.required, noSpaceAllowed, Validators.minLength(6)]]
    },{ validators: [confirmPasswordValidator]})
  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      let profile_Url:string = '';
      const gender = this.registrationForm.get('gender')?.value;
      const firstName = this.registrationForm.get('firstName')?.value
      if (gender === 'Male') {
        profile_Url = `https://avatar.iran.liara.run/public/boy?username=[${firstName}]`;
      } else if (gender === 'Female') {
        profile_Url = `https://avatar.iran.liara.run/public/girl?username=[${firstName}]`;
      } else {
        profile_Url = `https://avatar.iran.liara.run/username?username=${this.registrationForm.get('firstName')?.value}+${this.registrationForm.get('lastName')?.value}`;
      }
      this.registrationForm.patchValue({
        profile_url: profile_Url
      });
      console.log(this.registrationForm.value);
      
      this.authService.userRegistration(this.registrationForm.value).subscribe((res) => {
        this.alert.open('', {
          label: 'Registration successfull',
          status: 'success',
          autoClose: true,
          hasCloseButton: true
        }).subscribe()
        this.changeView.emit('user-login')
      }, (err: any) => {
        console.log(err);
        this.alert.open('', {
          label: err.error,
          status: 'error',
          autoClose: false,
          hasCloseButton: true
        }).subscribe({
                
        })
      })
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

  redirectlogin() {
    this.changeView.emit('user-login')
  }

  requestOTP() {
    const email = this.registrationForm.get('email')?.value    
    this.authService.userRequestOTP(email).subscribe(() => {
      this.otpButton = 'Resend OTP'
      this.alert.open('', {
        label: 'OTP send successfully',
        status: 'success',
        autoClose: true,
    }).subscribe({
        complete: () => console.log('notification closed')        
      })
      this.time = this.startingMinute * 60;
      this.timerInterval = setInterval(() => {
        this.updateTimer();
      }, 1000);
    },(err: any) => {
      console.log(err);
      this.alert.open('', {
        label: err.error,
        status: 'error',
        autoClose: false,
        hasCloseButton: true
      }).subscribe({
              
      })
    })
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
}
